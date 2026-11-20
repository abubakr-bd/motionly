import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight, ArrowDown, Sparkles, Film, ShieldCheck, Zap } from "lucide-react";
import { useHeroSettings } from "../../lib/useSiteData";

export const HeroStudio: React.FC = () => {
  const heroSettings = useHeroSettings();
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const showreelId = (heroSettings.showreelVideoId || "q7hCvbfvRPU").trim();

  // 3D Perspective Tilt Physics via Framer Motion Springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) =>
      `radial-gradient(circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(56, 189, 248, 0.18) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] transition-colors duration-200 overflow-hidden">
      {/* Subtle ambient lighting grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Editorial Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow & Status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 text-xs mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8]">
              <Sparkles className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
              <span>Creative &amp; Video Marketing Agency</span>
            </span>

            <span className="text-slate-300 dark:text-slate-700">&bull;</span>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dhaka Studio Hub &bull; Worldwide Delivery</span>
            </div>
          </motion.div>

          {/* Headline: User Requested Exact Copy */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.04] mb-6"
          >
            Creative videos. <br />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              Built to move brands.
            </span>
          </motion.h1>

          {/* Subheading: User Requested Exact Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal"
          >
            We combine strategic storytelling, high-end video editing, motion graphics, and creative production to help SaaS companies, founders, creators, and ambitious brands stand out.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all group"
            >
              <span>LET&apos;S WORK TOGETHER</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-900 dark:text-white text-xs sm:text-sm font-bold tracking-wider uppercase border border-black/[0.08] dark:border-white/[0.08] active:scale-[0.98] transition-all"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </a>
          </motion.div>
        </div>

        {/* 3D Interactive Showreel Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto [perspective:1400px]"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsPlayingModal(true)}
            className="relative rounded-3xl overflow-hidden bg-slate-950 border border-black/[0.1] dark:border-white/[0.12] cursor-pointer group shadow-2xl transition-shadow duration-300 aspect-video max-h-[580px]"
          >
            {/* Reactive Specular Glare Layer */}
            <motion.div
              style={{ background: glareBackground }}
              className="absolute inset-0 pointer-events-none z-20 transition-opacity"
            />

            {/* Video Thumbnail */}
            <img
              src="/hero-thumb.webp"
              alt="Motionly Media 4K Creative Showreel"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`;
              }}
            />

            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover:via-black/20 transition-colors duration-300" />

            {/* Top Frame Metadata HUD */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px] tabular-nums">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC &bull; 00:01:48:00</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px] text-cyan-300">
                  4K MASTER &bull; 60 FPS
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px] text-slate-300">
                  ProRes 422HQ
                </span>
              </div>
            </div>

            {/* Center Play Button: Magnetic Pulse Circle */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border border-white/20 group-hover:bg-blue-600 transition-colors"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </motion.div>
            </div>

            {/* Bottom HUD: Live Reel Title */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-white z-10 pointer-events-none">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] mb-1">
                  Motionly 2026 Creative Showreel
                </p>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  SaaS &bull; Motion Graphics &bull; Commercials &bull; Personal Branding
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md font-mono text-xs text-white border border-white/15">
                <span>Click to Play Reel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Floating Metric Badges beneath Showreel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Audience Impact
              </span>
              <strong className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                120M+ Views
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Sprint Delivery
              </span>
              <strong className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                5&ndash;7 Days
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Client Retention
              </span>
              <strong className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                98.6%
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Creative Standard
              </span>
              <strong className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight text-[#2563EB] dark:text-[#38BDF8]">
                Top 1% Motion
              </strong>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live YouTube Theater Modal */}
      <AnimatePresence>
        {isPlayingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Top Modal Controls */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#38BDF8]" />
                  <span className="text-xs sm:text-sm font-semibold">Motionly Creative Studio Showreel</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlayingModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Responsive Video Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${showreelId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Motionly Showreel"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroStudio;
