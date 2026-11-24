import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Play, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Services Data with Pastel Landscape Styling                       */
/* ------------------------------------------------------------------ */
interface ServiceCardItem {
  id: string;
  category: string;
  title: string;
  description: string;
  scope: string;
  duration: string;
  deliverableBadge: string;
  contactParam: string;
  bgClass: string;
  darkBgClass: string;
  accentColor: string;
  image: string;
  videoId: string;
}

const SERVICES: ServiceCardItem[] = [
  {
    id: "motion-graphics",
    category: "Motion Graphics & 3D",
    title: "Kinetic Motion & Visual Storytelling That Explain Anything",
    description:
      "Transform complex software, abstract workflows, and technical architectures into crisp, fluid 2D/3D animated explainers that captivate audiences and drive conversions.",
    scope: "2D/3D Explainer & UI Motion",
    duration: "2-3 Week Sprint",
    deliverableBadge: "Vector 60fps • 4K Master",
    contactParam: "motion-graphics",
    bgClass: "bg-[#eaf4fe] text-[#0f172a]",
    darkBgClass: "dark:bg-[#0c1829] dark:text-[#f1f5f9]",
    accentColor: "text-[#0284c7] dark:text-[#38bdf8]",
    image: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    videoId: "xA_msiryNvQ",
  },
  {
    id: "studio-production",
    category: "Studio & Commercial",
    title: "Cinematic Commercials & Brand Films That Demand Attention",
    description:
      "Full-scale creative direction, studio cinematography, DaVinci Resolve color grading, and broadcast-grade spatial sound design to turn your brand into an unforgettable visual experience.",
    scope: "Brand Commercial & Color Master",
    duration: "3-4 Week Sprint",
    deliverableBadge: "ProRes 422HQ • Dolby Atmos",
    contactParam: "studio-production",
    bgClass: "bg-[#ecfdf5] text-[#0f172a]",
    darkBgClass: "dark:bg-[#062016] dark:text-[#f1f5f9]",
    accentColor: "text-[#059669] dark:text-[#34d399]",
    image: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    videoId: "xygb6y5L9x8",
  },
  {
    id: "ovc",
    category: "Online Video Content (OVC)",
    title: "High-Retention Content Engines For YouTube, Reels & TikTok",
    description:
      "Stop losing viewers in the first 3 seconds. We engineer viral hooks, high-retention pacing, dynamic motion graphics, and multi-platform distribution frameworks built to scale your audience.",
    scope: "YouTube, Reels & Paid Ads",
    duration: "Bi-Weekly Sprints",
    deliverableBadge: "16:9 & 9:16 Formats • Viral Packaging",
    contactParam: "ovc",
    bgClass: "bg-[#fef9ee] text-[#0f172a]",
    darkBgClass: "dark:bg-[#1f1708] dark:text-[#f1f5f9]",
    accentColor: "text-[#d97706] dark:text-[#fbbf24]",
    image: "https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg",
    videoId: "KDK1jHJXPrk",
  },
  {
    id: "video-editing",
    category: "Precision Post-Production",
    title: "Elite Video Editing & Sound Finishing For Ambitious Brands",
    description:
      "From raw recordings to a cinema-quality final cut. Narrative pacing, DaVinci Resolve color finishing, sound engineering, and frictionless Frame.io revision workflows.",
    scope: "Full Post-Production & Color",
    duration: "48-72h Turnaround",
    deliverableBadge: "High-Retention Cut • Frame.io Ready",
    contactParam: "video-editing",
    bgClass: "bg-[#f5f3ff] text-[#0f172a]",
    darkBgClass: "dark:bg-[#181028] dark:text-[#f1f5f9]",
    accentColor: "text-[#7c3aed] dark:text-[#a78bfa]",
    image: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
    videoId: "pIEkY7YDIF0",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const ServicesShowcase: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-xs font-mono text-[#315EFA] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA]" />
            <span className="uppercase tracking-wider font-bold">Services</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            What We{" "}
            <span className="font-serif italic font-normal text-[#315EFA]">
              Create.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            Four specialized video production disciplines that turn complex ideas into compelling visual stories for market leaders.
          </p>
        </div>

        {/* ── Large Landscape Shape Cards (Matching User's Reference Layout) ── */}
        <div className="space-y-6 sm:space-y-10">
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-black/5 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-xl ${item.bgClass} ${item.darkBgClass}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Information Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    {/* Category in Italic Serif */}
                    <span className={`text-sm sm:text-lg font-serif italic ${item.accentColor} block mb-1.5 sm:mb-2`}>
                      {item.category}
                    </span>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-base opacity-80 leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
                      {item.description}
                    </p>

                    {/* Scope & Duration Meta Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-black/10 dark:border-white/10 text-xs sm:text-sm">
                      <div>
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider opacity-60 block mb-0.5 sm:mb-1">
                          Scope
                        </span>
                        <span className="font-semibold">{item.scope}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider opacity-60 block mb-0.5 sm:mb-1">
                          Timeline
                        </span>
                        <span className="font-semibold">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action / Inquiry Pill Link */}
                  <Link
                    to={`/contact?service=${item.contactParam}`}
                    className="w-full sm:w-auto inline-flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 shadow-xs hover:shadow-md transition-all duration-150 group max-w-md cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#315EFA]/10 text-[#315EFA] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold leading-tight truncate">
                          Book {item.category}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono opacity-60 truncate">
                          {item.deliverableBadge}
                        </p>
                      </div>
                    </div>

                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl bg-[#315EFA] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-150 ml-2 sm:ml-3 shrink-0">
                      <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                  </Link>
                </div>

                {/* Visual Image Preview (5 cols) */}
                <div className="lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video sm:aspect-[4/3] bg-black border border-black/10 dark:border-white/10 shadow-lg group order-1 lg:order-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle Corner Badge */}
                  <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-medium bg-black/75 backdrop-blur-md text-white border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-[11px] sm:text-xs font-mono">
                    <span className="font-medium opacity-90 truncate max-w-[180px]">{item.deliverableBadge}</span>
                    <span className="text-[#38bdf8] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Show More Services CTA Button ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white text-sm font-semibold transition-all duration-150 shadow-md shadow-[#315EFA]/25 group cursor-pointer active:scale-[0.97]"
          >
            <span>Show More Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesShowcase;
