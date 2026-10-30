import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";
import { ArrowUpRight, Sparkles } from "lucide-react";

/**
 * -----------------------------------------------------------------------------
 * 3D VECTOR ASSETS FOR FLOATING FOOTER
 * Inspired by Turion Space luxury architectural footer
 * -----------------------------------------------------------------------------
 */

// 1. HIGH-TECH CINEMATIC SATELLITE / CAMERA DRONE
const CinematicSatellite = ({ isDark }: { isDark: boolean }) => (
  <svg
    viewBox="0 0 260 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
  >
    <defs>
      <linearGradient id="satPanelGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="goldFoilGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#ca8a04" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>
      <radialGradient id="cameraLensGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="35%" stopColor="#0284c7" />
        <stop offset="75%" stopColor="#0c4a6e" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>
      <linearGradient id="chassisTopGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>

    {/* Left Solar Wing with Carbon Truss */}
    <g transform="translate(10, 42)">
      <rect x="58" y="27" width="18" height="5" fill="#64748b" rx="1" />
      <circle cx="58" cy="29.5" r="2.5" fill="#f59e0b" />
      <polygon points="0,14 58,0 58,62 0,50" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
      <polygon points="3,16 55,3 55,59 3,48" fill="url(#satPanelGrad)" />
      <line x1="18" y1="12" x2="18" y2="52" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="36" y1="8" x2="36" y2="56" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="3" y1="32" x2="55" y2="31" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <polygon points="55,3 58,0 58,62 55,59" fill="#f59e0b" />
    </g>

    {/* Right Solar Wing with Carbon Truss */}
    <g transform="translate(150, 42)">
      <rect x="0" y="27" width="18" height="5" fill="#64748b" rx="1" />
      <circle cx="18" cy="29.5" r="2.5" fill="#f59e0b" />
      <polygon points="18,0 76,14 76,50 18,62" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
      <polygon points="21,3 73,16 73,48 21,59" fill="url(#satPanelGrad)" />
      <line x1="39" y1="8" x2="39" y2="56" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="57" y1="12" x2="57" y2="52" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="21" y1="31" x2="73" y2="32" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
      <polygon points="18,0 21,3 21,59 18,62" fill="#f59e0b" />
    </g>

    {/* Central Probe Body / Cinema Optics Payload */}
    <g transform="translate(95, 38)">
      {/* Top 3D Deck */}
      <polygon points="0,26 28,8 60,8 32,26" fill="url(#chassisTopGrad)" stroke="#64748b" strokeWidth="0.8" />
      {/* Communication Antennae */}
      <line x1="44" y1="8" x2="54" y2="-14" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="54" cy="-14" r="2" fill="#38bdf8" />
      <line x1="20" y1="17" x2="14" y2="-6" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="14" cy="-6" r="1.5" fill="#f59e0b" />
      <ellipse cx="36" cy="11" rx="8" ry="3.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" transform="rotate(-15, 36, 11)" />

      {/* Gold Thermal Blanket (Left Payload Block) */}
      <polygon points="0,26 32,26 32,78 0,78" fill="url(#goldFoilGrad)" stroke="#78350f" strokeWidth="0.8" />
      <line x1="0" y1="43" x2="32" y2="43" stroke="#92400e" strokeWidth="0.6" />
      <line x1="0" y1="60" x2="32" y2="60" stroke="#92400e" strokeWidth="0.6" />
      <line x1="16" y1="26" x2="16" y2="78" stroke="#92400e" strokeWidth="0.6" />

      {/* Electronics & Sensor Bay (Right Dark Block) */}
      <polygon points="32,26 60,8 60,60 32,78" fill="#0b0f19" stroke="#1e293b" strokeWidth="0.8" />

      {/* Cinema Camera Lens Eye (The Hero Video Optics) */}
      <g transform="translate(16, 52)">
        <circle cx="0" cy="0" r="13" fill="#020617" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="9" fill="url(#cameraLensGrad)" />
        <path d="M -5,-5 A 7 7 0 0 1 5,-5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
        <circle cx="7" cy="-7" r="1.5" fill="#ef4444" />
      </g>

      {/* Star Tracker Sensor */}
      <circle cx="48" cy="32" r="4.5" fill="#020617" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="48" cy="32" r="2.5" fill="#38bdf8" />

      {/* Thruster Nozzle & Plasma Emitter */}
      <polygon points="10,78 22,78 25,88 7,88" fill="#475569" stroke="#334155" strokeWidth="0.8" />
      <ellipse cx="16" cy="88" rx="8" ry="2.5" fill="#0f172a" />
      <ellipse cx="16" cy="91" rx="5" ry="3" fill="#38bdf8" opacity="0.85" />
    </g>
  </svg>
);

