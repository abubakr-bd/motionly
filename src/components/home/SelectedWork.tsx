import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";
import { Play, ArrowUpRight, X, Sparkles } from "lucide-react";

const getLabels = (labels?: string | string[]): string[] => {
  if (Array.isArray(labels)) return labels;
  if (typeof labels === "string" && labels.trim()) return labels.split(",").map((s) => s.trim());
  return [];
};

export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);

  // Group or pick authentic flagship projects
  const items: PortfolioItem[] = portfolio.slice(0, 6);

  return (
    <section 
      id="work" 
      className="py-20 sm:py-32 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 right-1/4 w-[700px] h-[550px] bg-blue-600/10 rounded-full blur-[150px] -z-10" 
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Selected Projects / 2025—2026</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Made With Purpose. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              Built to Be Remembered.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            A selection of visual stories, product experiences, and creative projects we&apos;ve helped bring to life.
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery */}
        <div className="space-y-10 sm:space-y-12 mb-16">
          {/* Row 1: Featured Hero Project (Bolto) - Wide Landscape */}
          {items[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div 
                  className="lg:col-span-7 relative aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo({ videoId: items[0].videoId, title: items[0].title })}
                >
                  <img
                    src={`https://img.youtube.com/vi/${items[0].videoId}/maxresdefault.jpg`}
                    alt={items[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono text-white">
                    4K Video Preview
                  </span>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                        01 / SaaS &amp; Product Films
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                      {items[0].title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                      {items[0].description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {getLabels(items[0].labels).map((label: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo({ videoId: items[0].videoId, title: items[0].title })}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Watch Case Video</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Row 2: Two Asymmetric Columns (ClickUp & Apple SaaS Explainer) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {items.slice(1, 3).map((item: PortfolioItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                <div 
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300">
                    {index === 0 ? "02 / Motion Design" : "03 / Product Explainer"}
                  </span>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {getLabels(item.labels).slice(0, 2).map((l: string, i: number) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                          {l}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                      className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Play
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 3: Split 3-Card Panoramic (Personal Branding & Commercials) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {items.slice(3, 6).map((item: PortfolioItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#0E152E]/80 to-[#070B19]/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div 
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
                      {item.category || "Commercial Work"}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    View Project &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-blue-400/40 transition-all duration-300 active:scale-95 group"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Video Lightbox Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close project video"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectedWork;