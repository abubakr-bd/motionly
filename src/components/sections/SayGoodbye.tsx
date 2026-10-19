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
        {parts.join(" ")} <span className="text-blue-600 font-bold">{lastWord}</span>
      </>
    );
  };

  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          <div className="lg:w-2/5 w-full lg:sticky lg:top-40 lg:self-start">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-6 block"
            >
              {subtitle}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-[1.05] mb-6 tracking-tight"
            >
              {renderTitle()}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-sm"
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
                className="flex items-start gap-8 py-8 border-b border-slate-200 last:border-0 group"
              >
                <span className="text-sm font-bold text-slate-300 tabular-nums mt-1 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xl md:text-2xl font-medium text-slate-800 leading-snug group-hover:text-blue-700 transition-colors duration-300">
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
