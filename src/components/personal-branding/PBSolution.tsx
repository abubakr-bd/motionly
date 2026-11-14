import React from "react";
import { motion } from "framer-motion";
import { SOLUTION_CONTENT } from "./content";
import { ArrowDown, Check, Compass, Sparkles, Calendar, Layers } from "lucide-react";

export const PBSolution: React.FC = () => {
  const icons = [
    <Compass key="1" className="w-6 h-6 text-blue-400" />,
    <Sparkles key="2" className="w-6 h-6 text-cyan-400" />,
    <Calendar key="3" className="w-6 h-6 text-indigo-400" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{SOLUTION_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            You Focus on What You Do Best. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              We&apos;ll Handle the Content.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
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
              className="relative p-8 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {icons[index]}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {feature.number} / 03
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Motionly Managed</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to Services */}
        <div className="text-center">
          <a
            href={SOLUTION_CONTENT.ctaLink}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-blue-400/30 transition-all duration-300 active:scale-95"
          >
            <span>{SOLUTION_CONTENT.ctaText}</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PBSolution;