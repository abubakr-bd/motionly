import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { useHeroSettings } from "../../lib/useSiteData";

export const HeroStudio: React.FC = () => {
  const heroSettings = useHeroSettings();
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const showreelId = (heroSettings.showreelVideoId || "q7hCvbfvRPU").trim();

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] bg-[#f5f7fa] dark:bg-[#07080d] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Text Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="font-mono text-[#4b5565] dark:text-[#a3a9b8]">
              Independent creative studio
            </span>
            <span className="text-[#6b7487] dark:text-[#7a8296]">•</span>
            <div className="inline-flex items-center gap-1.5 text-[#16a34a] dark:text-[#4cc38a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] dark:bg-[#4cc38a]" />
              <span>Available for select projects</span>
            </div>
          </div>

          {/* Headline (Solid Primary Text, Weight 500, Sentence Case) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.04] mb-5">
            We make ideas move
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed max-w-2xl mb-8">
            From SaaS products to personal brands, we turn complex ideas and ambitious visions into compelling visual experiences through motion design and creative production
          </p>

          {/* Actions: 44px Height, 8px Radius, Sentence Case */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Explore work</span>
              <ArrowDown className="w-4 h-4 text-white/80" />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-lg bg-[#ffffff] dark:bg-[#11141c] hover:bg-[#eceff4] dark:hover:bg-[#1a1e28] text-[#111827] dark:text-[#eef0f5] text-sm font-medium border border-black/[0.08] dark:border-[#eef0f5]/[0.08] transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b7487] dark:text-[#7a8296]" />
            </Link>
          </div>
        </div>

        {/* Hero Showreel Showcase (8:4 Asymmetric Composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Cinematic Video Viewport (8 Cols) */}
          <div
            className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#07080d] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] cursor-pointer group aspect-video sm:aspect-[16/10]"
            onClick={() => setIsPlayingModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsPlayingModal(true)}
            aria-label="Play Motionly 4K creative showreel"
          >
            <img
              src="/hero-thumb.webp"
              alt="Motionly creative studio showreel"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-[#07080d]/40 group-hover:bg-[#07080d]/25 transition-colors duration-150" />

            {/* Top Frame Metadata */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-[#eef0f5]">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#07080d]/80 backdrop-blur-sm border border-white/[0.08] font-mono text-[11px] tabular-nums">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>00:01:48:00</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#07080d]/80 backdrop-blur-sm border border-white/[0.08] font-mono text-[11px] text-[#a3a9b8]">
                4K Master
              </span>
            </div>

            {/* Center Play Button: 52px, Rounded-xl, No Exaggerated Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-md group-hover:bg-[#1d4ed8] transition-colors duration-150">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>

            {/* Bottom Details Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#eef0f5]">
              <div>
                <p className="text-xs font-mono text-[#a3a9b8] mb-0.5">
                  Studio showreel
                </p>
                <p className="text-sm font-medium text-white">
                  SaaS · 3D motion · Commercials · Brand films
                </p>
              </div>
              <span className="text-xs font-mono text-[#7a8296] hidden sm:inline">
                Click to play
              </span>
            </div>
          </div>

          {/* Secondary Column: Production Capabilities (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Capability 1: SaaS Product Animation */}
            <div className="p-6 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[11px] text-[#2563eb] font-medium">
                    01 Capability
                  </span>
                  <span className="font-mono text-[11px] text-[#6b7487] dark:text-[#7a8296]">
                    SaaS
                  </span>
                </div>
                <h2 className="text-base font-medium text-[#111827] dark:text-[#eef0f5] mb-1.5">
                  SaaS product animations
                </h2>
                <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                  Fluid camera transitions and kinetic feature explanations that make complex software workflows immediately clear.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] flex items-center justify-between text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                <span>After Effects &amp; 3D</span>
                <span className="tabular-nums">60 fps</span>
              </div>
            </div>

            {/* Capability 2: Brand & Commercial Storytelling */}
            <div className="p-6 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[11px] text-[#2563eb] font-medium">
                    02 Capability
                  </span>
                  <span className="font-mono text-[11px] text-[#6b7487] dark:text-[#7a8296]">
                    Commercial
                  </span>
                </div>
                <h2 className="text-base font-medium text-[#111827] dark:text-[#eef0f5] mb-1.5">
                  Brand &amp; commercial films
                </h2>
                <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                  High-retention narratives engineered for paid customer acquisition, product launches, and brand positioning.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] flex items-center justify-between text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                <span>Color grading &amp; foley</span>
                <span>Spatial audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showreel Lightbox Player */}
      {isPlayingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07080d]/90 backdrop-blur-md"
          onClick={() => setIsPlayingModal(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/[0.12] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPlayingModal(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-[#11141c]/90 hover:bg-[#1a1e28] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Close showreel"
            >
              <X className="w-4 h-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${showreelId}?autoplay=1&rel=0&modestbranding=1`}
              title="Motionly showreel 4K"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroStudio;
