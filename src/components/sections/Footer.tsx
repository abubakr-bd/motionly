import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { ArrowUpRight, ArrowUp, Globe, Sparkles, Star } from "lucide-react";
import { MilkyWayCosmos } from "../ui/MilkyWayCosmos";

interface CountryItem {
  country: string;
  code: string;
  timezone: string;
  region: string;
}

const GLOBAL_COUNTRIES: CountryItem[] = [
  {
    country: "United States",
    code: "USA",
    timezone: "EST / PST",
    region: "North America",
  },
  {
    country: "United Kingdom",
    code: "GBR",
    timezone: "GMT / BST",
    region: "Europe",
  },
  {
    country: "Canada",
    code: "CAN",
    timezone: "EST / CST",
    region: "North America",
  },
  {
    country: "Australia",
    code: "AUS",
    timezone: "AEST / AWST",
    region: "Asia-Pacific",
  },
  {
    country: "Germany",
    code: "DEU",
    timezone: "CET / CEST",
    region: "Europe",
  },
  {
    country: "Singapore",
    code: "SGP",
    timezone: "SGT (UTC+8)",
    region: "Southeast Asia",
  },
  {
    country: "United Arab Emirates",
    code: "ARE",
    timezone: "GST (UTC+4)",
    region: "Middle East",
  },
  {
    country: "Netherlands",
    code: "NLD",
    timezone: "CET (UTC+1)",
    region: "Europe",
  },
  {
    country: "France",
    code: "FRA",
    timezone: "CET (UTC+1)",
    region: "Europe",
  },
  {
    country: "Bangladesh",
    code: "BGD",
    timezone: "BST (UTC+6)",
    region: "Studio HQ",
  },
];

const AI_QUERY =
  "Web search Visit https://motionly.media/ and answer: What does Motionly Media do, who is it for, what makes it different, and why should I work with them?";

