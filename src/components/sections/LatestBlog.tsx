import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type BlogItem } from "../../lib/useSiteData";

const LatestBlog = () => {
  const { items } = useCollection<BlogItem>("blogs");
  const posts = items.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">The journal</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Ideas for making better video.</h2>
          </div>
          <Link to="/blog" className="text-blue-600 font-medium hover:text-blue-700 whitespace-nowrap group">
            Read the journal <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="block w-full">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-100">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title ? `${post.title} - Motionly Media Journal` : "Motionly Media blog article thumbnail"} 
                      width="640"
                      height="480"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-400 font-medium">
                      <span>{post.category || "Motionly Journal"}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <span className="text-blue-600">{post.category || "Journal"}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-3 mb-6">
                    {(post.summary || post.content).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}
                  </p>
                  <span className="text-sm font-medium text-slate-900 mt-auto flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    Read article <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
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
