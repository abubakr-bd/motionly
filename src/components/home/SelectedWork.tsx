import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight } from "lucide-react";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";

/* ------------------------------------------------------------------ */
/*  Category filter tabs                                               */
/* ------------------------------------------------------------------ */
const ALL_LABEL = "All";

function extractCategories(items: PortfolioItem[]): string[] {
  const seen = new Set<string>();
  items.forEach((p) => {
    if (p.category) seen.add(p.category);
  });
  return [ALL_LABEL, ...Array.from(seen)];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio =
    fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;

  const categories = useMemo(() => extractCategories(portfolio), [portfolio]);
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);

  const filtered = useMemo(() => {
    if (activeCategory === ALL_LABEL) return portfolio;
    return portfolio.filter((p) => p.category === activeCategory);
  }, [portfolio, activeCategory]);

  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    title: string;
    category?: string;
  } | null>(null);

  // Keyboard navigation & body scroll lock for theater modal UX
  React.useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeVideo]);

  return (
    <section
      id="work"
      className="py-20 sm:py-28 bg-[#0a0e17] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Port<span className="text-[#38d9d9] italic font-serif font-normal">folio</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8a8f9e] max-w-xl mx-auto leading-relaxed">
            SaaS explainers, brand commercials, motion graphics, and personal branding.
            One&nbsp;studio behind every frame.
          </p>
        </div>

        {/* ── Category Filter Tabs (Swipeable on Mobile, Centered on Desktop) ── */}
        <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 mb-8 sm:mb-14 overflow-x-auto no-scrollbar py-1 px-4 sm:px-0 -mx-4 sm:mx-0 snap-x">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer shrink-0 snap-center active:scale-95 ${
                  isActive
                    ? "text-[#0a0e17] font-semibold"
                    : "text-[#a3a9b8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="selectedwork-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#38d9d9] shadow-sm -z-10"
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── 3-Column Portfolio Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1], delay: idx * 0.04 }}
              >
                <PortfolioCard
                  project={project}
                  isAboveFold={idx < 3}
                  onPlay={() =>
                    setActiveVideo({
                      videoId: project.videoId,
                      title: project.title,
                      category: project.category,
                    })
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── View All Link ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm font-medium text-white hover:bg-white/[0.1] transition-colors duration-150 group cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* ── Video Modal Player with Apple Spring Physics ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-5xl bg-[#0c101d] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10 text-white">
                <div>
                  <span className="text-xs font-mono text-[#38d9d9] block">
                    {activeVideo.category || "Project Video"}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {activeVideo.title}
                  </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Portfolio Card                                                     */
/* ------------------------------------------------------------------ */
interface PortfolioCardProps {
  project: PortfolioItem;
  isAboveFold?: boolean;
  onPlay: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, isAboveFold, onPlay }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onClick={onPlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Watch ${project.title}`}
      className="group cursor-pointer flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#141822]">
        {/* Skeleton pulse while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-[#1a1f2e] animate-pulse" />
        )}
        <img
          src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          width="640"
          height="360"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
            setImgLoaded(true);
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-200" />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1a2235]/80 backdrop-blur-sm text-[#38d9d9] border border-[#38d9d9]/20">
            {project.category || "Video"}
          </span>
        </div>

        {/* Featured badge — top right (first 2 items) */}
        {project.order <= 2 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#38d9d9]/15 backdrop-blur-sm text-[#38d9d9] border border-[#38d9d9]/25">
              ★ Featured
            </span>
          </div>
        )}

        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-[#38d9d9] text-[#0a0e17] flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-150">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Meta: title + play link */}
      <div className="flex items-start justify-between mt-3.5 px-0.5">
        <h3 className="text-sm sm:text-base font-semibold text-white/90 leading-snug pr-4 group-hover:text-white transition-colors duration-150">
          {project.title}
        </h3>
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#38d9d9] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 mt-0.5 flex items-center gap-1">
          Play <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export default SelectedWork;
