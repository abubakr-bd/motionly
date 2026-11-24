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
  X,
  FileCheck,
  Tv,
  Eye,
  Camera,
  Cpu,
  ShieldCheck,
  Zap,
  Calculator
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

const toolStack = [
  { name: "Premiere Pro", role: "Long-form narrative & assembly", color: "#9999FF" },
  { name: "After Effects", role: "UI motion & VFX compositing", color: "#CF9FFF" },
  { name: "DaVinci Resolve", role: "ACES & cinema color grading", color: "#FF7878" },
  { name: "Cinema 4D", role: "3D device & procedural rendering", color: "#007FFF" },
  { name: "Blender 3D", role: "Photoreal simulation & lighting", color: "#FFA500" },
  { name: "Runway & AI", role: "Generative expansion & speed", color: "#38BDF8" }
];

const comparisonRows = [
  { feature: "Dedicated Creative Director", inHouse: "Requires $140k+ salary", freelancer: "Rarely (Self-directed)", motionly: "Included on every project" },
  { feature: "Turnaround Speed", inHouse: "2–4 weeks (Queue bottleneck)", freelancer: "Unpredictable / ghosting risk", motionly: "5–7 Days First Cut SLA" },
  { feature: "Multi-Discipline Skillset", inHouse: "Limited to 1 person's strengths", freelancer: "Single focus (Edit OR 3D)", motionly: "Full squad: Editors, 3D, Audio" },
  { feature: "Pristine Sound Design & Foley", inHouse: "Stock audio tracks", freelancer: "Basic background music", motionly: "Custom layered UI & cinematic mix" },
  { feature: "Revisions & Communication", inHouse: "Internal meetings & friction", freelancer: "Fragmented emails / messages", motionly: "Frame.io + Slack Connect" },
  { feature: "Source Files & Full IP Ownership", inHouse: "Yes", freelancer: "Often withheld / extra fee", motionly: "100% Included with clean assets" }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("saas");
  const currentPillar = servicePillars.find((p) => p.id === activeTab) || servicePillars[0];

  // Interactive Scope Calculator states
  const [calcTier, setCalcTier] = useState<"sprint" | "retainer" | "3d">("sprint");
  const [calcVolume, setCalcVolume] = useState<number>(1);

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

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-[700px] right-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[130px] -z-10" 
        />

        {/* =========================================================================
            1. EDITORIAL HERO SECTION
        ========================================================================= */}
        <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[#38bdf8] font-bold uppercase tracking-wider">Capabilities &amp; Specializations</span>
                <span className="text-white/20">•</span>
                <span className="text-white/70">Full-Stack Video Studio</span>
              </div>

              {/* Headline with Serif Italic Accent */}
              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-6">
                Creative video systems.
                <span className="block font-serif italic font-normal text-[#38bdf8] mt-1">
                  Engineered to move markets.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                From high-converting SaaS product walkthroughs to executive personal branding and cinematic motion design, we unite editorial judgment with technical firepower.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_25px_rgba(49,94,250,0.35)] transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Book Scoping Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-colors"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Studio Metrics & SLA Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Core Deliverable</p>
                <p className="text-sm sm:text-base font-bold text-white mt-1">4K Master Delivery</p>
                <p className="text-xs text-slate-400 mt-0.5">ProRes 422HQ &amp; MP4</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Fast Turnaround</p>
                <p className="text-sm sm:text-base font-bold text-white mt-1">5–7 Day First Cuts</p>
                <p className="text-xs text-slate-400 mt-0.5">48h on short-form assets</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Asset Ownership</p>
                <p className="text-sm sm:text-base font-bold text-white mt-1">100% IP &amp; Source Files</p>
                <p className="text-xs text-slate-400 mt-0.5">Organized project files</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Global Client Reach</p>
                <p className="text-sm sm:text-base font-bold text-white mt-1">US, UK, CA, AU &amp; Global</p>
                <p className="text-xs text-slate-400 mt-0.5">Asynchronous Slack sync</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CREATIVE TECH STACK PODIUM
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/5 text-[#38bdf8] border border-white/10 mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>Production Infrastructure</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Our Creative <span className="font-serif italic font-normal text-[#38bdf8]">Tool Podium</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                We combine industry-standard post-production suites with next-gen 3D and generative workflows to deliver pristine visual fidelity.
              </p>
            </div>

            {/* Glowing Glass Podium */}
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
                {toolStack.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 380, damping: 25 }}
                    className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.06] transition-colors duration-200 text-center flex flex-col items-center justify-between cursor-default"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${tool.color}15`, border: `1px solid ${tool.color}40`, color: tool.color }}
                    >
                      {tool.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">{tool.name}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{tool.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ambient Podium Under-glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent blur-sm" />
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTERACTIVE SERVICE PILLARS
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                  DISCIPLINES &amp; WORKFLOWS
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  Four core pillars. <span className="font-serif italic font-normal text-[#38bdf8]">One standard of craft.</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">
                Select a discipline to inspect production deliverables, aspect ratios, and specialized engineering capabilities.
              </p>
            </div>

            {/* Service Tab Switcher */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8" role="tablist">
              {servicePillars.map((pillar) => {
                const isActive = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`text-left p-4 sm:p-5 rounded-2xl border transition-colors duration-150 relative cursor-pointer active:scale-98 ${
                      isActive
                        ? "text-white border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                        : "bg-white/[0.02] text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="services-pillar-tab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-2xl bg-white/[0.08] -z-10"
                      />
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#38bdf8]">{pillar.number}</span>
                      {pillar.highlightBadge && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#315EFA]/20 text-[#38bdf8] border border-[#315EFA]/40">
                          {pillar.highlightBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1">{pillar.title}</p>
                    <p className="text-[11px] font-mono mt-1 text-slate-400 uppercase tracking-wider">{pillar.category}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Detailed Inspection Box with Apple Spring Physics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -12 }}
                transition={{ type: "spring", damping: 28, stiffness: 340 }}
                className="p-6 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Overview & Deliverables */}
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-white/5 text-[#38bdf8] border border-white/10 mb-4">
                      {currentPillar.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                      {currentPillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6">
                      {currentPillar.description}
                    </p>

                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#38bdf8]" />
                      What We Deliver
                    </h4>
                    <ul className="space-y-2.5 mb-8">
                      {currentPillar.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">Ideal For</p>
                      <p className="text-xs sm:text-sm font-semibold text-white mt-1">
                        {currentPillar.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key Technical Capabilities & Export Ratios */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#38bdf8]" />
                        Key Execution Capabilities
                      </h4>
                      <div className="space-y-3">
                        {currentPillar.capabilities.map((cap, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <p className="text-xs font-bold text-white">{cap.title}</p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cap.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                        <Tv className="w-4 h-4 text-[#38bdf8]" />
                        Supported Aspect Ratios
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentPillar.aspectRatios.map((ratio, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/5 text-slate-300 border border-white/10"
                          >
                            {ratio}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md transition-colors"
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
            4. INTERACTIVE ESTIMATOR WIDGET (Inspired by Designmonks Image 1)
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-white/[0.08] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] via-[#315EFA]/10 to-transparent border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/5 text-[#38bdf8] border border-white/10 w-fit mb-4">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Production Scope Estimator</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                Estimate your project timeline &amp; deliverables.
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mb-8 font-normal">
                Select your format to see real-world delivery turnaround, included revisions, and project squad allocation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {[
                  { id: "sprint", option: "OPTION A", title: "SaaS Launch Sprint", desc: "Single milestone explainer", vol: 1 },
                  { id: "retainer", option: "OPTION B", title: "Monthly Video Retainer", desc: "Embedded creative squad", vol: 4 },
                  { id: "3d", option: "OPTION C", title: "3D Device & CGI", desc: "Photoreal hardware & HUD", vol: 1 },
                ].map((item) => {
                  const isSelected = calcTier === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { setCalcTier(item.id as any); setCalcVolume(item.vol); }}
                      className={`relative p-4 rounded-2xl border text-left transition-colors duration-150 cursor-pointer active:scale-98 ${
                        isSelected
                          ? "text-white border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                          : "bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="services-calc-tier"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-2xl bg-[#38bdf8]/15 -z-10"
                        />
                      )}
                      <p className="text-xs font-mono text-[#38bdf8] font-bold">{item.option}</p>
                      <p className="text-sm font-bold text-white mt-1">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Output Box with Apple Spring Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={calcTier}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.99 }}
                  transition={{ type: "spring", damping: 25, stiffness: 320 }}
                  className="p-6 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#38bdf8] block">Turnaround SLA</span>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {calcTier === "sprint" ? "5–7 Days First Cut" : calcTier === "retainer" ? "Weekly Releases (48h edits)" : "7–10 Days 3D Passes"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#38bdf8] block">Included Outputs</span>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {calcTier === "sprint" ? "1 Hero 4K + 3 Social Cuts" : calcTier === "retainer" ? "4–8 Videos + Shorts/month" : "4K Device Render + Stills"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <Link
                      to={`/contact/?plan=${calcTier}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md transition-all active:scale-[0.98]"
                    >
                      <span>Book This Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. COMPARISON MATRIX
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/5 text-[#38bdf8] border border-white/10 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The Studio Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Why Motionly vs <span className="font-serif italic font-normal text-[#38bdf8]">Alternatives</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Compare our end-to-end studio model against traditional agencies, fragmented freelancers, and expensive internal hires.
              </p>
            </div>

            {/* Structured Table */}
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Execution Factor</th>
                    <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Full-Time In-House</th>
                    <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Freelancer Marketplace</th>
                    <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] bg-[#315EFA]/10 border-l border-r border-[#315EFA]/20">Motionly Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{row.feature}</td>
                      <td className="py-4 px-6 text-slate-400">{row.inHouse}</td>
                      <td className="py-4 px-6 text-slate-400">{row.freelancer}</td>
                      <td className="py-4 px-6 font-semibold text-[#38bdf8] bg-[#315EFA]/5 border-l border-r border-[#315EFA]/20 flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#38bdf8] shrink-0" />
                        <span>{row.motionly}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. HOW WE ENGAGE
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                ENGAGEMENT MODELS
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Partnerships designed around <span className="font-serif italic font-normal text-[#38bdf8]">your growth stage</span>.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Whether you need a single breakthrough product launch video or an embedded monthly creative video squad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Sprint */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">01</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] font-bold bg-[#315EFA]/20 px-2 py-0.5 rounded-full">
                      Project-Based
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Single Video Sprint</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Ideal for specific milestone moments: product launches, funding announcements, or hero website explainers.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> 1 Hero Master + 3 Social Cuts</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> 5–7 Day First Cut Delivery</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> 2 Rounds of Revisions Included</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Dedicated Art Director &amp; Editor</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=sprint"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-colors"
                  >
                    <span>Request Sprint Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 2: Monthly Creative Partner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#315EFA]/20 to-[#315EFA]/5 border-2 border-[#38bdf8] shadow-[0_0_40px_rgba(56,189,248,0.2)] flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38bdf8] text-[#070b14] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Recommended For Scale
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span className="font-mono text-xs font-bold text-[#38bdf8]">02</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] font-bold bg-[#38bdf8]/20 px-2 py-0.5 rounded-full">
                      Ongoing Retainer
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Creative Growth Partner</h3>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                    Ongoing content momentum. An embedded video squad managing your weekly releases, product updates, and marketing ads.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-xs text-white">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Weekly Video Output &amp; Iteration</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Dedicated Slack Connect Channel</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Fast 48-Hour Short-Form Turnarounds</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Pause or Adjust Anytime</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=retainer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md transition-colors"
                  >
                    <span>Discuss Monthly Partnership</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 3: Enterprise Custom */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">03</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                      Custom Architecture
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Enterprise &amp; Production</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    For market leaders requiring bespoke 3D pipelines, physical studio shoots, on-location cinematography, and multi-format distribution.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> On-Site Camera Crew &amp; Studio Sets</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Custom 3D CGI &amp; Visual FX Pipelines</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Custom SLA &amp; Round-the-Clock Team</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#38bdf8]" /> Bespoke Security &amp; NDA Workflows</div>
                  </div>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    to="/contact?plan=enterprise"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-colors"
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
            7. TECHNICAL SPECIFICATIONS
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                PRODUCTION ARCHITECTURE
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Studio-grade specifications. <span className="font-serif italic font-normal text-[#38bdf8]">Zero compromises.</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Every video passing through Motionly undergoes strict color calibration, loudness mastering, and precision export profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicalSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/30 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-3">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {spec.label}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FINAL SCOPING CALL TO ACTION
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center">
          <div className="pointer-events-none transform-gpu will-change-transform absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/5 text-[#38bdf8] border border-white/10 mb-4">
              <Zap className="w-3 h-3" />
              <span>Start Your Production</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-bold text-white tracking-tight mb-4">
              Let&apos;s build your next <span className="font-serif italic font-normal text-[#38bdf8]">breakthrough video</span>.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Tell us about your upcoming launch, growth goals, or content requirements. We&apos;ll prepare an actionable scoping roadmap within 24 hours.
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
