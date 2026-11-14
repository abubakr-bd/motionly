import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export const FinalStudioCTA: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-[#0a0e1a] text-white overflow-hidden border-t border-slate-800">
      {/* Background Architectural Accent Lines (Subtle Editorial Grid) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 border-x border-slate-700/40">
          <div className="hidden sm:block border-r border-slate-700/30" />
          <div className="border-r border-slate-700/30" />
          <div className="hidden lg:block border-r border-slate-700/30" />
          <div className="border-r border-slate-700/30" />
          <div className="border-r border-slate-700/30" />
          <div className="hidden lg:block border-r border-slate-700/30" />
        </div>
      </div>

      {/* Ambient Radial Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Editorial Text & Action Column (7 Cols) */}
          <div className="lg:col-span-7 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>HAVE SOMETHING IN MIND?</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Let's Make Something{" "}
              <span className="font-serif italic font-normal text-blue-400 block sm:inline">
                Worth Remembering.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              Have a product to launch, a story to tell, or an idea that needs the right creative direction? We'd love to hear about it.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 shadow-xl shadow-blue-600/25 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="mailto:hello@motionly.media"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 transition-all duration-200 backdrop-blur"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Talk to Our Team</span>
              </a>
            </div>

            {/* Status Indicator & Contact Meta */}
            <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Currently booking select projects</span>
              </div>
              <span className="hidden sm:inline text-slate-700">•</span>
              <div>
                Direct: <span className="text-slate-200 font-mono">hello@motionly.media</span>
              </div>
            </div>
          </div>

          {/* Real Studio Visual Material (5 Cols - Offset Cinematic Project Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Layer 1: Frame Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 to-indigo-600/20 blur-xl opacity-70" />

              {/* Layer 2: Main Featured Project Still (Bolto 3D / Showreel preview) */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src="https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg"
                    alt="Motionly Studio Reel & Creative Work Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Stamp Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wider uppercase bg-blue-600/90 text-white">
                      STUDIO REEL
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur border border-slate-700/50">
                      4K UHD
                    </span>
                  </div>
                </div>

                {/* Studio Footer Card Info */}
                <div className="p-6 bg-slate-900/95 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>MOTIONLY CREATIVE STUDIO</span>
                    <span>GLOBAL DELIVERY</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    End-to-End Creative Direction · 3D Motion · Commercial Storytelling
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                    <span>Average kickoff: &lt; 5 business days</span>
                    <Link
                      to="/contact"
                      className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Offset secondary card for asymmetric editorial depth */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-slate-950/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur max-w-xs">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Deliverables
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  Explainer Videos · 3D Animations · Short-Form Strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
