import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";
import MaintenanceBanner from "../MaintenanceBanner";
import FloatingNavDock from "./FloatingNavDock";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="site-shell min-h-screen flex flex-col bg-white text-slate-900 dark:bg-[#05070F] dark:text-slate-100 antialiased selection:bg-blue-600/40 selection:text-white transition-colors duration-300">
      <MaintenanceBanner />
      <Navbar />
      <main className="public-main flex-grow pt-24 bg-transparent">
        {children}
      </main>
      <FloatingNavDock />
      <Footer />
    </div>
  );
};

export default Layout;
