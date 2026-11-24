import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Film,
  Monitor,
  Rocket,
  Camera,
  Layers,
  HeartHandshake,
  Clock,
  Globe2,
  Laptop,
  Check,
  Send,
  Zap
} from "lucide-react";

const APPLY_URL = "https://app.youform.com/forms/zrg6xump";

const departments = [
  "All Disciplines",
  "Video Editing",
  "Motion Graphics & 3D",
  "Cinematography",
  "Strategy & Direction"
];

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  featured?: boolean;
}

const jobOpenings: JobOpening[] = [
  {
    id: "sr-video-editor",
    title: "Senior Video Editor (SaaS & Commercial)",
    department: "Video Editing",
    type: "Full-Time or Contract",
    location: "Remote or Dhaka Studio",
    experience: "3+ Years",
    featured: true,
    summary:
      "Lead high-retention video edits for top-tier SaaS platforms, venture-backed startups, and personal brands across the US, UK, and worldwide.",
    responsibilities: [
      "Shape pacing, narrative arc, sound design, and color finishing across long-form and short-form cuts.",
      "Eliminate viewer drop-off through deliberate hook engineering and dynamic visual rhythm.",
      "Collaborate directly with creative directors and client stakeholders via Frame.io and Slack Connect.",
      "Maintain flawless asset hygiene, project file structure, and master export compliance."
    ],
    requirements: [
      "Mastery of Adobe Premiere Pro and After Effects (DaVinci Resolve is a strong plus).",
      "Demonstrated portfolio of high-retention social, SaaS, or commercial video work.",
      "Intuitive ear for sound mixing, Foley, whooshes, and music beat-matching.",
      "Reliable ownership, speed, and responsiveness in an asynchronous workflow."
    ]
  },
  {
    id: "3d-motion-designer",
    title: "3D Motion Graphics & CGI Artist",
    department: "Motion Graphics & 3D",
    type: "Full-Time or Contract",
    location: "Remote or Dhaka Studio",
    experience: "2+ Years",
    featured: true,
    summary:
      "Design and render cutting-edge 3D device mockups, HUD telemetry graphics, isometric architecture, and product animations.",
    responsibilities: [
      "Model, texture, light, and animate 3D scenes in Cinema 4D or Blender with Redshift/Octane.",
      "Integrate rendered 3D passes seamlessly into After Effects compositions with camera tracking.",
      "Craft kinetic typography systems, brand idents, and vector UI motion graphics.",
      "Deliver 4K render passes on tight turnaround schedules with optimized rendering pipelines."
    ],
    requirements: [
      "Strong portfolio showcasing 3D device staging, physics simulations, or abstract tech visuals.",
      "Deep expertise in Cinema 4D / Blender and Adobe After Effects.",
      "Keen eye for lighting, realistic glass refractions, and metallic surface shaders.",
      "Ability to translate 2D design tokens and brand guidelines into spatial 3D environments."
    ]
  },
  {
    id: "saas-ui-motion-editor",
    title: "SaaS Explainer & UI Motion Animator",
    department: "Video Editing",
    type: "Full-Time",
    location: "Remote or Dhaka Studio",
    experience: "1+ Years",
    summary:
      "Transform web & mobile software interfaces into fluid 60fps video walkthroughs and high-converting product explainers.",
    responsibilities: [
      "Recreate vector software interfaces in Figma and animate them with natural mouse flows and click states.",
      "Highlight complex product workflows simply without screen clutter.",
      "Synchronize voiceover cues with smooth zoom-ins, panning, and micro-interactions.",
      "Deliver multi-aspect ratio cutdowns (16:9 for website, 9:16 for social ads)."
    ],
    requirements: [
      "Proficiency in Adobe After Effects and Premiere Pro.",
      "Strong understanding of modern UI/UX design, typography, and easing curves.",
      "Attention to micro-details: cursor physics, smooth easing, and tactile audio Foley.",
      "Ability to meet deadlines with high consistency."
    ]
  },
  {
    id: "cinematographer",
    title: "Cinematographer & Camera Operator",
    department: "Cinematography",
    type: "Project-Based / Part-Time",
    location: "Dhaka Studio & On-Location",
    experience: "2+ Years",
    summary:
      "Lead physical film shoots, studio interviews, and cinematic live-action captures for commercial and brand clients.",
    responsibilities: [
      "Operate cinema cameras (Sony FX series, cinema primes) with precision focus and composition.",
      "Design lighting setups using softboxes, key lights, hair lights, and practicals.",
      "Oversee multi-track wireless lavalier and boom microphone audio recording on set.",
      "Manage media offloading with checksum verification and raw footage archiving."
    ],
    requirements: [
      "Hands-on experience with cinema camera packages, gimbal stabilizers, and lighting grip.",
      "Solid knowledge of color temperature, exposure latitude (Log profiles), and audio levels.",
      "Collaborative on-set demeanor with talent and founders.",
      "Available for scheduled shoot dates in Dhaka or travel when required."
    ]
  }
];

