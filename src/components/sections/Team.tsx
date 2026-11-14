import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Play, Pause } from "lucide-react";
import { useTeam } from "../../lib/useSiteData";

const getMemberImage = (member: { id: string; name: string; img?: string }): string => {
  if (member.img && member.img.startsWith("/employes/")) {
    return member.img;
  }

  const n = (member.name || "").toLowerCase();
  if (n.includes("abu bakar")) return "/employes/abu_bakar.webp";
  if (n.includes("nazmul") || n.includes("shuvo")) return "/employes/nazmul.webp";
  if (n.includes("raiyan")) return "/employes/raiyan.webp";
  if (n.includes("wasif")) return "/employes/wasif.webp";
  if (n.includes("abir") || n.includes("ratul")) return "/employes/abir.webp";
  if (n.includes("barno")) return "/employes/barno.webp";
  if (n.includes("nafew")) return "/employes/nafew.webp";
  if (n.includes("sojol")) return "/employes/sojol.webp";
  if (n.includes("afolabi") || n.includes("isaiah")) return "/employes/afolabi.webp";
  if (n.includes("mamun")) return "/employes/mamun.webp";
  if (n.includes("fardin") || n.includes("sazid")) return "/employes/fardin.webp";

  const byId: Record<string, string> = {
    "1": "/employes/abu_bakar.webp",
    "2": "/employes/nazmul.webp",
    "3": "/employes/raiyan.webp",
    "4": "/employes/wasif.webp",
    "5": "/employes/abir.webp",
    "6": "/employes/barno.webp",
    "MHynmebMMimtKqq8jdUY": "/employes/nafew.webp",
    "VgcgURjZKxKMDtBNjpVL": "/employes/sojol.webp",
    "g4FBo4G0Om1u3n3OdHuZ": "/employes/afolabi.webp",
    "xdzyVdvEYexLZMzyezpD": "/employes/mamun.webp",
    "ozLvHtEGoAHoDOFoRBhH": "/employes/fardin.webp",
  };

  return byId[member.id] || member.img || "";
};

const getMemberCategory = (name: string, role: string): string => {
  const r = (role || "").toLowerCase();
  if (r.includes("ceo") || r.includes("founder")) return "LEADERSHIP";
  if (r.includes("coo") || r.includes("growth")) return "OPERATIONS";
  if (r.includes("cco") || r.includes("head of production")) return "DIRECTION";
  if (r.includes("cinematographer") || r.includes("camera") || r.includes("film")) return "CINEMA";
  if (r.includes("strategy") || r.includes("specialist")) return "STRATEGY";
  if (r.includes("designer") || r.includes("graphic")) return "DESIGN";
  if (r.includes("presenter") || r.includes("social")) return "MEDIA";
  if (r.includes("editor") || r.includes("video")) return "POST-PRO";
  return "CREATIVE";
};

const AUTO_PLAY_INTERVAL = 3200; // ms per slide in automated loop

