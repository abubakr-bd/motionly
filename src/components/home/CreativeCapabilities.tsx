import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Film, User, Video, Sparkles } from "lucide-react";

export const CreativeCapabilities: React.FC = () => {
  return (
    <section 
      id="services" 
      className="py-20 sm:py-32 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-1/3 left-1/4 w-[700px] h-[550px] bg-blue-600/10 rounded-full blur-[150px] -z-10" 
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>What We Bring to the Table</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            From the First Idea <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              to the Final Frame.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Every project has a different story to tell. We bring together strategy, storytelling, and creative execution to make that story resonate.
          </p>
        </div>

        {/* 4 Distinct Large Visual Service Panels */}
        <div className="space-y-8 sm:space-y-12">
          {/* SERVICE 01 — SAAS & PRODUCT VIDEOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 p-8 sm:p-12 transition-all duration-500 shadow-2xl overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                    Service 01 — SaaS &amp; Product Videos
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    Make Your Product Make Sense.
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed font-normal">
                    Complex products deserve clear communication. We create engaging SaaS videos, product explainers, feature demonstrations, and launch videos that help audiences understand what you&apos;re building and why it matters.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    "SaaS Explainer Videos",
                    "Product Demo Videos",
                    "Feature Launch Videos",
                    "UI Animation",
                    "2D & 3D Motion Graphics",
                    "Product Marketing Videos"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group"
                  >
                    <span>Explore Product Videos</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Real Project Visual Mockup */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-white/10 shadow-xl group">
                <img
                  src="https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg"
                  alt="SaaS & Product Video Work"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block">
                      Case Example // Bolto AI
                    </span>
                    <p className="text-sm font-bold text-white">
                      YC-Backed SaaS Product Architecture Explainer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SERVICE 02 — PERSONAL BRANDING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 p-8 sm:p-12 transition-all duration-500 shadow-2xl overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Visual Preview */}
              <div className="lg:col-span-6 order-2 lg:order-1 relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-white/10 shadow-xl group">
                <img
                  src="/hero-thumb-mobile.webp"
                  alt="Personal Branding System"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hero-thumb.webp";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                      Ecosystem Architecture
                    </span>
                    <p className="text-sm font-bold text-white">
                      Executive Positioning, Podcasts &amp; Social Sprints
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                    Service 02 — Personal Branding
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    Turn Your Expertise Into Influence.
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed font-normal">
                    Your ideas deserve more than occasional posts. We help founders, entrepreneurs, coaches, and creators develop consistent content through creative direction, professional editing, and thoughtful storytelling.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    "Content Strategy",
                    "Short-Form Video Editing",
                    "Long-Form Video Production",
                    "Motion Graphics",
                    "Content Repurposing",
                    "Creative Packaging"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/personal-branding"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group"
                  >
                    <span>Explore Personal Branding</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row of Two Services: Service 03 & 04 Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* SERVICE 03 — COMMERCIAL & BRAND FILMS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                    Service 03 — Commercial &amp; Brand Films
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    Give Your Brand a Story Worth Watching.
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Create stronger connections through memorable visual storytelling. From promotional videos to branded campaigns, we help businesses communicate their value through compelling creative production.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    "Brand Films & Commercials",
                    "Promotional Video Campaigns",
                    "Commercial Editing & Color",
                    "Campaign Creatives & Variations",
                    "Product Advertisements",
                    "Visual Storytelling"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-white/5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors"
                >
                  <span>Explore Brand Films</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* SERVICE 04 — MOTION DESIGN & CREATIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                    Service 04 — Motion Design &amp; Creative
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    Make the Ordinary Look Extraordinary.
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Bring ideas to life through purposeful animation, advanced motion design, and visually engaging creative execution.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    "2D Vector Animation",
                    "3D Product Renders & Animation",
                    "Advanced Motion Graphics",
                    "Typography & Title Design",
                    "Visual Effects & Compositing",
                    "Social Media Creatives"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-white/5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors"
                >
                  <span>Explore Motion Design</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeCapabilities;