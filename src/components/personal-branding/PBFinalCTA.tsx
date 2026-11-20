import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FINAL_CTA_CONTENT } from "./content";
import { ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";

export const PBFinalCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
            <span>{FINAL_CTA_CONTENT.eyebrow}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
            You Have the Story. <br />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              Let&apos;s Make the World See It.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto mb-10">
            {FINAL_CTA_CONTENT.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
            <Link
              to={FINAL_CTA_CONTENT.primaryCtaLink}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>{FINAL_CTA_CONTENT.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to={FINAL_CTA_CONTENT.secondaryCtaLink}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm tracking-wider uppercase border border-black/[0.08] dark:border-white/[0.1] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
              <span>{FINAL_CTA_CONTENT.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Small Supporting Text */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {FINAL_CTA_CONTENT.subText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PBFinalCTA;
