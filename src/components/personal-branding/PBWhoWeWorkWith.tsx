import React from "react";
import { motion } from "framer-motion";
import { AUDIENCE_CONTENT } from "./content";
import { Briefcase, GraduationCap, Cpu, Sparkles, Check } from "lucide-react";

export const PBWhoWeWorkWith: React.FC = () => {
  const roleIcons = [
    <Briefcase key="1" className="w-5 h-5 text-blue-400" />,
    <GraduationCap key="2" className="w-5 h-5 text-indigo-400" />,
    <Cpu key="3" className="w-5 h-5 text-cyan-400" />,
    <Sparkles key="4" className="w-5 h-5 text-purple-400" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-1/4 left-1/3 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{AUDIENCE_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Your Expertise Is <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              Your Biggest Asset.
            </span>
          </h2>
        </div>

        {/* 4 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AUDIENCE_CONTENT.audiences.map((aud, index) => (
            <motion.div
              key={aud.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    {roleIcons[index]}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                    {aud.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                  {aud.role}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {aud.description}
                </p>
              </div>

              {/* Outcomes List */}
              <div className="pt-5 border-t border-white/5 space-y-2.5">
                {aud.keyOutcomes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PBWhoWeWorkWith;