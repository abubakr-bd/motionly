import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings } from "../../lib/useSiteData";
import { Sparkles, Wand2, Volume2, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const Difference = () => {
  const { settings } = useSiteSettings();
  const [showComparison, setShowComparison] = useState(false);

  const {
    title,
    subtitle,
    description,
    statusQuoTitle,
    statusQuoPoints,
    motionlyTitle,
    motionlyPoints,
  } = settings.difference;

  const pillars = [
    {
      step: "01",
      title: "Understand Before We Create",
      subtitle: "STRATEGIC DIRECTION",
      description: "We start by understanding your brand, audience, goals, and message. Every creative decision begins with a clear direction.",
      icon: Sparkles,
      gradient: "from-blue-600/15 via-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/50",
      accent: "text-blue-600 dark:text-blue-400",
      badges: ["Audience Insights", "Brand Goals", "Clear Direction"],
    },
    {
      step: "02",
      title: "Turn Ideas Into Visuals",
      subtitle: "CREATIVE EXECUTION",
      description: "From storytelling and high-retention editing to advanced 2D/3D motion graphics, we transform ideas into compelling visual experiences.",
      icon: Wand2,
      gradient: "from-indigo-600/15 via-blue-600/10 to-transparent",
      borderColor: "group-hover:border-indigo-500/50",
      accent: "text-indigo-600 dark:text-indigo-400",
      badges: ["Storytelling", "2D/3D Motion", "Compelling Visuals"],
    },
    {
      step: "03",
      title: "Create. Refine. Deliver.",
      subtitle: "DELIVERY & GROWTH",
      description: "We refine every detail, maintain creative consistency, and deliver content ready for your website, social platforms, campaigns, and launches.",
      icon: Volume2,
      gradient: "from-sky-600/15 via-blue-500/10 to-transparent",
      borderColor: "group-hover:border-sky-500/50",
      accent: "text-sky-600 dark:text-sky-400",
      badges: ["Detail Polish", "Multi-Platform Ready", "Launch Delivery"],
    },
  ];

  return (
    <section id="difference" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[140px] -z-10" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3"
          >
            {subtitle || "HOW WE WORK"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-4 sm:mb-6"
          >
            {title || "The Motionly approach."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium"
          >
            {description || "Strategy, creativity, and execution come together to create videos that make a difference."}
          </motion.p>
        </div>

        {/* 3 Futuristic Glowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-blue-400/50 shadow-sm hover:shadow-xl dark:bg-gradient-to-b dark:from-[#0B1021]/90 dark:to-[#060914]/90 dark:hover:from-[#0E152D]/95 dark:hover:to-[#080D1C]/95 dark:border-white/10 ${pillar.borderColor} dark:shadow-xl dark:hover:shadow-[0_0_40px_rgba(37,99,235,0.22)] transition-all duration-500 backdrop-blur-xl overflow-hidden`}
              >
                {/* Top Subtle Radial Flare matching inspiration */}
                <div className={`pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b ${pillar.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                <div className="relative z-10">
                  {/* Top Header with Icon & Step */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-inner group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
                      <Icon className={`w-6 h-6 ${pillar.accent}`} />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-white/[0.04] px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">
                      {pillar.step}
                    </span>
                  </div>

                  <span className={`block text-xs font-bold uppercase tracking-wider ${pillar.accent} mb-2`}>
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Key feature pills */}
                <div className="relative z-10 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap gap-2">
                  {pillar.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[11px] font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-white/5 shadow-2xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle to view traditional vs Motionly comparison (syncs with Admin Difference data) */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:border-white/10 dark:hover:border-blue-500/40 transition-all cursor-pointer shadow-xs"
          >
            <span>{showComparison ? "Hide Comparison" : "Compare with Traditional Video Agencies"}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showComparison ? "rotate-90 text-blue-600 dark:text-blue-400" : ""}`} />
          </button>
        </div>

        {/* Expanded Comparison Matrix */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl dark:bg-[#090D1A]/95 dark:border-white/10">
                {/* Traditional Agency Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:bg-white/[0.02] dark:border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2 block">
                    The Usual Approach
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                    {statusQuoTitle || "Fragmented, Slow & Unpredictable"}
                  </h4>
                  <ul className="space-y-4">
                    {(statusQuoPoints || []).map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Motionly Media Card */}
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-500/30 ring-1 ring-blue-500/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2 block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>The Motionly Standard</span>
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-blue-200 dark:border-blue-500/20">
                    {motionlyTitle || "Engineered for High Retention"}
                  </h4>
                  <ul className="space-y-4">
                    {(motionlyPoints || []).map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Difference;
