import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Video, Layers, TrendingUp, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CapabilityService {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
  formatBadge: string;
  icon: React.ElementType;
  contactParam: string;
}

const CAPABILITIES: CapabilityService[] = [
  {
    id: "video-production",
    number: "01",
    badge: "Core Discipline",
    title: "Video Production & Editing",
    tagline: "Cinematic commercial brand films, interview documentaries, and high-retention video stories.",
    description:
      "Turn raw recordings, customer interviews, and brand footage into cohesive, high-retention video stories. We handle narrative structure, precision pacing, DaVinci Resolve color grading, custom sound design, and broadcast audio mastering so your content feels cinematic and authoritative.",
    deliverables: [
      "Commercial & brand films",
      "High-retention rhythmic video editing",
      "Studio & on-location production",
      "DaVinci Resolve color grading",
      "Custom sound design & mixing",
      "Frame.io rapid revision workflow",
    ],
    image: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    formatBadge: "Cinematic 4K Master • ProRes 422HQ",
    icon: Video,
    contactParam: "video-production",
  },
  {
    id: "motion-graphics",
    number: "02",
    badge: "Design & Motion",
    title: "Motion Graphics & Animation",
    tagline: "Kinetic typography, 2D UI motion captures, 3D product breakdowns, and animated explainers.",
    description:
      "Make complex software and abstract technical concepts instantly clear. We create kinetic typography, vector-perfect 2D UI animations, 3D product disassemblies, and animated product explainers that communicate what words alone cannot.",
    deliverables: [
      "SaaS product explainers & UI animation",
      "3D product breakdown & visualization",
      "Kinetic brand typography & lower thirds",
      "Feature walkthrough micro-animations",
      "Multi-platform aspect ratios (16:9, 9:16)",
      "Full source file handover",
    ],
    image: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    formatBadge: "2D/3D Kinetic Motion • 60fps Vector",
    icon: Layers,
    contactParam: "motion-graphics",
  },
  {
    id: "video-marketing",
    number: "03",
    badge: "Distribution & Growth",
    title: "Video Marketing & Strategy",
    tagline: "Full-funnel video content architecture, high-CTR packaging, and social repurposing.",
    description:
      "Video without distribution is an expense. We develop content frameworks, optimize video hooks for peak watch time, design high-CTR thumbnails, and repurpose long-form recordings into viral social assets across YouTube, LinkedIn, X, and TikTok.",
    deliverables: [
      "Full-funnel video content architecture",
      "YouTube long-form & channel strategy",
      "Shorts, Reels & TikTok repurposing engine",
      "CTR-optimized thumbnail design",
      "Retention-focused script frameworks",
      "Multi-platform distribution playbooks",
    ],
    image: "https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg",
    formatBadge: "Strategic Content Engine • Growth Pipeline",
    icon: TrendingUp,
    contactParam: "video-marketing",
  },
];

export const CreativeCapabilities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = CAPABILITIES[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="capabilities" 
      className="py-24 sm:py-32 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-3">
            <span className="block overflow-hidden pb-1">
              <span ref={titleLineRef} className="inline-block will-change-transform">
                Creative execution across every stage.
              </span>
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            Three interconnected disciplines that form an end-to-end video engine for ambitious businesses, founders, and products.
          </p>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Interactive Service List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            {CAPABILITIES.map((service, index) => {
              const isActive = activeIndex === index;
              const IconComp = service.icon;

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? "bg-[#f8f9fa] dark:bg-[#0c101d] border-[#315EFA]/50 shadow-md scale-[1.01]"
                      : "bg-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border-black/[0.08] dark:border-white/[0.08] opacity-80 hover:opacity-100"
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Active Indicator Accent Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-capability-pill"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#315EFA]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-mono text-xs font-semibold ${isActive ? "text-[#315EFA]" : "text-[#6b7487] dark:text-[#7a8296]"}`}>
                        {service.number}
                      </span>
                      <span className="text-black/20 dark:text-white/20">&bull;</span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296]">
                        {service.badge}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive 
                        ? "bg-[#315EFA] text-white" 
                        : "bg-black/[0.04] dark:bg-white/[0.05] text-[#6b7487] dark:text-[#7a8296] group-hover:text-[#111827] dark:group-hover:text-[#eef0f5]"
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors mb-2 ${
                    isActive ? "text-[#111827] dark:text-[#eef0f5]" : "text-[#4b5565] dark:text-[#a3a9b8]"
                  }`}>
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed line-clamp-2">
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Large Dynamic Visual Preview Card (7 cols, sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="rounded-2xl sm:rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Visual Showcase Thumbnail */}
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-black mb-6 border border-black/[0.08] dark:border-white/[0.1] shadow-inner group">
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                        <span className="font-medium text-slate-200">{activeService.formatBadge}</span>
                        <span className="text-[#315EFA] font-bold">4K Cinema Ready</span>
                      </div>
                    </div>

                    {/* Service Detailed Overview */}
                    <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-3">
                      {activeService.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                      {activeService.description}
                    </p>

                    {/* Deliverables Checklist Tags */}
                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] block mb-3">
                        Key Deliverables &amp; Formats
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeService.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                            <CheckCircle2 className="w-4 h-4 text-[#315EFA] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Link CTA */}
                  <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                      Fast 24-48h sprint turnaround
                    </span>
                    <Link
                      to={`/contact?service=${activeService.contactParam}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#315EFA] hover:bg-[#254cd4] text-white text-xs sm:text-sm font-medium transition-colors shadow-sm group cursor-pointer"
                    >
                      <span>Discuss Project Scope</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeCapabilities;
