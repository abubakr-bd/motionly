import React from "react";
import { motion } from "framer-motion";
import { WORKFLOW_CONTENT } from "./content";
import { 
  Search, 
  Target, 
  PenTool, 
  Clapperboard, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

export const PBWorkflow: React.FC = () => {
  const stepIcons = [
    <Search key="1" className="w-5 h-5 text-blue-500" />,
    <Target key="2" className="w-5 h-5 text-indigo-500" />,
    <PenTool key="3" className="w-5 h-5 text-cyan-500" />,
    <Clapperboard key="4" className="w-5 h-5 text-purple-500" />,
    <TrendingUp key="5" className="w-5 h-5 text-emerald-500" />,
  ];

  return (
    <section 
      id="workflow" 
      className="py-20 sm:py-28 bg-slate-50 dark:bg-[#070B18] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{WORKFLOW_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            A Simpler Way to Build <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              Your Personal Brand.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {WORKFLOW_CONTENT.description}
          </p>
        </div>

        {/* 5 Connected Steps in a Connected Track */}
        <div className="space-y-4 mb-16 relative">
          {/* Subtle connecting vertical line on desktop */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute left-9 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 opacity-20 -z-0" 
          />

          {WORKFLOW_CONTENT.steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Step badge */}
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  {stepIcons[index]}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {step.step}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {step.name}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {step.duration && (
                <div className="lg:text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {step.duration}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Supporting Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-blue-500/30 dark:border-blue-500/20 flex items-start gap-3.5 shadow-sm"
        >
          <div className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            <strong className="text-slate-950 dark:text-white font-bold">Your Time Commitment:</strong>{" "}
            {WORKFLOW_CONTENT.supportingNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PBWorkflow;