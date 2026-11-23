import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroSettings } from "../../lib/useSiteData";

export const HeroStudio: React.FC = () => {
  const heroSettings = useHeroSettings();
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const showreelId = (heroSettings.showreelVideoId || "q7hCvbfvRPU").trim();

  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 01. Editorial Typography Mask Reveal
      if (!prefersReducedMotion && titleLine1Ref.current && titleLine2Ref.current) {
        gsap.fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      // 02. Cinematic Hero Video Expansion on Scroll
      if (!prefersReducedMotion && sectionRef.current && videoCardRef.current && textContainerRef.current) {
        const isDesktop = window.innerWidth >= 768;

        if (isDesktop) {
          const expandTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom 70%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // Text softly recedes as user scrolls toward the showreel
          expandTl.to(
            textContainerRef.current,
            {
              y: -35,
              opacity: 0.25,
              ease: "power2.out",
            },
            0
          );

          // Video smoothly expands horizontally, corner radius refines
          expandTl.fromTo(
            videoCardRef.current,
            {
              scale: 0.94,
              borderRadius: "28px",
            },
            {
              scale: 1.05,
              borderRadius: "16px",
              ease: "power2.out",
            },
            0
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-24 sm:pt-32 pb-20 sm:pb-32 border-b border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] transition-colors duration-200 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Editorial Header */}
        <div ref={textContainerRef} className="max-w-3xl mb-12 sm:mb-16 will-change-transform">
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[#4b5565] dark:text-[#a3a9b8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#315EFA]" />
            <span className="uppercase tracking-wider">Creative Video &amp; Content Studio</span>
            <span className="text-black/20 dark:text-white/20">&bull;</span>
            <span>Available for select projects</span>
          </div>

          {/* Headline with Masked Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.06] mb-6">
            <span className="block overflow-hidden pb-1">
              <span ref={titleLine1Ref} className="inline-block will-change-transform">
                Creative videos.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span 
                ref={titleLine2Ref} 
                className="inline-block font-serif italic font-normal text-[#315EFA] will-change-transform"
              >
                Built to move brands.
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed max-w-2xl mb-8 font-normal">
            Motionly helps SaaS companies, founders, creators, and ambitious businesses turn complex ideas into compelling visual experiences through strategic video production, motion design, and creative storytelling.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[#315EFA] hover:bg-[#254cd4] text-white text-sm font-medium shadow-sm active:scale-[0.98] transition-all group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#111827] dark:text-[#eef0f5] text-sm font-medium border border-black/[0.08] dark:border-white/[0.08] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4 text-[#4b5565] dark:text-[#a3a9b8]" />
            </a>
          </div>
        </div>

        {/* Featured Video / Showreel Viewport (Scroll Expansion Target) */}
        <div ref={videoWrapperRef} className="relative max-w-5xl mx-auto">
          <div
            ref={videoCardRef}
            onClick={() => setIsPlayingModal(true)}
            className="relative overflow-hidden bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] cursor-pointer group shadow-xl hover:shadow-2xl transition-shadow duration-300 aspect-video max-h-[580px] will-change-transform"
            style={{ borderRadius: "24px" }}
            role="button"
            tabIndex={0}
            aria-label="Play Motionly Studio Showreel"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsPlayingModal(true);
              }
            }}
          >
            {/* Video Thumbnail */}
            <img
              src="/hero-thumb.webp"
              alt="Motionly Creative Studio Showreel"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`;
              }}
            />

            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 group-hover:via-black/10 transition-colors duration-300" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#315EFA] text-white flex items-center justify-center shadow-lg group-hover:scale-108 group-hover:bg-[#254cd4] transition-all duration-200">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
            </div>

            {/* Bottom Details */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-white z-10 pointer-events-none">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#93c5fd] block mb-1">
                  Featured Showreel
                </span>
                <h3 className="text-base sm:text-xl font-medium tracking-tight text-white">
                  Motionly Studio Reel &bull; Selected Works
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md font-mono text-xs text-white border border-white/15">
                <span>Play reel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Footnote */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#6b7487] dark:text-[#7a8296] px-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>Full-pipeline video production, motion design &amp; editing</span>
            </div>
            <div className="hidden sm:block">
              Average kickoff &lt; 5 business days
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Theater Modal */}
      <AnimatePresence>
        {isPlayingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0c101d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10 text-white">
                <span className="text-xs sm:text-sm font-medium">Motionly Creative Studio Showreel</span>
                <button
                  type="button"
                  onClick={() => setIsPlayingModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed */}
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
