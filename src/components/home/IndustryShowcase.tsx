import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface IndustryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  scope: string;
  duration: string;
  quote: {
    name: string;
    role: string;
    avatar: string;
  };
  bgClass: string;
  darkBgClass: string;
  accentColor: string;
  image: string;
  videoId: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: "saas",
    category: "SaaS & Technology",
    title: "Turning Complex Platforms Into High-Converting Visual Stories",
    description:
      "We transform abstract architectures and deep workflows into crisp, high-retention video stories that drive conversions, signups, and investor clarity.",
    scope: "Product Explainer & UI Motion",
    duration: "3-Week Sprint",
    quote: {
      name: "Daniel Vance",
      role: "Head of Product, Atria AI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    bgClass: "bg-[#eaf4fe] text-[#0f172a]",
    darkBgClass: "dark:bg-[#0c1829] dark:text-[#f1f5f9]",
    accentColor: "text-[#0284c7]",
    image: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
    videoId: "xygb6y5L9x8",
  },
  {
    id: "personal-branding",
    category: "Personal Branding & Creators",
    title: "Executive Video Systems That Scale Authority Without The Overhead",
    description:
      "A complete video engine for founders and CEOs. We handle topic research, hook architecture, dynamic editing, and multi-channel asset distribution.",
    scope: "YouTube & Multi-Platform Shorts",
    duration: "Bi-Weekly Sprints",
    quote: {
      name: "Marcus Sterling",
      role: "Founder, Capital Momentum",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    bgClass: "bg-[#ecfdf5] text-[#0f172a]",
    darkBgClass: "dark:bg-[#062016] dark:text-[#f1f5f9]",
    accentColor: "text-[#059669]",
    image: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
    videoId: "pIEkY7YDIF0",
  },
  {
    id: "commercial",
    category: "Commercial Brands & Scale-ups",
    title: "High-Impact Commercial Films That Command Market Attention",
    description:
      "Elevate your brand beyond basic footage. We craft bespoke 3D device staging, dynamic typography, and broadcast-grade color grading in DaVinci Resolve.",
    scope: "Brand Commercial & Color Master",
    duration: "4-Week Sprint",
    quote: {
      name: "Sarah Lin",
      role: "VP Marketing, Varnox",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    },
    bgClass: "bg-[#fef9ee] text-[#0f172a]",
    darkBgClass: "dark:bg-[#1f1708] dark:text-[#f1f5f9]",
    accentColor: "text-[#d97706]",
    image: "https://img.youtube.com/vi/xA_msiryNvQ/maxresdefault.jpg",
    videoId: "xA_msiryNvQ",
  },
];

export const IndustryShowcase: React.FC = () => {
  return (
    <section 
      id="industries"
      className="py-20 sm:py-28 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Design Monks Style) */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-xs font-mono text-[#315EFA] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315EFA]" />
            <span className="uppercase tracking-wider font-bold">Industry Wins</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            Proven Creative Impact <br />
            <span className="font-serif italic font-normal text-[#315EFA]">
              Across Every Industry.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            Whether launching technical software or scaling a recognized personal brand, we adapt our creative language to the specific mechanics of your industry.
          </p>
        </div>

        {/* Large Asymmetric Industry Cards (Directly matching Image 4) */}
        <div className="space-y-8 sm:space-y-10">
          {INDUSTRIES.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 sm:p-10 border border-black/5 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-xl ${item.bgClass} ${item.darkBgClass}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Information (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <span className={`text-base sm:text-lg font-serif italic ${item.accentColor} block mb-2`}>
                      {item.category}
                    </span>

                    {/* Headline */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-8 max-w-xl font-normal">
                      {item.description}
                    </p>

                    {/* Scope & Duration Meta */}
                    <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10 text-xs sm:text-sm">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider opacity-60 block mb-1">
                          Scope
                        </span>
                        <span className="font-semibold">{item.scope}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider opacity-60 block mb-1">
                          Duration
                        </span>
                        <span className="font-semibold">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Client Quote Pill */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 shadow-xs hover:shadow-md transition-all duration-150 group max-w-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.quote.avatar}
                        alt={item.quote.name}
                        className="w-9 h-9 rounded-full object-cover border border-black/10 dark:border-white/20"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold leading-tight">
                          {item.quote.name}
                        </p>
                        <p className="text-[11px] font-mono opacity-60">
                          {item.quote.role}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-[#315EFA] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-150 ml-3">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>

                {/* Right Visual Image (5 cols) */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-black/10 dark:border-white/10 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span className="font-medium">Selected Case Study</span>
                    <span className="text-[#38bdf8] font-bold">Watch Video</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustryShowcase;
