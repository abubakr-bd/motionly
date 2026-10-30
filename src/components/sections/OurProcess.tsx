import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings, DEFAULT_PROCESS } from "../../lib/useSiteData";
import {
  Rocket,
  Search,
  Wand2,
  Play,
  X,
  Eye,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Sliders,
  Layers,
  ArrowRight
} from "lucide-react";

export const OurProcess = () => {
  const { settings } = useSiteSettings();
  const [activeStepIndex, setActiveStepIndex] = useState(0); // 01 Strategy by default
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const cmsSteps = settings.process.steps || [];
  const steps = cmsSteps && cmsSteps.length > 0 ? cmsSteps : DEFAULT_PROCESS.steps;

  const rawProcessVideoId = (settings.hero?.showreelVideoId || "q7hCvbfvRPU").trim();
  const pMatch = rawProcessVideoId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  const processVideoId = pMatch ? pMatch[1] : (rawProcessVideoId || "q7hCvbfvRPU");
  const stepIcons = [Search, Wand2, Rocket, Sparkles, TrendingUp, Layers, Sliders];

  return (
    <section
      id="process"
      className="py-20 sm:py-28 md:py-32 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
      aria-label="Our Process"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-blue-500/10 via-sky-400/5 to-transparent dark:from-blue-600/15 dark:via-indigo-600/5 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* =========================================================================
            TOP 3D FLOATING ROCKET BADGE (Matches Image 2)
        ========================================================================= */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            {/* Ambient Radial Halo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/25 via-indigo-500/30 to-sky-400/25 rounded-3xl blur-xl animate-pulse" />
            
            {/* Floating 3D Badge */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-blue-500 via-indigo-600 to-blue-700 dark:to-[#0A1024] p-0.5 shadow-2xl shadow-blue-500/25 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#070B18]/90 flex items-center justify-center relative overflow-hidden transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-400/20" />
                <Rocket className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 dark:text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] transform -rotate-12 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            HEADER & SUBTITLE
        ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white mb-3 leading-[1.08]"
          >
            {settings.process.title || "The Motionly Framework."}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium"
          >
            {settings.process.subtitle || "A simple 3 step framework we follow in every video."}
          </motion.p>
        </div>

        {/* =========================================================================
            'WATCH PROCESS IN DETAIL' PILL BUTTON
        ========================================================================= */}
        <div className="flex justify-center mb-14 sm:mb-20">
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onClick={() => setIsVideoModalOpen(true)}
            className="group inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md shadow-slate-200/50 dark:bg-[#090D1A] dark:hover:bg-[#0E1528] dark:border-white/10 dark:hover:border-blue-500/40 dark:shadow-none transition-all cursor-pointer"
          >
            {/* Small Video Thumbnail with Play Button */}
            <div className="w-7 h-5 rounded-md overflow-hidden bg-slate-900 relative flex items-center justify-center shrink-0">
              <img
                src={`https://img.youtube.com/vi/${processVideoId}/hqdefault.jpg`}
                alt="Process preview"
                className="w-full h-full object-cover opacity-80"
              />
              <Play className="w-2.5 h-2.5 text-white absolute fill-current" />
            </div>

            {/* Glowing Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />

            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
              Watch Process In detail
            </span>

            <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
          </motion.button>
        </div>

        {/* =========================================================================
            2-COLUMN FRAMEWORK (Left: 3 Steps, Right: Volumetric Visual Card)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: 3 Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const Icon = stepIcons[idx % stepIcons.length] || Search;
              const stepNumber = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={step.id || idx}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setActiveStepIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStepIndex(idx);
                    }
                  }}
                  className={`group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-left ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-50/90 via-sky-50/50 to-white border-blue-400/90 shadow-lg shadow-blue-500/10 dark:bg-gradient-to-r dark:from-blue-950/40 dark:via-[#090F20] dark:to-[#070A16] dark:border-blue-500/50 dark:shadow-[0_0_30px_rgba(37,99,235,0.22)]"
                      : "bg-white/80 hover:bg-slate-50/90 border-slate-200/80 dark:bg-[#090D1A]/70 dark:hover:bg-[#0B1122]/90 dark:border-white/10"
                  }`}
                >
                  {/* Left Active Glow Notch */}
                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-blue-600 dark:bg-cyan-400 rounded-r-full shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon Square */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 dark:bg-blue-600 dark:text-white"
                          : "bg-slate-100 text-slate-600 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-300 dark:bg-white/[0.04] dark:text-slate-400 dark:border-white/10 dark:group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Step Number + Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                          ■ {stepNumber}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300 transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      {/* Step Description */}
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                        isSelected
                          ? "text-slate-800 dark:text-slate-200 font-medium"
                          : "text-slate-600 dark:text-slate-300 font-normal line-clamp-2"
                      }`}>
                        {step.description}
                      </p>

                      {/* Active State Pill Tags */}
                      {isSelected && step.tags && step.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-blue-100 dark:border-white/10">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold text-blue-700 bg-white border border-blue-200/90 dark:text-slate-300 dark:bg-white/[0.05] dark:border-white/10 px-2 py-0.5 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Volumetric Visual Card (Matches Image 2 exactly!) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-br from-white via-blue-50/80 to-blue-100/60 border border-blue-200/90 shadow-2xl shadow-blue-500/10 dark:from-[#090E1E] dark:via-[#070B16] dark:to-[#04060E] dark:border-blue-500/30 dark:shadow-[0_0_60px_rgba(37,99,235,0.22)] p-6 sm:p-10 flex items-center justify-center transition-colors">
              
              {/* Radial Center Light */}
              <div 
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.18)_0%,transparent_70%)]" 
                aria-hidden="true" 
              />

              <AnimatePresence mode="wait">
                {activeStepIndex === 0 && (
                  /* =========================================================================
                     STEP 1 VISUAL: SPOTLIGHT & FOCUS EYE ICON (Matches Image 2!)
                  ========================================================================= */
                  <motion.div
                    key="step-0-volumetric"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full h-full flex flex-col items-center justify-center z-10 select-none"
                  >
                    {/* Top Ceiling Fixture / Lamp */}
                    <div className="absolute top-2 w-20 h-7 rounded-b-2xl bg-gradient-to-b from-blue-700 via-indigo-800 to-blue-900 border-x border-b border-blue-400/40 shadow-lg flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#38BDF8]" />
                    </div>

                    {/* Volumetric Downward Light Cone */}
                    <div
                      className="absolute top-8 w-48 sm:w-64 h-56 sm:h-64 pointer-events-none opacity-85"
                      style={{
                        clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)",
                        background:
                          "linear-gradient(to bottom, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.2) 60%, rgba(37, 99, 235, 0) 100%)",
                      }}
                    />

                    {/* Lateral Measurement Guide Lines (Matches Image 2: --•) */}
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                      {/* Left Guides */}
                      <div className="flex flex-col gap-8 opacity-60">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-px bg-blue-400/50" />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-px bg-blue-400/50" />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />
                        </div>
                      </div>

                      {/* Right Guides */}
                      <div className="flex flex-col gap-8 opacity-60">
                        <div className="flex items-center gap-2 flex-row-reverse">
                          <div className="w-12 h-px bg-blue-400/50" />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />
                        </div>
                        <div className="flex items-center gap-2 flex-row-reverse">
                          <div className="w-16 h-px bg-blue-400/50" />
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />
                        </div>
                      </div>
                    </div>

                    {/* Center App Icon (Eye Focus Tile) */}
                    <div className="relative mt-12">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-[#0E1528] dark:via-[#0A1020] dark:to-[#060A14] border-2 border-blue-400/60 shadow-[0_0_35px_rgba(59,130,246,0.35)] flex items-center justify-center group">
                        <Eye className="w-10 h-10 sm:w-11 sm:h-11 text-blue-600 dark:text-cyan-300 drop-shadow-[0_0_12px_#38BDF8]" />
                      </div>
                      
                      {/* Ground Reflected Light Ring */}
                      <div className="w-28 h-6 bg-cyan-400/25 rounded-full blur-md mx-auto -mt-2" />
                    </div>

                    {/* Bottom Status Caption */}
                    <div className="mt-6 text-center">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-slate-800 dark:text-slate-200 uppercase block">
                        AUDIENCE ATTENTION ENGINE // STRATEGY
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                        First 3-Second Retention Target: 85%+
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeStepIndex === 1 && (
                  /* =========================================================================
                     STEP 2 VISUAL: BUILD & PRECISION TIMELINE
                  ========================================================================= */
                  <motion.div
                    key="step-1-build"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full h-full flex flex-col justify-center gap-3.5 z-10 max-w-md mx-auto select-none"
                  >
                    <div className="text-center mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-bold block">
                        PRECISION NLE PRODUCTION
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Multi-Track Sprints &amp; Motion Polish
                      </span>
                    </div>

                    {/* Track 1: Video Track */}
                    <div className="p-3.5 rounded-xl bg-white border border-blue-200 shadow-sm dark:bg-blue-950/40 dark:border-blue-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Track 01: 3D Camera &amp; UI Motion</span>
                      </div>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-300 font-bold">60 FPS</span>
                    </div>

                    {/* Track 2: Typography & Kinetic Cut */}
                    <div className="p-3.5 rounded-xl bg-white border border-indigo-200 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Track 02: Kinetic Captions &amp; Hooks</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-300 font-bold">Word Sync</span>
                    </div>

                    {/* Track 3: Spatial Audio Waveform */}
                    <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-sm dark:bg-sky-950/40 dark:border-sky-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Track 03: Spatial Foley &amp; Side-chain</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-300 font-bold">48kHz Master</span>
                    </div>
                  </motion.div>
                )}

                {activeStepIndex === 2 && (
                  /* =========================================================================
                     STEP 3 VISUAL: LAUNCH & ACCELERATION
                  ========================================================================= */
                  <motion.div
                    key="step-2-launch"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full h-full flex flex-col items-center justify-center text-center z-10 select-none"
                  >
                    {/* Launch Target Rings */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-blue-500/30 flex items-center justify-center animate-[spin_24s_linear_infinite]">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center" />
                      <div className="absolute top-0 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#38BDF8]" />
                    </div>

                    {/* Center Icon */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-3">
                        <Rocket className="w-8 h-8 text-white -rotate-12" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                        2-WEEK TURNAROUND
                      </span>
                      <span className="text-xs text-blue-600 dark:text-cyan-400 font-bold mt-0.5">
                        Multi-Platform Distribution Ready
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          YOUTUBE VIDEO MODAL PLAYER
      ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Motionly Framework Video Breakdown
                </span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${processVideoId}?autoplay=1&rel=0`}
                  title="Motionly Process Video"
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

export default OurProcess;
