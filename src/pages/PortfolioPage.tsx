import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../lib/useSiteData";
import { 
  Play, 
  X, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Star,
  Quote,
  Film
} from "lucide-react";

const ALL_LABEL = "All Projects";

function extractCategories(items: PortfolioItem[]): string[] {
  const seen = new Set<string>();
  items.forEach((p) => {
    if (p.category) seen.add(p.category);
  });
  return [ALL_LABEL, ...Array.from(seen)];
}

const portfolioBreadcrumbs = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://motionly.media/portfolio" },
    ]},
    {
      "@type": "CollectionPage",
      name: "Motionly Media Video Portfolio",
      description: "Explore Motionly Media's portfolio of high-retention video editing, SaaS product walk-throughs, 3D motion design, and commercial case studies.",
      url: "https://motionly.media/portfolio",
    }
  ]
};

const PortfolioPage: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;

  const categories = useMemo(() => extractCategories(portfolio), [portfolio]);
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return portfolio.filter((p) => {
      const matchesCategory = activeCategory === ALL_LABEL || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [portfolio, activeCategory, searchQuery]);

  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    title: string;
    category?: string;
  } | null>(null);

  // Keyboard navigation & body scroll lock for theater modal UX
  useEffect(() => {
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
    <Layout>
      <SEO
        title="Video Portfolio & Production Archive | Motionly Media"
        description="Explore Motionly Media's selected video works: B2B SaaS explainers, founder personal branding, 3D motion design, and commercial campaigns."
        url="https://motionly.media/portfolio"
        schema={portfolioBreadcrumbs}
      />

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-[650px] left-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[130px] -z-10" 
        />

        {/* =========================================================================
            1. EDITORIAL HERO HEADER
        ========================================================================= */}
        <section className="relative pt-6 sm:pt-12 pb-14 sm:pb-20 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span className="text-[#38bdf8] font-bold uppercase tracking-wider">Selected Works &amp; Production Archive</span>
                </div>

                <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                  What We Create.
                  <span className="block font-serif italic font-normal text-[#38bdf8] mt-1">
                    High-retention video showcase.
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                  Different ideas. Different audiences. One creative standard. Browse our SaaS explainers, brand commercials, motion graphics, and founder personal branding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_25px_rgba(49,94,250,0.35)] transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-colors"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Total Impact</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">100M+</p>
                <p className="text-xs text-slate-400 mt-0.5">Audience views generated</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Global Clientele</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">50+</p>
                <p className="text-xs text-slate-400 mt-0.5">Venture-backed brands</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">On-Time SLA</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">98%</p>
                <p className="text-xs text-slate-400 mt-0.5">5–7 day first cut delivery</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Master Delivery</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">4K UHD</p>
                <p className="text-xs text-slate-400 mt-0.5">ProRes 422HQ &amp; raw project IP</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PORTFOLIO SHOWCASE GRID & FILTER TABS
        ========================================================================= */}
        <section className="py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Filter Pills & Interactive Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer shrink-0 active:scale-95 ${
                        isActive
                          ? "text-[#070b14] font-bold"
                          : "text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="portfolio-active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)] -z-10"
                        />
                      )}
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Keyword Search */}
              <div className="w-full md:w-64 relative shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  aria-label="Search projects"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            {/* Project Count Indicator */}
            <div className="flex items-center justify-between mb-6 text-xs font-mono text-slate-400">
              <span>Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#38bdf8] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* 3-Column Video Card Grid */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <Film className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No projects found</h3>
                <p className="text-sm text-slate-400 mt-1">Try selecting a different category or clearing your search term.</p>
                <button
                  type="button"
                  onClick={() => { setActiveCategory(ALL_LABEL); setSearchQuery(""); }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, idx) => {
                    const rawId = project.videoId || "";
                    const match = rawId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
                    const cleanVideoId = match ? match[1] : rawId;

                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: Math.min(idx * 0.02, 0.1) }}
                      >
                        <motion.div
                          whileHover={{ y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.05] transition-colors duration-300 flex flex-col justify-between"
                        >
                          {/* Video Thumbnail Box */}
                          <button
                            type="button"
                            className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer block text-left border-0 p-0"
                            onClick={() =>
                              setActiveVideo({
                                videoId: cleanVideoId,
                                title: project.title,
                                category: project.category,
                              })
                            }
                            aria-label={`Play showcase video: ${project.title}`}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`}
                              alt={project.title}
                              width={640}
                              height={360}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-[opacity,transform] duration-500 ease-out"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`;
                              }}
                            />

                            {/* Category Badge on Video */}
                            {project.category && (
                              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#38bdf8] border border-white/10">
                                  {project.category}
                                </span>
                              </div>
                            )}

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/90 text-slate-950 group-hover:bg-[#38bdf8] group-hover:text-black group-hover:scale-110 shadow-2xl flex items-center justify-center transition-all duration-300">
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                              </div>
                            </div>
                          </button>

                          {/* Card Info Details */}
                          <div className="p-5 sm:p-6 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors line-clamp-1">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                  {project.description}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveVideo({
                                  videoId: cleanVideoId,
                                  title: project.title,
                                  category: project.category,
                                })
                              }
                              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/20 shrink-0 transition-colors cursor-pointer"
                              aria-label={`Open video player for ${project.title}`}
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            3. FEATURED CLIENT PROOF
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-t border-b border-white/[0.08] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-md relative overflow-hidden">
              <Quote className="w-16 h-16 text-white/5 absolute top-6 right-8 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#315EFA] to-[#38bdf8] p-1 shrink-0 shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-[#070b14] flex items-center justify-center text-2xl font-black text-white">
                    SD
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
                    &ldquo;Felt like we hired in-house, not an agency. Big difference. Pacing, sound design, and narrative clarity were spot on from cut one.&rdquo;
                  </blockquote>
                  <p className="text-sm font-bold text-white mt-4">
                    Sean Dorje <span className="text-slate-400 font-normal">• Founder at Naive</span>
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10 shrink-0 transition-colors"
                >
                  Work With Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. BOTTOM STRATEGIC CTA
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center">
          <div className="pointer-events-none transform-gpu will-change-transform absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-3">
              YOUR PRODUCTION BRIEF
            </p>
            <h2 className="text-3xl sm:text-6xl font-bold text-white tracking-tight mb-4">
              Have an upcoming product launch <span className="font-serif italic font-normal text-[#38bdf8]">or campaign?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Book a 30-minute scoping call. We&apos;ll walk through references, discuss creative direction, and quote turnaround times for your team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_30px_rgba(49,94,250,0.4)] transition-all duration-150 active:scale-[0.98]"
              >
                <span>Book 30-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-colors"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            THEATER VIDEO MODAL (With Keyboard Trap & Backdrop UX)
        ========================================================================= */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
              onClick={() => setActiveVideo(null)}
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.02]">
                  <div>
                    {activeVideo.category && (
                      <span className="text-[10px] font-mono font-bold uppercase text-[#38bdf8]">
                        {activeVideo.category}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Video Iframe with high-performance parameters */}
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default PortfolioPage;