// 2. FACETED 3D ASTEROIDS (Foreground & Midground Rocks)
const FacetedAsteroid = ({
  variant = "large",
  className = "",
}: {
  variant?: "large" | "medium" | "small";
  className?: string;
}) => {
  if (variant === "large") {
    return (
      <svg viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <polygon points="28,6 72,0 105,32 95,76 50,94 12,78 0,38" fill="#070a12" />
        <polygon points="28,6 72,0 60,38 22,44" fill="#334155" />
        <polygon points="72,0 105,32 82,55 60,38" fill="#475569" />
        <polygon points="28,6 22,44 0,38" fill="#1e293b" />
        <polygon points="22,44 60,38 50,72 12,78" fill="#1e293b" />
        <polygon points="60,38 82,55 95,76 50,72" fill="#0f172a" />
        <polygon points="50,72 95,76 50,94" fill="#090d16" />
        <polygon points="12,78 50,72 50,94" fill="#050810" />
        <line x1="28" y1="6" x2="60" y2="38" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="72" y1="0" x2="60" y2="38" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <line x1="60" y1="38" x2="82" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      </svg>
    );
  }

  if (variant === "medium") {
    return (
      <svg viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <polygon points="22,0 54,6 74,28 60,60 28,64 6,44 0,20" fill="#070a12" />
        <polygon points="22,0 54,6 46,31 16,24" fill="#475569" />
        <polygon points="54,6 74,28 55,44 46,31" fill="#334155" />
        <polygon points="22,0 16,24 0,20" fill="#1e293b" />
        <polygon points="16,24 46,31 38,55 6,44" fill="#1e293b" />
        <polygon points="46,31 55,44 60,60 38,55" fill="#0f172a" />
        <line x1="22" y1="0" x2="46" y2="31" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="14,0 34,4 44,18 36,38 16,40 4,28 0,12" fill="#090d16" />
      <polygon points="14,0 34,4 28,20 10,15" fill="#475569" />
      <polygon points="34,4 44,18 34,28 28,20" fill="#334155" />
      <polygon points="14,0 10,15 0,12" fill="#1e293b" />
      <polygon points="10,15 28,20 24,35 4,28" fill="#1e293b" />
      <polygon points="28,20 34,28 36,38 24,35" fill="#0a0e1a" />
      <line x1="14" y1="0" x2="28" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
    </svg>
  );
};

// 3. PRISMATIC 3D PLAY CRYSTAL (Symbol of High-Retention Video & Motion Craft)
const PrismaticPlayGem = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_20px_rgba(56,189,248,0.3)]">
    <defs>
      <linearGradient id="prismTop" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="prismBottom" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="prismSide" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
    </defs>
    {/* Triangular Play Prism */}
    <polygon points="12,10 52,30 24,36" fill="url(#prismTop)" opacity="0.9" />
    <polygon points="12,10 24,36 12,50" fill="url(#prismSide)" opacity="0.8" />
    <polygon points="12,50 24,36 52,30" fill="url(#prismBottom)" opacity="0.95" />
    <line x1="12" y1="10" x2="24" y2="36" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
    <line x1="24" y1="36" x2="52" y2="30" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
  </svg>
);

// 4. CORNER CRAGS & MOUNTAIN FORMATIONS (Framing the Scene like Turion)
const LeftCornerCliff = ({ isDark }: { isDark: boolean }) => (
  <svg viewBox="0 0 150 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="0,170 0,65 38,48 65,95 98,80 150,170" fill={isDark ? "#080b16" : "#0d1322"} />
    <polygon points="0,170 0,65 38,48 48,105" fill={isDark ? "#121727" : "#1a2236"} />
    <polygon points="38,48 65,95 80,80 98,80 75,170 48,105" fill={isDark ? "#1a2138" : "#24304c"} />
    <line x1="38" y1="48" x2="0" y2="65" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.5" />
    <line x1="38" y1="48" x2="65" y2="95" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.5" />
    <line x1="65" y1="95" x2="98" y2="80" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.2" />
  </svg>
);

