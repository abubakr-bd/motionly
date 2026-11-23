import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";

export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;
  
  // Curated showcase projects
  const selectedProjects = portfolio.slice(0, 5);
  const featuredLead = selectedProjects[0] || DEFAULT_PORTFOLIO[0];
  const gridProjects = selectedProjects.slice(1);

  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string; category?: string } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 01. Masked Header Entrance
      if (titleLineRef.current) {
        gsap.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 02. Frictionless Viewport Reveal (No pinning, no trapping)
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 20, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            delay: (idx % 2) * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedProjects.length]);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="py-20 sm:py-28 bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-3">
              <span className="block overflow-hidden pb-1">
                <span ref={titleLineRef} className="inline-block will-change-transform">
                  Work that moves audiences.
                </span>
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
              A curated selection of SaaS product explainers, commercial brand films, and high-retention video systems built for international teams.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] dark:hover:text-[#315EFA] transition-colors shrink-0 group self-start md:self-end cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 01. Flagship Lead Project Card (Design Monks Style Asymmetric Bento Hero) */}
        {featuredLead && (
          <div 
            ref={(el) => { cardsRef.current[0] = el; }}
            onClick={() => setActiveVideo({ videoId: featuredLead.videoId, title: featuredLead.title, category: featuredLead.category })}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] shadow-md hover:shadow-xl hover:border-[#315EFA]/40 transition-all duration-200 cursor-pointer mb-8 sm:mb-10"
            role="button"
            tabIndex={0}
            aria-label={`Watch ${featuredLead.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveVideo({ videoId: featuredLead.videoId, title: featuredLead.title, category: featuredLead.category });
              }
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Large Visual Thumbnail (7 cols) */}
              <div className="lg:col-span-7 relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${featuredLead.videoId}/maxresdefault.jpg`}
                  alt={featuredLead.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featuredLead.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />
                
                {/* Center Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#315EFA] text-white flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform duration-150">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Corner Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-black/75 backdrop-blur-md text-white border border-white/10">
                    {featuredLead.category || "Featured Case Study"}
                  </span>
                </div>
              </div>

              {/* Editorial Info Block (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#315EFA] mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA]" />
                    <span>Lead Showcase</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-3 leading-snug">
                    {featuredLead.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                    {featuredLead.description || "A complete visual product narrative engineered to clarify complex capabilities and drive user conversion."}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6b7487] dark:text-[#7a8296]">
                    4K Master &bull; ProRes 422HQ
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-medium text-[#315EFA] group-hover:translate-x-0.5 transition-transform duration-150">
                    <span>Watch Film</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 02. Secondary 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {gridProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index + 1] = el; }}
              onClick={() => setActiveVideo({ videoId: project.videoId, title: project.title, category: project.category })}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] shadow-md hover:shadow-xl hover:border-[#315EFA]/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              aria-label={`Watch ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveVideo({ videoId: project.videoId, title: project.title, category: project.category });
                }
              }}
            >
              {/* Visual Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />
                
                {/* Corner Category Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/75 backdrop-blur-md text-white border border-white/10">
                    {project.category || "Video Showcase"}
                  </span>
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-xl bg-[#315EFA] text-white flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform duration-150">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Project Meta Information */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-5 font-normal line-clamp-2">
                    {project.description || "Video production, motion graphics, and creative direction engineered for commercial engagement."}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6b7487] dark:text-[#7a8296]">
                    Case Study &bull; 4K Master
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#315EFA] group-hover:translate-x-0.5 transition-transform duration-150">
                    <span>Watch Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-5xl bg-[#0c101d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10 text-white">
                <div>
                  <span className="text-xs font-mono text-[#315EFA] block">{activeVideo.category || "Project Video"}</span>
                  <span className="text-sm sm:text-base font-medium">{activeVideo.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
                  aria-label="Close project player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectedWork;
