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
  
  // Select top 4 flagship projects for the signature stacked-to-grid animation
  const selectedProjects = portfolio.slice(0, 4);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string; category?: string } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 01. Masked Typography Entrance
      if (!prefersReducedMotion && titleLineRef.current) {
        gsap.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 02. Desktop Stacked-to-Grid Pinned Scrub Animation
      const isDesktop = window.innerWidth >= 1024;

      if (!prefersReducedMotion && isDesktop && sectionRef.current && gridRef.current) {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length >= 4) {
          // Compute exact geometric delta between grid slots so all cards meet at the center
          const rect0 = cards[0].getBoundingClientRect();
          const rect1 = cards[1].getBoundingClientRect();
          const rect2 = cards[2].getBoundingClientRect();

          const deltaX = (rect1.left - rect0.left) / 2;
          const deltaY = (rect2.top - rect0.top) / 2;

          // Initial Stacked Deck: cards centered with subtle rotations and layered depth
          const stackConfigs = [
            { x: deltaX - 6, y: deltaY - 4, rotation: -3, scale: 1, zIndex: 40, opacity: 1 },
            { x: -deltaX + 8, y: deltaY - 8, rotation: 2.8, scale: 0.96, zIndex: 30, opacity: 0.88 },
            { x: deltaX - 10, y: -deltaY - 14, rotation: -2.2, scale: 0.92, zIndex: 20, opacity: 0.75 },
            { x: -deltaX + 6, y: -deltaY - 20, rotation: 3.5, scale: 0.88, zIndex: 10, opacity: 0.6 },
          ];

          // Set starting stacked transform values
          cards.forEach((card, i) => {
            if (stackConfigs[i]) {
              gsap.set(card, {
                x: stackConfigs[i].x,
                y: stackConfigs[i].y,
                rotation: stackConfigs[i].rotation,
                scale: stackConfigs[i].scale,
                zIndex: stackConfigs[i].zIndex,
                opacity: stackConfigs[i].opacity,
                transformOrigin: "center center",
              });
            }
          });

          const metaElements = cards.map((c) => c.querySelector(".project-card-meta"));
          if (metaElements.length) {
            gsap.set(metaElements.slice(1), { opacity: 0.4 });
          }

          // Scrub Timeline
          const scrubTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              start: "top top",
              end: "+=170%",
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Hint fades away immediately on scroll
          if (hintRef.current) {
            scrubTl.to(hintRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" }, 0);
          }

          // Smoothly glide cards from stacked deck to natural 2x2 grid positions
          cards.forEach((card, i) => {
            scrubTl.to(
              card,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
              },
              0
            );
          });

          // Project meta elements fade into full legibility
          if (metaElements.length) {
            scrubTl.to(
              metaElements,
              {
                opacity: 1,
                ease: "power2.out",
              },
              0.2
            );
          }
        }
      } else if (!isDesktop) {
        // Mobile / Tablet Fallback: gentle staggered entrance without pinning
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: idx * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedProjects.length]);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 overflow-hidden"
    >
      <div 
        ref={pinWrapperRef} 
        className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-24 min-h-screen flex flex-col justify-between relative z-10"
      >
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
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
              A curated selection of SaaS product explainers, commercial brand films, and high-retention video systems.
            </p>
          </div>

          <div className="flex items-center gap-6 self-start md:self-end">
            {/* Scroll Hint (Desktop only) */}
            <div ref={hintRef} className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#6b7487] dark:text-[#7a8296] transition-opacity duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA] animate-pulse" />
              <span>Scroll to spread portfolio</span>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] dark:hover:text-[#315EFA] transition-colors shrink-0 group"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 2x2 Grid / Stack Spread Target */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch will-change-transform relative my-auto"
        >
          {selectedProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onClick={() => setActiveVideo({ videoId: project.videoId, title: project.title, category: project.category })}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between will-change-transform"
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
              {/* Large Visual Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Corner Category Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/70 backdrop-blur-md text-white border border-white/10">
                    {project.category || "Video Showcase"}
                  </span>
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-xl bg-[#315EFA] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Project Meta Information */}
              <div className="project-card-meta p-5 sm:p-7 flex-1 flex flex-col justify-between">
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
                  <span className="inline-flex items-center gap-1 font-medium text-[#315EFA] group-hover:translate-x-0.5 transition-transform">
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
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0c101d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10 text-white">
                <div>
                  <span className="text-xs font-mono text-[#315EFA] block">{activeVideo.category || "Project Video"}</span>
                  <span className="text-sm sm:text-base font-medium">{activeVideo.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close project player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed */}
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