const RightCornerMountain = ({ isDark }: { isDark: boolean }) => (
  <svg viewBox="0 0 170 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="170,220 170,22 122,58 96,115 54,146 0,220" fill={isDark ? "#070a14" : "#0c1120"} />
    <polygon points="170,22 122,58 132,126 170,220" fill={isDark ? "#111626" : "#182034"} />
    <polygon points="122,58 96,115 106,168 132,126" fill={isDark ? "#1a223a" : "#232f4a"} />
    <polygon points="96,115 54,146 64,188 106,168" fill={isDark ? "#111626" : "#182034"} />
    <line x1="170" y1="22" x2="122" y2="58" stroke="rgba(192, 132, 252, 0.55)" strokeWidth="1.8" />
    <line x1="122" y1="58" x2="96" y2="115" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.5" />
    <line x1="96" y1="115" x2="54" y2="146" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.2" />
  </svg>
);

// 5. MONUMENTAL ARCHITECTURAL "MOTIONLY" WORDMARK (100% Vector Scalable)
const MonumentalMotionly = ({ isDark }: { isDark: boolean }) => (
  <svg
    viewBox="0 0 1185 240"
    className="w-full h-auto block select-none pointer-events-none"
    style={{ overflow: "visible" }}
  >
    <defs>
      {/* Light View Gradient (Obsidian to Deep Slate) */}
      <linearGradient id="wordmarkLight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="60%" stopColor="#090d1a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      {/* Dark View Gradient (Pure Platinum White with Subtle Horizon Edge) */}
      <linearGradient id="wordmarkDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>

    <g fill={isDark ? "url(#wordmarkDark)" : "url(#wordmarkLight)"}>
      {/* M */}
      <path d="M 20,20 L 64,20 L 95,115 L 126,20 L 170,20 L 170,220 L 134,220 L 134,75 L 105,160 L 85,160 L 56,75 L 56,220 L 20,220 Z" />
      {/* O */}
      <path fillRule="evenodd" d="M 230,20 L 300,20 L 335,55 L 335,185 L 300,220 L 230,220 L 195,185 L 195,55 Z M 250,56 L 231,75 L 231,165 L 250,184 L 280,184 L 299,165 L 299,75 L 280,56 Z" />
      {/* T */}
      <path d="M 375,20 L 480,20 L 480,56 L 438,56 L 438,220 L 402,220 L 402,56 L 360,56 L 360,35 Z" />
      {/* I */}
      <path d="M 505,35 L 520,20 L 550,20 L 550,205 L 535,220 L 505,220 Z" />
      {/* O */}
      <path fillRule="evenodd" d="M 610,20 L 680,20 L 715,55 L 715,185 L 680,220 L 610,220 L 575,185 L 575,55 Z M 630,56 L 611,75 L 611,165 L 630,184 L 660,184 L 679,165 L 679,75 L 660,56 Z" />
      {/* N */}
      <path d="M 740,20 L 776,20 L 834,165 L 834,20 L 870,20 L 870,220 L 834,220 L 776,75 L 776,220 L 740,220 Z" />
      {/* L */}
      <path d="M 895,20 L 931,20 L 931,184 L 1010,184 L 1010,220 L 895,220 Z" />
      {/* Y */}
      <path d="M 1035,20 L 1073,20 L 1100,85 L 1127,20 L 1165,20 L 1118,125 L 1118,220 L 1082,220 L 1082,125 Z" />
    </g>
  </svg>
);

/**
 * -----------------------------------------------------------------------------
 * MAIN ANIMATED FOOTER COMPONENT
 * -----------------------------------------------------------------------------
 */
