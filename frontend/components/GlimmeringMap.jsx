"use client";
import { useEffect, useRef } from "react";

const TOPO_URL = "/land-110m.json";

const PINS = [];

/* ─── helpers ──────────────────────────────────────────────── */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Mercator projection → pixel [x, y] */
function project(lon, lat, w, h) {
  lat = Math.max(-85, Math.min(85, lat));
  const x = ((lon + 180) / 360) * w;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const y =
    h * 0.5 -
    (Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * h;
  // Shift map down by 16% of height to position it slightly lower since Antarctica is hidden
  return [x, y + h * 0.16];
}

/** Decode topojson quantized/delta-encoded arcs → [[lon,lat], …] */
function decodeArcs(topology) {
  const [sx, sy] = topology.transform.scale;
  const [tx, ty] = topology.transform.translate;
  return topology.arcs.map((arc) => {
    let x = 0,
      y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx + tx, y * sy + ty];
    });
  });
}

/** Draw a topojson geometry object onto a canvas 2d context */
function drawGeometry(ctx, geom, arcs, w, h) {
  if (!geom) return;

  const fillPoly = (rings) => {
    ctx.beginPath();
    for (const ring of rings) {
      let first = true;
      let prevX = 0;
      for (const idx of ring) {
        const arc = arcs[idx < 0 ? ~idx : idx];
        const pts = idx < 0 ? [...arc].reverse() : arc;
        for (const [lon, lat] of pts) {
          const [px, py] = project(lon, lat, w, h);
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            // Avoid drawing a stray horizontal line across the map when coordinates cross the antimeridian (+/-180 deg)
            if (Math.abs(px - prevX) > w * 0.5) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          prevX = px;
        }
      }
    }
    ctx.closePath();
    ctx.fill();
  };

  if (geom.type === "GeometryCollection") {
    geom.geometries.forEach((g) => drawGeometry(ctx, g, arcs, w, h));
  } else if (geom.type === "Polygon") {
    fillPoly(geom.arcs);
  } else if (geom.type === "MultiPolygon") {
    geom.arcs.forEach(fillPoly);
  }
}

/* ─── component ─────────────────────────────────────────────── */
/**
 * GlimmeringMap
 *
 * Props:
 *  dotSpacing  – pixel gap between dots (default 7)
 *  glimmerRate – dots triggered per frame batch (default 4)
 *  className   – extra CSS classes
 */
