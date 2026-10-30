import React from "react";
import { motion } from "framer-motion";
import { useSiteSettings } from "../../lib/useSiteData";

const SayGoodbye = () => {
  const { settings } = useSiteSettings();
  const { title, subtitle, description, points } = settings.painPoints;

  const renderTitle = () => {
    if (!title) return "";
    const parts = title.split(" ");
    if (parts.length <= 2) return title;
    const lastWord = parts.pop();
    return (
      <>
        {parts.join(" ")} <span className="text-blue-600 dark:text-blue-400 font-bold">{lastWord}</span>
      </>
    );
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="lg:w-2/5 w-full lg:sticky lg:top-36 lg:self-start">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4 block"
            >
              {subtitle || "YOUR CREATIVE PARTNER"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.08] mb-6 tracking-tight"
            >
              {renderTitle()}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed max-w-sm font-medium"
            >
              {description}
            </motion.p>
          </div>

          <div className="lg:w-3/5 w-full">
            {(points || []).map((point: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex items-start gap-6 py-6 px-4 -mx-4 rounded-2xl border-b border-slate-200/80 dark:border-white/10 last:border-0 hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-all duration-300 group cursor-default"
              >
                <span className="text-sm font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 tabular-nums mt-1 select-none transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:translate-x-1.5 transition-all duration-300">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SayGoodbye;
