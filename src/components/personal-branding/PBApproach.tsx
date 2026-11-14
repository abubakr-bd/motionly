import React from "react";
import { motion } from "framer-motion";
import { APPROACH_CONTENT } from "./content";
import { UserCheck, Sparkles, Check, CheckCircle2 } from "lucide-react";

export const PBApproach: React.FC = () => {
  return (
    <section 
      id="approach" 
      className="py-20 sm:py-28 bg-white dark:bg-[#070B19] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{APPROACH_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            Your Ideas. Our Execution. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              One Consistent Direction.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {APPROACH_CONTENT.description}
          </p>
        </div>

        {/* 2-Column Composition: Your Side vs. Motionly's Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
          {/* YOUR SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-9 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-950 dark:text-white">
                    {APPROACH_CONTENT.yourSideTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your domain expertise &amp; authentic voice
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {APPROACH_CONTENT.yourSideItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <div className="w-5 h-5 rounded-md bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
              Low operational lift • ~1-2 hours per content sprint
            </div>
          </motion.div>

          {/* MOTIONLY'S SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-9 rounded-3xl bg-blue-50/70 dark:bg-gradient-to-b dark:from-[#0E1838] dark:to-[#080E21] border-2 border-blue-600/30 dark:border-blue-500/40 shadow-lg shadow-blue-600/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-950 dark:text-white">
                    {APPROACH_CONTENT.motionlySideTitle}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    Strategy, post-production &amp; packaging
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {APPROACH_CONTENT.motionlySideItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
                    <div className="w-5 h-5 rounded-md bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-blue-200/80 dark:border-white/10 text-xs text-blue-700 dark:text-blue-300 font-semibold">
              Complete creative execution • 48h sprint turnaround
            </div>
          </motion.div>
        </div>

        {/* Closing Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center p-6 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 max-w-2xl mx-auto"
        >
          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {APPROACH_CONTENT.closingLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PBApproach;