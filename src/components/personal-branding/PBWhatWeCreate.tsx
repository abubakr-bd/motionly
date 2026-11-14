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
    <Smartphone key="1" className="w-5 h-5 text-pink-500" />,
    <Tv key="2" className="w-5 h-5 text-red-500" />,
    <Sparkles key="3" className="w-5 h-5 text-blue-500" />,
    <Repeat key="4" className="w-5 h-5 text-emerald-500" />,
    <LayoutGrid key="5" className="w-5 h-5 text-indigo-500" />,
    <MapPin key="6" className="w-5 h-5 text-amber-500" />,
  ];

  return (
    <section 
      id="what-we-create" 
      className="py-20 sm:py-28 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{WHAT_WE_CREATE_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            One Personal Brand. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              Multiple Ways to Connect.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
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
              className="p-7 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {serviceIcons[index]}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {service.description}
                </p>
              </div>

              {/* Formats Tags */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {service.formats.map((fmt, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all active:scale-95 border border-blue-400/30 group"
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