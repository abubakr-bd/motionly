import React from "react";
import { motion } from "framer-motion";
import { Target, Sparkles, Sliders, MessageSquareCheck } from "lucide-react";

export const WhyMotionly: React.FC = () => {
  const differentiators = [
    {
      num: "01",
      title: "Strategy Before Production",
      desc: "We understand the objective before deciding how something should look.",
      icon: <Target className="w-5 h-5 text-blue-500" />,
      detail: "No aesthetic without intention. Every scene, camera move, and graphic serves your core message."
    },
    {
      num: "02",
      title: "Creativity With Purpose",
      desc: "We combine storytelling, design, and marketing thinking to create meaningful visual communication.",
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      detail: "Engineered for retention, narrative clarity, and customer conversion across all touchpoints."
    },
    {
      num: "03",
      title: "Craft & Attention to Detail",
      desc: "From pacing and typography to sound design and color, we care about the details that shape the final experience.",
      icon: <Sliders className="w-5 h-5 text-cyan-500" />,
      detail: "Frame-accurate foley, cinematic color grading, and typography tailored to your exact brand."
    },
    {
      num: "04",
      title: "Collaboration That Works",
      desc: "We work closely with our clients, keeping communication clear and the creative process organized.",
      icon: <MessageSquareCheck className="w-5 h-5 text-emerald-500" />,
      detail: "Direct async channels, sprint velocity, transparent milestones, and zero agency friction."
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-[#070B19] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>The Motionly Approach</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            Creative Thinking. <br />
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              Thoughtful Execution.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            We believe great video isn&apos;t just about beautiful visuals. It&apos;s about making every frame serve a purpose.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {differentiators.map((diff, index) => (
            <motion.div
              key={diff.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 sm:p-9 rounded-3xl bg-slate-50/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                    {diff.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xs">
                    {diff.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-3">
                  {diff.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-6">
                  {diff.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400">
                {diff.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMotionly;