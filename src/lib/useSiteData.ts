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
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface ProcessStep {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
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
  badge: "Video editing and creative direction",
  headline1: "Make every frame",
  headline2: "mean more.",
  subheadline: "Story-led editing, motion design, and creative direction for creators and ambitious brands.",
  cta1: "Talk through a project",
  cta1Link: "/contact",
  cta2: "View Showcase",
  cta2Link: "#selected-work",
  socialProofText: "",
  socialProofCount: "",
  showreelVideoId: "_1VaQCNUdnU",
};

export const DEFAULT_TEAM: TeamMember[] = [
  { id: "1", name: "Abu Bakar Siddique",    role: "Founder and CEO",                    img: "/employes/abu bakar.png",             order: 1 },
  { id: "2", name: "Nazmul Hossen Shuvo",   role: "COO and Head of Growth",             img: "/employes/Nazmul Hossen Shuvo.jpg",    order: 2 },
  { id: "3", name: "Raiyan",                role: "Social Media Manager and Presenter", img: "/employes/Raiyan.jpg",                order: 3 },
  { id: "4", name: "Mohammad Wasif Rahman", role: "Video Editor",                       img: "/employes/Wasif.png",                 order: 4 },
  { id: "5", name: "Abir Ratul",            role: "Video Editor",                       img: "/employes/abir.png",                  order: 5 },
  { id: "6", name: "Barno",                 role: "Strategy Specialist",                img: "/employes/barno.png",                order: 6 },
];

export const DEFAULT_SEO: SEOSettings = {
  title: "Motionly Media | High-Retention Video Marketing & Editing Agency",
  description: "Scale your brand with high-retention video editing, VSL production, and content marketing systems. Explore Motionly Media's work and creative services.",
  image: "https://motionly.media/og-image-v2.png"
};

export const DEFAULT_CONTACT: ContactSettings = {
  calendlyUrl: "https://calendly.com/motionlymedia-help/30min",
  email: "hello@motionly.media",
  phone: "",
  facebook: "https://www.facebook.com/motionlymedia",
  instagram: "https://www.instagram.com/motionlymedia/",
  linkedin: "https://www.linkedin.com/company/motionlymedia/"
};

