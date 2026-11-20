import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Sparkles, Layers, Film, Cpu, Tv, Video } from "lucide-react";

interface Discipline {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  formats: string[];
  technicalSpecs: {
    resolution: string;
    codec: string;
    colorSpace: string;
    audioSpec: string;
  };
  previewImage: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: "saas",
    number: "01",
    title: "SaaS & Product Videos",
    subtitle: "Turn Software Architecture Into Visual Conversions",
    description: "Complex software deserves effortless communication. We create high-converting SaaS product walkthroughs, feature launch films, UI animations, and explainer campaigns that help enterprise buyers and developers immediately grasp your product's value.",
    deliverables: [
      "SaaS product explainer videos",
      "Interactive UI motion capture",
      "Feature release launch trailers",
      "Developer tooling walkthroughs",
      "Product-led onboarding videos"
    ],
    formats: ["16:9 Landscape (4K UHD)", "9:16 Vertical Cutdowns", "1:1 Social Feeds"],
    technicalSpecs: {
      resolution: "3840 x 2160 (4K UHD)",
      codec: "Apple ProRes 422HQ",
      colorSpace: "Rec.709 / sRGB Master",
      audioSpec: "-14 LUFS Broadcast Normalized"
    },
    previewImage: "/employes/abu_bakar.webp"
  },
  {
    id: "personal-branding",
    number: "02",
    title: "Personal Branding Systems",
    subtitle: "Authority & Thought Leadership for Founders",
    description: "Turn your domain expertise into an authoritative, recognizable personal brand. We engineer end-to-end video production, strategic narrative hooks, dynamic editing, and multi-platform distribution for founders, CEOs, and creators.",
    deliverables: [
      "Founder keynote & podcast reels",
      "High-retention short-form clips",
      "LinkedIn thought leadership video",
      "YouTube long-form authority shows",
      "Dynamic typography & lower thirds"
    ],
    formats: ["9:16 Reels / Shorts / TikTok", "16:9 YouTube Documentaries", "4:5 LinkedIn Feeds"],
    technicalSpecs: {
      resolution: "1080 x 1920 & 4K UHD",
      codec: "H.265 / ProRes 422",
      colorSpace: "ACES 1.3 Color Pipeline",
      audioSpec: "Studio Noise Suppression EQ"
    },
    previewImage: "/employes/shuvo.webp"
  },
  {
    id: "motion-3d",
    number: "03",
    title: "2D & 3D Motion Graphics",
    subtitle: "Kinetic Geometry & Photorealistic CGI",
    description: "Elevate your visual storytelling with advanced kinetic typography, 3D product disassembly, abstract simulations, and procedural visual effects engineered in Cinema 4D, Blender, and After Effects.",
    deliverables: [
      "3D product visual disassemblies",
      "Kinetic typography sequences",
      "Abstract brand asset simulations",
      "Isometric architectural motion",
      "Dynamic logo & brand idents"
    ],
    formats: ["16:9 4K Cinema", "Custom Digital Billboard Ratios", "Alpha Channel Transparent"],
    technicalSpecs: {
      resolution: "4K DCI (4096 x 2160)",
      codec: "ProRes 4444 with Alpha",
      colorSpace: "Linear ACEScg Pipeline",
      audioSpec: "Spatial Sound Design Mix"
    },
    previewImage: "/employes/barno.webp"
  },
  {
    id: "commercial",
    number: "04",
    title: "Commercial & Brand Films",
    subtitle: "Cinematic Directing & Production Support",
    description: "From scripted commercials to on-location studio production, our cinematography team handles multi-cam lighting, high-end RED/Sony FX camera packages, sound staging, and art direction.",
    deliverables: [
      "Brand documentary films",
      "High-budget commercial ads",
      "Studio set & location shoots",
      "Investor pitch video reels",
      "Cultural storytelling campaigns"
    ],
    formats: ["2.39:1 Anamorphic Widescreen", "16:9 Commercial Broadcast", "9:16 Social Ads"],
    technicalSpecs: {
      resolution: "Sony FX6 / RED 6K RAW",
      codec: "Apple ProRes 422HQ 10-bit",
      colorSpace: "S-Log3 / ACEScc Color Suite",
      audioSpec: "Boom & Lav Wireless Master"
    },
    previewImage: "/employes/mamun.webp"
  }
];

export const CreativeCapabilities: React.FC = () => {
  const [activeId, setActiveId] = useState("saas");
  const activeDiscipline = DISCIPLINES.find((d) => d.id === activeId) || DISCIPLINES[0];

  return (
    <section 
      id="services" 
      className="py-24 sm:py-32 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: User Exact Positioning Copy */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR CREATIVE PARTNER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4">
            From the first idea <br />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              to the final frame.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Whether you&apos;re building a personal brand, launching a product, or growing a business, we bring the creative direction and execution to make your vision happen.
          </p>
        </div>

        {/* Interactive Studio Console: Emil Kowalski Split Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: 4 Interactive Discipline Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {DISCIPLINES.map((discipline) => {
              const isActive = discipline.id === activeId;
              return (
                <button
                  key={discipline.id}
                  type="button"
                  onClick={() => setActiveId(discipline.id)}
                  className={`w-full p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer relative border ${
                    isActive
                      ? "bg-slate-50 dark:bg-[#0c101d] border-[#2563EB] dark:border-[#38BDF8] shadow-md"
                      : "bg-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.08]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDisciplineBorder"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#2563EB] dark:border-[#38BDF8] pointer-events-none"
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8]">
                      {discipline.number} / 04
                    </span>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-[#2563EB] dark:text-[#38BDF8]" : "text-slate-400"}`}>
                      {isActive ? "ACTIVE VIEW" : "SELECT"}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                    {discipline.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-normal">
                    {discipline.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Studio Production Monitor (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-lg flex flex-col justify-between min-h-[520px]"
              >
                <div>
                  {/* Top Monitor HUD */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {activeDiscipline.title}
                      </span>
                    </div>
                    <span className="text-[#2563EB] dark:text-[#38BDF8]">
                      SPEC: {activeDiscipline.technicalSpecs.resolution}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                    {activeDiscipline.subtitle}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8">
                    {activeDiscipline.description}
                  </p>

                  {/* Included Deliverables */}
                  <div className="mb-8">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                      <span>Production Deliverables:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeDiscipline.deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                          <Check className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Spec Matrix */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Resolution</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeDiscipline.technicalSpecs.resolution}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Master Codec</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeDiscipline.technicalSpecs.codec}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Color Space</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeDiscipline.technicalSpecs.colorSpace}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Audio Standard</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeDiscipline.technicalSpecs.audioSpec}</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    Ready to launch this discipline?
                  </span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] hover:underline"
                  >
                    <span>Full Discipline Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Beyond the Edit: Optional Production Support Banner (User Exact Copy) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3">
              BEYOND THE EDIT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Need more than post-production?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              We can extend creative execution with professional filming, cinematography, studio shoots, and on-location production when your project needs it.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] shrink-0"
          >
            DISCUSS YOUR PRODUCTION NEEDS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreativeCapabilities;
