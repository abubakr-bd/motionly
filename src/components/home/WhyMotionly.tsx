import React from "react";
import { motion } from "framer-motion";
import { Clock, Compass, Users, CheckCircle2, AlertCircle } from "lucide-react";

export const WhyMotionly: React.FC = () => {
  const problems = [
    {
      num: "01",
      title: "Creating consistent content takes more than just editing.",
      solution: "We provide complete narrative direction, pacing architecture, and creative continuity so every asset builds brand equity rather than random noise.",
      icon: Clock,
      focus: "Strategic Narrative & Continuity"
    },
    {
      num: "02",
      title: "Your ideas need the right storytelling and visual direction.",
      solution: "Great software and founder expertise fall flat without high-retention hooks, cinematic visual metaphors, and deliberate pacing that respects the audience's time.",
      icon: Compass,
      focus: "Pacing & Visual Hook Engineering"
    },
    {
      num: "03",
      title: "Finding reliable creative talent shouldn't slow down your growth.",
      solution: "Instead of managing unreliable freelancers or paying six-figure agency retainers, you get a dedicated creative squad delivering in 5–7 day sprints.",
      icon: Users,
      focus: "Predictable Sprint SLAs"
    },
    {
      num: "04",
      title: "Managing multiple creative requirements shouldn't become another full-time job.",
      solution: "From 3D product renders to long-form YouTube documentaries and short-form cutdowns, our studio handles the entire pipeline end-to-end.",
      icon: CheckCircle2,
      focus: "Unified Studio Pipeline"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>SOLVING THE CREATIVE BOTTLENECK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4">
            Why ambitious brands <br />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              partner with Motionly.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Producing high-impact video marketing shouldn&apos;t turn into another exhausting operational headache.
          </p>
        </div>

        {/* 4 Cards Grid with Interactive Spring Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="p-8 sm:p-9 rounded-3xl bg-slate-50 dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-1 rounded-lg border border-black/[0.06] dark:border-white/[0.08]">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3.5 tracking-tight leading-snug">
                    &ldquo;{item.title}&rdquo;
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                    {item.solution}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">The Motionly Difference:</span>
                  <span className="text-[#2563EB] dark:text-[#38BDF8] font-semibold">{item.focus}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyMotionly;
