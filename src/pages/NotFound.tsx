import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { ArrowLeft, ArrowUpRight, Compass, Film, Play, Sparkles } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const directoryLinks = [
    { number: "01", label: "Selected Work & Films", href: "/portfolio", desc: "Commercials, SaaS demos, and brand reels" },
    { number: "02", label: "Studio Disciplines", href: "/services", desc: "SaaS explainers, 3D motion, and creator systems" },
    { number: "03", label: "Personal Branding", href: "/personal-branding", desc: "Executive authority and multi-platform presence" },
    { number: "04", label: "Studio Journal", href: "/blog", desc: "Editorial thoughts on retention, storytelling, and motion" },
    { number: "05", label: "The Collective", href: "/about", desc: "Meet our directors, editors, and 3D specialists" },
  ];

  return (
    <Layout>
      <SEO
        title="404 — Frame Not Found | Motionly Media"
        description="The scene or frame you requested is not on this timeline. Explore Motionly's selected work, services, or journal."
      />

      <section className="min-h-screen bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] transition-colors duration-200 pt-32 sm:pt-40 pb-24 flex flex-col justify-center relative overflow-hidden">
        {/* Subtle grid line decoration */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        />

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Studio Production Slate Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Timecode 00:04:04:00 &bull; Frame Dropped</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.05] mb-6">
            Cut on the <br />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              cutting room floor.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-10">
            The scene, sequence, or path you requested isn&apos;t in this timeline. It may have been re-rendered, moved to our archives, or never approved in the initial storyboard.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111827] text-white dark:bg-white dark:text-[#07080d] font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
            >
              <Film className="w-4 h-4" />
              <span>Return to Studio Timeline</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-black/[0.1] dark:border-white/[0.1] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:scale-[0.98] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back One Cut</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
            >
              <span>Contact Directors</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Studio Sequence Navigation Directory */}
          <div className="pt-10 border-t border-black/[0.08] dark:border-white/[0.08]">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">
              Active Timeline Destinations:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {directoryLinks.map((item) => (
                <Link
                  key={item.number}
                  to={item.href}
                  className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.06] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-600 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors truncate">
                        {item.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
