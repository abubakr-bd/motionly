import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type TestimonialItem, DEFAULT_TESTIMONIALS } from "../../lib/useSiteData";
import { Star, ArrowUpRight, Play, X, ChevronRight } from "lucide-react";

export const Testimonials = () => {
  const { items } = useCollection<TestimonialItem>("testimonials");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const displayItems = items && items.length > 0 ? items : DEFAULT_TESTIMONIALS;
  const quickReviews = displayItems.slice(0, 3);

  return (
    <section id="testimonials" className="relative pt-6 pb-20 sm:pb-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* 'Get Yours Next' Link */}
        <div className="text-center mb-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-colors group"
          >
            <span>Get Yours Next</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Laser Horizon Line (Thin glowing blue separator as in inspiration) */}
        <div className="relative w-full max-w-4xl mx-auto h-[1px] mb-12 sm:mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 dark:via-blue-400/30 to-transparent blur-sm" />
        </div>

        {/* 3 Quick Review Cards (Desktop: 3 cols, Phone: stacked/clean swipe) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {quickReviews.map((item, index) => {
            const hasVideo = Boolean(item.videoId);
            const initials = item.name
              ? item.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
              : "FD";

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-blue-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1.5 dark:bg-[#090D1A]/80 dark:hover:bg-[#0C1224]/90 dark:border-white/[0.08] dark:hover:border-blue-500/40 dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_12px_40px_rgba(37,99,235,0.2)] transition-all duration-300 backdrop-blur-md"
              >
                {/* Subtle Card Glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

                {/* Review Quote */}
                <div className="mb-6 relative z-10">
                  <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author & Company Details */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06] relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Avatar circle */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 ring-1 ring-blue-500/20 shadow-sm">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {item.company || item.role}
                      </p>
                    </div>
                  </div>

                  {hasVideo && (
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(item.videoId || null)}
                      className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 dark:hover:bg-blue-600/40 flex items-center justify-center transition-colors cursor-pointer"
                      title="Watch video testimonial"
                      aria-label={`Watch video testimonial by ${item.name}`}
                    >
                      <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Rating Badge at Bottom (Matches image: logo stack + 5 stars + 4.9 50+ FOUNDER REVIEWS >) */}
        <div className="flex items-center justify-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-300 dark:bg-[#090D1A] dark:hover:bg-[#0E152B] dark:border-white/10 dark:hover:border-blue-500/40 transition-all duration-300 shadow-sm group"
          >
            {/* Avatar Stack Icons */}
            <div className="flex -space-x-2 shrink-0">
              <span className="w-5 h-5 rounded-full bg-blue-600 border border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-black text-white">Y</span>
              <span className="w-5 h-5 rounded-full bg-indigo-600 border border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-black text-white">C</span>
              <span className="w-5 h-5 rounded-full bg-violet-600 border border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-black text-white">★</span>
            </div>

            {/* 5 Stars */}
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            {/* Rating Text */}
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide">
              4.9 <span className="text-slate-500 dark:text-slate-400 font-medium">50+ FOUNDER REVIEWS</span>
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>

      {/* Video Testimonial Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-slate-950 ring-1 ring-white/15 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close video testimonial"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Founder Video Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
