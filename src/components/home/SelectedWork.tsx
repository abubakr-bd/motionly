import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";
import { Play, X, ArrowUpRight, Film, Sparkles } from "lucide-react";

const CATEGORIES = [
  "All Projects",
  "SaaS & Technology",
  "Personal Branding",
  "Commercial & Brand Videos",
  "Creative & Motion Graphics",
];

export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string; category?: string } | null>(null);

  const filteredItems = portfolio.filter((item) => {
    if (selectedCategory === "All Projects") return true;
    return item.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section 
      id="work" 
      className="py-24 sm:py-32 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: User Exact Positioning Copy */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4">
            What We Create.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Different ideas. Different audiences. One creative standard.
          </p>
        </div>

        {/* Interactive Category Filter Pills with Emil Kowalski layoutId sliding pill */}
        <div className="flex flex-wrap items-center gap-2 mb-12 sm:mb-16 p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] w-fit">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  isSelected ? "text-white dark:text-slate-950" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-[#111827] dark:bg-white shadow-sm"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Work Grid: Focused on Visual Craft without Clutter */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title, category: item.category })}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-black/[0.08] dark:border-white/[0.1] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-video"
              >
                {/* Video Cover Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                  }}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:via-black/10 transition-colors" />

                {/* Top Badge: Category */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    {item.category || "Creative Production"}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Center Magnetic Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All In Portfolio Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Want to see our full client archive?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
              Explore in-depth case studies, client results, and technical breakdown reels.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white dark:bg-white dark:text-[#07080d] font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
          >
            <span>Explore All Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Pop-up Video Modal: Clean, Accessible & Easily Closeable */}
      <AnimatePresence>
        {activeVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-white/10 text-white">
                <div className="flex items-center gap-2.5 min-w-0 pr-4">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shrink-0" />
                  <span className="text-sm font-bold truncate">{activeVideo.title}</span>
                  {activeVideo.category && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300 shrink-0">
                      {activeVideo.category}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Responsive Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
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