export const Footer = () => {
  const { settings } = useSiteSettings();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const email = settings.contact.email || "hello@motionly.media";
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Mouse Parallax Engine
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layered Parallax Offsets
  const satParallaxX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const satParallaxY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const rock1ParallaxX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const rock1ParallaxY = useTransform(smoothY, [-0.5, 0.5], [-22, 22]);

  const rock2ParallaxX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const rock2ParallaxY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const prismParallaxX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const prismParallaxY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const wordmarkParallaxX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const pageToggles = settings.global.pageToggles || {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true,
  };

  const navigation = [
    pageToggles.portfolio !== false ? { label: "Work", to: "/portfolio" } : null,
    pageToggles.services !== false ? { label: "Services", to: "/services" } : null,
    { label: "Process", to: "/#process" },
    pageToggles.about !== false ? { label: "About", to: "/about" } : null,
    { label: "Careers", to: "/careers" },
    { label: "Journal", to: "/blog" },
    pageToggles.personalBranding !== false ? { label: "Personal branding", to: "/personal-branding" } : null,
  ].filter(Boolean) as { label: string; to: string }[];

  const social = [
    { label: "Instagram", href: settings.contact.instagram },
    { label: "Facebook", href: settings.contact.facebook },
    { label: "LinkedIn", href: settings.contact.linkedin },
  ].filter((item) => item.href);

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden pt-20 sm:pt-28 pb-0 transition-colors duration-500 ${
        isDark
          ? "bg-[#04060E] text-slate-100"
          : "bg-gradient-to-b from-[#F7F6F3] via-[#F2EFF7] to-[#EBE4F5] text-slate-900"
      }`}
    >
      {/* Atmospheric Twilight Violet/Lilac Horizon Glow (Direct Inspiration from Turion) */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[380px] sm:h-[480px] transition-opacity duration-700 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_50%_100%,rgba(168,85,247,0.3)_0%,rgba(59,130,246,0.18)_45%,transparent_80%)] opacity-95"
            : "bg-[radial-gradient(ellipse_at_50%_100%,rgba(192,132,252,0.45)_0%,rgba(147,197,253,0.3)_50%,transparent_85%)] opacity-85"
        }`}
        aria-hidden="true"
      />

      {/* Top Ambient Subtle Stage Lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      {/* =========================================================================
          1. TOP CENTER CALL-TO-ACTION (Matching Turion's "Ready for your mission")
      ========================================================================= */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-20 mb-16 sm:mb-24">
        {/* Eyebrow Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 mb-6 sm:mb-8 shadow-xs backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span>[ TALK TO US ]</span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.05] mb-8 sm:mb-10 font-sans"
        >
          Ready for your<br className="hidden sm:inline" /> next breakthrough?
        </motion.h2>

        {/* Solid Architectural CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-4 sm:py-4.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-xl shadow-slate-950/20 dark:shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300 active:scale-95"
          >
            <span>Start A Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* =========================================================================
          2. ORGANIZED HORIZONTAL NAVIGATION GRID (Turion Structure + Motionly Content)
      ========================================================================= */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-20 mb-12 sm:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 sm:pb-14 border-b border-slate-300/60 dark:border-white/10">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  SaaS Product Videos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  3D Motion Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  VSL &amp; Commercials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Framework */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Framework
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/#process" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  01 Strategy
                </Link>
              </li>
              <li>
                <Link to="/#process" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  02 Build
                </Link>
              </li>
              <li>
                <Link to="/#process" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  03 Launch
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                  Pricing &amp; Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect & Direct Contact */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/company/motionlymedia/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/motionlymedia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/motionlymedia/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801605049299"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                >
                  WhatsApp: +880 1605049299
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={`mailto:${email}`}
                  className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>{email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal, Credits & Partnership Row (Preserves All Original Details) */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div>
            <p>&copy; {new Date().getFullYear()} MOTIONLY MEDIA. ALL RIGHTS RESERVED.</p>
            <p className="mt-1 text-[11px] font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed &amp; Developed by{" "}
              <a
                href="https://wa.me/8801948303128"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-semibold"
                title="Chat with Abu Bakar Siddique on WhatsApp"
              >
                Abu Bakar Siddique
              </a>{" "}
              &amp;{" "}
              <a
                href="https://kholipha-ahmmad-al-amin.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                Kholipha Ahmmad Al-Amin
              </a>{" "}
              in partnership with{" "}
              <a
                href="https://agency.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                EquiSaaS Agency
              </a>
              , an{" "}
              <a
                href="https://equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                EquiSaaS BD
              </a>{" "}
              company{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://wa.me/8801605049299"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium inline-flex items-center gap-0.5"
                title="Motionly Media Official WhatsApp"
              >
                WhatsApp: +880 1605049299
              </a>{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://www.facebook.com/abubakrsiddiq.founder"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                title="Founder Facebook Profile"
              >
                Founder FB
              </a>{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://www.facebook.com/motionlymedia"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                title="Motionly Media Facebook Page"
              >
                Motionly FB Page
              </a>.
            </p>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-wider shrink-0 font-mono">
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/refund" className="hover:text-slate-900 dark:hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MONUMENTAL "MOTIONLY" DISPLAY WITH SMOOTH FLOATING 3D OBJECTS
      ========================================================================= */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none mt-6 sm:mt-12">
        {/* Parallax Container for the Wordmark and Floating 3D Elements */}
        <motion.div
          style={{ x: wordmarkParallaxX }}
          className="relative w-full max-w-[1400px] mx-auto px-2 sm:px-6"
        >
          {/* Left Corner Craggy Cliff (Framing bottom-left) */}
          <div className="absolute -bottom-2 -left-4 sm:left-0 w-28 sm:w-44 md:w-52 h-36 sm:h-52 z-30 pointer-events-none">
            <LeftCornerCliff isDark={isDark} />
          </div>

          {/* Right Corner Mountain Peak (Framing bottom-right like Turion) */}
          <div className="absolute -bottom-2 -right-4 sm:right-0 w-32 sm:w-48 md:w-60 h-44 sm:h-64 z-30 pointer-events-none">
            <RightCornerMountain isDark={isDark} />
          </div>

          {/* Floating Cinema Satellite (Hovering over M & O) */}
          <motion.div
            style={{ x: satParallaxX, y: satParallaxY }}
            animate={reduceMotion ? {} : {
              y: [-16, 16, -16],
              rotateZ: [-3, 3, -3],
              rotateX: [-5, 5, -5]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[-30px] sm:top-[-45px] md:top-[-60px] left-[10%] sm:left-[14%] w-36 sm:w-56 md:w-64 h-28 sm:h-44 md:h-52 z-40 pointer-events-none"
          >
            <CinematicSatellite isDark={isDark} />
          </motion.div>

          {/* Floating Large Asteroid (Foreground rock floating left of M) */}
          <motion.div
            style={{ x: rock1ParallaxX, y: rock1ParallaxY }}
            animate={reduceMotion ? {} : {
              y: [-20, 15, -20],
              rotateZ: [0, 45, 90, 135, 180, 225, 270, 315, 360]
            }}
            transition={{
              y: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 40, repeat: Infinity, ease: "linear" }
            }}
            className="absolute bottom-6 sm:bottom-12 left-[4%] sm:left-[7%] w-16 sm:w-24 md:w-28 h-14 sm:h-20 md:h-24 z-40 pointer-events-none"
          >
            <FacetedAsteroid variant="large" className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]" />
          </motion.div>

          {/* Floating Medium Asteroid (Drifting over N & L) */}
          <motion.div
            style={{ x: rock2ParallaxX, y: rock2ParallaxY }}
            animate={reduceMotion ? {} : {
              y: [-14, 18, -14],
              rotateZ: [360, 270, 180, 90, 0]
            }}
            transition={{
              y: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 32, repeat: Infinity, ease: "linear" }
            }}
            className="absolute -top-4 sm:-top-8 right-[24%] sm:right-[26%] w-11 sm:w-16 md:w-20 h-10 sm:h-14 md:h-16 z-40 pointer-events-none"
          >
            <FacetedAsteroid variant="medium" className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)]" />
          </motion.div>

          {/* Floating 3D Play Gem (Prism drifting over T & I) */}
          <motion.div
            style={{ x: prismParallaxX, y: prismParallaxY }}
            animate={reduceMotion ? {} : {
              y: [14, -14, 14],
              rotateZ: [-6, 8, -6],
              rotateY: [0, 180, 360]
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-2 sm:top-6 left-[45%] sm:left-[46%] w-10 sm:w-14 md:w-16 h-10 sm:h-14 md:h-16 z-35 pointer-events-none"
          >
            <PrismaticPlayGem />
          </motion.div>

          {/* Small Space Fragment (Drifting near Y) */}
          <motion.div
            animate={reduceMotion ? {} : {
              y: [-10, 12, -10],
              x: [-4, 6, -4]
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-16 sm:bottom-28 right-[10%] sm:right-[12%] w-6 sm:w-10 h-6 sm:h-10 z-35 pointer-events-none"
          >
            <FacetedAsteroid variant="small" className="w-full h-full drop-shadow-md" />
          </motion.div>

          {/* The Giant Vector MOTIONLY Wordmark */}
          <div className="relative z-20 pb-0">
            <MonumentalMotionly isDark={isDark} />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