const GlimmeringMap = ({
  dotSpacing = 7,
  glimmerRate = 4,
  dimOpacity = 0.14,
  glowBlur = 22,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let running = true;
    let dots = [];
    let W = 0;
    let H = 0;

    const ctx = canvas.getContext("2d");

    const initMap = (topology) => {
      if (!running) return;

      W = canvas.offsetWidth || window.innerWidth;
      H = canvas.offsetHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;

      dots = [];

      /* ── Build land mask on offscreen canvas ── */
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const oc = off.getContext("2d");
      oc.fillStyle = "#000";
      oc.fillRect(0, 0, W, H);
      oc.fillStyle = "#fff";

      const arcs = decodeArcs(topology);
      drawGeometry(oc, topology.objects.land, arcs, W, H);

      const img = oc.getImageData(0, 0, W, H).data;
      const isLand = (px, py) => {
        const xi = Math.min(Math.max(Math.round(px), 0), W - 1);
        const yi = Math.min(Math.max(Math.round(py), 0), H - 1);
        return img[(yi * W + xi) * 4] > 128;
      };

      for (let y = dotSpacing; y < H - dotSpacing * 0.5; y += dotSpacing) {
        // Skip dots below -60 degrees latitude (Antarctica)
        if (y > H * 0.88) continue;
        for (
          let x = dotSpacing * 0.5;
          x < W - dotSpacing * 0.5;
          x += dotSpacing
        ) {
          if (isLand(x, y)) {
            dots.push({
              x: x + (Math.random() - 0.5) * 1.5,
              y: y + (Math.random() - 0.5) * 1.5,
              baseR: 0.85 + Math.random() * 0.65,   // idle dot radius
              glimmer: 0,                            // 0..1 brightness
              phase: "idle",                         // idle | in | hold | out
              holdCount: 0,
              holdMax: 6 + Math.floor(Math.random() * 28),
            });
          }
        }
      }
    };

    let topoData = null;

    fetch(TOPO_URL)
      .then((r) => r.json())
      .then((topology) => {
        if (!running) return;
        topoData = topology;
        initMap(topology);

        /* ── Animation loop ── */
        let frame = 0;

        const animate = () => {
          if (!running) return;
          frame++;

          /* Clear */
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, W, H);

          /* Trigger new glimmers every other frame */
          if (frame % 2 === 0 && dots.length) {
            const n = 1 + Math.floor(Math.random() * glimmerRate);
            for (let i = 0; i < n; i++) {
              const d = dots[Math.floor(Math.random() * dots.length)];
              if (d.phase === "idle") d.phase = "in";
            }
          }

          /* Update each dot's state */
          for (const d of dots) {
            if (d.phase === "in") {
              d.glimmer = Math.min(d.glimmer + 0.1, 1);
              if (d.glimmer >= 1) {
                d.phase = "hold";
                d.holdCount = 0;
              }
            } else if (d.phase === "hold") {
              if (++d.holdCount >= d.holdMax) d.phase = "out";
            } else if (d.phase === "out") {
              d.glimmer = Math.max(d.glimmer - 0.055, 0);
              if (d.glimmer <= 0) {
                d.glimmer = 0;
                d.phase = "idle";
              }
            }
          }

          /* ── PASS 1: batch-draw all idle dim dots ── */
          ctx.beginPath();
          for (const d of dots) {
            if (d.glimmer === 0) {
              ctx.moveTo(d.x + d.baseR, d.y);
              ctx.arc(d.x, d.y, d.baseR, 0, Math.PI * 2);
            }
          }
          /* Soft digital cyan-blue for inactive dots */
          ctx.fillStyle = `rgba(0, 150, 220, ${dimOpacity})`;
          ctx.fill();

          /* ── PASS 2: glimmering dots with glow ── */
          for (const d of dots) {
            if (d.glimmer <= 0) continue;
            const g = d.glimmer;

            /*
             * Colour ramp:  dim cyan-blue  →  bright neon cyan
             *   dim:  rgba(0, 150, 220, dimOpacity)
             *   peak: rgba(0, 229, 255, 1.0)
             */
            const r  = 0;
            const gr = Math.round(lerp(150, 229, g));
            const b  = Math.round(lerp(220, 255, g));
            const a  = lerp(dimOpacity, 1.0, g);

            ctx.save();
            ctx.shadowBlur  = g * glowBlur;
            ctx.shadowColor = `rgba(0, 210, 255, ${g * 0.95})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.baseR + g * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${gr},${b},${a})`;
            ctx.fill();
            ctx.restore();
          }

          /* ── PASS 3: draw service location pins with labels ── */
          PINS.forEach((pin) => {
            const [px, py] = project(pin.lon, pin.lat, W, H);
            
            // Pulse ripple effect
            const pulse = (frame % 60) / 60;
            const rMax = 12;
            ctx.save();
            ctx.beginPath();
            ctx.arc(px, py, 4 + pulse * rMax, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 229, 255, ${1 - pulse})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();

            // Pinned city core
            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(0, 229, 255, 1.0)";
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.restore();

            // Arrow pointing line to avoid text overlap (px + 50, py - 35) to (px + 5, py - 5)
            const startX = px + 50;
            const startY = py - 35;
            const endX = px + 5;
            const endY = py - 5;

            ctx.save();
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(0, 229, 255, 0.5)";
            
            // Draw connector line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = "rgba(0, 229, 255, 0.8)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Arrow head pointing at (endX, endY)
            const angle = Math.atan2(endY - startY, endX - startX);
            const arrowLength = 6;
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(
              endX - arrowLength * Math.cos(angle - Math.PI / 6),
              endY - arrowLength * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
              endX - arrowLength * Math.cos(angle + Math.PI / 6),
              endY - arrowLength * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = "rgba(0, 229, 255, 0.9)";
            ctx.fill();
            ctx.restore();

            // Label text at the start of the arrow (startX + 5, startY)
            ctx.save();
            ctx.font = "600 10px sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
            ctx.lineWidth = 3;
            ctx.strokeText(pin.name, startX + 5, startY);
            ctx.fillStyle = "#ffffff";
            ctx.fillText(pin.name, startX + 5, startY);
            ctx.restore();
          });

          animRef.current = requestAnimationFrame(animate);
        };

        animate();
      })
      .catch((e) => console.warn("GlimmeringMap: could not load world data", e));

    const handleResize = () => {
      if (topoData) {
        initMap(topoData);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, [dotSpacing, glimmerRate, dimOpacity, glowBlur]);

  return (
    <canvas
      ref={canvasRef}
      className={`star-canvas ${className}`}
      aria-hidden="true"
    />
  );
};

export default GlimmeringMap;