const Team = () => {
  const { team, loading } = useTeam();
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mouse Drag state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Seamless infinite loop: duplicate team cards twice for fluid wrapping
  const extendedTeam = team.length > 0 ? [...team, ...team] : [];

  const getStep = useCallback(() => {
    if (!scrollRef.current) return 300;
    const cardEl = scrollRef.current.querySelector<HTMLElement>("[data-team-card]");
    return cardEl ? cardEl.offsetWidth + 20 : 300;
  }, []);

  // Scroll to a specific card index with seamless forward loop
  const scrollToIndex = useCallback((targetIndex: number, smooth = true) => {
    if (!scrollRef.current || team.length === 0) return;
    const container = scrollRef.current;
    const step = getStep();

    container.scrollTo({
      left: targetIndex * step,
      behavior: smooth ? "smooth" : "instant",
    });

    setCurrentIndex(targetIndex % team.length);
  }, [getStep, team.length]);

  // Advance forward in the loop
  const handleNext = useCallback(() => {
    if (team.length === 0 || !scrollRef.current) return;
    const step = getStep();
    const nextIdx = currentIndex + 1;

    if (nextIdx < team.length) {
      scrollToIndex(nextIdx, true);
    } else {
      // Smoothly advance into the first card of the cloned set (looks identical to card 0)
      scrollRef.current.scrollTo({
        left: team.length * step,
        behavior: "smooth",
      });
      setCurrentIndex(0);

      // Once the smooth glide finishes, silently reset scroll position to 0
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: 0,
            behavior: "instant",
          });
        }
      }, 480);
    }
  }, [currentIndex, getStep, scrollToIndex, team.length]);

  // Move backward in the loop
  const handlePrev = useCallback(() => {
    if (team.length === 0 || !scrollRef.current) return;
    const step = getStep();

    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1, true);
    } else {
      // Silently jump to the duplicated set, then smoothly scroll back to last card
      scrollRef.current.scrollTo({
        left: team.length * step,
        behavior: "instant",
      });
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: (team.length - 1) * step,
            behavior: "smooth",
          });
          setCurrentIndex(team.length - 1);
        }
      }, 20);
    }
  }, [currentIndex, getStep, scrollToIndex, team.length]);

  // Automated loop timer
  useEffect(() => {
    if (!isPlaying || isPaused || isUserHovered || isMouseDown || team.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused, isUserHovered, isMouseDown, handleNext, team.length]);

  // Listen to manual scrolling (touch swipe on mobile or wheel)
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isMouseDown || team.length === 0) return;
    const step = getStep();
    const scrollLeft = scrollRef.current.scrollLeft;
    const rawIdx = Math.round(scrollLeft / step);
    const normalizedIdx = rawIdx % team.length;
    setCurrentIndex(normalizedIdx);
  }, [getStep, isMouseDown, team.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Window-level mouse drag handlers
  useEffect(() => {
    if (!isMouseDown) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!scrollRef.current) return;
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 4) {
        setIsDragging(true);
      }
      scrollRef.current.scrollLeft = scrollLeftStart - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
      setTimeout(() => setIsDragging(false), 60);
      if (scrollRef.current && team.length > 0) {
        const step = getStep();
        const rawIdx = Math.round(scrollRef.current.scrollLeft / step);
        setCurrentIndex(rawIdx % team.length);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isMouseDown, startX, scrollLeftStart, getStep, team.length]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || team.length === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.min(team.length - 1, Math.floor(ratio * team.length));
    scrollToIndex(targetIdx, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const activeIndex = currentIndex % Math.max(1, team.length);
  const progressRatio = team.length > 0 ? (activeIndex + 1) / team.length : 0;

  return (
    <section
      id="team"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsUserHovered(true)}
      onMouseLeave={() => setIsUserHovered(false)}
      className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden flex flex-col justify-center outline-none"
    >
      {/* Subtle backdrop ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 16:9 Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              The Collective
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Meet the minds behind the creativity.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal max-w-xl">
              A multidisciplinary team of creative thinkers, strategists, editors, designers, and production professionals bringing ideas to life.
            </p>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-start md:self-end">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm duration-300"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Slide Counter & Automated Loop Indicator */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090D1A] text-slate-700 dark:text-slate-300">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                title={isPlaying ? "Pause auto-loop" : "Play auto-loop"}
                aria-label={isPlaying ? "Pause auto-loop" : "Play auto-loop"}
                className="w-5 h-5 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
              >
                {isPlaying && !isUserHovered ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
              </button>
              <div className="font-mono text-xs sm:text-sm font-bold flex items-center">
                <span className="text-blue-600 dark:text-blue-400">
                  {(activeIndex + 1).toString().padStart(2, "0")}
                </span>
                <span className="mx-1 text-slate-400 dark:text-slate-600">/</span>
                <span>{team.length.toString().padStart(2, "0")}</span>
              </div>
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous teammate"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090D1A] text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next teammate"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090D1A] text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase */}
        {loading ? (
          <div className="flex justify-center items-center h-[380px]">
            <div className="w-9 h-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              className={`flex items-start gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-3 pb-2 select-none ${
                isMouseDown ? "cursor-grabbing" : "cursor-grab"
              } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            >
              {extendedTeam.map((member, index) => {
                const imageSrc = getMemberImage(member);
                const category = getMemberCategory(member.name, member.role);
                const originalIndex = index % team.length;
                const formattedIndex = (originalIndex + 1).toString().padStart(2, "0");
                const isCardActive = originalIndex === activeIndex;

                return (
                  <motion.div
                    key={`${member.id}-${index}`}
                    data-team-card
                    className="group relative shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[290px] flex flex-col"
                  >
                    {/* Portrait Photo Card */}
                    <div
                      className={`relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#090D1A] ring-1 transition-all duration-500 ${
                        isCardActive
                          ? "ring-blue-500/80 shadow-[0_16px_36px_rgba(37,99,235,0.22)] dark:shadow-[0_16px_36px_rgba(37,99,235,0.3)]"
                          : "ring-slate-200/90 dark:ring-white/10 group-hover:ring-blue-500/70 group-hover:shadow-[0_16px_36px_rgba(37,99,235,0.22)]"
                      }`}
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={`${member.name} - ${member.role} at Motionly Media`}
                          width="480"
                          height="600"
                          decoding="async"
                          loading="lazy"
                          draggable={false}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Fallback Initials */}
                      <div
                        className={`w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0B1020] dark:to-[#060914] text-slate-800 dark:text-white flex-col items-center justify-center p-6 text-center ${
                          imageSrc ? "hidden" : "flex"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500/40 flex items-center justify-center text-2xl font-black text-blue-600 dark:text-blue-400 mb-3">
                          {member.name.charAt(0)}
                        </div>
                        <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                          {member.role}
                        </p>
                      </div>

                      {/* Top Badges - Placed safely at top where there is no baked text */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="font-mono text-[10px] font-bold text-white/90 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
                          #{formattedIndex}
                        </span>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-300 bg-blue-950/75 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Member Info Below Card - Cleanly Separated from Graphic with Zero Clashing */}
                    <div className="mt-3.5 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                          {member.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                          #{formattedIndex}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mt-0.5 line-clamp-1">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Interactive Loop Progress Bar (Inspired by Reference 1) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 mt-2 border-t border-slate-100 dark:border-white/5">
          {/* Active status */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {(activeIndex + 1).toString().padStart(2, "0")}
            </span>
            <span>of</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {team.length.toString().padStart(2, "0")} Teammates
            </span>
            <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400 dark:text-slate-500 tracking-wide">
              {isPlaying && !isUserHovered
                ? "Automated loop active (hover to pause)"
                : "Paused (move cursor away to resume)"}
            </span>
          </div>

          {/* Interactive Progress Track */}
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative w-full sm:w-64 md:w-80 h-2 bg-slate-100 dark:bg-white/10 rounded-full cursor-pointer overflow-hidden group/bar transition-all"
            title="Click anywhere to jump across teammates"
            role="progressbar"
            aria-valuenow={Math.round(progressRatio * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="absolute top-0 bottom-0 left-0 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out group-hover/bar:bg-blue-400"
              style={{
                width: `${Math.max(10, Math.min(100, progressRatio * 100))}%`,
              }}
            />
          </div>

          {/* Mobile Bottom Navigation Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous team member"
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090D1A] flex items-center gap-1 active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause auto-loop" : "Play auto-loop"}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/30 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center gap-1"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next team member"
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090D1A] flex items-center gap-1 active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
