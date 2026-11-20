import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useCollection, DEFAULT_PORTFOLIO, type PortfolioItem } from "../lib/useSiteData";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  CheckCircle2,
  Film,
  Layers,
  Sparkles,
  Sliders,
  Tv,
  Check
} from "lucide-react";

export const ProjectCaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items: allItems } = useCollection<PortfolioItem>("portfolio");

  // Merge Firestore items with default portfolio fallback
  const items = useMemo(() => {
    return allItems.length > 0 ? allItems : DEFAULT_PORTFOLIO;
  }, [allItems]);

  // Find current item
  const itemIndex = items.findIndex((p) => p.id === id);
  const item = itemIndex !== -1 ? items[itemIndex] : DEFAULT_PORTFOLIO.find((p) => p.id === id);

  const prevItem = itemIndex > 0 ? items[itemIndex - 1] : null;
  const nextItem = itemIndex >= 0 && itemIndex < items.length - 1 ? items[itemIndex + 1] : null;

  if (!item) {
    return (
      <Layout>
        <SEO
          title="Case Study Not Found | Motionly Media"
          description="The requested video project could not be found. Explore our full portfolio."
        />
        <div className="py-32 container max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Case study not found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            The project you are looking for may have been updated or moved.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> View full portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName = item.category || "Video Production";
  const projectTitle = item.title ? item.title.trim() : "Motionly Video Project";
  const pageTitle = `${projectTitle} | Case Study | Motionly Media`;
  const pageDescription = `Explore the ${projectTitle} video production and editing case study by Motionly Media. High-retention cuts, audio mastering, and creative direction.`;

  const videoId = useMemo(() => {
    if (!item.videoId) return "";
    const match = item.videoId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : item.videoId;
  }, [item.videoId]);

  // Schema for VideoObject & Breadcrumbs
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://motionly.media/portfolio" },
          { "@type": "ListItem", position: 3, name: projectTitle, item: `https://motionly.media/portfolio/${item.id}` }
        ]
      },
      {
        "@type": "VideoObject",
        name: `${projectTitle} | Motionly Media Case Study`,
        description: pageDescription,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        uploadDate: "2025-01-01T00:00:00Z",
        publisher: {
          "@type": "Organization",
          name: "Motionly Media",
          url: "https://motionly.media/",
          logo: {
            "@type": "ImageObject",
            url: "https://motionly.media/nav_logo.webp"
          }
        }
      }
    ]
  };

  const labels = Array.isArray(item.labels)
    ? item.labels
    : typeof item.labels === "string"
      ? (item.labels as string).split(",").map((l) => l.trim()).filter(Boolean)
      : [];

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        url={`https://motionly.media/portfolio/${item.id}`}
        image={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        type="video.other"
        schema={schema}
      />

      <div className="bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
        {/* =========================================================================
            1. HERO & BREADCRUMBS
        ========================================================================= */}
        <section className="pt-12 sm:pt-20 pb-8 sm:pb-12 border-b border-slate-200/80 dark:border-white/10">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono mb-4 text-slate-500 dark:text-slate-400">
              <Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </Link>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">{categoryName}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                  {projectTitle}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                  {item.description || "A high-retention video production designed, edited, and packaged by Motionly Media. Engineered to capture attention, communicate value, and maximize viewer retention."}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all duration-150 active:scale-[0.98]"
                >
                  <span>Build A Video Like This</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. THEATER VIDEO PLAYER
        ========================================================================= */}
        <section className="py-10 sm:py-16 bg-slate-950">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl aspect-video ring-1 ring-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title={`${projectTitle} - Motionly Media Case Study`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CREATIVE & EDITORIAL BREAKDOWN
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column (8 cols): The Strategy & Techniques */}
              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-3 flex items-center gap-2.5">
                    <Film className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Creative Objective &amp; Approach
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                    For this {categoryName.toLowerCase()} production, our objective was to eliminate viewer drop-off within the first 10 seconds and maintain high engagement through deliberate editorial pacing, acoustic sound design, and crisp visual storytelling.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    By tailoring the motion rhythm to the target audience, the video clarifies the core value proposition effortlessly. Every transition, sound cue, and motion graphic was engineered to support comprehension and conversion.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-4 flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Production Techniques Applied
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10">
                      <p className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 mb-1">01</p>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Retention Pacing</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Calculated cuts and motion rhythm that eliminate dead air and keep viewer focus locked on key insights.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10">
                      <p className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 mb-1">02</p>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Layered Sound Design</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Custom Foley, UI clicks, atmospheric sound beds, and broadcast-standard loudness mastering.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10">
                      <p className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 mb-1">03</p>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Kinetic Motion Graphics</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Dynamic on-screen typographic accents and vector UI elements that highlight critical takeaways.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10">
                      <p className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 mb-1">04</p>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Color Harmony &amp; Grade</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Color science tailored to the brand&apos;s identity, ensuring consistent tone across mobile and desktop.
                      </p>
                    </div>
                  </div>
                </div>

                {labels.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                      Production Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {labels.map((lbl, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          {lbl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (4 cols): Meta Card & Fast Scoping Link */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Project Metadata
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-200/80 dark:border-white/10">
                      <span className="text-slate-500 dark:text-slate-400">Category</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{categoryName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/80 dark:border-white/10">
                      <span className="text-slate-500 dark:text-slate-400">Studio Team</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Motionly Creative Squad</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200/80 dark:border-white/10">
                      <span className="text-slate-500 dark:text-slate-400">Deliverables</span>
                      <span className="font-semibold text-slate-900 dark:text-white">4K Master + Social Cuts</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 dark:text-slate-400">Turnaround</span>
                      <span className="font-semibold text-slate-900 dark:text-white font-mono">5 Business Days</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-200/80 dark:border-white/10">
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
                    >
                      <span>Inquire About Similar Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PREV / NEXT CASE STUDY NAVIGATOR
        ========================================================================= */}
        <section className="py-12 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#070B16]">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              {prevItem ? (
                <Link
                  to={`/portfolio/${prevItem.id}`}
                  className="group flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Previous Project</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {prevItem.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {nextItem ? (
                <Link
                  to={`/portfolio/${nextItem.id}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Next Project</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {nextItem.title}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400" />
                  </div>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjectCaseStudy;
