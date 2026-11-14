import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "./content";
import { 
  ArrowUpRight, 
  Play, 
  Sparkles, 
  Volume2, 
  Sliders, 
  Share2, 
  ThumbsUp, 
  MessageSquare, 
  Eye, 
  CheckCircle2,
  Film,
  Layers
} from "lucide-react";

export const PBHero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#05070F] text-white">
      {/* Background Cinematic Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[150px] -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Copy & Headline */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>{HERO_CONTENT.eyebrow}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6"
          >
            {HERO_CONTENT.headlineLine1} <br />
            {HERO_CONTENT.headlineLine2} <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200 drop-shadow-sm">
              {HERO_CONTENT.headlineLine3}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto mb-8"
          >
            {HERO_CONTENT.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5"
          >
            <Link
              to={HERO_CONTENT.primaryCtaLink}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-blue-400/30 group"
            >
              <span>{HERO_CONTENT.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href={HERO_CONTENT.secondaryCtaLink}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white font-bold text-sm tracking-wider uppercase border border-white/10 hover:border-blue-400/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>{HERO_CONTENT.secondaryCtaText}</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm text-slate-400 font-medium"
          >
            {HERO_CONTENT.subText}
          </motion.p>
        </div>

        {/* VISUAL COMPOSITION: Personal Brand Content Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Outer editorial frame */}
          <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-[#0A0F24]/90 border border-slate-700/60 p-4 sm:p-7 lg:p-9 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(37,99,235,0.15)] backdrop-blur-2xl">
            {/* Top Workspace Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
                  motionly-creative-suite // founder_ecosystem_pipeline.active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sprint In Production
                </span>
                <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
                  Turnaround: 48h
                </span>
              </div>
            </div>

            {/* Ecosystem Grid: Video Timeline + Multi-Platform Outputs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT 7 COLS: NLE Video Editing Timeline & Studio Preview */}
              <div className="lg:col-span-7 space-y-4">
                {/* Video Monitor Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 aspect-video shadow-inner group">
                  <img
                    src="/employes/abu_bakar.webp"
                    alt="Founder recording session preview"
                    className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                  
                  {/* Monitor Overlays */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-red-600/90 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                      REC 4K
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 text-slate-200 font-mono text-[10px]">
                      24.00 FPS • Prores 422
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-600/80 text-white font-mono text-[10px] font-semibold">
                      Rec.709 Color Graded
                    </span>
                  </div>

                  {/* Captions Overlay Preview */}
                  <div className="absolute bottom-12 left-0 right-0 px-6 text-center">
                    <span className="inline-block px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg">
                      &ldquo;You don&apos;t need 10 hours a week to share your expertise.&rdquo;
                    </span>
                  </div>

                  {/* Playhead Timecode Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                      <span>00:03:42:18</span>
                    </div>
                    <span className="text-slate-400">Master Sequence 01</span>
                  </div>
                </div>

                {/* Professional Video Editing Timeline Tracks */}
                <div className="rounded-2xl bg-[#070B18] border border-white/10 p-3.5 space-y-2 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Film className="w-3 h-3 text-blue-400" />
                      Timeline / Edit Sequence
                    </span>
                    <span className="text-blue-400">Snap On • 100% Zoom</span>
                  </div>

                  {/* V2 Motion Graphics Track */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 text-purple-400 font-bold shrink-0">V2</span>
                    <div className="flex-1 h-6 rounded-md bg-purple-950/40 border border-purple-500/30 flex items-center px-2 text-purple-300 truncate">
                      [Motion Graphic: Custom Animated Lower Third]
                    </div>
                  </div>

                  {/* V1 Main A-Roll Track */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 text-blue-400 font-bold shrink-0">V1</span>
                    <div className="flex-1 h-6 rounded-md bg-blue-950/50 border border-blue-500/40 flex items-center px-2 text-blue-200 truncate relative overflow-hidden">
                      [A-Roll: 4K_Founder_Insight_Cut02.mov]
                      <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                    </div>
                  </div>

                  {/* A1 Studio Mic Noise Reduced */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 text-emerald-400 font-bold shrink-0">A1</span>
                    <div className="flex-1 h-6 rounded-md bg-emerald-950/40 border border-emerald-500/30 flex items-center px-2 text-emerald-300 truncate">
                      <Volume2 className="w-3 h-3 mr-1 inline shrink-0" />
                      [Studio Mic: Clarity &amp; Noise Reduced EQ]
                    </div>
                  </div>

                  {/* A2 Ambient Sound Design */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 text-cyan-400 font-bold shrink-0">A2</span>
                    <div className="flex-1 h-6 rounded-md bg-cyan-950/30 border border-cyan-500/25 flex items-center px-2 text-cyan-300 truncate">
                      [Sound Design: Sub Bass Whoosh + Subtle Ambient]
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT 5 COLS: Social Media Previews & Multi-Platform Mockups */}
              <div className="lg:col-span-5 space-y-4">
                {/* LinkedIn Founder Post Mockup */}
                <div className="rounded-2xl bg-[#0D132D] border border-white/10 p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/employes/abu_bakar.webp"
                        alt="Author"
                        className="w-9 h-9 rounded-full object-cover border border-blue-400/40"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">Founder Insight</span>
                          <span className="text-[10px] text-blue-400 font-semibold">• 1st</span>
                        </div>
                        <p className="text-[10px] text-slate-400">CEO &amp; Tech Operator • 2h</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      LinkedIn
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    The biggest friction for leaders isn&apos;t having insights — it&apos;s having a repeatable creative engine to package them cleanly.
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-blue-400">
                      <ThumbsUp className="w-3 h-3" /> 384
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> 52 comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" /> 28 reposts
                    </span>
                  </div>
                </div>

                {/* Split Row: YouTube Thumbnail + Short-Form Preview */}
                <div className="grid grid-cols-2 gap-3">
                  {/* YouTube Thumbnail Preview */}
                  <div className="rounded-xl bg-[#090D20] border border-white/10 p-2.5 flex flex-col justify-between">
                    <div className="relative rounded-lg overflow-hidden aspect-video bg-slate-900 mb-2 border border-white/5">
                      <img
                        src="/employes/nazmul.webp"
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                        <span className="text-[9px] font-black uppercase text-amber-300 tracking-wider">
                          How We Scale
                        </span>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono text-white">
                        12:45
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white line-clamp-1">
                        Executive Guide 2026
                      </p>
                      <p className="text-[9px] text-slate-400">YouTube Long-Form</p>
                    </div>
                  </div>

                  {/* Instagram / TikTok Short-Form Reel Preview */}
                  <div className="rounded-xl bg-[#090D20] border border-white/10 p-2.5 flex flex-col justify-between">
                    <div className="relative rounded-lg overflow-hidden aspect-[9/12] bg-slate-900 mb-2 border border-white/5">
                      <img
                        src="/employes/wasif.webp"
                        alt="Reel preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-2 flex flex-col justify-between">
                        <span className="self-end px-1.5 py-0.5 rounded bg-pink-600/80 text-[8px] font-bold text-white">
                          Reels
                        </span>
                        <div>
                          <p className="text-[9px] font-black text-white leading-tight">
                            HOOK: 3 Systems To Build Authority
                          </p>
                          <span className="text-[8px] text-blue-300 font-mono mt-1 block">
                            ▶ 46.2K views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white line-clamp-1">
                        Short-Form Video
                      </p>
                      <p className="text-[9px] text-slate-400">9:16 Retention Cut</p>
                    </div>
                  </div>
                </div>

                {/* Deliverables Assurance Strip */}
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    Multi-Platform Formatting
                  </span>
                  <span className="text-slate-400">IG • YT • LinkedIn • TikTok</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PBHero;