import React from "react";
import { motion } from "framer-motion";
import { SOLUTION_CONTENT } from "./content";
import { ArrowDown, Check, Compass, Sparkles, Calendar } from "lucide-react";

export const PBSolution: React.FC = () => {
  const icons = [
    <Compass key="1" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Sparkles key="2" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Calendar key="3" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3.5">
            <span>{SOLUTION_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            You Focus on What You Do Best. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              We&apos;ll Handle the Content.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {SOLUTION_CONTENT.description}
          </p>
        </div>

        {/* 3 Wide Feature Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {SOLUTION_CONTENT.features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-8 rounded-3xl bg-slate-50 dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    {icons[index]}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    {feature.number} / 03
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8]">
                <Check className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Motionly Managed</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to Services */}
        <div className="text-center">
          <a
            href={SOLUTION_CONTENT.ctaLink}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider border border-black/[0.08] dark:border-white/[0.1] transition-all duration-200 active:scale-[0.98]"
          >
            <span>{SOLUTION_CONTENT.ctaText}</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PBSolution;
