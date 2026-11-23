import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight } from "lucide-react";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";

export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;
  
  // Select top 5 featured projects
  const selectedProjects = portfolio.slice(0, 5);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string; category?: string } | null>(null);

  const featuredLead = selectedProjects[0] || DEFAULT_PORTFOLIO[0];
  const gridProjects = selectedProjects.slice(1);

  return (
    <section 
      id="work" 
      className="py-24 sm:py-32 bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-3">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
              Work that moves audiences.
            </h2>
            <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
              A curated selection of SaaS product explainers, commercial brand films, and high-retention video systems built for international teams.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] dark:hover:text-[#315EFA] transition-colors shrink-0 group self-start md:self-end"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 01. Flagship Lead Project */}
        {featuredLead && (
          <div 
            onClick={() => setActiveVideo({ videoId: featuredLead.videoId, title: featuredLead.title, category: featuredLead.category })}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer mb-10 sm:mb-14"
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
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featuredLead.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Center Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#315EFA] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Editorial Info Block (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#0c101d] text-[#111827] dark:text-[#eef0f5]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-medium text-[#315EFA] uppercase tracking-wider">
                      {featuredLead.category || "SaaS & Technology"}
                    </span>
                    <span className="text-black/20 dark:text-white/20">&bull;</span>
                    <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                      Featured Project
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-4 leading-snug">
                    {featuredLead.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                    {featuredLead.description || "A complete visual product narrative engineered to clarify complex capabilities and drive user conversion."}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                    Click to play preview
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#315EFA] group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Film</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 02. Secondary Editorial Grid (Large 2-Column Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {gridProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveVideo({ videoId: project.videoId, title: project.title, category: project.category })}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.1] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
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
              {/* Large Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Corner Category Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/70 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-xl bg-[#315EFA] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Project Meta */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] mb-2.5 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6 font-normal">
                    {project.description || "Video production and creative direction engineered for commercial engagement."}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6b7487] dark:text-[#7a8296]">
                    Case Study &bull; 4K Video
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
              {/* Header */}
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
