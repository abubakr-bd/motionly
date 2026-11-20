import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import {
  Monitor,
  Users2,
  Rocket,
  Film,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Sliders,
  Check,
  FileCheck,
  Tv,
  Eye,
  Camera
} from "lucide-react";

interface ServicePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  deliverables: string[];
  capabilities: { title: string; detail: string }[];
  idealFor: string;
  aspectRatios: string[];
  highlightBadge?: string;
}

const servicePillars: ServicePillar[] = [
  {
    id: "saas",
    number: "01",
    title: "SaaS & Technology Video Production",
    tagline: "High-retention product explainers, launch videos, and UI motion graphics.",
    category: "FLAGSHIP SPECIALIZATION",
    description:
      "We turn complex software and abstract technical architectures into fluid, compelling video stories that drive conversions, signups, and investor excitement. Engineered with razor-sharp pacing, custom sound design, and bespoke UI animation.",
    deliverables: [
      "Full Product Explainers (60s–90s)",
      "High-Fidelity 2D/3D UI/UX Screen Animations",
      "Launch Trailers & Product Hunt Teasers",
      "Feature Release Walkthroughs & Onboarding Videos",
      "Paid Ad Variations (16:9, 9:16, 1:1)"
    ],
    capabilities: [
      { title: "Hook Architecture", detail: "First 5 seconds engineered to halt scroll drop-off and state the core value proposition instantly." },
      { title: "Precision UI Recreation", detail: "Vector-perfect UI animation in 60fps, highlighting key product workflows with zero screen clutter." },
      { title: "Soundtrack & Foley", detail: "Custom UI sound design, clicks, whooshes, and cinematic mixing that make software feel tactile." },
      { title: "Multi-Platform Export", detail: "4K Master in ProRes 422HQ alongside optimized web H.264/H.265 with captions." }
    ],
    idealFor: "B2B SaaS, Seed to Series B Tech Startups, Developer Tools, AI Platforms, and Enterprise Solutions.",
    aspectRatios: ["16:9 Landscape (Web/YouTube)", "9:16 Vertical (Reels/TikTok/Shorts)", "1:1 Square (Feed Ads)"],
    highlightBadge: "Most Popular"
  },
  {
    id: "personal-branding",
    number: "02",
    title: "Personal Branding & Creator Systems",
    tagline: "Transform your industry expertise into an authoritative, recognizable video presence.",
    category: "EXECUTIVE & FOUNDER",
    description:
      "A complete end-to-end creative engine for founders, CEOs, and ambitious content creators. We handle topic research, hook framing, dynamic editing, motion b-roll, and multi-channel asset distribution so you can focus entirely on your vision.",
    deliverables: [
      "YouTube Long-Form Video Production",
      "High-Impact Short-Form Reels, TikToks & Shorts (30–60s)",
      "LinkedIn & X (Twitter) Thought Leadership Videos",
      "Dynamic Keyframe Captions & Kinetic Typography",
      "Thumbnail Conceptualization & Design Direction"
    ],
    capabilities: [
      { title: "Story Pacing", detail: "Eliminating conversational dead air and weaving visual b-roll to maintain peak viewer watch time." },
      { title: "Brand Identity", detail: "Custom typography palettes, color grades, and lower-thirds unique to your personal persona." },
      { title: "Content Repurposing", detail: "Splitting a single recording session into 1 long-form anchor video and 4–8 viral short clips." },
      { title: "Feedback Cadence", detail: "Direct Frame.io and Slack review loops with fast 48-hour turnarounds on short-form assets." }
    ],
    idealFor: "Founders, C-Suite Executives, Solopreneurs, Technical Creators, and Thought Leaders.",
    aspectRatios: ["9:16 Vertical (Reels/Shorts)", "16:9 Long-Form (YouTube)", "4:5 Portrait (LinkedIn)"]
  },
  {
    id: "motion-design",
    number: "03",
    title: "2D & 3D Motion Graphics & CGI",
    tagline: "Abstract visualization, 3D device staging, and kinetic brand systems.",
    category: "ADVANCED VISUALS",
    description:
      "Elevate your brand beyond screen recordings. We craft bespoke 3D device mockups, isometric tech diagrams, HUD telemetry graphics, and physics-driven particle simulations that make your product look five years ahead of the competition.",
    deliverables: [
      "3D Device Renders & Isometric Illustrations",
      "Kinetic Logo Animations & Brand Ident Systems",
      "Data & Architecture Flow Visualizations",
      "3D Product Packaging & Exploded Views",
      "HUD Interfaces, Telemetry Overlays & Sci-Fi VFX"
    ],
    capabilities: [
      { title: "Cinema 4D / Blender Pipelines", detail: "Photorealistic lighting, glass refractions, and metallic textures tailored to your design tokens." },
      { title: "Kinetic Typography", detail: "Expressive editorial type motion synchronized frame-by-frame with vocal emphasis." },
      { title: "Vector Systems", detail: "Smooth SVG/Lottie compatible animation alongside heavy 4K raster CGI deliverables." },
      { title: "Looping Stage Assets", detail: "Seamless web video loops for hero sections, booth displays, and keynote decks." }
    ],
    idealFor: "Hardware Companies, Web3/Fintech Protocols, Brand Relaunches, and Creative Agencies.",
    aspectRatios: ["16:9 4K Cinema", "Custom Web Canvas Ratios", "Ultra-wide 21:9"]
  },
  {
    id: "commercial-production",
    number: "04",
    title: "Commercial Campaigns & Production Support",
    tagline: "Optional on-location cinematography, studio shoots, and full campaign delivery.",
    category: "PRODUCTION SUPPORT",
    description:
      "Need more than post-production? When your project requires physical cameras, we offer complete production support: professional cinematography, studio filming, on-location multi-camera setups, lighting design, and creative direction.",
    deliverables: [
      "Brand Commercials & Manifesto Films",
      "Customer Case Study Interviews & Testimonials",
      "Studio & On-Location Physical Filming",
      "Color Grading (DaVinci Resolve ACES / Arri Log)",
      "Broadcast-Ready Audio Mastering (-14 LUFS / -23 LUFS)"
    ],
    capabilities: [
      { title: "Director of Photography", detail: "Cinema camera packages (RED, Sony FX line, Arri) with cinema prime lenses and wireless monitoring." },
      { title: "Lighting & Grip", detail: "High-CRI aperture lighting, softboxes, and controlled studio environments." },
      { title: "Remote Producer Feeds", detail: "Live stream monitoring so stakeholders can review takes in real-time from anywhere in the world." },
      { title: "Sound Engineering", detail: "Multi-track wireless lavaliers and directional boom mics with pristine studio de-noising." }
    ],
    idealFor: "Ambitious Brands, Growth Marketing Teams, Capital Raises, and High-Ticket Client Campaigns.",
    aspectRatios: ["2.39:1 Anamorphic Widescreen", "16:9 Broadcast", "9:16 Social Ads"]
  }
];