export const DEFAULT_PROCESS: ProcessSettings = {
  title: "How It Works",
  subtitle: "Simple. Transparent. Effective.",
  description: "We handle the entire creative pipeline so you can focus on what you do best: creating content.",
  steps: [
    {
      id: "step-1",
      label: "STRATEGY",
      title: "Idea & Strategy",
      description: "We understand the idea, audience, goals and creative direction before anything is produced.",
      icon: "Search",
      tags: [],
      previews: [],
      chessPiece: "queen"
    },
    {
      id: "step-2",
      label: "CONTENT",
      title: "Content & Script",
      description: "We turn the idea into a compelling story, script, structure and visual direction.",
      icon: "PenTool",
      tags: [],
      previews: [],
      chessPiece: "knight"
    },
    {
      id: "step-3",
      label: "OPTIONAL",
      title: "Studio Production",
      description: "Need visuals that don't exist yet? Shoot with Motionly's high-quality studio.",
      icon: "Clapperboard",
      tags: [],
      previews: [],
      chessPiece: "bishop"
    },
    {
      id: "step-4",
      label: "EXECUTION",
      title: "Video Editing",
      description: "We transform raw footage into engaging videos with editing, motion, sound and visual polish.",
      icon: "Wand2",
      tags: [],
      previews: [],
      chessPiece: "rook"
    },
    {
      id: "step-5",
      label: "PACKAGING",
      title: "Thumbnail & Packaging",
      description: "We design the visual packaging that earns attention and makes people want to click.",
      icon: "MessageSquare",
      tags: [],
      previews: [],
      chessPiece: "king"
    },
    {
      id: "step-6",
      label: "GROWTH",
      title: "Distribution & SEO",
      description: "We optimize and prepare your content for distribution, discovery and long-term reach.",
      icon: "Rocket",
      tags: [],
      previews: [],
      chessPiece: "pawn"
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
  siteDescription: "Story-led video editing, motion design, and creative direction for creators and ambitious brands.",
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

export function useHeroSettings() {
  const [hero, setHero] = useState<HeroSettings>(DEFAULT_HERO);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().hero) {
          setHero({ ...DEFAULT_HERO, ...snap.data().hero });
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
}

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "4v95coAmufm3daVAgqKm",
    title: "Apple SaaS Explainer",
    videoId: "KDK1jHJXPrk",
    category: "VSL",
    labels: ["apple saas", "SaaS Video", "Product Explainer"],
    order: 1
  },
  {
    id: "y2coqeZTqk27tzrCe1EI",
    title: "The Afjal Story Reel",
    videoId: "xygb6y5L9x8",
    category: "Short-form",
    labels: ["Short-form", "Personal Branding", "Reels"],
    order: 2
  },
  {
    id: "mMbBQT6srWSTDPwS7ILB",
    title: "EquiSaaS Brand Short",
    videoId: "pIEkY7YDIF0",
    category: "Short-form",
    labels: ["shorts", "Tech Branding", "Social Clip"],
    order: 3
  },
  {
    id: "uYMBcFEXcK7EeAqFdQ6B",
    title: "Fellas Finance YouTube Series",
    videoId: "0NHfOpolrjs",
    category: "YouTube",
    labels: ["Youtube", "Finance Content", "High Retention"],
    order: 4
  },
  {
    id: "1xUEC9RmJgu0GsmCwaWL",
    title: "Webdesert Short-Form",
    videoId: "-_GCBlnT7R0",
    category: "Short-form",
    labels: ["Shorts", "Social Content", "Mobile Video"],
    order: 5
  },
  {
    id: "S2tVmi5VDvhZCOctFiun",
    title: "Original Video Commercial",
    videoId: "xA_msiryNvQ",
    category: "Commercial",
    labels: ["VSL", "Commercial", "Brand Video"],
    order: 6
  },
  {
    id: "QQg8PGAjeiWK7iyQcl4e",
    title: "Mandela Effect Documentary",
    videoId: "iOthMnht9tM",
    category: "VSL",
    labels: ["vsl", "Documentary Editing", "Storytelling"],
    order: 7
  },
  {
    id: "yqD2TSQGtmoQIOis7sNh",
    title: "Fitness High-Energy Short",
    videoId: "-IZHpWHb3QI",
    category: "Short-form",
    labels: ["Short-form", "Fitness", "Kinetic Cuts"],
    order: 8
  },
  {
    id: "dtkEYUcnjoeKeA6rJdD3",
    title: "Creative YouTube Feature",
    videoId: "Bfce9mHYcDg",
    category: "YouTube",
    labels: ["YouTube", "Long-form", "Pacing"],
    order: 9
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

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  videoId?: string;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is your turnaround time for video edits?",
    answer: "For short-form content (Reels, TikToks, Shorts), turnaround is typically 24–48 hours. For long-form YouTube episodes, brand documentaries, or podcast series, standard turnaround is 3–5 business days.",
    order: 1
  },
  {
    id: "faq-2",
    question: "How does your revision and feedback process work?",
    answer: "We provide structured, frame-accurate revision rounds via Frame.io. You can pause at any second, leave timestamped notes, and our editors refine the cut until it meets your exact standard.",
    order: 2
  },
  {
    id: "faq-3",
    question: "How do we transfer raw footage and project assets?",
    answer: "You can upload raw files via Google Drive, Dropbox, Frame.io, or Massive. For ongoing clients, we set up a dedicated cloud folder for seamless asset ingestion.",
    order: 3
  },
  {
    id: "faq-4",
    question: "Do your edits include motion graphics, sound design, and color grading?",
    answer: "Yes! Every single edit includes custom kinetic typography, 2D/3D motion graphics, cinematic sound design (SFX & music licensing), audio mastering, and professional color grading matched to your brand.",
    order: 4
  },
  {
    id: "faq-5",
    question: "What video styles and formats do you specialize in?",
    answer: "We specialize in high-retention YouTube long-form, talking-head authority content, commercial advertisements, course videos, podcast highlights, and viral short-form hooks.",
    order: 5
  },
  {
    id: "faq-6",
    question: "Can you match our existing brand identity and editing style?",
    answer: "Absolutely. During onboarding, we analyze your previous videos, font packs, color palette, pacing, and inspiration references to create a bespoke style profile for your project.",
    order: 6
  },
  {
    id: "faq-7",
    question: "How do monthly retainers and billing work?",
    answer: "We offer transparent flat-rate monthly retainers with guaranteed turnaround and fixed scope, as well as milestone-based per-project quotes. No surprise hourly charges.",
    order: 7
  },
  {
    id: "faq-8",
    question: "Who owns the final video assets and project files?",
    answer: "You own 100% of the commercial rights to all delivered videos and final renders. Project source files (Premiere Pro, After Effects) can also be packaged upon request.",
    order: 8
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
    name: "Equissas BD",
    logoUrl: "https://i.ibb.co.com/mVYQq7n2/Equi-Saa-S-BD-Logo.png",
    websiteUrl: "https://equisaas-bd.com/",
    description: "EquiSaaS BD is an open technology cooperative building SaaS and AI products.",
    category: "LEARN",
    enabled: true,
    order: 1
  },
  {
    id: "samner-bd",
    name: "Samner BD",
    logoUrl: "",
    websiteUrl: "https://samnerbd.lovable.app/",
    description: "Modern SaaS platform empowering scalable digital businesses.",
    category: "SAAS",
    enabled: true,
    order: 2
  },
  {
    id: "graduation-gate",
    name: "Graduation Gate",
    logoUrl: "",
    websiteUrl: "https://graduation-gate.equisaas-bd.com/",
    description: "EdTech gateway supporting global students and institutions.",
    category: "TECH",
    enabled: true,
    order: 3
  },
  {
    id: "varnox",
    name: "Varnox",
    logoUrl: "",
    websiteUrl: "",
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
        } else {
          setItems(docs as T[]);
        }
        setLoading(false);
      }, (err) => {
        console.error(`Error fetching collection ${colName}:`, err);
        if (colName === "portfolio") {
          setItems(DEFAULT_PORTFOLIO as unknown as T[]);
        }
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, [colName, orderField, dir]);

  return { items, loading };
}
