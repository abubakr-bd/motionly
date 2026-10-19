import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCollection, type PortfolioItem } from "../../lib/useSiteData";

type PortfolioProps = { limit?: number };

const getCategoryLabel = (cat?: string) => cat || "Video";

const VideoCard = React.memo(({ item, index, featured = false }: { item: PortfolioItem; index: number; featured?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playTriggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const closePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
    playTriggerRef.current?.focus();
  };

  return (
    <motion.div
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group flex flex-col gap-4 ${featured ? "col-span-full" : "col-span-1"}`}
    >
      <div className={`relative w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl ${featured ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
        <AnimatePresence mode="wait">
          {isPlaying && item.videoId ? (
            <motion.iframe
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              allowFullScreen
            />
          ) : (
            <motion.button
              key="thumbnail"
              ref={playTriggerRef}
              className="absolute inset-0 w-full h-full text-left"
              onClick={() => setIsPlaying(true)}
              exit={{ opacity: 0 }}
            >
              <img
                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                alt={item.title ? `${item.title} - Video production project by Motionly Media` : "Motionly Media portfolio video thumbnail"}
                width="640"
                height="360"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-500">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 text-blue-600">
                  <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase mb-1">{getCategoryLabel(item.category)}</p>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            <Link to={`/portfolio/${item.id}`} className="hover:underline">
              {item.title || "Video production"}
            </Link>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button onClick={closePlayer} className="text-sm font-medium text-slate-500 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-full transition-colors">
              Close
            </button>
          ) : (
            <Link
              to={`/portfolio/${item.id}`}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-colors shrink-0"
              aria-label={`View ${item.title || "video"} case study`}
            >
              Case study &rarr;
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
});

VideoCard.displayName = "VideoCard";

const Portfolio = ({ limit }: PortfolioProps) => {
  const { items, loading } = useCollection<PortfolioItem>("portfolio");
  const [filter, setFilter] = useState("all");
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.category?.trim()) set.add(i.category.trim());
    });
    const list = Array.from(set);
    return ["all", ...(list.length > 0 ? list : ["Short-form", "Long-form", "Commercial", "YouTube"])];
  }, [items]);

  const filteredItems = filter === "all"
    ? items
    : items.filter((item) => (item.category || "").toLowerCase() === filter.toLowerCase());
  const actualLimit = limit || (isHomepage ? 4 : undefined);
  const displayedItems = actualLimit ? filteredItems.slice(0, actualLimit) : filteredItems;

  return (
    <section className="py-24 md:py-32 bg-white" id="work">
      <div className="container max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">Selected work</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Video with a <span className="text-slate-400">point of view.</span></h2>
          </div>
          
          {!limit && (
            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === cat ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
          ) : displayedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500"><p>No projects in this category.</p></div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {displayedItems.map((item, index) => (
                  <VideoCard key={item.id} item={item} index={index} featured={isHomepage && index === 0} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {isHomepage && filteredItems.length > (actualLimit ?? 0) && (
          <div className="mt-20 text-center">
            <Link to="/portfolio" className="inline-block px-8 py-4 bg-slate-50 text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors shadow-sm ring-1 ring-slate-900/5">
              View full portfolio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
