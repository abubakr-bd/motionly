import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, FileText, Layers, Film, Clapperboard, Check } from "lucide-react";

export const StudioProcess: React.FC = () => {
  const steps = [
    {
      num: "01",
      name: "DISCOVER",
      title: "Core Objectives & Narrative Foundation",
      desc: "We learn about your business, audience, objectives, and the story you want to communicate.",
      visualBadge: "Discovery Brief // Audience Mapping",
      deliverable: "Strategic brief, references & positioning alignment"
    },
    {
      num: "02",
      name: "STRATEGIZE",
      title: "Creative Concept & Roadmap",
      desc: "We establish the direction, messaging, creative concept, and production requirements.",
      visualBadge: "Creative Concept // Treatment Document",
      deliverable: "Pacing architecture, hooks, visual script & moodboard"
    },
    {
      num: "03",
      name: "CREATE",
      title: "Storyboards & Visual Direction",
      desc: "Our creative team develops the visual direction, scripts, storyboards, and production assets.",
      visualBadge: "Styleframes // Kinetic Storyboards",
      deliverable: "Full script, kinetic typography tests & styleframes"
    },
    {
      num: "04",
      name: "PRODUCE",
      title: "Editing, Motion & Sound Design",
      desc: "We bring the concept to life through editing, animation, motion graphics, and post-production.",
      visualBadge: "NLE Timeline // 4K 60fps Animation",
      deliverable: "V1 cut on Frame.io, 3D animations & bespoke audio layers"
    },
    {
      num: "05",
      name: "DELIVER",
      title: "Platform-Ready Mastering",
      desc: "We refine, finalize, and deliver assets prepared for their intended platforms and audiences.",
      visualBadge: "ProRes 422 & Social Formats",
      deliverable: "16:9, 9:16 vertical cuts, thumbnails & raw project comps"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-[#070B19] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>How We Bring Ideas to Life</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            Good Work Doesn&apos;t Happen <br />
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              by Accident.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Every successful project starts with understanding the objective and finding the right creative direction.
          </p>
        </div>

        {/* 5 Connected Steps in a Refined Layout */}
        <div className="space-y-6">
          {steps.map((st, index) => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-7 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                      {st.num} — {st.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {st.visualBadge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white pt-1">
                    {st.title}
                  </h3>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                    {st.desc}
                  </p>
                </div>

                <div className="lg:col-span-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Production Output
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                    {st.deliverable}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioProcess;