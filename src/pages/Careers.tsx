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
  Laptop
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

      <div className="bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300">
        {/* =========================================================================
            1. HERO SECTION
        ========================================================================= */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] -z-10" />

          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                STUDIO TALENT &amp; CAREERS
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                Build work that defines the industry.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
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
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200/80 dark:border-white/10 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{perk.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{perk.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OPEN ROLES & DEPARTMENT FILTER
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                  OPPORTUNITIES
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Open Positions ({filteredJobs.length})
                </h2>
              </div>

              {/* Department Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                      selectedDept === dept
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    job.featured
                      ? "bg-slate-50/80 dark:bg-[#0A0F1D] border-blue-500/50 shadow-md shadow-blue-500/5"
                      : "bg-white dark:bg-[#080C18] border-slate-200/80 dark:border-white/10 shadow-xs"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {job.location} &bull; {job.type}
                        </span>
                        {job.featured && (
                          <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                            Priority Hire
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                        {job.summary}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <a
                        href={APPLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all duration-150 active:scale-[0.98]"
                      >
                        <span>Apply Online</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                        Ideal Candidate Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. GENERAL APPLICATION BANNER
        ========================================================================= */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
              Don&apos;t see your exact role listed?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              We are constantly scouting exceptional editors, sound designers, 3D generalists, and creative directors. Submit an open speculative portfolio.
            </p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-cyan-300 transition-colors"
            >
              <span>Submit General Application</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Careers;
