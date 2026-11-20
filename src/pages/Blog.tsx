import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type BlogItem, DEFAULT_BLOGS } from "../lib/useSiteData";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { Search, Sparkles, Clock, ArrowRight, ArrowUpRight, BookOpen, Tag } from "lucide-react";

const excerpt = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const Blog = () => {
  const { items: rawPosts, loading } = useCollection<BlogItem>("blogs");
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
        title="Journal & Perspectives | Motionly Media Creative Agency"
        description="Perspectives on creativity, SaaS marketing, personal branding, motion design, and high-retention video strategies from Motionly Media."
        url="https://motionly.media/blog"
        schema={blogSchema}
      />

      <div className="bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
        {/* =========================================================================
            1. EDITORIAL JOURNAL HERO
        ========================================================================= */}
        <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] -z-10" />

          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  THE MOTIONLY JOURNAL
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                  Perspectives on creativity, content &amp; growth.
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  Strategic frameworks, video marketing breakdowns, and production essays authored by the video strategists and directors at Motionly Media.
                </p>
              </div>

              {/* Search Field */}
              <div className="w-full sm:w-72 relative shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles & topics..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-[#0A0F1D] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ARTICLES FEED
        ========================================================================= */}
        <section className="py-16 sm:py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            {loading && posts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-bold text-slate-900 dark:text-white">No articles found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try another search keyword or switch category filter.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Featured Spotlight Article (if available) */}
                {featuredPost && (
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="group block p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-xs"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {featuredPost.imageUrl && (
                        <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900">
                          <img
                            src={featuredPost.imageUrl}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className={featuredPost.imageUrl ? "lg:col-span-7" : "lg:col-span-12"}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                            {featuredPost.category || "Perspective"}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {featuredPost.date || "Editorial"}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-3">
                          {featuredPost.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3 mb-6">
                          {featuredPost.summary || excerpt(featuredPost.content || "")}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                          <span>Read Full Perspective</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid of Remaining Articles */}
                {regularPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
                    {regularPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-xs"
                      >
                        <div>
                          {post.imageUrl && (
                            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-5">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                              {post.category || "Analysis"}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {post.date || "Perspective"}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal line-clamp-3">
                            {post.summary || excerpt(post.content || "")}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
