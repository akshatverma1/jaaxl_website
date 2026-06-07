"use client";
import { useEffect, useRef } from "react";

/**
 * StarBackground — a rich animated starfield with:
 *  • 3-layer parallax stars moving left → right at visible speeds
 *  • Twinkling opacity pulses per star
 *  • Streaking shooting stars with glowing gradient tails
 *  • Stars leaving a short motion-blur trail based on their speed
 */
const StarBackground = ({
  starCount = 200,
  speed = 1,
  twinkle = true,
  shootingStars = true,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animRef  = useRef(null);
  const starsRef = useRef([]);
  const shootingRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* ── Resize ──────────────────────────────────────── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    /* ── Star factory ────────────────────────────────── */
    const makeStar = (randomX = true) => {
      // 3 depth layers: far (slow/small), mid, near (fast/big)
      const layer = Math.floor(Math.random() * 3); // 0 = far, 1 = mid, 2 = near
      const layerSpeeds  = [0.25, 0.7, 1.6];
      const layerRadii   = [0.6,  1.1, 1.8];
      const layerOpacity = [0.4,  0.7, 1.0];

      return {
        x: randomX ? Math.random() * canvas.width : canvas.width + 2,
        y: Math.random() * canvas.height,
        radius: layerRadii[layer] * (0.7 + Math.random() * 0.6),
        baseOpacity: layerOpacity[layer] * (0.5 + Math.random() * 0.5),
        opacity:     layerOpacity[layer] * (0.5 + Math.random() * 0.5),
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinkleDir:   Math.random() > 0.5 ? 1 : -1,
        vx: layerSpeeds[layer] * speed * (0.8 + Math.random() * 0.4),
        vy: (Math.random() - 0.5) * 0.15 * speed,
        layer,
        trail: layer === 2, // near stars leave a blur trail
      };
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: starCount }, () => makeStar(true));
    };

    /* ── Shooting star factory ───────────────────────── */
    const spawnShootingStar = () => {
      if (!shootingStars) return;
      const fromTop = Math.random() > 0.35;
      shootingRef.current.push({
        x:       fromTop ? Math.random() * canvas.width * 0.6 : 0,
        y:       fromTop ? 0 : Math.random() * canvas.height * 0.5,
        vx:      9 + Math.random() * 8,
        vy:      fromTop ? 3 + Math.random() * 5 : 1 + Math.random() * 3,
        length:  100 + Math.random() * 150,
        opacity: 0,          // fade in first
        phase:   "in",       // "in" | "hold" | "out"
        holdFor: 8 + Math.floor(Math.random() * 10),
        holdCount: 0,
        fade:    0.05 + Math.random() * 0.04,
        width:   1.5 + Math.random() * 1,
      });
    };

    let shootingTimer = 80; // spawn first one quickly

    /* ── Draw loop ───────────────────────────────────── */
    const draw = () => {
      // Semi-transparent clear → creates subtle motion-blur trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* Stars */
      starsRef.current.forEach((star) => {
        // Twinkle
        if (twinkle) {
          star.opacity += star.twinkleSpeed * star.twinkleDir;
          const max = Math.min(star.baseOpacity + 0.25, 1);
          const min = Math.max(star.baseOpacity - 0.3, 0.05);
          if (star.opacity >= max) star.twinkleDir = -1;
          if (star.opacity <= min) star.twinkleDir =  1;
        }

        // Move
        star.x -= star.vx; // move RIGHT → LEFT (stars fly past)
        star.y += star.vy;

        // Wrap — respawn at right edge when exits left
        if (star.x < -4) {
          Object.assign(star, makeStar(false));
          star.x = canvas.width + 4;
        }
        if (star.y < 0)              star.y = canvas.height;
        if (star.y > canvas.height)  star.y = 0;

        // Draw glow + core
        ctx.save();
        if (star.layer === 2) {
          ctx.shadowBlur  = 10;
          ctx.shadowColor = "rgba(180,210,255,0.9)";
        } else if (star.layer === 1) {
          ctx.shadowBlur  = 5;
          ctx.shadowColor = "rgba(255,255,255,0.5)";
        } else {
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(255,255,255,0.3)";
        }

        // Elongate near/fast stars slightly in motion direction
        if (star.trail && star.vx > 0.8) {
          const stretch = 1 + star.vx * 0.5;
          ctx.scale(stretch, 1);
          ctx.beginPath();
          ctx.arc(star.x / stretch, star.y, star.radius * 0.7, 0, Math.PI * 2);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        }

        ctx.fillStyle = `rgba(220, 235, 255, ${star.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      /* Shooting stars */
      shootingRef.current = shootingRef.current.filter((s) => s.opacity > 0 || s.phase === "in");

      shootingRef.current.forEach((s) => {
        // Phase management
        if (s.phase === "in") {
          s.opacity = Math.min(s.opacity + s.fade * 1.5, 1);
          if (s.opacity >= 1) { s.phase = "hold"; }
        } else if (s.phase === "hold") {
          s.holdCount++;
          if (s.holdCount >= s.holdFor) s.phase = "out";
        } else {
          s.opacity = Math.max(s.opacity - s.fade, 0);
        }

        const speed = Math.hypot(s.vx, s.vy);
        const tailX = s.x - (s.vx / speed) * s.length;
        const tailY = s.y - (s.vy / speed) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0,    `rgba(180,210,255,0)`);
        grad.addColorStop(0.5,  `rgba(220,235,255,${s.opacity * 0.35})`);
        grad.addColorStop(0.85, `rgba(255,255,255,${s.opacity * 0.8})`);
        grad.addColorStop(1,    `rgba(255,255,255,${s.opacity})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = "round";
        ctx.shadowBlur  = 14;
        ctx.shadowColor = "rgba(180,220,255,0.9)";
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        ctx.restore();

        s.x += s.vx;
        s.y += s.vy;

        // Kill if out of canvas
        if (s.x > canvas.width + 20 || s.y > canvas.height + 20) {
          s.opacity = 0;
          s.phase = "out";
        }
      });

      /* Spawn shooting stars */
      shootingTimer++;
      if (shootingTimer > 120 + Math.random() * 200) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [starCount, speed, twinkle, shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`star-canvas ${className}`}
      aria-hidden="true"
    />
  );
};

export default StarBackground;
