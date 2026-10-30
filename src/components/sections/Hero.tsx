import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHeroSettings, usePartners } from "../../lib/useSiteData";
import { ArrowUpRight, Play } from "lucide-react";

const Hero = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [thumbnailUnavailable, setThumbnailUnavailable] = useState(false);
  const hero = useHeroSettings();
  const { partners } = usePartners();
  const rawShowreelId = (hero.showreelVideoId || "q7hCvbfvRPU").trim();
  const urlMatch = rawShowreelId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  const showreelId = urlMatch ? urlMatch[1] : (rawShowreelId || "q7hCvbfvRPU");
  const reduceMotion = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const reveal = (delay: number) => (reduceMotion || isMobile) ? {} : {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: Math.min(delay, 0.2), ease: [0.16, 1, 0.3, 1] as const }
  };

  const clientLogos = partners && partners.length > 0
    ? partners.slice(0, 6)
    : [
        { id: "1", name: "Patent Watch" },
        { id: "2", name: "Lexi" },
        { id: "3", name: "Castari" },
        { id: "4", name: "Atria" },
        { id: "5", name: "EquiSaaS" },
      ];

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Cinematic Glows (Soft Blue in Light, Vibrant Obsidian & Electric Blue in Dark) */}
      <div className="pointer-events-none absolute top-[-15%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[1100px] h-[500px] sm:h-[800px] bg-gradient-to-b from-blue-500/10 via-blue-400/5 to-transparent dark:from-blue-600/25 dark:via-indigo-600/10 rounded-full blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[25%] -left-[10%] w-[450px] h-[450px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute top-[30%] -right-[10%] w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[130px] -z-10" />

      <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Prestige Pill Badge */}
        <motion.div {...reveal(0.05)} className="mb-6 sm:mb-8 inline-block">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-900 dark:text-slate-200 bg-blue-50/80 hover:bg-blue-100/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-blue-200/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 rounded-full transition-all duration-300 shadow-sm dark:shadow-[0_0_20px_rgba(37,99,235,0.15)] group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>{
              (hero.badge && !hero.badge.includes("Bangladesh") && !hero.badge.includes("#1 in BD"))
                ? hero.badge
                : "High-Retention Video Agency • Global Reach"
            }</span>
            {hero.badge && hero.badge.toUpperCase().includes("YC") && (
              <span className="w-4 h-4 rounded bg-[#FF6600] text-white font-black text-[10px] flex items-center justify-center">
                Y
              </span>
            )}
            <span className="text-blue-500 dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-white transition-colors">›</span>
          </Link>
        </motion.div>

        {/* Big Bold Headline with Gradient Accent */}
        <motion.h1
          {...reveal(0.15)}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black tracking-tight leading-[1.08] mb-6 sm:mb-8 text-slate-950 dark:text-white max-w-4xl mx-auto"
        >
          {hero.headline1 || "Product videos"}{" "}
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(37,99,235,0.25)]">
            {hero.headline2 || "that just work"}
          </span>
        </motion.h1>

        {/* Subtitle (Clean & Responsive for Phone) */}
        <motion.p
          {...reveal(0.25)}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal"
        >
          {hero.subheadline || "Story-led video editing, 3D motion design, and high-retention launch videos for ambitious software teams."}
        </motion.p>

        {/* Call-to-action Button with Shimmer Sweep */}
        <motion.div {...reveal(0.35)} className="flex items-center justify-center gap-4 mb-10 sm:mb-14">
          <Link
            to={hero.cta1Link || "/contact"}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:shadow-[0_0_35px_rgba(255,255,255,0.25)]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="relative z-10">{hero.cta1 || "GET YOUR PRODUCT VIDEO"}</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Monochrome Client Logos Bar */}
        <motion.div {...reveal(0.4)} className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-60 hover:opacity-95 dark:opacity-50 dark:hover:opacity-90 transition-opacity">
            {clientLogos.map((client) => (
              <span
                key={client.id}
                className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 font-mono transition-colors hover:text-blue-600 dark:hover:text-blue-300"
              >
                {client.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Video Showcase Card with Luminous Glow */}
        <motion.div
          initial={false}
          className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 aspect-video ring-1 ring-slate-200 dark:ring-white/10 hover:ring-blue-500/50 shadow-[0_20px_50px_rgba(37,99,235,0.12)] dark:shadow-[0_0_90px_rgba(37,99,235,0.3)] hover:dark:shadow-[0_0_120px_rgba(37,99,235,0.45)] transition-all duration-500 group"
        >
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
              className="absolute inset-0 w-full h-full group text-left cursor-pointer"
              onClick={() => setVideoPlaying(true)}
              aria-label="Play showreel video"
            >
              {!thumbnailUnavailable && (
                (showreelId === "q7hCvbfvRPU" || showreelId === "_1VaQCNUdnU") ? (
                  <picture>
                    <source media="(max-width: 640px)" srcSet="/hero-thumb-mobile.webp" type="image/webp" />
                    <source srcSet="/hero-thumb.webp" type="image/webp" />
                    <img
                      src="/hero-thumb.webp"
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      alt="Motionly Media showreel video thumbnail"
                      width="1280"
                      height="720"
                      decoding="async"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
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
                )
              )}

              {/* Glassmorphic Play Button with Radial Pulse & Sonar Ring */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors duration-500">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-blue-500/30 blur-xl group-hover:bg-blue-500/50 group-hover:scale-125 transition-all duration-500" />
                  <div className="absolute -inset-2 rounded-full border border-blue-400/40 animate-ping opacity-50 pointer-events-none" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/95 group-hover:bg-white text-blue-600 dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
                  </div>
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
