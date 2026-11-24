import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

export const FloatingNavDock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show floating dock on homepage where anchor sections exist
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.94 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        >
          <nav
            aria-label="Quick Navigation"
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#070b14]/85 text-white backdrop-blur-xl border border-white/15 border-t-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-xs font-medium"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150"
            >
              Work
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150"
            >
              Services
            </motion.a>

            {/* Central Prominent CTA */}
            <motion.a
              href="/#booking"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "#booking");
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white font-semibold shadow-md shadow-[#315EFA]/30 transition-colors duration-150 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Start a Project</span>
            </motion.a>

            <motion.a
              href="#comparison"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150"
            >
              Why Motionly
            </motion.a>

            <motion.a
              href="#process"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-150"
            >
              Process
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavDock;
