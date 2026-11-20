import React from "react";
import { motion } from "framer-motion";
import { AUDIENCE_CONTENT } from "./content";
import { Briefcase, GraduationCap, Cpu, Sparkles, Check } from "lucide-react";

export const PBWhoWeWorkWith: React.FC = () => {
  const roleIcons = [
    <Briefcase key="1" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <GraduationCap key="2" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Cpu key="3" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Sparkles key="4" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3.5">
            <span>{AUDIENCE_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            Your Expertise Is <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
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
              className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center shadow-xs">
                    {roleIcons[index]}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
                    {aud.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  {aud.role}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                  {aud.description}
                </p>
              </div>

              {/* Outcomes List */}
              <div className="pt-5 border-t border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                {aud.keyOutcomes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
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
