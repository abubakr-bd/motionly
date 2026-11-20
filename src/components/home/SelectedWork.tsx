import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection, type PortfolioItem, DEFAULT_PORTFOLIO } from "../../lib/useSiteData";
import { Play, ArrowUpRight, X } from "lucide-react";

const getLabels = (labels?: string | string[]): string[] => {
  if (Array.isArray(labels)) return labels;
  if (typeof labels === "string" && labels.trim()) return labels.split(",").map((s) => s.trim());
  return [];
};

export const SelectedWork: React.FC = () => {
  const { items: fetchedItems } = useCollection<PortfolioItem>("portfolio");
  const portfolio = fetchedItems && fetchedItems.length > 0 ? fetchedItems : DEFAULT_PORTFOLIO;
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);

  const items: PortfolioItem[] = portfolio.slice(0, 6);

  return (
    <section 
      id="work" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#2563eb] mb-3">
            Selected projects / 2025—2026
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
            Made with purpose, built to be remembered
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            A selection of visual stories, product experiences, and creative projects we&apos;ve brought to life
          </p>
        </div>

        {/* Asymmetrical Gallery */}
        <div className="space-y-6 sm:space-y-8 mb-12">
          {/* Row 1: Featured Hero Project (Bolto) - Wide Landscape */}
          {items[0] && (
            <div className="rounded-2xl overflow-hidden bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div 
                  className="lg:col-span-7 relative aspect-video bg-[#07080d] overflow-hidden cursor-pointer group"
                  onClick={() => setActiveVideo({ videoId: items[0].videoId, title: items[0].title })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveVideo({ videoId: items[0].videoId, title: items[0].title })}
                  aria-label={`Play ${items[0].title} project video`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${items[0].videoId}/maxresdefault.jpg`}
                    alt={items[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#07080d]/35 group-hover:bg-[#07080d]/20 transition-colors duration-150 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-md">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#07080d]/80 text-[11px] font-mono text-[#a3a9b8] border border-white/[0.08]">
                    01 Featured
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-mono text-[#2563eb] mb-2">
                      {items[0].category || "SaaS & Technology"}
                    </div>
                    <h3 className="text-2xl font-medium text-[#111827] dark:text-[#eef0f5] mb-2.5">
                      {items[0].title}
                    </h3>
                    <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6">
                      {items[0].description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {getLabels(items[0].labels).map((label: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#eceff4] dark:bg-[#1a1e28] text-xs font-mono text-[#4b5565] dark:text-[#a3a9b8]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo({ videoId: items[0].videoId, title: items[0].title })}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer w-fit"
                  >
                    <span>Watch case video</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Row 2: Two Columns (ClickUp & Apple SaaS Explainer) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {items.slice(1, 3).map((item: PortfolioItem, index: number) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] flex flex-col justify-between shadow-xs"
              >
                <div 
                  className="relative aspect-video bg-[#07080d] overflow-hidden cursor-pointer group"
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveVideo({ videoId: item.videoId, title: item.title })}
                  aria-label={`Play ${item.title} video`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#07080d]/35 group-hover:bg-[#07080d]/20 transition-colors duration-150 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-md">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#07080d]/80 text-[11px] font-mono text-[#a3a9b8] border border-white/[0.08]">
                    0{index + 2} {index === 0 ? "Motion design" : "Product explainer"}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[#111827] dark:text-[#eef0f5] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {getLabels(item.labels).slice(0, 2).map((l: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-[#eceff4] dark:bg-[#1a1e28] font-mono text-[#4b5565] dark:text-[#a3a9b8]">
                          {l}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                      className="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer"
                    >
                      Play video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Three Cards (Personal Branding & Commercials) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {items.slice(3, 6).map((item: PortfolioItem, index: number) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] flex flex-col justify-between shadow-xs"
              >
                <div 
                  className="relative aspect-video bg-[#07080d] overflow-hidden cursor-pointer group"
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveVideo({ videoId: item.videoId, title: item.title })}
                  aria-label={`Play ${item.title} video`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#07080d]/35 group-hover:bg-[#07080d]/20 transition-colors duration-150 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#07080d]/80 text-[10px] font-mono text-[#a3a9b8] border border-white/[0.08]">
                    0{index + 4}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#2563eb] block mb-1">
                      {item.category || "Commercial work"}
                    </span>
                    <h3 className="text-base font-medium text-[#111827] dark:text-[#eef0f5] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    className="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors cursor-pointer text-left w-fit"
                  >
                    View project &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA: 44px Height, 8px Radius, Sentence Case */}
        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg bg-[#ffffff] dark:bg-[#11141c] hover:bg-[#eceff4] dark:hover:bg-[#1a1e28] text-[#111827] dark:text-[#eef0f5] text-sm font-medium border border-black/[0.08] dark:border-[#eef0f5]/[0.08] transition-colors duration-150 active:scale-[0.98]"
          >
            <span>Explore all projects</span>
            <ArrowUpRight className="w-4 h-4 text-[#6b7487] dark:text-[#7a8296]" />
          </Link>
        </div>
      </div>

      {/* Video Lightbox Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07080d]/90 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/[0.12] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-[#11141c]/90 hover:bg-[#1a1e28] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Close video player"
            >
              <X className="w-4 h-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
