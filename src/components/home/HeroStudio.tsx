import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight, ArrowDown, Film, Sparkles, Volume2 } from "lucide-react";
import { useHeroSettings } from "../../lib/useSiteData";

export const HeroStudio: React.FC = () => {
  const heroSettings = useHeroSettings();
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const showreelId = (heroSettings.showreelVideoId || "q7hCvbfvRPU").trim();

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 overflow-hidden bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-[150px] -z-10" 
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial Header Block */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Eyebrow & Live Studio Availability */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>Independent Creative Video &amp; Content Studio</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for select projects</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.02] mb-6">
            We Make Ideas <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300">
              Move.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            From SaaS products to personal brands, we turn complex ideas and ambitious visions into compelling visual experiences.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-white/10 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* HERO SHOWREEL VISUAL: Asymmetric Editorial Composition */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Primary Cinematic Showreel Player (8 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 shadow-2xl group cursor-pointer aspect-video sm:aspect-[16/10]"
              onClick={() => setIsPlayingModal(true)}
            >
              {/* Showreel Preview Image */}
              <img
                src="/hero-thumb.webp"
                alt="Motionly Media Creative Showreel 4K"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 transition-opacity duration-300 group-hover:opacity-75" />

              {/* Top Meta Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider">
                  <Film className="w-3 h-3 text-blue-400" />
                  Motionly Showreel // 2025—2026
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-blue-600/90 text-[10px] font-mono font-bold tracking-wider uppercase text-white">
                  4K Master
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/50 group-hover:scale-110 transition-transform duration-300 border border-blue-400/30">
                  <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Details Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-0.5">
                    Selected Works Montage
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white">
                    SaaS • 3D Motion • Commercials • Brand Films
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                  Click to Play Reel
                </span>
              </div>
            </motion.div>

            {/* Secondary Editorial Column: Production Specs & Project Snapshots (4 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col justify-between gap-4"
            >
              {/* Snapshot 1: SaaS Product Animation */}
              <div className="p-5 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-xs flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold uppercase text-[11px]">
                      01 / CAPABILITY
                    </span>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold">SaaS</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1.5">
                    SaaS Product Animations
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Fluid UI camera transitions and kinetic feature explanations that make digital products intuitive.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>After Effects &amp; Cinema 4D</span>
                  <span>4K 60fps</span>
                </div>
              </div>

              {/* Snapshot 2: 3D Motion Graphics & Brand Stories */}
              <div className="p-5 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-xs flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[11px]">
                      02 / CAPABILITY
                    </span>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold">Motion</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1.5">
                    Brand &amp; Commercial Storytelling
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    High-retention narratives engineered for paid customer acquisition and memorable brand recall.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Color Grading &amp; Sound Design</span>
                  <span>Spatial Audio</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Video Player for Showreel */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsPlayingModal(false)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsPlayingModal(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close showreel player"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${showreelId}?autoplay=1&rel=0&modestbranding=1`}
                title="Motionly Showreel 4K"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroStudio;