import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProcessStage {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
  visualImage: string;
  visualLabel: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Strategy",
    phase: "Phase 1 • Discovery & Positioning",
    description:
      "Every successful video begins with clear positioning. We audit your audience, existing content, competitor landscape, and core business objective to establish what to say, why it matters, and who needs to hear it.",
    deliverables: [
      "Audience persona & conversion intent analysis",
      "Core narrative positioning & messaging angles",
      "Cold opening hooks & retention benchmark plan",
    ],
    visualImage: "https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg",
    visualLabel: "Strategic Brief & Concept Roadmap",
  },
  {
    number: "02",
    title: "Creative Direction",
    phase: "Phase 2 • Visual Tone & Pacing",
    description:
      "We translate strategy into tangible visual style. We craft video scripts, storyboard visual beats, design style frames, and choose typography, color palettes, and audio directions before production begins.",
    deliverables: [
      "Full script writing & dialogue pacing",
      "Visual moodboards & style frames",
      "Kinetic typography guidelines & art direction",
    ],
    visualImage: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    visualLabel: "Storyboard & Style Architecture",
  },
  {
    number: "03",
    title: "Production",
    phase: "Phase 3 • Asset & Footage Capture",
    description:
      "Whether capturing clean 60fps software UI, recording executive voiceovers, or deploying multi-cam studio cinematography, we gather the high-fidelity raw ingredients needed for exceptional video.",
    deliverables: [
      "High-resolution UI screen motion captures",
      "Studio voiceover & sound recordings",
      "Cinematography & lighting packages (when required)",
    ],
    visualImage: "https://img.youtube.com/vi/0NHfOpolrjs/maxresdefault.jpg",
    visualLabel: "High-Fidelity Footage Capture",
  },
  {
    number: "04",
    title: "Post-production",
    phase: "Phase 4 • Assembly, Motion & Finishing",
    description:
      "Where raw footage turns into art. We sculpt the edit for maximum audience retention, integrate 2D/3D motion graphics, master the audio with custom sound design, and color grade in DaVinci Resolve.",
    deliverables: [
      "High-retention rhythmic timeline editing",
      "2D/3D kinetic animation & UI motion",
      "DaVinci Resolve color grading & spatial sound mix",
    ],
    visualImage: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
    visualLabel: "Precision Timeline & Sound Mix",
  },
  {
    number: "05",
    title: "Delivery",
    phase: "Phase 5 • Refinement & Masters",
    description:
      "We invite your team into Frame.io for timestamped, precise feedback. Once approved, we export master files tailored for every platform, complete with thumbnails, subtitles, and launch assets.",
    deliverables: [
      "Frame.io timestamped collaborative review cycles",
      "Platform-optimized master exports (16:9, 9:16, 1:1)",
      "Full source files & commercial IP rights handover",
    ],
    visualImage: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    visualLabel: "Multi-Platform Master Deliverables",
  },
];