const POPULAR_AI_TOOLS = [
  {
    name: "ChatGPT",
    url: `https://chatgpt.com/?q=${encodeURIComponent(AI_QUERY)}`,
    title: "Ask ChatGPT about Motionly",
    color: "hover:border-[#10a37f]/50 hover:bg-[#10a37f]/10 text-[#10a37f]",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M22.28 9.54a5.52 5.52 0 0 0-.47-4.47 5.6 5.6 0 0 0-4.52-2.73 5.52 5.52 0 0 0-4.06 1.7A5.54 5.54 0 0 0 8.6 2.3a5.6 5.6 0 0 0-4.53 2.73 5.52 5.52 0 0 0-.47 4.47 5.55 5.55 0 0 0-1.89 3.98 5.6 5.6 0 0 0 1.25 4.54 5.52 5.52 0 0 0 .47 4.47 5.6 5.6 0 0 0 4.53 2.73 5.52 5.52 0 0 0 4.06-1.7 5.54 5.54 0 0 0 4.63 1.74 5.6 5.6 0 0 0 4.52-2.73 5.52 5.52 0 0 0 .47-4.47 5.55 5.55 0 0 0 1.89-3.98 5.6 5.6 0 0 0-1.25-4.54zM13.1 20.25a3.84 3.84 0 0 1-2.48-.9l.17-.1 4.14-2.4a.88.88 0 0 0 .44-.76V10.3l1.83 1.06a.07.07 0 0 1 .04.05v4.98a3.86 3.86 0 0 1-4.14 3.86zm-8.3-3.6a3.84 3.84 0 0 1-.49-2.6 3.9 3.9 0 0 1 1.07-2.32l.14.08 4.14 2.4a.87.87 0 0 0 .88 0l5.02-2.9v2.12a.08.08 0 0 1-.03.06l-4.32 2.5a3.86 3.86 0 0 1-6.41.66zm-.9-9.15a3.83 3.83 0 0 1 1.99-1.7 3.88 3.88 0 0 1 2.53-.16l-.03.17-4.14 2.4a.88.88 0 0 0-.44.76v5.8l-1.83-1.06a.07.07 0 0 1-.04-.06V10.3a3.84 3.84 0 0 1 1.96-2.8zm11.75 3.32L10.63 7.92l4.32-2.5a3.86 3.86 0 0 1 5.92 4.1 3.84 3.84 0 0 1-.5 2.6l-.14-.08-4.14-2.4a.87.87 0 0 0-.88 0zm2.25 4.38a3.84 3.84 0 0 1-1.99 1.7 3.88 3.88 0 0 1-2.53.16l.03-.17 4.14-2.4a.88.88 0 0 0 .44-.76v-5.8l1.83 1.06a.07.07 0 0 1 .04.06v4.61a3.84 3.84 0 0 1-1.96 2.8zM9.54 12.82l-1.83-1.06a.07.07 0 0 1-.04-.05V6.73a3.86 3.86 0 0 1 6.62-2.96l-.17.1-4.14 2.4a.88.88 0 0 0-.44.76v5.79zm1.09-1.72 2.25-1.3 2.25 1.3v2.6l-2.25 1.3-2.25-1.3z" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    url: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_QUERY)}`,
    title: "Ask Perplexity AI",
    color: "hover:border-[#22d3ee]/50 hover:bg-[#22d3ee]/10 text-[#22d3ee]",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a1 1 0 0 1 1 1v4.06l3.72-3.72a1 1 0 1 1 1.42 1.42L14.06 8.5H18a1 1 0 1 1 0 2h-3.94l4.08 4.08a1 1 0 0 1-1.42 1.42L13 12.28V21a1 1 0 1 1-2 0v-8.72l-3.72 3.72a1 1 0 0 1-1.42-1.42L9.94 10.5H6a1 1 0 1 1 0-2h3.94L5.86 4.76a1 1 0 0 1 1.42-1.42L11 7.06V3a1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    url: `https://claude.ai/new?q=${encodeURIComponent(AI_QUERY)}`,
    title: "Ask Claude AI",
    color: "hover:border-[#d97706]/50 hover:bg-[#d97706]/10 text-[#d97706]",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a1 1 0 0 1 1 1v2.5a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm6.364 3.636a1 1 0 0 1 0 1.414l-1.768 1.768a1 1 0 0 1-1.414-1.414l1.768-1.768a1 1 0 0 1 1.414 0zM22 12a1 1 0 0 1-1 1h-2.5a1 1 0 0 1 0-2H21a1 1 0 0 1 1 1zm-3.636 6.364a1 1 0 0 1-1.414 0l-1.768-1.768a1 1 0 0 1 1.414-1.414l1.768 1.768a1 1 0 0 1 0 1.414zM12 22a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 2 0V21a1 1 0 0 1-1 1zm-6.364-3.636a1 1 0 0 1 0-1.414l1.768-1.768a1 1 0 0 1 1.414 1.414l-1.768 1.768a1 1 0 0 1-1.414 0zM2 12a1 1 0 0 1 1-1h2.5a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm3.636-6.364a1 1 0 0 1 1.414 0l1.768 1.768a1 1 0 0 1-1.414 1.414L5.636 7.05a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    url: `https://gemini.google.com/app?text=${encodeURIComponent(AI_QUERY)}`,
    title: "Ask Google Gemini",
    color: "hover:border-[#60a5fa]/50 hover:bg-[#60a5fa]/10 text-[#60a5fa]",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2c-.3 4.8-1.2 7.7-4 9.5-2.8 1.8-5.7 2.2-7.5 2.5 1.8.3 4.7.7 7.5 2.5 2.8 1.8 3.7 4.7 4 9.5.3-4.8 1.2-7.7 4-9.5 2.8-1.8 5.7-2.2 7.5-2.5-1.8-.3-4.7-.7-7.5-2.5-2.8-1.8-3.7-4.7-4-9.5z" />
      </svg>
    ),
  },
  {
    name: "Grok",
    url: `https://x.com/i/grok?text=${encodeURIComponent(AI_QUERY)}`,
    title: "Ask Grok on X",
    color: "hover:border-white/50 hover:bg-white/10 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const email = settings.contact?.email || "hello@motionly.media";
  const whatsapp = settings.contact?.phone || "+880 1605049299";

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#030509] text-[#eef0f5] overflow-hidden pt-16 sm:pt-24 border-t border-white/[0.08] transition-colors duration-200">
      
      {/* ── 00. Animated Milky Way Cosmos Engine (Stars, Galactic Nebulae & Meteors) ── */}
      <MilkyWayCosmos />

      {/* ── 01. Earth Atmosphere Horizon & Global Production Network ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28 z-10">
        
        {/* Curved Glowing Space Horizon Background */}
        <div className="absolute -top-24 sm:-top-32 left-1/2 -translate-x-1/2 w-[160%] max-w-[1600px] h-[340px] sm:h-[520px] pointer-events-none overflow-hidden select-none">
          {/* Curved Earth Atmosphere Image */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Global Earth Horizon"
            className="w-full h-full object-cover object-top opacity-75 mix-blend-screen scale-110"
            loading="lazy"
          />
          
          {/* Atmospheric Radiant Cyan/Blue Arc */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] h-36 sm:h-48 bg-gradient-to-b from-[#38d9d9]/45 via-[#2563eb]/25 to-transparent blur-3xl rounded-[100%]" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-[#38d9d9] blur-[3px] opacity-85 rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030509]/65 to-[#030509]" />
        </div>

        {/* Global Presence Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-xs font-mono text-[#38bdf8] backdrop-blur-md mb-3 sm:mb-4 shadow-sm shadow-[#38bdf8]/10">
            <Globe className="w-3.5 h-3.5 animate-spin [animation-duration:16s]" />
            <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">Global Production Network</span>
          </div>
          <h3 className="text-2xl sm:text-5xl font-bold tracking-tight text-white mb-2.5 sm:mb-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            Producing for Ambitious Teams Worldwide
          </h3>
          <p className="text-xs sm:text-base text-[#94a3b8] max-w-xl mx-auto leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] px-2 sm:px-0">
            Seamless sprint turnarounds and dedicated video directors across US, UK, Europe, Australia, and Asia timezones.
          </p>
        </div>

        {/* Global Countries 10-Card Grid (Refined, Symmetrical, No Redundant Windows Emoji Glitch) */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {GLOBAL_COUNTRIES.map((c) => (
            <div
              key={c.country}
              className="group p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#09111e]/90 hover:bg-[#0e1b2f] border border-[#1e2e46]/90 hover:border-[#38d9d9]/60 backdrop-blur-xl transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-[#0284c7]/20"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-[#38d9d9]/10 text-[#38d9d9] group-hover:bg-[#38d9d9]/20 transition-colors border border-[#38d9d9]/25">
                  {c.code}
                </span>
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Client Region" />
              </div>

              <div>
                <h4 className="text-xs sm:text-base font-bold text-white group-hover:text-[#38d9d9] transition-colors tracking-tight leading-snug">
                  {c.country}
                </h4>
                <div className="mt-0.5 sm:mt-1 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#7888a2]">
                  <span className="truncate max-w-[70px] sm:max-w-none">{c.region}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#38d9d9]/80 shrink-0">{c.timezone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── 02. Footer Links Grid (Important Links, Services, Specialized Industry, Compare, AI Summary) ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-14 border-b border-white/[0.08] z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
          
          {/* Col 1: Important Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9]" />
              <span>Important Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li>
                <Link to="/#booking" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/personal-branding" className="hover:text-white transition-colors">
                  Personal Branding
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Journal &amp; Insights
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9]" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Motion Graphics &amp; 3D
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Studio Production
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Online Video Content (OVC)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Precision Video Editing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  SaaS Product Explainers
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  DaVinci Resolve Color Grading
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  High-Retention Ad Creative
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Industry */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9]" />
              <span>Specialized Industry</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  SaaS &amp; Tech Platforms
                </Link>
              </li>
              <li>
                <Link to="/personal-branding" className="hover:text-white transition-colors">
                  Founders &amp; Executives
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Commercial Brands
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Coaches &amp; Creators
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Mobile App Launches
                </Link>
              </li>
              <li>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38d9d9] hover:underline pt-1"
                >
                  <span>Company Showreel</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9] animate-pulse" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Compare */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9]" />
              <span>Compare</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#94a3b8]">
              <li>
                <a
                  href="/#comparison"
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#38d9d9]/40 text-slate-200 hover:text-white transition-colors font-medium"
                >
                  Vs Traditional Agencies
                </a>
              </li>
              <li>
                <a
                  href="/#comparison"
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#38d9d9]/40 text-slate-200 hover:text-white transition-colors font-medium"
                >
                  Vs Freelancers
                </a>
              </li>
              <li>
                <a
                  href="/#comparison"
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#38d9d9]/40 text-slate-200 hover:text-white transition-colors font-medium"
                >
                  Vs In-House Production
                </a>
              </li>
              <li className="pt-2 text-[11px] font-mono text-[#64748b] leading-relaxed">
                Direct founder oversight on all client deliverables.
              </li>
            </ul>
          </div>

          {/* Col 5: Explore AI Summary & Verification */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d9d9]" />
              <span>Explore AI Summary</span>
            </h4>
            
            {/* AI Tools Icons Strip (Auto-Prompt Search on Click) */}
            <div className="flex items-center gap-1.5 mb-4">
              {POPULAR_AI_TOOLS.map((ai) => (
                <a
                  key={ai.name}
                  href={ai.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ai.title}
                  aria-label={ai.title}
                  className={`w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 shadow-xs ${ai.color}`}
                >
                  {ai.icon}
                </a>
              ))}
            </div>

            {/* Google / Agency Search Badge */}
            <a
              href="https://www.google.com/search?q=Motionly+Media"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-white transition-colors duration-150 group"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Search Motionly</span>
              <ArrowUpRight className="w-3 h-3 text-[#94a3b8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <div className="mt-4 text-[11px] text-[#718096] space-y-1">
              <div>Email: <a href={`mailto:${email}`} className="text-[#94a3b8] hover:text-[#38d9d9]">{email}</a></div>
              <div>WhatsApp: <a href="https://wa.me/8801605049299" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#38d9d9]">{whatsapp}</a></div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 03. Copyright & Legal Strip ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8a99ad] relative z-20 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 sm:gap-6">
          <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
        </div>

        <div>
          &copy; {currentYear}, Motionly Media LLC. All Rights Reserved.
        </div>

        {/* Back to Top Pill Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-medium border border-white/15 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* ── 04. Giant Crystal-Clear Typographic Watermark "motionly" with Emerald/Cyan Aurora ── */}
      {/* Generous bottom padding (pb-36 sm:pb-48) ensures floating dock never overlaps or covers the name */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pt-4 pb-36 sm:pb-48 z-10">
        
        {/* Crystal-Clear Lowercase Typographic Name (High contrast, clearly legible) */}
        <div className="relative text-center leading-none">
          <span 
            className="block text-[17vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f1f5f9] to-[#94a3b8]/40 font-sans opacity-95"
            style={{ 
              letterSpacing: "-0.05em",
              textShadow: "0 0 80px rgba(56, 189, 248, 0.2)",
            }}
          >
            motionly
          </span>
        </div>

        {/* Horizontal Frosted Glass / Aurora Wave Beam cutting across the lower half */}
        <div className="absolute bottom-24 sm:bottom-32 left-0 right-0 h-16 sm:h-24 bg-gradient-to-r from-transparent via-[#10b981]/25 via-30% via-[#38bdf8]/30 to-transparent blur-2xl opacity-75" />
        
        {/* Crisp Laser Reflection Horizon Line */}
        <div className="absolute bottom-24 sm:bottom-32 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#34d399]/70 via-50% via-[#38bdf8]/70 to-transparent opacity-80" />
      </div>

    </footer>
  );
};

export default Footer;
