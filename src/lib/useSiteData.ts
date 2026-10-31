/**
 * useSiteData.ts
 * -----------------------------------------------------------------------------
 * Central real-time data layer for the entire Motionly site.
 * Every section reads from here so the admin is the single source of truth.
 * Uses Firestore onSnapshot for live updates - changes in admin appear on the
 * site within seconds, no deploy needed.
 */
import { useEffect, useState } from "react";
import { getDb } from "./firebaseLazy";
import { STATIC_BLOGS } from "./staticBlogs";

// --- Types ------------------------------------------------------------------

export interface HeroSettings {
  badge: string;
  headline1: string;
  headline2: string;
  subheadline: string;
  cta1: string;
  cta1Link?: string;
  cta2: string;
  cta2Link?: string;
  socialProofText: string;
  socialProofCount: string;
  showreelVideoId?: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  image: string;
}

export interface ContactSettings {
  calendlyUrl: string;
  calLink?: string;
  calNamespace?: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface ProcessStep {
  id: string;
  label: string;
  category?: string;
  title: string;
  description: string;
  icon: string;
  optional?: boolean;
  tags: string[];
  previews: string[];
  chessPiece?: string;
}

export interface ProcessSettings {
  title: string;
  subtitle: string;
  description: string;
  steps: ProcessStep[];
}

export interface DifferenceSettings {
  title: string;
  subtitle: string;
  description: string;
  statusQuoTitle: string;
  statusQuoPoints: string[];
  motionlyTitle: string;
  motionlyPoints: string[];
}

export interface PainPointsSettings {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
  order: number;
}

export interface GlobalSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  pageToggles: {
    personalBranding: boolean;
    services: boolean;
    portfolio: boolean;
    about: boolean;
  };
}

export interface SiteSettings {
  hero: HeroSettings;
}

// --- Defaults (shown when Firestore doc doesn't exist yet) ------------------

export const DEFAULT_HERO: HeroSettings = {
  badge: "High-Retention Video Agency • Global Reach",
  headline1: "Product videos",
  headline2: "that just work",
  subheadline: "Story-led video editing, B2B SaaS video marketing, and high-retention commercial video production for market leaders worldwide.",
  cta1: "GET YOUR PRODUCT VIDEO",
  cta1Link: "/contact",
  cta2: "View Showcase",
  cta2Link: "#work",
  socialProofText: "Founder Reviews",
  socialProofCount: "50+",
  showreelVideoId: "q7hCvbfvRPU",
};

export const DEFAULT_TEAM: TeamMember[] = [
  { id: "1", name: "Abu Bakar Siddique",    role: "Founder and CEO",                    img: "/employes/abu_bakar.webp", order: 1 },
  { id: "2", name: "Nazmul Hossen Shuvo",   role: "COO and Head of Growth",             img: "/employes/nazmul.webp",    order: 2 },
  { id: "3", name: "Raiyan",                role: "Social Media Manager and Presenter", img: "/employes/raiyan.webp",    order: 3 },
  { id: "4", name: "Mohammad Wasif Rahman", role: "Video Editor",                       img: "/employes/wasif.webp",     order: 4 },
  { id: "5", name: "Abir Ratul",            role: "Video Editor",                       img: "/employes/abir.webp",      order: 5 },
  { id: "6", name: "Barno",                 role: "Strategy Specialist",                img: "/employes/barno.webp",     order: 6 },
];

export const DEFAULT_SEO: SEOSettings = {
  title: "Motionly Media | Premier Video Editing, Video Marketing & Production Agency",
  description: "Motionly Media is the premier high-retention video editing, video marketing, and commercial video production agency. Trusted by market leaders across the US, UK, Canada, Australia, and worldwide.",
  image: "https://motionly.media/og-image-v2.png"
};

export const DEFAULT_CONTACT: ContactSettings = {
  calendlyUrl: "https://cal.com/motionly-media-rdgfxc/30min",
  calLink: "motionly-media-rdgfxc/30min",
  calNamespace: "30min",
  email: "hello@motionly.media",
  phone: "",
  facebook: "https://www.facebook.com/motionlymedia",
  instagram: "https://www.instagram.com/motionlymedia/",
  linkedin: "https://www.linkedin.com/company/motionlymedia/"
};

