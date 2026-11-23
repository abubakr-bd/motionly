import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  vx: number;
  vy: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const MilkyWayCosmos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle Resize
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 01. Generate Stars
    const starCount = Math.min(Math.floor((width * height) / 4500), 220);
    const starColors = [
      "#ffffff",
      "#e0f2fe", // soft sky
      "#bae6fd", // cyan-blue
      "#e9d5ff", // violet tint
      "#fef3c7", // warm stellar
    ];

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.04,
      });
    }

    // 02. Meteor System
    let meteor: Meteor = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      alpha: 0,
      active: false,
    };

    const spawnMeteor = () => {
      meteor = {
        x: Math.random() * (width * 0.75),
        y: Math.random() * (height * 0.35),
        length: Math.random() * 70 + 60,
        speed: Math.random() * 14 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg downward
        alpha: 1,
        active: true,
      };
    };

    let meteorCooldown = Math.random() * 240 + 120; // 2-6 seconds at 60fps

    // 03. Intersection Observer to Pause Loop when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 04. Animation Loop
    let time = 0;
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // ── A. Milky Way Galactic Core & Nebula Bands (Procedural Cosmic Clouds) ──
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Galactic Core Center Glow (Soft magenta/purple/blue)
      const coreX = width * 0.5 + Math.sin(time * 0.2) * 15;
      const coreY = height * 0.38 + Math.cos(time * 0.15) * 10;
      const coreGrad = ctx.createRadialGradient(
        coreX,
        coreY,
        0,
        coreX,
        coreY,
        width * 0.55
      );
      coreGrad.addColorStop(0, "rgba(56, 189, 248, 0.16)"); // Cyan core
      coreGrad.addColorStop(0.35, "rgba(99, 102, 241, 0.12)"); // Indigo
      coreGrad.addColorStop(0.65, "rgba(168, 85, 247, 0.06)"); // Purple dust
      coreGrad.addColorStop(1, "rgba(5, 7, 13, 0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Diagonal Milky Way Cosmic Dust Ribbon
      const ribbonGrad = ctx.createLinearGradient(0, height * 0.1, width, height * 0.7);
      ribbonGrad.addColorStop(0, "rgba(14, 165, 233, 0)");
      ribbonGrad.addColorStop(0.35, "rgba(56, 189, 248, 0.08)");
      ribbonGrad.addColorStop(0.5, "rgba(129, 140, 248, 0.14)");
      ribbonGrad.addColorStop(0.65, "rgba(192, 132, 252, 0.09)");
      ribbonGrad.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = ribbonGrad;
      ctx.fillRect(0, 0, width, height);

      // Deep Space Ambient Nebula Pill 1
      const p1X = width * 0.25;
      const p1Y = height * 0.3;
      const p1 = ctx.createRadialGradient(p1X, p1Y, 0, p1X, p1Y, width * 0.35);
      p1.addColorStop(0, "rgba(59, 130, 246, 0.15)");
      p1.addColorStop(0.5, "rgba(147, 51, 234, 0.07)");
      p1.addColorStop(1, "transparent");
      ctx.fillStyle = p1;
      ctx.fillRect(0, 0, width, height);

      // Deep Space Ambient Nebula Pill 2
      const p2X = width * 0.78;
      const p2Y = height * 0.45;
      const p2 = ctx.createRadialGradient(p2X, p2Y, 0, p2X, p2Y, width * 0.38);
      p2.addColorStop(0, "rgba(6, 182, 212, 0.13)");
      p2.addColorStop(0.6, "rgba(30, 58, 138, 0.06)");
      p2.addColorStop(1, "transparent");
      ctx.fillStyle = p2;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      // ── B. Twinkling Stars Rendering ──
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!prefersReducedMotion) {
          s.x += s.vx;
          s.y += s.vy;

          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          s.twinklePhase += s.twinkleSpeed;
        }

        const twinkle = Math.sin(s.twinklePhase);
        const alpha = Math.max(0.1, s.baseAlpha + twinkle * 0.3);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Extra stellar halo for larger bright stars
        if (s.radius > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha * 0.22;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // ── C. Shooting Star / Meteor Animation ──
      if (!prefersReducedMotion) {
        if (!meteor.active) {
          meteorCooldown--;
          if (meteorCooldown <= 0) {
            spawnMeteor();
            meteorCooldown = Math.random() * 260 + 140;
          }
        } else {
          const cos = Math.cos(meteor.angle);
          const sin = Math.sin(meteor.angle);

          const tailX = meteor.x - cos * meteor.length;
          const tailY = meteor.y - sin * meteor.length;

          const mGrad = ctx.createLinearGradient(
            tailX,
            tailY,
            meteor.x,
            meteor.y
          );
          mGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          mGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.4)");
          mGrad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.strokeStyle = mGrad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Meteor head spark
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          meteor.x += cos * meteor.speed;
          meteor.y += sin * meteor.speed;
          meteor.alpha -= 0.016;

          if (
            meteor.alpha <= 0 ||
            meteor.x > width + 100 ||
            meteor.y > height + 100
          ) {
            meteor.active = false;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle vignette layer to blend smoothly into the footer base */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-transparent to-[#04060b]/40 pointer-events-none" />
    </div>
  );
};

export default MilkyWayCosmos;
