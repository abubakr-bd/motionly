import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useCollection, DEFAULT_PORTFOLIO, type PortfolioItem } from "../lib/useSiteData";
import { ArrowLeft, ArrowRight, Play, CheckCircle2, Film, Layers, Sparkles } from "lucide-react";

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
          title="Project Not Found | Motionly Media"
          description="The requested video project could not be found. Explore our full portfolio."
        />
        <div className="py-32 container max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Case study not found</h1>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            The project you are looking for may have been updated or moved.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> View full portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName = item.category || "Video Production";
  const projectTitle = item.title ? item.title.trim() : "Motionly Video Project";
  const pageTitle = `${projectTitle} | Video Case Study | Motionly Media`;
  const pageDescription = `Explore the ${projectTitle} video production and editing case study by Motionly Media. High-retention cuts, audio mastering, and creative direction.`;

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
        thumbnailUrl: `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${item.videoId}`,
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
      ? item.labels.split(",").map((l) => l.trim()).filter(Boolean)
      : [];

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        url={`https://motionly.media/portfolio/${item.id}`}
        image={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
        type="video.other"
        schema={schema}
      />

      {/* Hero Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-slate-900 text-white">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Case Studies
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">{categoryName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {projectTitle}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            A high-retention video production designed, edited, and packaged by Motionly Media. Engineered to capture attention, communicate value, and maximize viewer retention.
          </p>
        </div>
      </section>

      {/* Video Showcase Player */}
      <section className="py-12 md:py-16 bg-slate-950">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-2xl aspect-video ring-1 ring-white/10">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              title={`${projectTitle} - Motionly Media Case Study`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Case Study Details & Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left 2 Cols: Editorial & Creative Breakdown */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                  <Film className="w-6 h-6 text-blue-600" /> Project Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-4">
                  For this {categoryName.toLowerCase()} release, our objective was to maintain viewer engagement through precise editorial pacing, audio design, and narrative clarity. By tailoring the visual energy to the target audience, the video reinforces key ideas without unnecessary filler.
                </p>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Every transition, sound cue, and text animation was crafted to support the core message—ensuring the video feels effortless to watch while driving high viewer retention.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-600" /> Editorial Techniques Applied
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-1">Retention Pacing</h3>
                    <p className="text-sm text-slate-600">Calculated cuts and motion rhythm that eliminate dead air and keep the brain active.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-1">Cinematic Sound Design</h3>
                    <p className="text-sm text-slate-600">Layered Foley, whooshes, atmospheric audio, and clean voice equalization.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-1">Kinetic Typography</h3>
                    <p className="text-sm text-slate-600">Styled on-screen motion graphics to emphasize critical takeaways.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-1">Color Finishing</h3>
                    <p className="text-sm text-slate-600">Color harmony and grading suited to the creator or brand's visual identity.</p>
                  </div>
                </div>
              </div>

              {labels.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">Project Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {labels.map((lbl, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Services & Context Card */}
            <div className="space-y-8">
              <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" /> Services Utilized
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Link to="/services" className="hover:text-blue-600 transition-colors">
                      High-Retention Video Editing
                    </Link>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Link to="/services" className="hover:text-blue-600 transition-colors">
                      Sound Design &amp; Voice Mastering
                    </Link>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Link to="/services" className="hover:text-blue-600 transition-colors">
                      Custom Motion Graphics
                    </Link>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Link to="/services" className="hover:text-blue-600 transition-colors">
                      Creative Direction &amp; Packaging
                    </Link>
                  </li>
                </ul>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-4">Want similar results for your channel or brand?</p>
                  <Link
                    to="/contact"
                    className="block w-full py-3 px-5 text-center bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Start a Project
                  </Link>
                </div>
              </div>

              {/* Internal Links Navigation */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Explore More</h4>
                <div className="space-y-2 text-sm">
                  <Link to="/portfolio" className="block text-slate-600 hover:text-blue-600 transition-colors">
                    ← All Video Case Studies
                  </Link>
                  <Link to="/services" className="block text-slate-600 hover:text-blue-600 transition-colors">
                    → Our Full Services Menu
                  </Link>
                  <Link to="/about" className="block text-slate-600 hover:text-blue-600 transition-colors">
                    → About Motionly Media
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next Navigation Bar */}
          <div className="mt-16 pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevItem ? (
              <Link
                to={`/portfolio/${prevItem.id}`}
                className="group inline-flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-slate-400">Previous Case Study</span>
                  <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{prevItem.title}</span>
                </div>
              </Link>
            ) : <div />}

            {nextItem ? (
              <Link
                to={`/portfolio/${nextItem.id}`}
                className="group inline-flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <div className="text-right">
                  <span className="block text-xs text-slate-400">Next Case Study</span>
                  <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{nextItem.title}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectCaseStudy;
