"use client";
import { useEffect, useRef } from "react";

const TOPO_URL = "/land-110m.json";

const PINS = [];

// Module-level cache so we never re-fetch or re-decode TopoJSON repeatedly
let cachedTopology = null;
let topologyPromise = null;

function getTopology() {
  if (cachedTopology) return Promise.resolve(cachedTopology);
  if (!topologyPromise) {
    topologyPromise = fetch(TOPO_URL)
      .then((r) => r.json())
      .then((data) => {
        cachedTopology = data;
        return data;
      })
      .catch((err) => {
        topologyPromise = null;
        throw err;
      });
  }
  return topologyPromise;
}

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
 * GlimmeringMap (Performance Optimized)
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
    let isVisible = true;
    let dots = [];
    let W = 0;
    let H = 0;
    let isMobile = window.innerWidth < 768;
    const actualSpacing = isMobile ? Math.max(dotSpacing, 12) : dotSpacing;
    const useShadow = !isMobile && glowBlur > 0;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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
      if (!oc) return;
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

      for (let y = actualSpacing; y < H - actualSpacing * 0.5; y += actualSpacing) {
        if (y > H * 0.88) continue;
        for (
          let x = actualSpacing * 0.5;
          x < W - actualSpacing * 0.5;
          x += actualSpacing
        ) {
          if (isLand(x, y)) {
            dots.push({
              x: x + (Math.random() - 0.5) * 1.5,
              y: y + (Math.random() - 0.5) * 1.5,
              baseR: 0.85 + Math.random() * 0.65,
              glimmer: 0,
              phase: "idle",
              holdCount: 0,
              holdMax: 6 + Math.floor(Math.random() * 28),
            });
          }
        }
      }
    };

    let currentTopology = null;

    getTopology()
      .then((topology) => {
        if (!running) return;
        currentTopology = topology;
        initMap(topology);

        /* ── Animation loop ── */
        let frame = 0;

        const animate = () => {
          if (!running) return;

          if (isVisible) {
            frame++;

            /* Clear */
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, W, H);

            /* Trigger new glimmers every other frame */
            if (frame % 2 === 0 && dots.length) {
              const n = 1 + Math.floor(Math.random() * (isMobile ? 2 : glimmerRate));
              for (let i = 0; i < n; i++) {
                const d = dots[Math.floor(Math.random() * dots.length)];
                if (d && d.phase === "idle") d.phase = "in";
              }
            }

            /* Update each dot's state */
            for (let i = 0; i < dots.length; i++) {
              const d = dots[i];
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
            for (let i = 0; i < dots.length; i++) {
              const d = dots[i];
              if (d.glimmer === 0) {
                ctx.moveTo(d.x + d.baseR, d.y);
                ctx.arc(d.x, d.y, d.baseR, 0, Math.PI * 2);
              }
            }
            ctx.fillStyle = `rgba(0, 150, 220, ${dimOpacity})`;
            ctx.fill();

            /* ── PASS 2: glimmering dots ── */
            for (let i = 0; i < dots.length; i++) {
              const d = dots[i];
              if (d.glimmer <= 0) continue;
              const g = d.glimmer;

              const r = 0;
              const gr = Math.round(lerp(150, 229, g));
              const b = Math.round(lerp(220, 255, g));
              const a = lerp(dimOpacity, 1.0, g);

              if (useShadow) {
                ctx.save();
                ctx.shadowBlur = g * glowBlur;
                ctx.shadowColor = `rgba(0, 210, 255, ${g * 0.95})`;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.baseR + g * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${gr},${b},${a})`;
                ctx.fill();
                ctx.restore();
              } else {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.baseR + g * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${gr},${b},${a})`;
                ctx.fill();
              }
            }

            /* ── PASS 3: draw service location pins with labels ── */
            PINS.forEach((pin) => {
              const [px, py] = project(pin.lon, pin.lat, W, H);
              const pulse = (frame % 60) / 60;
              const rMax = 12;

              ctx.beginPath();
              ctx.arc(px, py, 4 + pulse * rMax, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(0, 229, 255, ${1 - pulse})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(px, py, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = "#ffffff";
              ctx.fill();

              const startX = px + 50;
              const startY = py - 35;
              const endX = px + 5;
              const endY = py - 5;

              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = "rgba(0, 229, 255, 0.8)";
              ctx.lineWidth = 1.2;
              ctx.stroke();

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

              ctx.font = "600 10px sans-serif";
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#ffffff";
              ctx.fillText(pin.name, startX + 5, startY);
            });
          }

          animRef.current = requestAnimationFrame(animate);
        };

        animate();
      })
      .catch((e) => console.warn("GlimmeringMap: could not load world data", e));

    /* ── IntersectionObserver to stop loop when offscreen ── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        isMobile = window.innerWidth < 768;
        if (currentTopology) {
          initMap(currentTopology);
        }
      }, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      running = false;
      observer.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
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