export const DEFAULT_PROCESS: ProcessSettings = {
  title: "The Motionly Framework.",
  subtitle: "A simple 3 step framework we follow in every video.",
  description: "We handle the entire creative pipeline so you can focus on scale and growth.",
  steps: [
    {
      id: "step-1",
      label: "01",
      title: "Strategy",
      description: "Before we open the edit, we figure out what the video needs to do, who it needs to convince, and what action you want your buyer to take by the end.",
      icon: "Search",
      tags: ["Audience Context", "Hook Architecture", "Conversion Goal"],
      previews: []
    },
    {
      id: "step-2",
      label: "02",
      title: "Build",
      description: "Precision video editing, custom 3D/2D motion design, kinetic type, and cinematic sound engineering executed in rapid sprint cycles.",
      icon: "Wand2",
      tags: ["Kinetic Motion", "3D Animation", "Spatial Audio"],
      previews: []
    },
    {
      id: "step-3",
      label: "03",
      title: "Launch",
      description: "You get the final cut in two weeks, ready to go live across your website, paid ads, and outbound the moment it lands in your inbox.",
      icon: "Rocket",
      tags: ["Multi-Format Export", "Ad Testing", "Organic Virality"],
      previews: []
    }
  ]
};

export const DEFAULT_DIFFERENCE: DifferenceSettings = {
  title: "The Motionly approach.",
  subtitle: "HOW WE WORK",
  description: "Strategy, creativity, and execution come together to create videos that make a difference.",
  statusQuoTitle: "A fragmented workflow",
  statusQuoPoints: [
    "Creative direction changes between contributors",
    "Feedback and files are spread across tools",
    "The edit starts before the story is clear",
    "Publishing depends on one-off effort"
  ],
  motionlyTitle: "Motionly Media",
  motionlyPoints: [
    "A clear owner from brief to delivery",
    "Strategic storytelling and audience context",
    "A consistent review and delivery process",
    "Custom motion, sound, and visual finishing"
  ]
};

export const DEFAULT_PAIN_POINTS: PainPointsSettings = {
  title: "From the first idea to the final frame.",
  subtitle: "YOUR CREATIVE PARTNER",
  description: "Whether you're building a personal brand, launching a product, or growing a business, we bring the creative direction and execution to make your vision happen.",
  points: [
    "Creating consistent content takes more than just editing.",
    "Your ideas need the right storytelling and visual direction.",
    "Finding reliable creative talent shouldn't slow down your growth.",
    "Managing multiple creative requirements shouldn't become another full-time job."
  ]
};

export const DEFAULT_GLOBAL: GlobalSettings = {
  siteName: "Motionly Media",
  siteDescription: "Motionly is a creative and video marketing agency helping SaaS companies, founders, creators, and ambitious brands turn ideas into impactful visual experiences.",
  logoUrl: "/nav_logo.webp",
  faviconUrl: "/favicon.ico",
  maintenanceMode: false,
  maintenanceMessage: "We are currently updating our systems to serve you better. The site remains fully functional.",
  pageToggles: {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true
  }
};

export interface LayoutSettings {
  homepageSections: string[];
}

export const DEFAULT_LAYOUT: LayoutSettings = {
  homepageSections: [
    "hero",
    "partners",
    "portfolio",
    "painPoints",
    "difference",
    "testimonials",
    "process",
    "team",
    "pricing",
    "blog",
    "faqs",
    "contact"
  ]
};

// --- Hero settings hook -----------------------------------------------------

function sanitizeHero(data: any): HeroSettings {
  const merged = { ...DEFAULT_HERO, ...data };
  if (merged.badge && (merged.badge.includes("Bangladesh") || merged.badge.includes("#1 in BD") || merged.badge.includes("#1 in Bangladesh"))) {
    merged.badge = "High-Retention Video Agency • Global Reach";
  }
  if (!merged.showreelVideoId || merged.showreelVideoId === "_1VaQCNUdnU") {
    merged.showreelVideoId = "q7hCvbfvRPU";
  }
  return merged;
}

export function useHeroSettings() {
  const [hero, setHero] = useState<HeroSettings>(() => {
    try {
      const cached = localStorage.getItem("motionly_hero_settings");
      if (cached) {
        return sanitizeHero(JSON.parse(cached));
      }
    } catch {}
    return DEFAULT_HERO;
  });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().hero) {
          const updatedHero = sanitizeHero(snap.data().hero);
          setHero(updatedHero);
          try {
            localStorage.setItem("motionly_hero_settings", JSON.stringify(updatedHero));
          } catch {}
        }
      });
    });
    return () => unsub?.();
  }, []);

  return hero;
}

