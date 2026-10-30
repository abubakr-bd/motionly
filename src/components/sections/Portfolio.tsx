import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";
import { Play, X, Monitor, Rocket, Users2, Sparkles, Film, ArrowUpRight } from "lucide-react";

type PortfolioProps = { limit?: number };

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "All Projects": Sparkles,
  "all": Sparkles,
  "SaaS & Technology": Monitor,
  "Personal Branding": Users2,
  "Commercial & Brand Videos": Film,
  "Creative & Motion Graphics": Rocket,
  "Others": Film,
};

const VideoCard = React.memo(({
  item,
  index,
  onSelect,
}: {
  item: PortfolioItem;
  index: number;
  onSelect: (item: PortfolioItem) => void;
}) => {
  const reduceMotion = useReducedMotion();

  const videoId = useMemo(() => {
    if (!item.videoId) return "";
    const match = item.videoId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : item.videoId;
  }, [item.videoId]);

  return (
    <motion.div
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      {/* Video Card - Pure Work Showcase with Category Badge & Play Button */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 aspect-video ring-1 ring-slate-200 dark:ring-white/10 hover:ring-blue-500/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.22)] dark:hover:shadow-[0_0_50px_rgba(37,99,235,0.35)] transition-all duration-500 cursor-pointer block text-left"
        aria-label={`Open and play video: ${item.title || "Showcase work"}`}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={item.title ? `${item.title} - Motionly Media showcase` : "Video thumbnail"}
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />

        {/* Category badge on video */}
        {item.category && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-slate-100 border border-white/10 shadow-sm">
              {item.category}
            </span>
          </div>
        )}

        {/* Play Icon with Radial Glow */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-3 rounded-full bg-blue-500/25 blur-md group-hover:scale-125 transition-transform duration-300" />
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 group-hover:bg-white text-blue-600 dark:bg-[#0B1020]/90 dark:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 backdrop-blur-md border border-white/30 dark:border-blue-400/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
});

VideoCard.displayName = "VideoCard";

export const Portfolio = ({ limit }: PortfolioProps) => {
  const { items, loading } = useCollection<PortfolioItem>("portfolio");
  const [filter, setFilter] = useState("all");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const allItems = items && items.length > 0 ? items : DEFAULT_PORTFOLIO;

  const categories = useMemo(() => {
    const standardCats = [
      "SaaS & Technology",
      "Personal Branding",
      "Commercial & Brand Videos",
      "Creative & Motion Graphics",
    ];
    const found = new Set<string>();
    standardCats.forEach((c) => found.add(c));
    allItems.forEach((i) => {
      if (i.category?.trim()) found.add(i.category.trim());
    });
    return ["all", ...Array.from(found)];
  }, [allItems]);

  const filteredItems = useMemo(() => {
    if (filter === "all") return allItems;
    return allItems.filter(
      (item) => (item.category || "").toLowerCase() === filter.toLowerCase()
    );
  }, [allItems, filter]);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const activeVideoId = useMemo(() => {
    if (!activeItem?.videoId) return "";
    const match = activeItem.videoId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : activeItem.videoId;
  }, [activeItem]);

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };

    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <section id="work" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-3">
            What We Create.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
            Different ideas. Different audiences. One creative standard.
          </p>
        </div>

        {/* Tabbed Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2.5 sm:gap-3 pb-4 mb-10 sm:mb-14 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = filter.toLowerCase() === cat.toLowerCase();
            const IconComponent = categoryIcons[cat] || categoryIcons["Others"];
            const label = cat === "all" ? "All Projects" : cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border border-blue-400/40 dark:shadow-[0_0_25px_rgba(37,99,235,0.35)]"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold border border-slate-300/80 dark:bg-[#090D1A]/90 dark:text-slate-200 dark:hover:text-white dark:hover:bg-[#0E1528] dark:border-white/10 dark:hover:border-blue-500/30"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-600 dark:text-slate-400"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Video Grid - Pure Work Cards with No Titles/Summaries */}
        <div className="min-h-[400px]">
          {loading && allItems.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : displayedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayedItems.map((item, index) => (
                  <VideoCard
                    key={item.id || index}
                    item={item}
                    index={index}
                    onSelect={(selected) => setActiveItem(selected)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA to View Full Work / Contact */}
        <div className="mt-14 sm:mt-20 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/90 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-white dark:border-white/10 dark:hover:border-blue-500/40 transition-all shadow-sm group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Big Video Popup Modal (Easily Closeable via Backdrop, Escape Key, or Close Button) */}
      <AnimatePresence>
        {activeItem && activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-label="Video player popup"
          >
            {/* Top Close Button (floating for effortless one-click close) */}
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer hover:scale-105 shadow-2xl group"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 ring-1 ring-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)] cursor-default"
            >
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title={activeItem.title || "Motionly Showcase Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
