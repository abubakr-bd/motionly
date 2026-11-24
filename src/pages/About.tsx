import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import Team from "../components/sections/Team";
import SEO from "../components/layout/SEO";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Tv,
  Film,
  Zap,
  Layers,
  Award,
  Globe2,
  TrendingUp,
  Sliders,
  ShieldCheck,
  Cpu
} from "lucide-react";

const studioPrinciples = [
  {
    number: "01",
    title: "Editorial Judgment",
    tagline: "Every cut serves the narrative.",
    description: "In an internet saturated with algorithmic noise, attention is earned through story, pacing, and visual intention—not gimmicks. We edit with purpose, ensuring every second reinforces your brand's authority."
  },
  {
    number: "02",
    title: "Technical & Motion Precision",
    tagline: "Silicon Valley-grade fidelity.",
    description: "From pixel-perfect vector UI animation to photo-realistic 3D CGI and DaVinci color grading, our technical execution rivals the most prestigious global production houses."
  },
  {
    number: "03",
    title: "One Unified Creative Squad",
    tagline: "No fragmented freelance handoffs.",
    description: "Strategists, cinematographers, 3D artists, and editors work as a single tightly coordinated team. You get continuous creative ownership from brief to final master delivery."
  },
  {
    number: "04",
    title: "Retention & Performance Driven",
    tagline: "Beauty built to convert.",
    description: "We analyze second-by-second watch time, click-through rates, and conversion signals to refine hooks, pacing, and visual payoff across every campaign."
  }
];

const studioStats = [
  { value: "50+", label: "Venture-Backed Clients", detail: "US, UK, CA, AU & Europe" },
  { value: "100M+", label: "Audience Views Generated", detail: "Across YouTube, LinkedIn, X, Meta & TikTok" },
  { value: "98%", label: "On-Time Master Delivery", detail: "5–7 day turnaround on first cuts" },
  { value: "11", label: "Full-Time Studio Artists", detail: "Under one collaborative roof" }
];

const About: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://motionly.media/about" },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Motionly Media Studio",
        description: "Meet Motionly Media—an elite video marketing agency and production studio partnering with creators and ambitious brands worldwide.",
        url: "https://motionly.media/about",
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="About Motionly Media | Creative Video & Production Studio"
        description="Meet Motionly Media—an independent creative agency and production studio partnering with ambitious SaaS companies, founders, and creator brands worldwide."
        url="https://motionly.media/about"
        schema={aboutSchema}
      />

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* Subtle Ambient Glow Lighting inspired by Designmonks & Lumas Creative */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#315EFA]/15 rounded-full blur-[150px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute top-[700px] right-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[140px] -z-10" 
        />

        {/* =========================================================================
            1. STUDIO MANIFESTO HERO
        ========================================================================= */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl mb-14">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[#38bdf8] font-bold uppercase tracking-wider">The Studio Manifesto</span>
                <span className="text-white/20">•</span>
                <span className="text-white/70">Independent Creative House</span>
              </div>

              {/* Headline with Serif Italic Accent */}
              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
                We believe stories aren&apos;t just seen.
                <span className="block font-serif italic font-normal text-[#38bdf8] mt-1">
                  They move markets.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Motionly was founded on a simple conviction: as video becomes the default operating language of modern commerce, generic templates and automated shortcuts fail. Real influence demands taste, deliberate pacing, narrative clarity, and relentless visual craft.
              </p>
            </div>

            {/* Studio Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {studioStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#38bdf8]/30 transition-all shadow-lg"
                >
                  <p className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#38bdf8]">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white mt-1">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OUR CREATIVE PRINCIPLES
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                HOW WE THINK
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Four principles that anchor <span className="font-serif italic font-normal text-[#38bdf8]">every frame</span>.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studioPrinciples.map((principle) => (
                <div
                  key={principle.number}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#38bdf8]">
                      {principle.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Motionly Principle
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mt-1 mb-3">
                    {principle.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. GLOBAL AGENCY FOOTPRINT & COLLABORATION
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-white/5 text-[#38bdf8] border border-white/10 mb-4">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>GLOBAL STUDIO OPERATION</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                  Headquartered in Dhaka. <span className="font-serif italic font-normal text-[#38bdf8]">Delivering worldwide.</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                  We bridge time zones effortlessly. With full-time studio facilities and asynchronous collaboration pipelines via Slack Connect and Frame.io, we partner seamlessly with high-growth teams across San Francisco, New York, London, Toronto, and Sydney.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>Direct Slack Connect channel for real-time creative sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>Frame.io timecoded comments and instant iteration rounds</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>Enterprise-grade NDAs and confidential asset security</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md">
                  <h3 className="text-lg font-bold tracking-tight text-white mb-4 flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#38bdf8]" />
                    Studio Production Stack
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2.5 border-b border-white/10">
                      <span className="text-slate-400">Post-Production</span>
                      <span className="font-mono font-semibold text-white">Premiere Pro, After Effects, DaVinci</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-white/10">
                      <span className="text-slate-400">3D CGI &amp; VFX</span>
                      <span className="font-mono font-semibold text-white">Cinema 4D, Blender, Redshift 3D</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-white/10">
                      <span className="text-slate-400">Sound Engineering</span>
                      <span className="font-mono font-semibold text-white">Ableton Live, iZotope RX10, Logic Pro</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-white/10">
                      <span className="text-slate-400">Live Production Packages</span>
                      <span className="font-mono font-semibold text-white">Sony FX cinema lines, Cinema Primes</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-slate-400">Color Pipeline</span>
                      <span className="font-mono font-semibold text-white">ACES 1.3, Rec.709, Wide Gamut P3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. THE COLLECTIVE (FULL TEAM SHOWCASE)
        ========================================================================= */}
        <Team />

        {/* =========================================================================
            5. FINAL STUDIO CTA
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center border-t border-white/[0.08]">
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-3">
              WORK WITH OUR SQUAD
            </p>
            <h2 className="text-3xl sm:text-6xl font-bold text-white tracking-tight mb-4">
              Ready to elevate your <span className="font-serif italic font-normal text-[#38bdf8]">visual identity?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Book a creative discovery session. We&apos;ll review your current video performance, discuss upcoming roadmap priorities, and outline a tailored production plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_30px_rgba(49,94,250,0.4)] transition-all duration-150 active:scale-[0.98]"
              >
                <span>Book 30-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-colors"
              >
                <span>Explore Showcase Videos</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