export const StudioProcess: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 01. Masked Header Entrance
      if (!prefersReducedMotion && titleLineRef.current) {
        gsap.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 02. Desktop Horizontal Scroll Track with Pin & Progress
      const isDesktop = window.innerWidth >= 1024;

      if (!prefersReducedMotion && isDesktop && sectionRef.current && trackRef.current) {
        const track = trackRef.current;
        const computeDistance = () => track.scrollWidth - window.innerWidth + 200;

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${computeDistance()}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const stageIdx = Math.min(4, Math.floor(progress * 5));
              setActiveStage(stageIdx);
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${progress * 100}%`;
              }
            },
          },
        });

        scrubTl.to(track, {
          x: () => -(computeDistance()),
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* DESKTOP VIEW: Pinned Horizontal Scrub Experience (lg: >= 1024) */}
      {/* ============================================================== */}
      <div 
        ref={pinWrapperRef}
        className="hidden lg:flex flex-col justify-between h-screen py-10 px-8 max-w-7xl mx-auto w-full relative z-10"
      >
        {/* Top Header & Live Progress Tracker */}
        <div className="flex items-end justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2">
              How We Work
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08]">
              <span className="block overflow-hidden pb-1">
                <span ref={titleLineRef} className="inline-block will-change-transform">
                  A structured workflow for creative clarity.
                </span>
              </span>
            </h2>
          </div>

          {/* Live Progress Bar & Stage Indicator */}
          <div className="flex flex-col items-end gap-2.5 min-w-[280px]">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#315EFA] font-bold">
                Stage {PROCESS_STAGES[activeStage]?.number} of 05
              </span>
              <span className="text-black/20 dark:text-white/20">&bull;</span>
              <span className="text-[#4b5565] dark:text-[#a3a9b8] font-medium">
                {PROCESS_STAGES[activeStage]?.title}
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
              <div 
                ref={progressBarRef}
                className="h-full bg-[#315EFA] transition-all duration-75 origin-left"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Track of Stage Cards */}
        <div className="my-auto overflow-visible py-4">
          <div 
            ref={trackRef}
            className="flex items-stretch gap-8 will-change-transform w-max pr-32"
          >
            {PROCESS_STAGES.map((stage, idx) => {
              const isCurrent = activeStage === idx;

              return (
                <div
                  key={stage.number}
                  className={`w-[520px] rounded-3xl p-8 sm:p-9 border transition-all duration-300 flex flex-col justify-between shadow-md ${
                    isCurrent
                      ? "bg-white dark:bg-[#0c101d] border-[#315EFA]/50 shadow-xl scale-[1.02]"
                      : "bg-white/80 dark:bg-[#0c101d]/75 border-black/[0.08] dark:border-white/[0.08] opacity-85"
                  }`}
                >
                  <div>
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-[#315EFA] px-3 py-1 rounded-full bg-[#315EFA]/10">
                        {stage.phase}
                      </span>
                      <span className="text-3xl font-mono font-bold text-black/20 dark:text-white/20">
                        {stage.number}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-3">
                      {stage.title}
                    </h3>

                    <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                      {stage.description}
                    </p>

                    {/* Image Preview Thumbnail */}
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black mb-6 border border-black/[0.08] dark:border-white/[0.08] shadow-inner">
                      <img
                        src={stage.visualImage}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                        {stage.visualLabel}
                      </div>
                    </div>
                  </div>

                  {/* Core Deliverables */}
                  <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] block mb-2.5">
                      Phase Outputs
                    </span>
                    <ul className="space-y-2 text-xs text-[#374151] dark:text-[#cbd5e1]">
                      {stage.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#315EFA] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between text-xs font-mono text-[#6b7487] dark:text-[#7a8296] pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
          <span>Collaborative milestone checkpoints at every phase</span>
          <span className="flex items-center gap-1.5 text-[#315EFA]">
            <span>Scroll horizontally through our production phases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET VIEW: Vertical Sequential Timeline (< 1024px)  */}
      {/* ============================================================== */}
      <div className="block lg:hidden py-20 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
            How We Work
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-3">
            A structured workflow for creative clarity.
          </h2>
          <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            Our five-step collaborative process keeps production predictable, transparent, and focused on creative excellence.
          </p>
        </div>

        <div className="relative pl-6 border-l-2 border-[#315EFA]/30 space-y-12">
          {PROCESS_STAGES.map((stage) => (
            <div key={stage.number} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#315EFA] border-4 border-white dark:border-[#090b11] shadow-sm" />

              <div className="rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#315EFA]">
                    {stage.phase}
                  </span>
                  <span className="text-sm font-mono font-bold text-black/30 dark:text-white/30">
                    {stage.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-2">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-4">
                  {stage.description}
                </p>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
                  <img
                    src={stage.visualImage}
                    alt={stage.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] font-mono text-white/90">
                    {stage.visualLabel}
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-[#374151] dark:text-[#cbd5e1] pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
                  {stage.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315EFA] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioProcess;
