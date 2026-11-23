import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Video, Layers, TrendingUp, CheckCircle2 } from "lucide-react";

export const CreativeCapabilities: React.FC = () => {
  return (
    <section 
      id="capabilities" 
      className="py-24 sm:py-32 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-3">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            Creative execution across every stage of video.
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            We focus on three disciplines that together form a complete video engine for ambitious businesses, founders, and products.
          </p>
        </div>

        {/* 3 Asymmetrical Editorial Service Treatments */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* =========================================================================
              01. VIDEO PRODUCTION & EDITING (Wide Horizontal Editorial Block)
          ========================================================================= */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden p-6 sm:p-10 lg:p-12 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Information (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold text-[#315EFA]">01</span>
                  <span className="text-black/20 dark:text-white/20">&bull;</span>
                  <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296] uppercase tracking-wider">
                    Core Discipline
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-4">
                  Video Production &amp; Editing
                </h3>

                <p className="text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                  Turn raw recordings, customer interviews, and brand footage into cohesive, high-retention video stories. We handle narrative structure, precision pacing, color grading, sound design, and broadcast audio mastering so your content feels cinematic and authoritative.
                </p>

                {/* Deliverables Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Commercial & brand films",
                    "High-retention video editing",
                    "Studio & on-location production",
                    "DaVinci Resolve color grading",
                    "Custom sound design & mixing",
                    "Frame.io rapid revision workflow"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                      <CheckCircle2 className="w-4 h-4 text-[#315EFA] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#315EFA] hover:text-[#254cd4] transition-colors group"
                >
                  <span>Discuss a Production Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Graphic/Visual Showcase (5 Cols) */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-black/[0.08] dark:border-white/[0.1] shadow-md">
                <img
                  src="https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg"
                  alt="Video production and editing showcase"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#315EFA]" />
                    <span>Cinematic 4K Master</span>
                  </div>
                  <span className="text-slate-300">ProRes 422HQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              02 & 03. TWO-COLUMN SPLIT (Motion Graphics + Video Marketing)
          ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            
            {/* 02. MOTION GRAPHICS & ANIMATION */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold text-[#315EFA]">02</span>
                  <span className="text-black/20 dark:text-white/20">&bull;</span>
                  <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296] uppercase tracking-wider">
                    Design &amp; Motion
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-3">
                  Motion Graphics &amp; Animation
                </h3>

                <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                  Make complex software and abstract concepts instantly clear. We create kinetic typography, 2D UI motion captures, 3D product disassemblies, and animated explainers that communicate what words alone cannot.
                </p>

                {/* Visual Thumbnail */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-black mb-6 border border-black/[0.08] dark:border-white/[0.08]">
                  <img
                    src="https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg"
                    alt="Motion Graphics and UI Animation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#315EFA]" />
                    <span>2D/3D Kinetic Animation</span>
                  </div>
                </div>

                {/* Deliverables */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                  {[
                    "SaaS product explainers & UI animation",
                    "3D product breakdown & visualization",
                    "Kinetic typography sequences",
                    "Brand idents & animated logos"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#315EFA] hover:text-[#254cd4] transition-colors group"
                >
                  <span>Explore Motion Graphics</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* 03. VIDEO MARKETING & STRATEGY */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold text-[#315EFA]">03</span>
                  <span className="text-black/20 dark:text-white/20">&bull;</span>
                  <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296] uppercase tracking-wider">
                    Strategy &amp; Growth
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-3">
                  Video Marketing &amp; Strategy
                </h3>

                <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                  Great creative only moves the needle if it reaches and holds the right audience. We engineer cold opening hooks, audience retention pacing, multi-aspect ratio cutdowns, and distribution frameworks across YouTube, LinkedIn, and short-form channels.
                </p>

                {/* Visual Thumbnail */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-black mb-6 border border-black/[0.08] dark:border-white/[0.08]">
                  <img
                    src="https://img.youtube.com/vi/0NHfOpolrjs/maxresdefault.jpg"
                    alt="Video Marketing and Strategic Storytelling"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#315EFA]" />
                    <span>Audience Retention &amp; Conversion</span>
                  </div>
                </div>

                {/* Deliverables */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#374151] dark:text-[#cbd5e1]">
                  {[
                    "Content pillar planning & scripting",
                    "Founder personal branding systems",
                    "Omnichannel aspect cutdowns (9:16 / 16:9)",
                    "Retention curve & hook optimization"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#315EFA] hover:text-[#254cd4] transition-colors group"
                >
                  <span>Build a Content Strategy</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeCapabilities;
