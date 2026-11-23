import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, X, ArrowUpRight, ArrowDown, Star, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useHeroSettings } from "../../lib/useSiteData";

export const HeroStudio: React.FC = () => {
  const heroSettings = useHeroSettings();
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const showreelId = (heroSettings.showreelVideoId || "q7hCvbfvRPU").trim();

  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const showreelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleLine1Ref.current && titleLine2Ref.current) {
        tl.fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.08 }
        );
      }

      if (descRef.current && ctaRef.current) {
        tl.fromTo(
          [descRef.current, ctaRef.current],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          "-=0.25"
        );
      }

      if (showreelRef.current) {
        tl.fromTo(
          showreelRef.current,
          { y: 24, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] bg-[#070b14] text-[#eef0f5] transition-colors duration-200 overflow-hidden"
    >
      {/* Subtle Glow Lighting inspired by Design Monks */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-emerald-500/10 via-[#315EFA]/10 to-transparent blur-[120px] -z-10" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Editorial Header (Centered Design Monks Composition) */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow: Rating Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9 / 5</span>
            <span className="text-white/20">&bull;</span>
            <span className="text-[#38bdf8] uppercase tracking-wider font-bold">Leading Video &amp; Motion Design Studio</span>
          </div>

          {/* Headline with Masked Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            <span className="block overflow-hidden pb-1">
              <span ref={titleLine1Ref} className="inline-block will-change-transform">
                Creative videos.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span 
                ref={titleLine2Ref} 
                className="inline-block font-serif italic font-normal text-[#38bdf8] will-change-transform"
              >
                Built to move brands.
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p 
            ref={descRef}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-7 font-normal"
          >
            We bring ideas to life through strategic storytelling, exceptional video production and thoughtful creative execution.
          </p>

          {/* Global Reach Pill Badge (Design Monks Style) */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-8">
            <span>Producing for ambitious brands across 10+ countries</span>
            <span>🇺🇸 🇬🇧 🇩🇪 🇨🇦 🇦🇺 🇸🇬 🇦🇪</span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#booking");
              }}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white text-sm font-semibold shadow-lg shadow-[#315EFA]/30 transition-all duration-150 active:scale-[0.97] group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm font-medium border border-white/15 transition-all duration-150 active:scale-[0.97] cursor-pointer"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Featured Video / Multi-Device Showreel Composition */}
        <div ref={showreelRef} className="relative max-w-5xl mx-auto">
          {/* Main 16:9 Showcase Player */}
          <div 
            onClick={() => setIsPlayingModal(true)}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:border-[#38bdf8]/50 transition-all duration-300 cursor-pointer aspect-video w-full"
            role="button"
            tabIndex={0}
            aria-label="Play Motionly studio showreel"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsPlayingModal(true);
              }
            }}
          >
            {/* Showreel Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`}
              alt="Motionly Creative Showreel"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              loading="eager"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/hqdefault.jpg`;
              }}
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />

            {/* Central Play Badge with Subtle Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#315EFA] text-white flex items-center justify-center shadow-xl group-hover:scale-105 active:scale-95 transition-transform duration-200 border-2 border-white/30">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>

            {/* Bottom Metabar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-semibold">Motionly Showreel 2026</span>
                <span className="text-white/40">&bull;</span>
                <span className="text-slate-300">4K Master • 60fps</span>
              </div>
              <span className="text-[#38bdf8] font-medium hidden sm:inline">Click to watch film</span>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isPlayingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-5xl bg-[#0c101d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/10 text-white">
                <span className="text-sm font-medium">Motionly Official Showreel</span>
                <button
                  type="button"
                  onClick={() => setIsPlayingModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
                  aria-label="Close showreel player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${showreelId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Motionly Studio Showreel"
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
