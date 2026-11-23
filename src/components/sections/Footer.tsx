import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { ArrowUpRight, ArrowUp, Globe, Sparkles, Star, MapPin } from "lucide-react";

interface LocationCard {
  country: string;
  code: string;
  address: string;
  city: string;
  hub: string;
}

const GLOBAL_OFFICES: LocationCard[] = [
  {
    country: "United States",
    code: "US",
    address: "432 Park Ave S, Nomad",
    city: "New York, NY 10016",
    hub: "US Client Direction",
  },
  {
    country: "United Kingdom",
    code: "UK",
    address: "14 Soho Square",
    city: "Soho, London W1D 3QG",
    hub: "European Production",
  },
  {
    country: "Canada",
    code: "CA",
    address: "200 Bay Street, Suite 1200",
    city: "Toronto, ON M5J 2J2",
    hub: "North America Sprints",
  },
  {
    country: "Australia",
    code: "AU",
    address: "100 Barangaroo Avenue",
    city: "Sydney, NSW 2000",
    hub: "APAC Creative Sprints",
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    address: "DIFC Gate Precinct 4",
    city: "Downtown Dubai, UAE",
    hub: "Middle East & GCC",
  },
  {
    country: "Singapore",
    code: "SG",
    address: "10 Marina Boulevard, MBFC",
    city: "Marina Bay, Singapore 018983",
    hub: "Asia-Pacific Hub",
  },
  {
    country: "Germany",
    code: "DE",
    address: "Friedrichstraße 68",
    city: "10117 Berlin, Germany",
    hub: "EU Tech & SaaS",
  },
  {
    country: "Bangladesh",
    code: "BD",
    address: "Ventura Iconia, Plot 37 Road 11",
    city: "Banani, Dhaka 1213",
    hub: "Creative Studio HQ",
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
    <footer className="relative bg-[#04060b] text-[#eef0f5] overflow-hidden pt-16 sm:pt-24 border-t border-white/[0.08] transition-colors duration-200">
      
      {/* ── 01. Earth Atmosphere Horizon & Global Production Network ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28">
        
        {/* Curved Glowing Space Horizon Background */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] max-w-[1500px] h-[420px] pointer-events-none overflow-hidden select-none">
          {/* Curved Earth NASA Imagery with vivid atmosphere rim */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Global Earth Horizon"
            className="w-full h-full object-cover object-top opacity-65 mix-blend-screen scale-110"
            loading="lazy"
          />
          {/* Atmospheric Radiant Blue Arc */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-36 bg-gradient-to-b from-[#38bdf8]/35 via-[#2563eb]/20 to-transparent blur-3xl rounded-[100%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04060b]/70 to-[#04060b]" />
        </div>

        {/* Global Presence Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-xs font-mono text-[#38bdf8] backdrop-blur-md mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5 animate-spin [animation-duration:16s]" />
            <span className="uppercase tracking-wider font-semibold">Global Production Network</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Producing for Ambitious Teams Worldwide
          </h3>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto leading-relaxed font-normal">
            Seamless sprint turnarounds and dedicated video directors across US, UK, Europe, Australia, and Asia timezones.
          </p>
        </div>

        {/* Global Offices 8-Card Grid (Refined with Studio Hubs) */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GLOBAL_OFFICES.map((office) => (
            <div
              key={office.country}
              className="group p-4 sm:p-5 rounded-2xl bg-[#09111e]/85 hover:bg-[#0e1b2f] border border-[#1e2e46] hover:border-[#38bdf8]/60 backdrop-blur-md transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 shadow-md hover:shadow-xl hover:shadow-[#0284c7]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors tracking-tight">
                    {office.country}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.08] text-[#94a3b8] group-hover:bg-[#38bdf8]/15 group-hover:text-[#38bdf8] transition-colors border border-white/5">
                    {office.code}
                  </span>
                </div>
                <p className="text-xs text-[#cbd5e1] font-medium leading-snug">
                  {office.address}
                </p>
                <p className="text-[11px] text-[#7888a2] font-mono mt-0.5 leading-snug">
                  {office.city}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#38bdf8]">
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                  {office.hub}
                </span>
                <MapPin className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── 02. Footer Links Grid (Important Links, Services, Specialized Industry, Compare, AI Summary) ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-14 border-b border-white/[0.08]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Col 1: Important Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Important Links
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
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Services
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
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Specialized Industry
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
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Compare
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li>
                <a
                  href="/#comparison"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-white font-medium hover:border-[#38d9d9]/40 hover:text-[#38d9d9] transition-colors"
                >
                  <span>Vs Traditional Agencies</span>
                </a>
              </li>
              <li>
                <a href="/#comparison" className="hover:text-white transition-colors">
                  Vs Freelancers
                </a>
              </li>
              <li>
                <a href="/#comparison" className="hover:text-white transition-colors">
                  Vs In-House Production
                </a>
              </li>
              <li className="pt-2 text-xs font-mono text-[#64748b] leading-relaxed">
                Direct founder oversight on all client deliverables.
              </li>
            </ul>
          </div>

          {/* Col 5: Explore AI Summary & Verification */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Explore AI Summary
            </h4>
            
            {/* AI Tools Icons Strip */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Perplexity Ready">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Gemini & Claude Optimized">
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="ChatGPT Verified">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8a99ad] relative z-20">
        <div className="flex items-center gap-6">
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
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-medium border border-white/15 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* ── 04. Giant Crystal-Clear Typographic Watermark "motionly" with Emerald/Cyan Aurora (Matching Design Monks) ── */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pt-4 pb-28 sm:pb-36">
        
        {/* Crystal-Clear Lowercase Typographic Name (High contrast, clearly legible) */}
        <div className="relative text-center leading-none">
          <span 
            className="block text-[18vw] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e2e8f0] to-[#64748b] font-sans opacity-85"
            style={{ 
              letterSpacing: "-0.05em",
              textShadow: "0 0 60px rgba(56, 189, 248, 0.15)",
            }}
          >
            motionly
          </span>
        </div>

        {/* Horizontal Frosted Glass / Aurora Wave Beam cutting across the lower half */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 h-16 sm:h-24 bg-gradient-to-r from-transparent via-[#10b981]/25 via-30% via-[#38bdf8]/30 to-transparent blur-2xl opacity-75" />
        
        {/* Crisp Laser Reflection Horizon Line */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#34d399]/70 via-50% via-[#38bdf8]/70 to-transparent opacity-80" />
      </div>

    </footer>
  );
};

export default Footer;
