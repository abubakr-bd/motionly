import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WHAT_WE_CREATE_CONTENT } from "./content";
import { 
  Smartphone, 
  Tv, 
  Sparkles, 
  Repeat, 
  LayoutGrid, 
  MapPin, 
  ArrowUpRight 
} from "lucide-react";

export const PBWhatWeCreate: React.FC = () => {
  const serviceIcons = [
    <Smartphone key="1" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Tv key="2" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Sparkles key="3" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <Repeat key="4" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <LayoutGrid key="5" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
    <MapPin key="6" className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />,
  ];

  return (
    <section 
      id="what-we-create" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3.5">
            <span>{WHAT_WE_CREATE_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            One Personal Brand. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              Multiple Ways to Connect.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {WHAT_WE_CREATE_CONTENT.description}
          </p>
        </div>

        {/* 6 Visually Rich Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14">
          {WHAT_WE_CREATE_CONTENT.services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-7 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-1 rounded-lg border border-black/[0.06] dark:border-white/[0.08]">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.06] dark:border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {serviceIcons[index]}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                  {service.description}
                </p>
              </div>

              {/* Formats Tags */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex flex-wrap gap-1.5">
                  {service.formats.map((fmt, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-black/[0.06] dark:border-white/[0.06]"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={WHAT_WE_CREATE_CONTENT.ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] group"
          >
            <span>{WHAT_WE_CREATE_CONTENT.ctaText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PBWhatWeCreate;