// --- Team hook --------------------------------------------------------------

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, query, orderBy, onSnapshot } = await import("firebase/firestore");
      const q = query(collection(db, "team"), orderBy("order", "asc"));
      unsub = onSnapshot(q, (snap) => {
        if (snap.empty) {
          setTeam(DEFAULT_TEAM);
        } else {
          const members = snap.docs.map(d => {
            const data = d.data() as TeamMember;
            return { ...data, id: d.id, img: data.img || "" };
          });
          setTeam(members);
        }
        setLoading(false);
      }, () => {
        setTeam(DEFAULT_TEAM);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  return { team, loading };
}

// --- Advanced Config Hooks -------------------------------------------------

export function useSiteSettings() {
  const [settings, setSettings] = useState({
    hero: DEFAULT_HERO,
    seo: DEFAULT_SEO,
    contact: DEFAULT_CONTACT,
    process: DEFAULT_PROCESS,
    difference: DEFAULT_DIFFERENCE,
    painPoints: DEFAULT_PAIN_POINTS,
    global: DEFAULT_GLOBAL,
    layout: DEFAULT_LAYOUT
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSettings({
            hero: { ...DEFAULT_HERO, ...(data.hero || {}) },
            seo: { ...DEFAULT_SEO, ...(data.seo || {}) },
            contact: { ...DEFAULT_CONTACT, ...(data.contact || {}) },
            process: { ...DEFAULT_PROCESS, ...(data.process || {}) },
            difference: { ...DEFAULT_DIFFERENCE, ...(data.difference || {}) },
            painPoints: { ...DEFAULT_PAIN_POINTS, ...(data.painPoints || {}) },
            global: { ...DEFAULT_GLOBAL, ...(data.global || {}) },
            layout: { ...DEFAULT_LAYOUT, ...(data.layout || {}) }
          });
        }
        setLoading(false);
      }, () => setLoading(false));
    });
    return () => unsub?.();
  }, []);

  return { settings, loading };
}

export interface PortfolioItem {
  id: string;
  title: string;
  videoId: string;
  category: string;
  labels: string | string[];
  order: number;
  description?: string;
}

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Bolto",
    videoId: "KDK1jHJXPrk",
    category: "SaaS & Technology",
    labels: ["SaaS & Technology", "AI Platform", "Series A"],
    description: "YC-backed AI-native platform that unifies recruiting, payroll, and HR into one system.",
    order: 1
  },
  {
    id: "port-2",
    title: "ClickUp",
    videoId: "pIEkY7YDIF0",
    category: "SaaS & Technology",
    labels: ["SaaS & Technology", "Productivity", "Product Launch"],
    description: "The world's #1 work platform that replaces every productivity tool teams use.",
    order: 2
  },
  {
    id: "port-3",
    title: "Atria",
    videoId: "xygb6y5L9x8",
    category: "Commercial & Brand Videos",
    labels: ["Commercial & Brand Videos", "Paid Ads", "Growth Campaign"],
    description: "AI platform that builds high-performing Meta and TikTok ads.",
    order: 3
  },
  {
    id: "port-4",
    title: "Relixir",
    videoId: "0NHfOpolrjs",
    category: "Personal Branding",
    labels: ["Personal Branding", "Founder Story", "Dev Tools"],
    description: "Introducing next-generation developer tooling with a high-energy founder walkthrough.",
    order: 4
  },
  {
    id: "port-5",
    title: "Apple SaaS Explainer",
    videoId: "xA_msiryNvQ",
    category: "Creative & Motion Graphics",
    labels: ["Creative & Motion Graphics", "Minimalist SaaS", "UI Animation"],
    description: "Minimalist Apple-inspired SaaS product explainer with fluid UI transitions.",
    order: 5
  },
  {
    id: "port-6",
    title: "Original Commercial",
    videoId: "-_GCBlnT7R0",
    category: "Commercial & Brand Videos",
    labels: ["Commercial & Brand Videos", "Paid Acquisition", "Brand Campaign"],
    description: "Kinetic brand commercial engineered for paid acquisition and organic virality.",
    order: 6
  }
];

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  summary?: string;
  category?: string;
  date: string;
  order: number;
}

