import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Clock, BookOpen } from "lucide-react";
import { STATIC_BLOGS } from "../../lib/staticBlogs";

export const JournalSection: React.FC = () => {
  // Use 3 top articles from static blogs
  const articles = STATIC_BLOGS.slice(0, 3);
  const primaryArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <section id="journal" className="py-24 md:py-32 bg-white dark:bg-[#0d121f] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              THOUGHTS, IDEAS & PERSPECTIVES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              A Little More About{" "}
              <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
                the Work We Do.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Exploring motion design, video marketing, creative production, storytelling, and the ideas shaping modern digital communication.
            </p>
          </div>

          <div className="hidden sm:block">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>Explore the Journal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Editorial Articles Grid (Asymmetric 7:5 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Primary Article (7 Cols) */}
          {primaryArticle && (
            <div className="lg:col-span-7 flex">
              <Link
                to={`/blog/${primaryArticle.id}`}
                className="group relative flex flex-col justify-between w-full rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Image Container with subtle zoom on hover */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={primaryArticle.imageUrl}
                    alt={primaryArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur shadow-sm">
                      {primaryArticle.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span>{primaryArticle.date}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {primaryArticle.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {primaryArticle.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 group-hover:underline">
                      Read Complete Article
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Articles (5 Cols - Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {secondaryArticles.map((article, idx) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group relative flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 flex-1"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-44 lg:w-full xl:w-44 aspect-[16/10] sm:aspect-square lg:aspect-[16/10] xl:aspect-square shrink-0 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 sm:hidden xl:hidden">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="hidden sm:inline xl:inline font-semibold text-blue-600 dark:text-blue-400">
                        {article.category}
                      </span>
                      <span className="hidden sm:inline xl:inline">•</span>
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Newsletter / RSS subtle insight callout */}
            <div className="p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/40 dark:to-slate-900/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Studio Insights
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-medium">
                    We share deep teardowns on SaaS video hooks, motion pacing, and founder storytelling regularly.
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="shrink-0 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  aria-label="View all posts"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 w-full"
          >
            <span>Explore All Journal Entries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
