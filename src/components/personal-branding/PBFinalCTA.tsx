import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FINAL_CTA_CONTENT } from "./content";
import { ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";

export const PBFinalCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Luminous Radial Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[150px] -z-10" 
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>{FINAL_CTA_CONTENT.eyebrow}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            You Have the Story. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              Let&apos;s Make the World See It.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto mb-10">
            {FINAL_CTA_CONTENT.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
            <Link
              to={FINAL_CTA_CONTENT.primaryCtaLink}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-blue-400/30 group"
            >
              <span>{FINAL_CTA_CONTENT.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to={FINAL_CTA_CONTENT.secondaryCtaLink}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white font-bold text-sm tracking-wider uppercase border border-white/10 hover:border-blue-400/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>{FINAL_CTA_CONTENT.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Small Supporting Text */}
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            {FINAL_CTA_CONTENT.subText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PBFinalCTA;