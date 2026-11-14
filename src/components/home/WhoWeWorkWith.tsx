import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const WhoWeWorkWith: React.FC = () => {
  const audiences = [
    {
      category: "Tech & SaaS",
      headline: "For software companies, startups, and technology teams",
      desc: "Communicate complex products, architectural breakthroughs, and high-utility features through clear, kinetic visual storytelling.",
      deliverables: ["Product Launch Explainers", "Interactive UI Animations", "Feature Release Videos", "Product Hunt Video Kits"],
      imagePreview: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
      tag: "SaaS Systems"
    },
    {
      category: "Founders & Creators",
      headline: "For individuals building their personal brands",
      desc: "Share your expertise, company journey, and unique perspectives without sacrificing hours every week to manual video editing.",
      deliverables: ["Executive Video Sprints", "Podcast & Interview Cuts", "Short-Form Social Clips", "Click-Worthy Thumbnails"],
      imagePreview: "/hero-thumb.webp",
      tag: "Founder Media"
    },
    {
      category: "Businesses & Brands",
      headline: "For growing businesses and ambitious consumer brands",
      desc: "Elevate your market presence with polished commercial editing, brand films, and high-retention advertising assets.",
      deliverables: ["High-Converting Video Ads", "Cinematic Brand Films", "Commercial Production", "Multi-Platform Repurposing"],
      imagePreview: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
      tag: "Commercials"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Built for Ambitious Ideas</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Different Industries. <br />
            Different Stories. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              One Creative Partner.
            </span>
          </h2>
        </div>

        {/* 3 Audience Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {audiences.map((aud, index) => (
            <motion.div
              key={aud.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/5 mb-6 group-hover:border-blue-500/30 transition-colors">
                  <img
                    src={aud.imagePreview}
                    alt={aud.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-blue-400">
                    {aud.tag}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1.5 block">
                  {aud.category}
                </span>

                <h3 className="text-xl font-bold text-white mb-3">
                  {aud.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {aud.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-white/5 space-y-2">
                {aud.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;