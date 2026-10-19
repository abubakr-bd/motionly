import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHeroSettings } from "../../lib/useSiteData";


const Hero = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [thumbnailUnavailable, setThumbnailUnavailable] = useState(false);
  const hero = useHeroSettings();
  const showreelId = hero.showreelVideoId || "_1VaQCNUdnU";
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Soft gradient background glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div {...reveal(0.1)} className="mb-6 inline-block">
          <span className="px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full">
            {hero.badge || "Video Editing & Creative Direction"}
          </span>
        </motion.div>

        <motion.h1 {...reveal(0.2)} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 tracking-tight leading-[1.05] mb-8">
          {hero.headline1} <span className="text-blue-700">{hero.headline2}</span>
        </motion.h1>

        <motion.p {...reveal(0.3)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subheadline}
        </motion.p>

        <motion.div {...reveal(0.4)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link to={hero.cta1Link || "/contact"} className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95">
            {hero.cta1 || "Start a project"}
          </Link>
          {hero.cta2Link?.startsWith("#") || !hero.cta2Link ? (
            <a href={hero.cta2Link || "#selected-work"} className="px-8 py-4 bg-slate-50 text-slate-700 rounded-full font-medium hover:bg-slate-100 transition-colors active:scale-95">
              {hero.cta2 || "Explore work"}
            </a>
          ) : (
            <Link to={hero.cta2Link} className="px-8 py-4 bg-slate-50 text-slate-700 rounded-full font-medium hover:bg-slate-100 transition-colors active:scale-95">
              {hero.cta2 || "Explore work"}
            </Link>
          )}
        </motion.div>

        <motion.div {...reveal(0.5)} className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-video ring-1 ring-slate-900/5">
          {videoPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${showreelId}?autoplay=1&rel=0&modestbranding=1`}
              title="Motionly Media showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="absolute inset-0 w-full h-full group"
              onClick={() => setVideoPlaying(true)}
              aria-label="Play showreel"
            >
              {!thumbnailUnavailable && (
                <img
                  src={`https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  alt="Motionly Media showreel video thumbnail"
                  width="1280"
                  height="720"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    setThumbnailUnavailable(true);
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${showreelId}/hqdefault.jpg`;
                  }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 text-blue-600">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