const studioPerks = [
  { icon: Globe2, title: "Global Client Portfolio", description: "Work on releases seen by millions of viewers across the US, UK, Canada, and Australia." },
  { icon: Laptop, title: "Work From Anywhere", description: "Full remote flexibility or collaborate at our Dhaka creative studio facilities." },
  { icon: Rocket, title: "Modern Software & Hardware", description: "Full enterprise licenses for Adobe CC, Cinema 4D, Frame.io, and high-performance render suites." },
  { icon: HeartHandshake, title: "Merit-First Growth", description: "Direct ownership of projects, transparent profit bonuses, and rapid promotion based on craft." }
];

const Careers: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState("All Disciplines");

  const filteredJobs = selectedDept === "All Disciplines"
    ? jobOpenings
    : jobOpenings.filter((job) => job.department === selectedDept);

  const careersSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Careers", item: "https://motionly.media/careers" },
        ],
      },
      {
        "@type": "WebPage",
        name: "Careers at Motionly Media Studio",
        description: "Explore open video editing, 3D motion design, and creative roles at Motionly Media.",
        url: "https://motionly.media/careers",
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Careers & Opportunities | Motionly Media Creative Studio"
        description="Join Motionly Media. We are hiring world-class video editors, 3D motion designers, cinematographers, and creative strategists. Apply online."
        url="https://motionly.media/careers"
        schema={careersSchema}
      />

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-[700px] left-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[130px] -z-10" 
        />

        {/* =========================================================================
            1. HERO SECTION
        ========================================================================= */}
        <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl mb-14">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[#38bdf8] font-bold uppercase tracking-wider">Studio Talent &amp; Careers</span>
                <span className="text-white/20">•</span>
                <span className="text-white/70">Join The Squad</span>
              </div>

              {/* Headline with Serif Italic Accent */}
              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
                Build work that
                <span className="block font-serif italic font-normal text-[#38bdf8] mt-1">
                  defines the industry.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                We are a tight-knit creative squad of editors, 3D artists, cinematographers, and strategists. If you obsess over frame rates, sound design, narrative flow, and pushing visual boundaries, you belong here.
              </p>
            </div>

            {/* Studio Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studioPerks.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.05] transition-all shadow-lg"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{perk.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{perk.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OPEN ROLES & DEPARTMENT FILTER
        ========================================================================= */}
        <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                  OPPORTUNITIES
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  Open Positions <span className="font-serif italic font-normal text-[#38bdf8]">({filteredJobs.length})</span>
                </h2>
              </div>

              {/* Department Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium transition-colors duration-150 cursor-pointer active:scale-95 ${
                        isSelected
                          ? "text-[#070b14] font-bold"
                          : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="careers-dept-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)] -z-10"
                        />
                      )}
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Job Listings Grid */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.04] transition-colors duration-300 shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-[#38bdf8] border border-white/10 shrink-0">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 shrink-0">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 shrink-0">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 shrink-0">
                          {job.experience}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-words">
                        {job.title}
                      </h3>
                    </div>

                    <a
                      href={APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md transition-[background-color,box-shadow,transform] duration-150 shrink-0 active:scale-[0.98]"
                    >
                      <span>Apply For Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    {job.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                        Requirements &amp; Craft
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* General Open Application Card */}
            <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38bdf8] block mb-2">
                  UNSOLICITED TALENT
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Don&apos;t see your discipline listed?
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  We are always seeking exceptional editors, VFX generalists, sound designers, and motion directors. Send us your reel and a brief introduction.
                </p>
              </div>

              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors shrink-0"
              >
                <span>Pitch Your Reel</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. BOTTOM CTA
        ========================================================================= */}
        <section className="py-20 sm:py-28 relative overflow-hidden text-center">
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Work with people who <span className="font-serif italic font-normal text-[#38bdf8]">care about every frame</span>.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Explore our current project showcase to see the standard of craft expected at Motionly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-[0_0_30px_rgba(49,94,250,0.4)] transition-all duration-150 active:scale-[0.98]"
              >
                <span>Browse Studio Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Careers;
