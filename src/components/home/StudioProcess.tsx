import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Palette, Video, Sliders, CheckCircle2, ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  deliverables: string[];
  visualImage: string;
  visualLabel: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Strategy",
    eyebrow: "Phase 1 &bull; Discovery &amp; Positioning",
    description: "Every successful video begins with understanding. We audit your audience, existing content, competitor landscape, and core business objective to establish what to say, why it matters, and who needs to hear it.",
    deliverables: [
      "Audience persona & conversion intent analysis",
      "Core narrative positioning & messaging angles",
      "Cold opening hooks & retention benchmark plan"
    ],
    visualImage: "https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg",
    visualLabel: "Strategic Brief &amp; Concept Roadmap"
  },
  {
    number: "02",
    title: "Creative Direction",
    eyebrow: "Phase 2 &bull; Visual Tone &amp; Pacing",
    description: "We translate strategy into tangible visual style. We craft video scripts, storyboard visual beats, design style frames, and choose typography, color palettes, and audio directions before production begins.",
    deliverables: [
      "Full script writing & dialogue pacing",
      "Visual moodboards & style frames",
      "Kinetic typography guidelines & art direction"
    ],
    visualImage: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    visualLabel: "Storyboard &amp; Style Architecture"
  },
  {
    number: "03",
    title: "Production",
    eyebrow: "Phase 3 &bull; Asset &amp; Footage Capture",
    description: "Whether capturing clean 60fps software UI, recording executive voiceovers, or deploying multi-cam studio cinematography, we gather the high-fidelity raw ingredients needed for exceptional video.",
    deliverables: [
      "High-resolution UI screen motion captures",
      "Studio voiceover & sound recordings",
      "Cinematography & lighting packages (when required)"
    ],
    visualImage: "https://img.youtube.com/vi/0NHfOpolrjs/maxresdefault.jpg",
    visualLabel: "High-Fidelity Footage Capture"
  },
  {
    number: "04",
    title: "Post-production",
    eyebrow: "Phase 4 &bull; Assembly, Motion &amp; Finishing",
    description: "Where raw footage turns into art. We sculpt the edit for maximum audience retention, integrate 2D/3D motion graphics, master the audio with custom sound design, and color grade in DaVinci Resolve.",
    deliverables: [
      "High-retention rhythmic timeline editing",
      "2D/3D kinetic animation & UI motion",
      "DaVinci Resolve color grading & spatial sound mix"
    ],
    visualImage: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
    visualLabel: "Precision Timeline &amp; Sound Mix"
  },
  {
    number: "05",
    title: "Delivery",
    eyebrow: "Phase 5 &bull; Refinement &amp; Masters",
    description: "We invite your team into Frame.io for timestamped, precise feedback. Once approved, we export master files tailored for every platform, complete with thumbnails, subtitles, and launch assets.",
    deliverables: [
      "Frame.io timestamped collaborative review cycles",
      "Platform-optimized master exports (16:9, 9:16, 1:1)",
      "Full source files & commercial IP rights handover"
    ],
    visualImage: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    visualLabel: "Multi-Platform Master Deliverables"
  }
];

export const StudioProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = PROCESS_STEPS[activeStep];

  return (
    <section 
      id="process" 
      className="py-24 sm:py-32 bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            A structured workflow designed for clarity.
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            A five-step collaborative process that keeps production predictable, transparent, and focused on creative excellence.
          </p>
        </div>

        {/* Horizontal Process Stepper */}
        <div className="mb-10 sm:mb-14 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#111827] text-white dark:bg-white dark:text-[#07080d] shadow-sm"
                      : "bg-transparent text-[#4b5565] dark:text-[#a3a9b8] hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={`font-mono text-xs ${isActive ? "text-[#315EFA] dark:text-[#315EFA]" : "text-[#9ca3af]"}`}>
                    {step.number}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Detail Stage Display */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Text & Deliverables Column (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#315EFA]">
                    STAGE {current.number} / 05
                  </span>
                  <span className="text-black/20 dark:text-white/20">&bull;</span>
                  <span 
                    className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]"
                    dangerouslySetInnerHTML={{ __html: current.eyebrow }}
                  />
                </div>

                <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-4">
                  {current.title}
                </h3>

                <p className="text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-8 font-normal">
                  {current.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3 mb-8 pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] block mb-2">
                    Key Deliverables &amp; Outcomes:
                  </span>
                  {current.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                      <CheckCircle2 className="w-4 h-4 text-[#315EFA] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Step navigation buttons */}
                <div className="flex items-center gap-3">
                  {activeStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-4 py-2 rounded-lg text-xs font-medium border border-black/[0.1] dark:border-white/[0.1] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      &larr; Previous Step
                    </button>
                  )}
                  {activeStep < PROCESS_STEPS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-4 py-2 rounded-lg text-xs font-medium bg-[#111827] text-white dark:bg-white dark:text-[#07080d] hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next: {PROCESS_STEPS[activeStep + 1].title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Supporting Visual (5 Cols) */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-black/[0.08] dark:border-white/[0.1]">
                <img
                  src={current.visualImage}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span dangerouslySetInnerHTML={{ __html: current.visualLabel }} />
                  <span className="text-[#315EFA]">Step {current.number}</span>
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