const technicalSpecs = [
  { label: "Master Delivery Formats", value: "Apple ProRes 422HQ, Apple ProRes 4444, H.265 / H.264 MP4" },
  { label: "Color Grading Standards", value: "Rec.709 Standard, P3 Wide Gamut, ACES Color Managed Workflow" },
  { label: "Audio Engineering", value: "-14 LUFS (YouTube/Streaming), -16 LUFS (Podcasts), -23 LUFS (Broadcast)" },
  { label: "Resolution Standards", value: "3840×2160 (4K UHD), 1920×1080 (Full HD), 1080×1920 (Vertical 9:16)" },
  { label: "Turnaround SLA", value: "First cuts delivered in 5–7 business days; revisions within 24–48 hours" },
  { label: "Source File Policy", value: "Full IP ownership; clean Adobe Premiere / After Effects / project archives provided" }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("saas");

  const currentPillar = servicePillars.find((p) => p.id === activeTab) || servicePillars[0];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: servicePillars.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@type": "Organization", name: "Motionly Media", url: "https://motionly.media" },
          serviceType: service.category
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://motionly.media/services" },
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title="Services & Capabilities | Motionly Media Creative Agency"
        description="Explore Motionly Media's specialized video marketing capabilities: SaaS product videos, personal branding engines, 2D/3D motion graphics, and full commercial production support."
        url="https://motionly.media/services"
        schema={schemas}
      />

      <div className="bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
        {/* =========================================================================
            1. EDITORIAL HERO SECTION
        ========================================================================= */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-white/10 overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] -z-10" />

          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  CAPABILITIES &amp; SPECIALIZATIONS
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                  Creative video systems. Built to move markets.
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                  From high-converting SaaS product walk-throughs to executive personal branding and cinematic motion design, we unite storytelling and technical execution to help ambitious brands lead their category.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all duration-150 active:scale-[0.98]"
                >
                  <span>Book Scoping Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <span>View Case Studies</span>
                </Link>
              </div>
            </div>

            {/* Studio Metrics & SLA Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Core Output</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">4K Master Delivery</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Fast Turnaround</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">5–7 Day First Cuts</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Asset Ownership</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">100% IP &amp; Source Files</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Client Footprint</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">US, UK, CA, AU &amp; Global</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE SERVICE PILLARS (DEEP DIVE SELECTOR)
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                  DISCIPLINES &amp; WORKFLOWS
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Four core production pillars. One standard of craft.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                Select a discipline to explore capabilities, deliverables, and production specifications.
              </p>
            </div>

            {/* Service Tab Switcher */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-10">
              {servicePillars.map((pillar) => {
                const isActive = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveTab(pillar.id)}
                    className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-md"
                        : "bg-slate-50 dark:bg-[#0A0F1D] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-blue-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold opacity-75">{pillar.number}</span>
                      {pillar.highlightBadge && (
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                        }`}>
                          {pillar.highlightBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-bold tracking-tight line-clamp-1">{pillar.title}</p>
                    <p className="text-[11px] font-mono mt-1 opacity-80 uppercase tracking-wider">{pillar.category}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Detailed Inspection Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-10 rounded-3xl bg-slate-50/80 dark:bg-[#0A0F1D]/90 border border-slate-200/80 dark:border-white/10 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Overview & Deliverables */}
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 mb-4">
                      {currentPillar.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                      {currentPillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6">
                      {currentPillar.description}
                    </p>

                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      What We Deliver
                    </h4>
                    <ul className="space-y-2.5 mb-8">
                      {currentPillar.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Ideal For</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                        {currentPillar.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key Technical Capabilities & Export Ratios */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Key Execution Capabilities
                      </h4>
                      <div className="space-y-3">
                        {currentPillar.capabilities.map((cap, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200/80 dark:border-white/5">
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{cap.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{cap.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Tv className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Supported Aspect Ratios
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentPillar.aspectRatios.map((ratio, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                          >
                            {ratio}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
                      >
                        <span>Scope a {currentPillar.title.split(" ")[0]} Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* =========================================================================
            3. TECHNICAL SPECIFICATIONS & PRODUCTION QUALITY MATRIX
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#070B16]">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                PRODUCTION ARCHITECTURE
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Studio-grade specifications. Zero compromises.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Every video passing through Motionly undergoes strict color calibration, loudness mastering, and precision export profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicalSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B1020] border border-slate-200/80 dark:border-white/10 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-3">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {spec.label}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOW WE ENGAGE (SPRINT VS RETAINER VS ENTERPRISE)
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                ENGAGEMENT MODELS
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Partnerships designed around your growth stage.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you need a single breakthrough product video or an ongoing creative partnership, we fit into your release cycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Sprint */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500">01</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                      Project-Based
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Single Video Sprint</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Ideal for specific milestone moments: product launches, funding announcements, or hero website explainers.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> 1 Hero Master + 3 Social Cuts</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> 5–7 Day First Cut Delivery</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> 2 Rounds of Revisions Included</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Dedicated Art Director &amp; Editor</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=sprint"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-cyan-300 transition-colors"
                  >
                    <span>Request Sprint Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 2: Monthly Creative Partner (Highlighted) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-[#0C1428] border-2 border-blue-500/80 shadow-lg shadow-blue-500/10 flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Recommended For Scale
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">02</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                      Ongoing Retainer
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Creative Growth Partner</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Ongoing content momentum. An embedded video squad managing your weekly releases, product updates, and marketing ads.
                  </p>
                  <div className="mt-6 pt-6 border-t border-blue-200/80 dark:border-white/10 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Weekly Video Output &amp; Iteration</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Dedicated Slack Connect Channel</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Fast 48-Hour Short-Form Turnarounds</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Pause or Adjust Anytime</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=retainer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
                  >
                    <span>Discuss Monthly Partnership</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 3: Enterprise Custom */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500">03</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold bg-slate-200/70 dark:bg-white/10 px-2 py-0.5 rounded-full">
                      Custom Architecture
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise &amp; Production</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    For market leaders requiring bespoke 3D pipelines, physical studio shoots, on-location cinematography, and multi-format distribution.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> On-Site Camera Crew &amp; Studio Sets</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Custom 3D CGI &amp; Visual FX Pipelines</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Custom SLA &amp; Round-the-Clock Team</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Bespoke Security &amp; NDA Workflows</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=enterprise"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-cyan-300 transition-colors"
                  >
                    <span>Request Custom Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FINAL SCOPING CALL TO ACTION
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              START YOUR PROJECT
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
              Let&apos;s build your next breakthrough video.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Tell us about your upcoming launch, growth goals, or content requirements. We&apos;ll prepare an actionable scoping roadmap within 24 hours.
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
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-colors"
              >
                <span>Browse Showcase Videos</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
