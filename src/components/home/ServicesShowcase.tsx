import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Film, Layers, Tv, Scissors } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Service definitions                                                */
/* ------------------------------------------------------------------ */
interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accentBg: string;
  accentText: string;
  contactParam: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "motion-graphics",
    icon: Layers,
    title: "Motion Graphics",
    tagline: "2D / 3D Animation & Kinetic Design",
    description:
      "Custom animated explainers, kinetic typography, 3D product breakdowns, and UI motion design that makes complex ideas instantly clear.",
    image: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    accentBg: "bg-violet-50 dark:bg-violet-500/10",
    accentText: "text-violet-600 dark:text-violet-400",
    contactParam: "motion-graphics",
  },
  {
    id: "studio-production",
    icon: Film,
    title: "Studio Production",
    tagline: "Cinematic Commercial & Brand Films",
    description:
      "End-to-end video production — creative direction, studio shoots, DaVinci Resolve color grading, and broadcast-grade audio mastering.",
    image: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    accentBg: "bg-sky-50 dark:bg-sky-500/10",
    accentText: "text-sky-600 dark:text-sky-400",
    contactParam: "studio-production",
  },
  {
    id: "ovc",
    icon: Tv,
    title: "Online Video Content",
    tagline: "YouTube, Reels, TikTok & Social Video",
    description:
      "Full-funnel content architecture for social platforms — hook design, retention editing, thumbnail systems, and multi-channel distribution.",
    image: "https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg",
    accentBg: "bg-emerald-50 dark:bg-emerald-500/10",
    accentText: "text-emerald-600 dark:text-emerald-400",
    contactParam: "ovc",
  },
  {
    id: "video-editing",
    icon: Scissors,
    title: "Video Editing",
    tagline: "Precision Post-Production & Finishing",
    description:
      "High-retention rhythmic editing, sound design, color grading, and rapid revision workflows that turn raw footage into polished, compelling stories.",
    image: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
    accentBg: "bg-amber-50 dark:bg-amber-500/10",
    accentText: "text-amber-600 dark:text-amber-400",
    contactParam: "video-editing",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const ServicesShowcase: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-white/[0.06] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
            Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-4">
            What We{" "}
            <span className="font-serif italic font-normal text-[#315EFA]">
              Create.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            Four core disciplines that form an end-to-end creative engine for
            ambitious businesses, founders, and products.
          </p>
        </div>

        {/* ── Services Grid: 2×2 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {SERVICES.map((service) => {
            const IconComp = service.icon;

            return (
              <Link
                key={service.id}
                to={`/contact?service=${service.contactParam}`}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-[#fafbfc] dark:bg-[#0c101d] hover:border-[#315EFA]/30 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                  {/* Icon badge — bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${service.accentBg} flex items-center justify-center backdrop-blur-sm border border-white/10`}
                    >
                      <IconComp
                        className={`w-5 h-5 ${service.accentText}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Text block */}
                <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <span
                      className={`text-xs font-mono uppercase tracking-wider ${service.accentText} block mb-1.5`}
                    >
                      {service.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-5 font-normal line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#6b7487] dark:text-[#7a8296]">
                      Learn more
                    </span>
                    <div className="inline-flex items-center gap-1 font-medium text-[#315EFA] group-hover:translate-x-0.5 transition-transform duration-150">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Show More CTA ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white text-sm font-medium transition-colors duration-150 shadow-sm group cursor-pointer active:scale-[0.97]"
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
