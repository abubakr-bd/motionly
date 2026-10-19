import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection, type TestimonialItem } from "../../lib/useSiteData";

const TestimonialVideo = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl aspect-[4/3] lg:aspect-[3/4]">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
          title="Client testimonial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          className="absolute inset-0 w-full h-full group text-left"
          onClick={() => setIsPlaying(true)}
          aria-label="Play client testimonial"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Client video review testimonial thumbnail"
            width="480"
            height="360"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500">
            <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 text-blue-600">
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

const Testimonials = () => {
  const { items, loading } = useCollection<TestimonialItem>("testimonials");
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % items.length);
  const previous = () => setIndex((current) => (current - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-50">
      <div className="container max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">Client feedback</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Trust is built in the edit.</h2>
          </div>
          <p className="text-lg text-slate-500 max-w-md">Hear directly from the teams who put their stories in our hands.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-slate-500"><p>New client stories will be shared here.</p></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col"
                >
                  <svg className="w-12 h-12 text-slate-200 mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  
                  <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 leading-tight mb-10">
                    "{items[index]?.content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <strong className="block text-lg font-bold text-slate-900">{items[index]?.name}</strong>
                      <span className="block text-slate-500">{items[index]?.role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {items.length > 1 && (
                <div className="flex items-center gap-6 mt-12 pt-12 border-t border-slate-200">
                  <div className="flex gap-2">
                    <button type="button" onClick={previous} className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button type="button" onClick={next} className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="order-1 lg:order-2">
              {items[index]?.videoId ? (
                <TestimonialVideo videoId={items[index].videoId} />
              ) : (
                <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-2xl aspect-[4/3] lg:aspect-[3/4] flex flex-col justify-between border border-slate-800">
                  <div className="absolute top-0 right-0 p-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider rounded-full">
                      Verified Client
                    </span>
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="z-10 my-auto">
                    <p className="text-xl md:text-2xl font-medium text-slate-100 italic leading-relaxed">
                      "{items[index]?.content}"
                    </p>
                  </div>
                  <div className="z-10 flex items-center gap-4 pt-6 border-t border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/30">
                      {items[index]?.name?.charAt(0) || "M"}
                    </div>
                    <div>
                      <strong className="block text-white font-bold">{items[index]?.name}</strong>
                      <span className="block text-slate-400 text-sm">{items[index]?.role}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
