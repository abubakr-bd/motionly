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
  title: "The Motionly approach",
  subtitle: "How we work",
  description: "Editing, creative direction, and a dependable production process in one place.",
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
    "Story-led editing and audience context",
    "A consistent review and delivery process",
    "Custom motion, sound, and finishing"
  ]
};

export const DEFAULT_PAIN_POINTS: PainPointsSettings = {
  title: "Make room for the work only you can do",
  subtitle: "A clearer production rhythm",
  description: "A dependable creative partner gives your team more time to plan, film, and build the next idea.",
  points: [
    "Editing takes time away from filming and planning",
    "Every new editor needs to learn your visual language",
    "Review cycles become difficult to keep consistent",
    "Publishing slows when the process lives in one person's head"
  ]
};

export const DEFAULT_GLOBAL: GlobalSettings = {
  siteName: "Motionly Media",
  siteDescription: "Premier high-retention video editing, video marketing, and commercial video production agency serving global market leaders.",
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
    category: "In-Person Demo",
    labels: ["In-Person Demo", "AI Platform", "Series A"],
    description: "YC-backed AI-native platform that unifies recruiting, payroll, and HR into one system.",
    order: 1
  },
  {
    id: "port-2",
    title: "ClickUp",
    videoId: "pIEkY7YDIF0",
    category: "Product Release",
    labels: ["Product Release", "Super Agents", "Productivity"],
    description: "The world's #1 work platform that replaces every productivity tool teams use.",
    order: 2
  },
  {
    id: "port-3",
    title: "Atria",
    videoId: "xygb6y5L9x8",
    category: "Launch Video",
    labels: ["Launch Video", "AI Platform", "TikTok Ads"],
    description: "AI platform that builds high-performing Meta and TikTok ads.",
    order: 3
  },
  {
    id: "port-4",
    title: "Relixir",
    videoId: "0NHfOpolrjs",
    category: "In-Person Demo",
    labels: ["In-Person Demo", "Dev Tools", "Founder Story"],
    description: "Introducing next-generation developer tooling with a high-energy founder walkthrough.",
    order: 4
  },
  {
    id: "port-5",
    title: "Apple SaaS Explainer",
    videoId: "xA_msiryNvQ",
    category: "Product Release",
    labels: ["Product Release", "Minimalist SaaS", "Product Explainer"],
    description: "Minimalist Apple-inspired SaaS product explainer with fluid UI transitions.",
    order: 5
  },
  {
    id: "port-6",
    title: "Original Commercial",
    videoId: "-_GCBlnT7R0",
    category: "Others",
    labels: ["Commercial", "Brand Video", "Paid Ads"],
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
    id: "faq-0",
    question: "How does Motionly Media deliver global-standard video production?",
    answer: "Motionly Media pairs elite creative directors and technical editors with Silicon Valley-grade production standards. Operating with an international reach, we provide top-tier work for clients across the United States, United Kingdom, Canada, Australia, and worldwide with 24/7 turnaround and dedicated creative teams.",
    order: 0
  },
  {
    id: "faq-global",
    question: "Which countries and client timezones does Motionly Media support?",
    answer: "We support clients globally with primary hubs in the United States, United Kingdom, Canada, Australia, Germany, Europe, and Bangladesh. Our 24/7 asynchronous review pipeline via Frame.io ensures immediate turnaround and zero friction regardless of your local timezone.",
    order: 1
  },
  {
    id: "faq-1",
    question: "What is your turnaround time for video edits?",
    answer: "For short-form content (Reels, TikToks, Shorts), turnaround is typically 24–48 hours. For long-form YouTube episodes, brand documentaries, or podcast series, standard turnaround is 3–5 business days.",
    order: 2
  },
  {
    id: "faq-2",
    question: "How does your revision and feedback process work?",
    answer: "We provide structured, frame-accurate revision rounds via Frame.io. You can pause at any second, leave timestamped notes, and our editors refine the cut until it meets your exact standard.",
    order: 3
  },
  {
    id: "faq-3",
    question: "How do we transfer raw footage and project assets?",
    answer: "You can upload raw files via Google Drive, Dropbox, Frame.io, or Massive. For ongoing clients, we set up a dedicated cloud folder for seamless asset ingestion.",
    order: 4
  },
  {
    id: "faq-4",
    question: "Do your edits include motion graphics, sound design, and color grading?",
    answer: "Yes! Every single edit includes custom kinetic typography, 2D/3D motion graphics, cinematic sound design (SFX & music licensing), audio mastering, and professional color grading matched to your brand.",
    order: 5
  },
  {
    id: "faq-5",
    question: "What video styles and formats do you specialize in?",
    answer: "We specialize in high-retention YouTube long-form, talking-head authority content, commercial advertisements, course videos, podcast highlights, and viral short-form hooks.",
    order: 6
  },
  {
    id: "faq-6",
    question: "Can you match our existing brand identity and editing style?",
    answer: "Absolutely. During onboarding, we analyze your previous videos, font packs, color palette, pacing, and inspiration references to create a bespoke style profile for your project.",
    order: 7
  },
  {
    id: "faq-7",
    question: "How do monthly retainers and billing work?",
    answer: "We offer transparent flat-rate monthly retainers with guaranteed turnaround and fixed scope, as well as milestone-based per-project quotes. No surprise hourly charges.",
    order: 8
  },
  {
    id: "faq-8",
    question: "Who owns the final video assets and project files?",
    answer: "You own 100% of the commercial rights to all delivered videos and final renders. Project source files (Premiere Pro, After Effects) can also be packaged upon request.",
    order: 9
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
    description: "Establish your high-retention baseline and launch core product video assets.",
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
    description: "Complete video production system for high-velocity software launches and creators.",
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
    description: "End-to-end creative direction, omnichannel dominance, and continuous authority scaling.",
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
    description: "Bespoke production teams, studio film shoots, and white-glove agency integration.",
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

        if (colName === "portfolio" && docs.length === 0) {
          setItems(DEFAULT_PORTFOLIO as unknown as T[]);
        } else if (colName === "testimonials" && docs.length === 0) {
          setItems(DEFAULT_TESTIMONIALS as unknown as T[]);
        } else if (colName === "pricing" && docs.length === 0) {
          setItems(DEFAULT_PRICING_PLANS as unknown as T[]);
        } else if (colName === "blogs" && docs.length === 0) {
          setItems(DEFAULT_BLOGS as unknown as T[]);
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
