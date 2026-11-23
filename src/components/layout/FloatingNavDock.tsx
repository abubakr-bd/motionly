import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export const FloatingNavDock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past the first 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 pointer-events-none hidden md:block ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <nav
        aria-label="Quick Navigation"
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#070b14]/90 dark:bg-[#070b14]/95 text-white backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-xs font-medium"
      >
        <a
          href="#work"
          className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150 active:scale-95"
        >
          Work
        </a>

        <a
          href="#services"
          className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150 active:scale-95"
        >
          Services
        </a>

        {/* Central Prominent CTA */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white font-semibold shadow-md shadow-[#315EFA]/30 transition-all duration-150 active:scale-[0.97]"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>Start a Project</span>
        </Link>

        <a
          href="#comparison"
          className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150 active:scale-95"
        >
          Why Motionly
        </a>

        <a
          href="#process"
          className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150 active:scale-95"
        >
          Process
        </a>
      </nav>
    </div>
  );
};

export default FloatingNavDock;