export const DEFAULT_BLOGS: BlogItem[] = STATIC_BLOGS.map((item, index) => ({
  id: item.id,
  title: item.title,
  content: item.content,
  imageUrl: item.imageUrl,
  summary: item.summary,
  category: item.category,
  date: item.date,
  order: index + 1
}));

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  company?: string;
  avatar?: string;
  rating?: number;
  featured?: boolean;
  videoId?: string;
  order: number;
}

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Sean Dorje",
    role: "Founder",
    company: "Naive",
    content: "Felt like we hired in-house, not an agency. Big difference.",
    rating: 5,
    order: 1,
    featured: true,
  },
  {
    id: "test-2",
    name: "Nikhil Reddy",
    role: "Founder",
    company: "Datoric",
    content: "Top-tier work, delivered faster than anyone else we've tried.",
    rating: 5,
    order: 2,
    featured: true,
  },
  {
    id: "test-3",
    name: "Chris Cunningham",
    role: "Head of Content",
    company: "ClickUp",
    content: "Honestly the first video team that didn't make me chase them for updates.",
    rating: 5,
    order: 3,
    featured: true,
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What types of businesses and creators do you work with?",
    answer: "We partner with SaaS companies, technology startups, founders, content creators, personal brands, and growing businesses worldwide who want to create high-impact, story-driven video content.",
    order: 1
  },
  {
    id: "faq-2",
    question: "What creative and video services do you offer?",
    answer: "Our core services include SaaS product videos, software explainers, 2D and 3D motion graphics, launch videos, personal branding content, commercial campaigns, and full-cycle creative video marketing.",
    order: 2
  },
  {
    id: "faq-3",
    question: "Do you specialize in SaaS and technology videos?",
    answer: "Yes, technology and SaaS video production is our strongest core specialization. We translate complex software workflows and abstract technical concepts into intuitive, beautifully animated visual narratives.",
    order: 3
  },
  {
    id: "faq-4",
    question: "Can you help founders and creators build personal brands?",
    answer: "Absolutely. We help founders and creators develop authoritative personal brands through high-retention video systems, talking-head editing, strategic hook architecture, and multi-platform content repurposing.",
    order: 4
  },
  {
    id: "faq-5",
    question: "Do you offer filming and on-location production?",
    answer: "Yes. While most of our client engagements focus on digital post-production and motion design, we can provide professional filming, cinematography, studio shoots, and on-location production support whenever your project requires it.",
    order: 5
  },
  {
    id: "faq-6",
    question: "Can we work with you on a monthly basis?",
    answer: "Yes. We offer both dedicated monthly creative partnerships for ongoing publishing needs and milestone-based engagements for standalone product launches and commercial projects.",
    order: 6
  },
  {
    id: "faq-7",
    question: "How does your creative process work?",
    answer: "Our framework follows three simple stages: Discover (understanding your goals and audience), Create (story development, visual production, and motion design), and Deliver (refining details and packaging for launch).",
    order: 7
  },
  {
    id: "faq-8",
    question: "Can you work with our existing brand identity?",
    answer: "Yes. During onboarding, we study your typography, brand guidelines, color palettes, and voice to ensure every video looks and feels authentically aligned with your brand.",
    order: 8
  },
  {
    id: "faq-9",
    question: "Who owns the final video assets?",
    answer: "You own 100% of the commercial rights to all delivered videos and final renders upon completion. Source files and project assets can also be packaged upon request.",
    order: 9
  },
  {
    id: "faq-10",
    question: "How do revisions and feedback work?",
    answer: "We conduct frame-accurate revision rounds via Frame.io. You can pause at any timestamp, leave direct visual feedback, and our team implements changes swiftly until the cut is finalized.",
    order: 10
  }
];

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  popular?: boolean;
  cta?: string;
  order: number;
  buttonText?: string;
}

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Sprint",
    price: "2,500",
    period: "month",
    description: "Establish your visual presence and produce high-impact core video assets.",
    features: [
      "4x High-Retention Short-form Videos / Reels",
      "Dynamic Hook & Script Architecture",
      "Custom 2D Motion Graphics & Typography",
      "Frame-accurate revisions via Frame.io",
      "Standard 48-hour sprint turnaround"
    ],
    recommended: false,
    popular: false,
    cta: "Start Starter Plan",
    order: 1
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: "5,000",
    period: "month",
    description: "A dedicated creative partnership for high-velocity software launches, creators, and brands.",
    features: [
      "2x Premium Long-form / VSL Product Launches",
      "12x Repurposed Multi-Platform Shorts",
      "Custom 3D Product & UI Motion Graphics",
      "Cinematic Sound Design & Spatial Audio",
      "Dedicated Slack Channel & Senior Art Director",
      "Priority 24-48h turnaround"
    ],
    recommended: true,
    popular: true,
    cta: "Claim Growth Slot",
    order: 2
  },
  {
    id: "authority",
    name: "Authority Accelerator",
    price: "9,500",
    period: "month",
    description: "End-to-end creative direction, comprehensive visual campaigns, and continuous brand scaling.",
    features: [
      "4x High-Impact Product Videos & Mini-Docs",
      "25x Viral Shorts, Paid Ad Variations & Hooks",
      "Full 3D CGI Animation & Photoreal Product Renders",
      "Bi-weekly Creative Strategy Sprints",
      "A/B Hook Testing & Paid Ad Variations",
      "Dedicated Creative Director & Video Editor"
    ],
    recommended: false,
    popular: false,
    cta: "Partner With Us",
    order: 3
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    price: "Custom",
    period: "custom scope",
    description: "Bespoke creative teams, multi-format production, studio shoots, and white-glove agency integration.",
    features: [
      "On-site film crew & studio production",
      "Full IP ownership & source project files",
      "Custom 3D CGI & VFX pipelines",
      "Enterprise SLA & dedicated round-the-clock team",
      "Dedicated Slack Connect & custom billing terms"
    ],
    recommended: false,
    popular: false,
    cta: "Request Enterprise Quote",
    order: 4
  }
];

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  category?: string;
  enabled: boolean;
  order: number;
}

