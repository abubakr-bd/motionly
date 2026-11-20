import React from "react";
import { motion } from "framer-motion";
import { PROBLEM_CONTENT } from "./content";
import { Clock, RefreshCw, Compass, GitBranch, ArrowRight } from "lucide-react";

export const PBProblem: React.FC = () => {
  const iconMap = [
    <Clock key="1" className="w-5 h-5 text-amber-500" />,
    <RefreshCw key="2" className="w-5 h-5 text-blue-500" />,
    <Compass key="3" className="w-5 h-5 text-indigo-500" />,
    <GitBranch key="4" className="w-5 h-5 text-emerald-500" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#070B19] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{PROBLEM_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            You Have Something Worth Sharing. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              But Are You Sharing It?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {PROBLEM_CONTENT.description}
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {PROBLEM_CONTENT.problems.map((problem, index) => (
            <motion.div
              key={problem.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-7 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                    {problem.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xs">
                    {iconMap[index]}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2.5">
                  {problem.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Core Bottleneck</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Transition Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08]"
        >
          <p className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
            {PROBLEM_CONTENT.closingStatement}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            We turn your domain expertise into a structured, sustainable media engine without requiring you to become a full-time video creator.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PBProblem;