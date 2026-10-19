import React from "react";
import { motion } from "framer-motion";
import { useSiteSettings } from "../../lib/useSiteData";

const Difference = () => {
  const { settings } = useSiteSettings();
  const {
    title,
    subtitle,
    description,
    statusQuoTitle,
    statusQuoPoints,
    motionlyTitle,
    motionlyPoints,
  } = settings.difference;

  return (
    <section id="comparison" className="py-24 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">{subtitle || "The difference"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{title || "A stronger system for every frame."}</h2>
          </div>
          <p className="text-lg text-slate-500 max-w-md">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Status Quo Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">The usual approach</p>
            <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-8 border-b border-slate-200">{statusQuoTitle || "Content without a system"}</h3>
            <ul className="space-y-6">
              {(statusQuoPoints || []).map((point: string, index: number) => (
                <li key={`usual-${index}`} className="flex items-start gap-4 text-slate-600">
                  <svg className="w-6 h-6 text-slate-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Motionly Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-600/20 rounded-full blur-3xl" />
            <p className="relative z-10 text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">The Motionly approach</p>
            <h3 className="relative z-10 text-2xl font-bold text-white mb-8 pb-8 border-b border-slate-800">{motionlyTitle || "Creative work with intent"}</h3>
            <ul className="relative z-10 space-y-6">
              {(motionlyPoints || []).map((point: string, index: number) => (
                <li key={`motionly-${index}`} className="flex items-start gap-4 text-slate-300">
                  <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Difference;
