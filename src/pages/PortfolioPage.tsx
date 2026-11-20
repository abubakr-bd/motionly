import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { Portfolio } from "../components/sections/Portfolio";
import { Sparkles, ArrowRight, ArrowUpRight, Play, Filter, Film, Search } from "lucide-react";

const portfolioBreadcrumbs = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://motionly.media/portfolio" },
    ]},
    {
      "@type": "CollectionPage",
      name: "Motionly Media Video Portfolio",
      description: "Explore Motionly Media's portfolio of high-retention video editing, SaaS product walk-throughs, 3D motion design, and commercial case studies.",
      url: "https://motionly.media/portfolio",
    }
  ]
};

const PortfolioPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Video Portfolio & Production Archive | Motionly Media"
        description="Explore Motionly Media's selected video works: B2B SaaS explainers, founder personal branding, 3D motion design, and commercial campaigns."
        url="https://motionly.media/portfolio"
        schema={portfolioBreadcrumbs}
      />

      <div className="bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
        {/* =========================================================================
            HERO HEADER
        ========================================================================= */}
        <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] -z-10" />

          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  SELECTED WORKS &amp; ARCHIVE
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                  What We Create.
                </h1>
                <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                  Different ideas. Different audiences. One creative standard. Browse our high-retention video edits, SaaS launch videos, and commercial campaigns.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all duration-150 active:scale-[0.98]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <span>Explore Services</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            INTERACTIVE PORTFOLIO ENGINE (WITH THEATER MODAL)
        ========================================================================= */}
        <Portfolio />

        {/* =========================================================================
            BOTTOM STRATEGIC CTA
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center border-t border-slate-200/80 dark:border-white/10">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              YOUR PRODUCTION BRIEF
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
              Have an upcoming product launch or campaign?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Book a 30-minute scoping call. We&apos;ll walk through references, discuss creative direction, and quote turnaround times for your team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-150 active:scale-[0.98]"
              >
                <span>Book 30-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-colors"
              >
                <span>Review Capabilities &amp; Specs</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioPage;
