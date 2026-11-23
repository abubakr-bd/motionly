import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const current = PROCESS_STAGES[activeStage];

  return (
    <section 
      id="process" 
      className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-3">
            A Structured Workflow <br />
            <span className="font-serif italic font-normal text-[#315EFA]">
              Designed for Clarity.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            A collaborative five-step creative process that keeps production predictable, transparent, and focused on exceptional video craft.
          </p>
        </div>

        {/* Interactive Phase Selector Pills (Snappy, No Scroll Hijacking!) */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            {PROCESS_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-[#315EFA] text-white shadow-md shadow-[#315EFA]/25"
                      : "bg-[#f8f9fa] dark:bg-[#0c101d] text-[#4b5565] dark:text-[#a3a9b8] hover:text-[#111827] dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]"
                  }`}
                >
                  <span className={`font-mono text-xs ${isActive ? "text-white" : "text-[#315EFA]"}`}>
                    {stage.number}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Content Card with Snappy Transition (under 250ms ease-out) */}
        <div className="rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Stage Details (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold text-[#315EFA] px-3 py-1 rounded-full bg-[#315EFA]/10">
                      {current.phase}
                    </span>
                    <span className="text-black/20 dark:text-white/20">&bull;</span>
                    <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                      Step {current.number} of 05
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-4">
                    {current.title}
                  </h3>

                  <p className="text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                    {current.description}
                  </p>

                  {/* Core Deliverables Output */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] block mb-2">
                      Key Phase Outputs
                    </span>
                    {current.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                        <CheckCircle2 className="w-4 h-4 text-[#315EFA] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                  <span>Frame.io timestamped review milestones</span>
                  <span className="text-[#315EFA] font-medium flex items-center gap-1">
                    <span>Collaborative iteration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Right Visual Image (5 cols) */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-black/[0.08] dark:border-white/[0.1] shadow-lg">
                <img
                  src={current.visualImage}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 text-xs font-mono text-white/90">
                  {current.visualLabel}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default StudioProcess;
