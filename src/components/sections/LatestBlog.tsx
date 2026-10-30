import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type BlogItem } from "../../lib/useSiteData";
import { ArrowUpRight } from "lucide-react";

export const LatestBlog = () => {
  const { items } = useCollection<BlogItem>("blogs");
  const posts = items.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-slate-50/70 dark:bg-[#05070F] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Subtle radial ambient blue glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/5 via-sky-400/5 to-transparent dark:from-blue-600/10 dark:via-sky-500/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              The Journal &amp; Strategy
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Perspectives on creativity, content, and growth.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-colors group"
          >
            <span>Read all articles</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col p-5 rounded-3xl bg-white dark:bg-[#090D1A]/80 hover:bg-slate-50/80 dark:hover:bg-[#0C1224]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-sm dark:shadow-xl hover:shadow-md"
            >
              <Link to={`/blog/${post.id}`} className="block w-full flex-1 flex flex-col">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-950 ring-1 ring-slate-200/60 dark:ring-white/10">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title ? `${post.title} - Motionly Media Journal` : "Motionly Media blog thumbnail"}
                      width="640"
                      height="400"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                      <span>{post.category || "Motionly Journal"}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{post.category || "Journal"}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal mb-4">
                      {(post.summary || post.content).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}
                    </p>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
                    <span>Read article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
