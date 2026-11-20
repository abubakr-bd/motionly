import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Clock } from "lucide-react";
import { STATIC_BLOGS } from "../../lib/staticBlogs";

export const JournalSection: React.FC = () => {
  const articles = STATIC_BLOGS.slice(0, 3);
  const primaryArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <section 
      id="journal" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-[#2563eb] mb-3">
              Thoughts, ideas &amp; perspectives
            </div>

            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-3">
              A little more about the work we do
            </h2>

            <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
              Exploring motion design, video marketing, creative production, storytelling, and the ideas shaping modern digital communication
            </p>
          </div>

          <div className="hidden sm:block">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#ffffff] dark:bg-[#11141c] hover:bg-[#eceff4] dark:hover:bg-[#1a1e28] text-[#111827] dark:text-[#eef0f5] text-xs font-medium border border-black/[0.08] dark:border-[#eef0f5]/[0.08] transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Explore journal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6b7487] dark:text-[#7a8296]" />
            </Link>
          </div>
        </div>

        {/* Editorial Articles Grid (7:5 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Primary Article (7 Cols) */}
          {primaryArticle && (
            <div className="lg:col-span-7 flex">
              <Link
                to={`/blog/${primaryArticle.id}`}
                className="group flex flex-col justify-between w-full rounded-2xl overflow-hidden border border-black/[0.08] dark:border-[#eef0f5]/[0.08] bg-[#ffffff] dark:bg-[#11141c] shadow-xs"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07080d]">
                  <img
                    src={primaryArticle.imageUrl}
                    alt={primaryArticle.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono bg-[#07080d]/80 text-[#eef0f5] backdrop-blur-sm border border-white/[0.08]">
                      {primaryArticle.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#07080d]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-white/[0.08]">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#6b7487] dark:text-[#7a8296] mb-2.5">
                      <span>{primaryArticle.date}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#111827] dark:text-[#eef0f5] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors leading-snug">
                      {primaryArticle.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#4b5565] dark:text-[#a3a9b8] line-clamp-3 leading-relaxed">
                      {primaryArticle.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] flex items-center justify-between">
                    <span className="text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                      Read article &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Articles (5 Cols - Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {secondaryArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-black/[0.08] dark:border-[#eef0f5]/[0.08] bg-[#ffffff] dark:bg-[#11141c] shadow-xs flex-1"
              >
                <div className="relative w-full sm:w-36 aspect-[16/10] sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-[#07080d]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#6b7487] dark:text-[#7a8296] mb-1.5">
                      <span className="text-[#2563eb]">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-medium text-[#111827] dark:text-[#eef0f5] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-[#4b5565] dark:text-[#a3a9b8] line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                    <span>Read article</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Studio Note */}
            <div className="p-5 rounded-2xl border border-black/[0.08] dark:border-[#eef0f5]/[0.08] bg-[#eceff4] dark:bg-[#1a1e28]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#2563eb] mb-1">
                    Studio teardowns
                  </p>
                  <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                    We regularly publish deep teardowns on SaaS video retention hooks, motion pacing, and founder storytelling.
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="shrink-0 p-2 rounded-lg bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.06] dark:border-[#eef0f5]/[0.08] text-[#111827] dark:text-[#eef0f5] hover:text-[#2563eb] transition-colors"
                  aria-label="View all posts"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