export const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    id: "equisaas-bd",
    name: "EquiSaaS BD",
    logoUrl: "/partners/equisaas-bd.png",
    websiteUrl: "https://equisaas-bd.com/",
    description: "EquiSaaS BD is an open technology cooperative building SaaS and AI products.",
    category: "LEARN",
    enabled: true,
    order: 1
  },
  {
    id: "samner-bd",
    name: "Samner BD",
    logoUrl: "/partners/samner-bd.png",
    websiteUrl: "https://samnerbd.lovable.app/",
    description: "Modern SaaS platform empowering scalable digital businesses.",
    category: "SAAS",
    enabled: true,
    order: 2
  },
  {
    id: "graduation-gate",
    name: "Graduation Gate",
    logoUrl: "/partners/graduation-gate.png",
    websiteUrl: "https://graduation-gate.equisaas-bd.com/",
    description: "EdTech gateway supporting global students and institutions.",
    category: "TECH",
    enabled: true,
    order: 3
  },
  {
    id: "varnox",
    name: "Varnox",
    logoUrl: "/partners/varnox.png",
    websiteUrl: "https://varnox.netlify.app/",
    description: "Signature luxury fragrance brand crafting bespoke perfumes.",
    category: "PERFUME SHOP",
    enabled: true,
    order: 4
  }
];

export interface PartnersSettings {
  layers: number;
}

export const DEFAULT_PARTNERS_SETTINGS: PartnersSettings = {
  layers: 2,
};

export function usePartners() {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [settings, setSettings] = useState<PartnersSettings>(() => {
    try {
      const cached = localStorage.getItem("motionly_partners_layers");
      if (cached) {
        const num = Number(cached);
        if (num >= 1 && num <= 3) return { layers: num };
      }
    } catch {}
    return DEFAULT_PARTNERS_SETTINGS;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubPartners: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;
    let unsubSiteSettings: (() => void) | undefined;
    let isMounted = true;

    const syncFromStorage = () => {
      try {
        const cached = localStorage.getItem("motionly_partners_layers");
        if (cached) {
          const num = Number(cached);
          if (num >= 1 && num <= 3) {
            setSettings(prev => ({ ...prev, layers: num }));
          }
        }
      } catch {}
    };

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("motionly_partners_layers_changed", syncFromStorage);

    const safetyTimeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1500);

    getDb().then(async (db) => {
      const { collection, doc, onSnapshot } = await import("firebase/firestore");

      unsubPartners = onSnapshot(collection(db, "partners"), (snap) => {
        if (!isMounted) return;
        if (snap.empty) {
          setPartners(DEFAULT_PARTNERS);
        } else {
          const list = snap.docs
            .map(d => ({ id: d.id, ...d.data() } as PartnerItem))
            .filter(item => item.enabled !== false);
          
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setPartners(list.length > 0 ? list : DEFAULT_PARTNERS);
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching partners:", err);
        if (isMounted) {
          setPartners(DEFAULT_PARTNERS);
          setLoading(false);
        }
      });

      unsubSettings = onSnapshot(doc(db, "settings", "partners"), (snap) => {
        if (!isMounted) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data.layers !== undefined) {
            const count = Math.min(3, Math.max(1, Number(data.layers) || 2));
            setSettings(prev => ({ ...prev, layers: count }));
            try { localStorage.setItem("motionly_partners_layers", String(count)); } catch {}
          }
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching partners settings:", err);
        if (isMounted) setLoading(false);
      });

      unsubSiteSettings = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (!isMounted) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data?.partners?.layers !== undefined) {
            const count = Math.min(3, Math.max(1, Number(data.partners.layers) || 2));
            setSettings(prev => ({ ...prev, layers: count }));
            try { localStorage.setItem("motionly_partners_layers", String(count)); } catch {}
          }
        }
      }, () => {});
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("motionly_partners_layers_changed", syncFromStorage);
      unsubPartners?.();
      unsubSettings?.();
      unsubSiteSettings?.();
    };
  }, []);

  return { partners, settings, loading };
}

