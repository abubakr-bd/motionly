import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, CheckCircle2, ArrowRight, Layers, Film, Send } from "lucide-react";

export const StudioProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const approachCards = [
    {
      number: "01",
      eyebrow: "STRATEGIC DIRECTION",
      title: "Understand Before We Create",
      description: "We start by understanding your brand, audience, goals, and message. Every creative decision begins with a clear direction.",
      icon: Compass,
      deliverable: "Strategic brief, narrative hooks & audience retention audit"
    },
    {
      number: "02",
      eyebrow: "CREATIVE EXECUTION",
      title: "Turn Ideas Into Visuals",
      description: "From storytelling and high-retention editing to advanced 2D/3D motion graphics, we transform ideas into compelling visual experiences.",
      icon: Film,
      deliverable: "4K cinematography, kinetic typography & 3D photorealistic CGI"
    },
    {
      number: "03",
      eyebrow: "DELIVERY & GROWTH",
      title: "Create. Refine. Deliver.",
      description: "We refine every detail, maintain creative consistency, and deliver content ready for your website, social platforms, campaigns, and launches.",
      icon: Send,
      deliverable: "Multi-aspect exports (16:9, 9:16, 1:1), ProRes master & launch assets"
    }
  ];

  const frameworkSteps = [
    {
      step: "01",
      name: "DISCOVER",
      phase: "Phase 1: Foundation",
      description: "Understand the audience, define the objective, and establish the creative direction.",
      details: [
        "Audit existing retention drop-offs and competitor videos",
        "Formulate core narrative message and cold opening hooks",
        "Align on visual style, references, and timeline milestones"
      ]
    },
    {
      step: "02",
      name: "CREATE",
      phase: "Phase 2: Execution",
      description: "Develop the story, produce the visuals, and bring everything together through thoughtful creative execution.",
      details: [
        "Craft script pacing and kinetic motion storyboards",
        "High-retention editing, DaVinci Resolve color suites & sound design",
        "Advanced 2D UI animations and Cinema 4D / Blender 3D disassemblies"
      ]
    },
    {
      step: "03",
      name: "DELIVER",
      phase: "Phase 3: Impact",
      description: "Refine, finalize, and deliver content ready to make an impact across your chosen platforms.",
      details: [
        "Collaborative Frame.io review cycles with rapid turnarounds",
        "Master exports formatted for web, ads, YouTube, and short-form feeds",
        "Full source project files and IP ownership handover"
      ]
    }
  ];

  return (
    <section 
      id="process" 
      className="py-24 sm:py-32 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* =========================================================================
            PART 1: THE MOTIONLY APPROACH (User Section 6 Copy)
        ========================================================================= */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4">
            The Motionly approach.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Strategy, creativity, and execution come together to create videos that make a difference.
          </p>
        </div>

        {/* 3 Approach Cards with Interactive Hover Spring Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {approachCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-1 rounded-lg border border-black/[0.06] dark:border-white/[0.08]">
                      {card.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] block mb-2 font-semibold">
                    {card.eyebrow}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-0.5">Focus Outcome:</span>
                  <span className="text-slate-800 dark:text-slate-200">{card.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            PART 2: OUR CREATIVE FRAMEWORK (User Section 8 Copy)
        ========================================================================= */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>OUR CREATIVE FRAMEWORK</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4">
              From idea to impact.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              A clear creative process designed to take your vision from concept to final delivery.
            </p>
          </div>

          {/* Step Selector Tabs with layoutId Sliding Indicator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {frameworkSteps.map((stepItem, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={stepItem.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-slate-50 dark:bg-white/[0.04] border-[#2563EB] dark:border-[#38BDF8] shadow-sm"
                      : "bg-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFrameworkTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#2563EB] dark:border-[#38BDF8] pointer-events-none"
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8]">
                      STEP {stepItem.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {stepItem.phase}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stepItem.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Step Interactive Showcase Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08]"
            >
              <div className="max-w-3xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] block mb-2">
                  {frameworkSteps[activeStep].phase} &bull; {frameworkSteps[activeStep].name}
                </span>

                <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-snug">
                  &ldquo;{frameworkSteps[activeStep].description}&rdquo;
                </p>

                <div className="space-y-3 pt-2">
                  {frameworkSteps[activeStep].details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
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
