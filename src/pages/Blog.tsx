import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type BlogItem, DEFAULT_BLOGS } from "../lib/useSiteData";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { 
  Search, 
  ArrowRight, 
  ArrowUpRight, 
  BookOpen, 
  User,
  X
} from "lucide-react";

const excerpt = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const cardBlueprints: Record<string, { tagline: string; icon: string }> = {
  "saas-launch-video-guide": { tagline: "One workflow. A clear story.", icon: "layers" },
  "founder-led-video-growth": { tagline: "Make the expert visible.", icon: "user" },
  "3d-motion-graphics-software-demos": { tagline: "Turn a feature into a reason.", icon: "cube" },
  "b2b-video-marketing-roi-metrics": { tagline: "Behind the budget & ROI.", icon: "chart" },
  "repurpose-long-form-to-viral-shorts": { tagline: "Small format. A first impression.", icon: "phone" },
  "science-of-the-first-3-seconds": { tagline: "A script with a job to do.", icon: "script" },
};

const Blog = () => {
  const { items: rawPosts } = useCollection<BlogItem>("blogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const posts = useMemo(() => {
    return rawPosts && rawPosts.length > 0 ? rawPosts : DEFAULT_BLOGS;
  }, [rawPosts]);

  const categories = useMemo(() => {
    const list = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))) as string[];
    return ["All", ...list];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchText = `${post.title} ${post.content || ""} ${post.summary || ""}`.toLowerCase();
      const matchesSearch = searchText.includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, activeCategory]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://motionly.media/blog" },
        ],
      },
      {
        "@type": "Blog",
        name: "Motionly Media Journal & Perspectives",
        description: "Perspectives on creativity, SaaS video marketing, personal branding, and content strategy from Motionly Media.",
        url: "https://motionly.media/blog",
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Blog & Editorial Guides | Motionly Media Creative Studio"
        description="Practical guides to SaaS product demos, founder-led video marketing, motion design, and high-retention storytelling from Motionly Media."
        url="https://motionly.media/blog"
        schema={blogSchema}
      />

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-[650px] right-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[130px] -z-10" 
        />

        {/* =========================================================================
            1. EDITORIAL HEADER
        ========================================================================= */}
        <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase mb-4">
                  VIDEO &amp; CONTENT STRATEGY
                </p>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                  Blog<span className="text-[#38bdf8]">.</span>
                </h1>
              </div>

              <div className="max-w-md">
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed border-l-2 border-[#38bdf8]/40 pl-4">
                  Practical guides to product demos, founder-led video, and content that helps SaaS buyers understand what you do.
                </p>
              </div>
            </div>

            {/* FEATURED GUIDE BANNER */}
            {featuredPost && (
              <div className="rounded-3xl bg-gradient-to-br from-white/[0.05] via-[#315EFA]/10 to-transparent border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-[#38bdf8]/40 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Graphic Blueprint Box */}
                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#0c1322] via-[#091124] to-[#040813] border border-white/10 p-6 flex flex-col justify-between shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">MZ.SYS // 01</span>
                      <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                    </div>

                    <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-[#315EFA]/20 border border-[#38bdf8]/40 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.25)] mb-4">
                        <User className="w-10 h-10 text-[#38bdf8]" />
                      </div>
                      <p className="text-base font-bold text-white tracking-tight">Make the expert visible.</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-1 h-3 bg-[#38bdf8]/40 rounded-full" />
                        <span className="w-1 h-5 bg-[#38bdf8] rounded-full" />
                        <span className="w-1 h-7 bg-[#38bdf8] rounded-full" />
                        <span className="w-1 h-4 bg-[#38bdf8]/60 rounded-full" />
                        <span className="w-1 h-6 bg-[#38bdf8] rounded-full" />
                        <span className="w-1 h-3 bg-[#38bdf8]/40 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>4K Master • 60fps</span>
                      <span>High Retention</span>
                    </div>
                  </div>

                  {/* Right: Featured Post Details */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                        FEATURED GUIDE
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-xs font-mono text-slate-400">5 min read</span>
                    </div>

                    <Link to={`/blog/${featuredPost.id}`}>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-[#38bdf8] transition-colors tracking-tight leading-tight mb-4">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      {featuredPost.summary || excerpt(featuredPost.content).slice(0, 180) + "..."}
                    </p>

                    <div>
                      <Link
                        to={`/blog/${featuredPost.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#38bdf8] hover:text-white transition-colors"
                      >
                        <span>Read the guide</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            2. LATEST ARTICLES
        ========================================================================= */}
        <section className="py-16 sm:py-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Header Strip with Search & Categories */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Latest articles
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Practical guides from Motionly Media.
                </p>
              </div>

              {/* Search Bar with Reset UX */}
              <div className="w-full md:w-72 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:bg-white/[0.08] transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills & Live Count */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer shrink-0 ${
                        isActive
                          ? "bg-[#38bdf8] text-[#070b14] font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                          : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-mono text-slate-400 shrink-0 hidden sm:inline">
                {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
              </span>
            </div>

            {/* 3-Column Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No articles found</h3>
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
                <button
                  type="button"
                  onClick={() => { setActiveCategory("All"); setSearchTerm(""); }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularPosts.map((post) => {
                  const blueprint = cardBlueprints[post.id] || { tagline: "One workflow. A clear story.", icon: "layers" };
                  const summaryText = post.summary || excerpt(post.content).slice(0, 140) + "...";

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.04] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Visual Blueprint Card Header */}
                        <Link to={`/blog/${post.id}`} className="block">
                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1424] via-[#080d1a] to-[#04060c] border border-white/10 p-5 mb-5 flex flex-col justify-between group-hover:border-[#38bdf8]/40 transition-colors">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span>MOTIONLY // DOC</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 group-hover:bg-[#38bdf8] transition-colors" />
                            </div>

                            <div className="my-auto text-center py-2">
                              <p className="text-sm font-bold text-white tracking-tight">
                                {blueprint.tagline}
                              </p>
                              <div className="w-12 h-0.5 bg-[#38bdf8]/40 mx-auto mt-2 rounded-full group-hover:w-16 group-hover:bg-[#38bdf8] transition-all" />
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span>SaaS &amp; Tech</span>
                              <span>Guide</span>
                            </div>
                          </div>
                        </Link>

                        {/* Metadata tag */}
                        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-2.5">
                          <span>{post.category || "VIDEO MARKETING"}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-slate-400 font-normal">5 MIN READ</span>
                        </div>

                        {/* Title */}
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug tracking-tight mb-2.5 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed line-clamp-3 mb-6">
                          {summaryText}
                        </p>
                      </div>

                      {/* Author & Read Link Footer */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#315EFA]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[10px] font-bold text-[#38bdf8]">
                            M
                          </div>
                          <span className="text-slate-400 font-medium">Motionly Studio</span>
                        </div>

                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1 font-bold text-slate-300 group-hover:text-[#38bdf8] transition-colors"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            3. BOTTOM NEWSLETTER / STRATEGY CTA
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center border-t border-white/[0.08]">
          <div className="pointer-events-none transform-gpu will-change-transform absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-3">
              CREATIVE BRIEFINGS
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Turn your complex SaaS <span className="font-serif italic font-normal text-[#38bdf8]">into a clear story</span>.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-8 font-normal leading-relaxed">
              Ready to create a high-retention product explainer or launch video? Discuss your scope with our directing team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_30px_rgba(49,94,250,0.4)] transition-all duration-150 active:scale-[0.98]"
            >
              <span>Schedule Creative Scoping Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