// --- Generic collection hook -------------------------------------------------

export function useCollection<T = unknown>(
  colName: string,
  orderField: string | null = null,
  dir: "asc" | "desc" = "asc"
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, onSnapshot } = await import("firebase/firestore");
      
      const rankingCollections = ["portfolio", "pricing", "faqs", "testimonials", "team"];
      const effectiveOrderField = orderField || (rankingCollections.includes(colName) ? "order" : "createdAt");
      const effectiveDir = orderField ? dir : (effectiveOrderField === "order" ? "asc" : "desc");

      unsub = onSnapshot(collection(db, colName), (snap) => {
        const docs = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as T & { id: string; status?: string; [key: string]: unknown }))
          .filter(d => !d.status || d.status === "published");

        docs.sort((a, b) => {
          const valA = a[effectiveOrderField] ?? (effectiveDir === "asc" ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
          const valB = b[effectiveOrderField] ?? (effectiveDir === "asc" ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
          if (valA < valB) return effectiveDir === "asc" ? -1 : 1;
          if (valA > valB) return effectiveDir === "asc" ? 1 : -1;
          return 0;
        });

        if (colName === "portfolio") {
          const validDocs = (docs as unknown as PortfolioItem[]).filter(
            (p) => p && p.title && p.videoId
          );
          const existingIds = new Set(validDocs.map((p) => p.id));
          const merged = [
            ...validDocs,
            ...DEFAULT_PORTFOLIO.filter((p) => !existingIds.has(p.id)),
          ];
          setItems((merged.length > 0 ? merged : DEFAULT_PORTFOLIO) as unknown as T[]);
        } else if (colName === "testimonials" && docs.length === 0) {
          setItems(DEFAULT_TESTIMONIALS as unknown as T[]);
        } else if (colName === "pricing" && docs.length === 0) {
          setItems(DEFAULT_PRICING_PLANS as unknown as T[]);
        } else if (colName === "blogs") {
          // Filter out junk/empty/test posts (e.g., "fx" or 0 content)
          const validDocs = (docs as unknown as BlogItem[]).filter(
            (b) => b && b.title && b.title.trim().toLowerCase() !== "fx" && b.title.trim().length > 3 && (!b.content || b.content.length > 50)
          );
          const existingIds = new Set(validDocs.map((b) => b.id));
          const merged = [
            ...validDocs,
            ...DEFAULT_BLOGS.filter((b) => !existingIds.has(b.id)),
          ];
          setItems((merged.length > 0 ? merged : DEFAULT_BLOGS) as unknown as T[]);
        } else {
          setItems(docs as T[]);
        }
        setLoading(false);
      }, (err) => {
        console.error(`Error fetching collection ${colName}:`, err);
        if (colName === "portfolio") {
          setItems(DEFAULT_PORTFOLIO as unknown as T[]);
        } else if (colName === "testimonials") {
          setItems(DEFAULT_TESTIMONIALS as unknown as T[]);
        } else if (colName === "pricing") {
          setItems(DEFAULT_PRICING_PLANS as unknown as T[]);
        } else if (colName === "blogs") {
          setItems(DEFAULT_BLOGS as unknown as T[]);
        }
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, [colName, orderField, dir]);

  return { items, loading };
}
