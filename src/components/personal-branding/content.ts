export interface ProblemItem {
  number: string;
  title: string;
  description: string;
}

export interface SolutionFeature {
  number: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: string;
  name: string;
  title: string;
  description: string;
  duration?: string;
}

export interface CreateServiceItem {
  number: string;
  title: string;
  description: string;
  formats: string[];
}

export interface PlatformItem {
  name: string;
  badge: string;
  description: string;
  formats: string[];
  accentColor: string;
}

export interface AudiencePersona {
  role: string;
  subtitle: string;
  description: string;
  keyOutcomes: string[];
}

export interface DifferencePoint {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface PartnershipPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  priceTag: string;
  priceSubtitle: string;
  description: string;
  deliverables: string[];
  cta: string;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// 01. HERO SECTION DATA
export const HERO_CONTENT = {
  eyebrow: "PERSONAL BRANDING BY MOTIONLY",
  headlineLine1: "Your Expertise.",
  headlineLine2: "Our Creativity.",
  headlineLine3: "A Brand That Stands Out.",
  description:
    "You have the knowledge, experience, and ideas. We help the world see them. Motionly turns your expertise into engaging content through strategic planning, professional video editing, creative storytelling, and consistent content distribution.",
  primaryCtaText: "Let's Build Your Brand",
  primaryCtaLink: "/contact",
  secondaryCtaText: "Explore Our Approach",
  secondaryCtaLink: "#workflow",
  subText: "For founders, entrepreneurs, coaches, and creators.",
};

// 02. THE PROBLEM DATA
export const PROBLEM_CONTENT = {
  eyebrow: "THE CHALLENGE",
  headline: "You Have Something Worth Sharing. But Are You Sharing It?",
  description:
    "Building a personal brand takes more than occasionally posting on social media. You need consistent content, a clear message, engaging storytelling, and time to execute everything. Most professionals already have enough responsibilities. Creating content shouldn't become another full-time job.",
  closingStatement: "That's where Motionly comes in.",
  problems: [
    {
      number: "01",
      title: "No Time to Create",
      description:
        "Running a business is already demanding. Planning, recording, editing, and publishing content takes time you could spend elsewhere.",
    },
    {
      number: "02",
      title: "Inconsistent Content",
      description:
        "You have ideas, but turning them into consistent, high-quality content is difficult.",
    },
    {
      number: "03",
      title: "Lack of Creative Direction",
      description:
        "Knowing what to say is one thing. Knowing how to communicate it in a way people remember is another.",
    },
    {
      number: "04",
      title: "No Content System",
      description:
        "Random posting rarely creates a recognizable brand. You need a repeatable process.",
    },
  ] as ProblemItem[],
};

// 03. OUR SOLUTION DATA
export const SOLUTION_CONTENT = {
  eyebrow: "YOUR CREATIVE PARTNER",
  headline: "You Focus on What You Do Best. We'll Handle the Content.",
  description:
    "Motionly works alongside you to transform your knowledge, ideas, and experiences into meaningful digital content. From planning and scripting to editing and publishing support, we help you maintain a consistent and professional online presence.",
  ctaText: "Explore Our Services",
  ctaLink: "#what-we-create",
  features: [
    {
      number: "01",
      title: "Strategic Direction",
      description:
        "We understand your expertise, audience, positioning, and objectives before developing a content direction.",
    },
    {
      number: "02",
      title: "Creative Execution",
      description:
        "We transform your ideas and recordings into engaging videos, social media content, and professional visual assets.",
    },
    {
      number: "03",
      title: "Consistent Presence",
      description:
        "We help organize your content production so your brand stays active, recognizable, and consistent across platforms.",
    },
  ] as SolutionFeature[],
};

// 04. OUR WORKFLOW DATA
export const WORKFLOW_CONTENT = {
  eyebrow: "HOW WE WORK",
  headline: "A Simpler Way to Build Your Personal Brand.",
  description:
    "A collaborative content production system designed around your schedule, your expertise, and your goals.",
  supportingNote:
    "Your involvement stays focused on sharing your knowledge and providing the original ideas. We take care of the creative execution.",
  steps: [
    {
      step: "STEP 01",
      name: "Discover",
      title: "Understand Your Core Story",
      description:
        "We learn about your business, expertise, audience, existing content, and personal brand goals.",
      duration: "Kickoff Session",
    },
    {
      step: "STEP 02",
      name: "Strategize",
      title: "Build the Content Framework",
      description:
        "We establish your content pillars, communication style, creative direction, and content calendar.",
      duration: "Content Blueprint",
    },
    {
      step: "STEP 03",
      name: "Create",
      title: "Develop Engaging Angles",
      description:
        "We develop content ideas, hooks, scripts, and creative concepts that communicate your expertise.",
      duration: "Topic & Script Batches",
    },
    {
      step: "STEP 04",
      name: "Produce",
      title: "High-Caliber Post-Production",
      description:
        "You record your content or collaborate with our production team. We handle editing, motion graphics, sound design, and creative packaging.",
      duration: "48h Sprint Turnaround",
    },
    {
      step: "STEP 05",
      name: "Publish & Improve",
      title: "Platform-Ready Delivery",
      description:
        "We prepare platform-ready content and help you review performance to identify opportunities for improvement.",
      duration: "Ongoing Review",
    },
  ] as WorkflowStep[],
};

// 05. WHAT WE CREATE DATA
export const WHAT_WE_CREATE_CONTENT = {
  eyebrow: "CONTENT THAT WORKS TOGETHER",
  headline: "One Personal Brand. Multiple Ways to Connect.",
  description:
    "Different platforms require different approaches. We help adapt your ideas into content formats that fit your audience and communication goals.",
  ctaText: "Let's Create Together",
  ctaLink: "/contact",
  services: [
    {
      number: "01",
      title: "Short-Form Videos",
      description:
        "Instagram Reels, YouTube Shorts, and TikTok videos designed around engaging hooks, storytelling, pacing, and retention.",
      formats: ["Reels", "Shorts", "TikTok", "Dynamic Hooks"],
    },
    {
      number: "02",
      title: "Long-Form Videos",
      description:
        "Professional YouTube videos, educational content, interviews, podcasts, and thought leadership videos.",
      formats: ["YouTube Videos", "Podcasts", "Keynotes", "Interviews"],
    },
    {
      number: "03",
      title: "Motion Graphics",
      description:
        "Custom animations, visual explanations, typography, transitions, and motion design that make complex ideas easier to understand.",
      formats: ["2D/3D Animation", "Kinetic Typography", "Visual Diagrams"],
    },
    {
      number: "04",
      title: "Content Repurposing",
      description:
        "Turn existing videos, podcasts, interviews, and long-form content into multiple platform-ready assets.",
      formats: ["Multi-Asset Clips", "Quote Cards", "Thread Breakdowns"],
    },
    {
      number: "05",
      title: "Social Media Creatives",
      description:
        "Carousels, branded graphics, quote posts, thumbnails, and other visual assets that maintain a consistent brand identity.",
      formats: ["LinkedIn Carousels", "YouTube Thumbnails", "Branded Covers"],
    },
    {
      number: "06",
      title: "Content Strategy",
      description:
        "Content pillars, topic research, creative direction, publishing calendars, and ongoing content planning.",
      formats: ["Content Pillars", "Calendar Planning", "Angle Ideation"],
    },
  ] as CreateServiceItem[],
};

// 06. PLATFORM PRESENCE DATA
export const PLATFORM_CONTENT = {
  eyebrow: "WHERE YOUR AUDIENCE IS",
  headline: "Show Up Where It Matters.",
  description:
    "Your personal brand shouldn't depend on a single platform. We help adapt your content for the channels that matter to your audience.",
  platforms: [
    {
      name: "YouTube",
      badge: "In-Depth Authority",
      description:
        "Build deeper connections through educational videos, interviews, and long-form storytelling.",
      formats: ["High-retention 16:9 videos", "Shorts clips", "Custom click-worthy thumbnails"],
      accentColor: "from-red-500/20 to-red-600/5",
    },
    {
      name: "Instagram",
      badge: "Visual Storytelling",
      description:
        "Create a recognizable visual identity through Reels, carousels, and engaging content.",
      formats: ["High-impact 9:16 Reels", "Multi-slide swipe carousels", "Story visual assets"],
      accentColor: "from-pink-500/20 to-purple-600/5",
    },
    {
      name: "LinkedIn",
      badge: "Executive Credibility",
      description:
        "Share professional insights, industry perspectives, and founder stories.",
      formats: ["Document carousels", "Founder video insights", "High-engagement text graphics"],
      accentColor: "from-blue-600/20 to-blue-800/5",
    },
    {
      name: "TikTok",
      badge: "Culture & Discovery",
      description:
        "Reach new audiences through short-form storytelling and creative video content.",
      formats: ["Fast-paced native videos", "Trend-adapted formats", "Punchy educational takes"],
      accentColor: "from-cyan-500/20 to-slate-900/10",
    },
  ] as PlatformItem[],
};

// 07. WHO WE WORK WITH DATA
export const AUDIENCE_CONTENT = {
  eyebrow: "BUILT FOR PEOPLE WITH SOMETHING TO SAY",
  headline: "Your Expertise Is Your Biggest Asset.",
  audiences: [
    {
      role: "FOUNDERS & CEOs",
      subtitle: "Executive Voice & Brand Recognition",
      description:
        "Turn your experience, company journey, and industry insights into a recognizable executive presence.",
      keyOutcomes: [
        "Position your company through executive storytelling",
        "Document founder lessons and company milestones",
        "Build authentic trust with talent, investors, and clients",
      ],
    },
    {
      role: "COACHES & CONSULTANTS",
      subtitle: "Frameworks & Thought Leadership",
      description:
        "Communicate your expertise, share valuable insights, and build credibility with your target audience.",
      keyOutcomes: [
        "Package complex frameworks into digestible visual formats",
        "Demonstrate real-world problem solving and case studies",
        "Attract inbound discovery conversations consistently",
      ],
    },
    {
      role: "SAAS & TECH FOUNDERS",
      subtitle: "Product Storytelling & Industry Relevance",
      description:
        "Explain complex products, share industry knowledge, and build trust within your professional community.",
      keyOutcomes: [
        "Translate product technicality into clear visual benefits",
        "Highlight industry shifts, teardowns, and modern solutions",
        "Cultivate an audience that cares about your product vision",
      ],
    },
    {
      role: "CREATORS & ENTREPRENEURS",
      subtitle: "Production Scale & Visual Polish",
      description:
        "Develop a consistent content identity with professional editing, creative direction, and reliable production support.",
      keyOutcomes: [
        "Free up 20+ hours every month from video editing tasks",
        "Maintain high-retention editing across all major platforms",
        "Build a recognizable, cohesive aesthetic across every asset",
      ],
    },
  ] as AudiencePersona[],
};

// 08. OUR CREATIVE DIFFERENCE DATA
export const DIFFERENCE_CONTENT = {
  eyebrow: "WHY MOTIONLY",
  headline: "More Than Editing. A Creative Team Behind Your Brand.",
  description:
    "We combine creative production, storytelling, and marketing thinking to help you communicate more effectively.",
  points: [
    {
      number: "01",
      title: "Marketing-Minded Creativity",
      description:
        "We don't edit just to make videos look good. Every creative decision should support the message and intended audience.",
      highlight: "Hooks, retention, pacing, and message clarity guide every cut.",
    },
    {
      number: "02",
      title: "Consistent Brand Identity",
      description:
        "We maintain recognizable visual language, typography, colors, and storytelling across your content.",
      highlight: "A unified look and feel that makes your content instantly identifiable.",
    },
    {
      number: "03",
      title: "A Dedicated Creative Team",
      description:
        "Work with people responsible for planning, editing, motion graphics, and creative execution.",
      highlight: "Direct communication with the creatives shaping your digital presence.",
    },
    {
      number: "04",
      title: "Flexible Collaboration",
      description:
        "Your content requirements evolve. Our workflow can adapt as your personal brand develops.",
      highlight: "Sprint-based partnership that scales up or down with your calendar.",
    },
  ] as DifferencePoint[],
};

// 09. PARTNERSHIP PLANS DATA
export const PLANS_CONTENT = {
  eyebrow: "WORK WITH MOTIONLY",
  headline: "Find the Right Way to Work Together.",
  description:
    "Whether you're starting your personal brand or looking for a reliable creative partner, we offer flexible ways to collaborate.",
  pricingNote:
    "Deliverables and scope are tailored during consultation based on your publishing schedule and recording capacity. No locked-in long-term commitments.",
  plans: [
    {
      id: "starter",
      name: "CONTENT STARTER",
      tagline: "For professionals who want to establish a consistent content presence.",
      priceTag: "Custom Scope",
      priceSubtitle: "Tailored to your sprint schedule",
      description:
        "Start building your online presence with professional content and a recognizable creative identity.",
      deliverables: [
        "Monthly content planning & ideation",
        "Short-form video editing (Reels, Shorts)",
        "Basic motion graphics & typography",
        "Brand-aligned visual editing style",
        "Clean captions and formatted subtitles",
        "Content performance review",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "growth",
      name: "GROWTH PARTNER",
      tagline: "For founders and creators looking for consistent content production.",
      badge: "MOST POPULAR",
      priceTag: "Custom Scope",
      priceSubtitle: "Multi-platform collaborative cadence",
      description:
        "A collaborative content partnership combining creative direction, video production, and consistent multi-platform content.",
      deliverables: [
        "Content strategy and monthly planning",
        "Short-form video production & hooks",
        "Long-form video editing (YouTube, Podcasts)",
        "Advanced motion graphics & visual explanations",
        "Multi-platform content repurposing",
        "Thumbnail design & creative packaging",
        "Monthly performance review & iterations",
      ],
      cta: "Let's Work Together",
      popular: true,
    },
    {
      id: "management",
      name: "PERSONAL BRAND MANAGEMENT",
      tagline: "For established professionals who want a more comprehensive content operation.",
      priceTag: "Custom Scope",
      priceSubtitle: "Full-service dedicated creative operation",
      description:
        "A tailored creative partnership covering the planning, production, and management of your personal brand content.",
      deliverables: [
        "Personalized content strategy & positioning",
        "Content calendar & publishing schedule management",
        "Scriptwriting, hooks, and creative direction",
        "Full video editing, sound design & motion graphics",
        "Multi-platform content adaptation (LinkedIn, X, IG, YT)",
        "Creative asset production (Carousels, Graphics)",
        "Publishing coordination & platform readiness",
        "Ongoing performance optimization",
      ],
      cta: "Discuss Your Project",
      popular: false,
    },
  ] as PartnershipPlan[],
};

// 10. OUR APPROACH DATA
export const APPROACH_CONTENT = {
  eyebrow: "A PARTNERSHIP, NOT ANOTHER VENDOR",
  headline: "Your Ideas. Our Execution. One Consistent Direction.",
  description:
    "The best personal brands are built through authentic ideas and consistent execution. You bring your knowledge, experiences, and perspective. We help transform them into content that communicates your value.",
  closingLine:
    "You don't need to become a full-time content creator to build a strong online presence.",
  yourSideTitle: "YOUR SIDE",
  yourSideItems: [
    "Share your expertise and domain knowledge.",
    "Provide initial ideas, experiences, and perspectives.",
    "Record raw videos when required (simple phone or camera setup).",
    "Review and approve drafts with easy feedback.",
    "Stay involved in the authentic direction of your brand.",
  ],
  motionlySideTitle: "MOTIONLY'S SIDE",
  motionlySideItems: [
    "Develop overarching content direction and pillars.",
    "Research relevant topics, hooks, and narrative angles.",
    "Support scripts, talking points, and story outlines.",
    "Edit, color-grade, and produce high-retention video content.",
    "Prepare platform-ready assets, thumbnails, and carousels.",
    "Maintain complete creative consistency across every release.",
  ],
};

// 11. FAQ DATA
export const FAQ_CONTENT = {
  eyebrow: "COMMON QUESTIONS",
  headline: "Everything You Need to Know Before We Start.",
  faqs: [
    {
      question: "Do I need to record my own videos?",
      answer:
        "Not necessarily. Many clients record content remotely using their phones or cameras, and we handle the editing and creative execution. Production assistance can also be discussed depending on your location and requirements.",
    },
    {
      question: "Can you help me decide what content to create?",
      answer:
        "Yes. We begin by understanding your expertise, audience, objectives, and communication style. Based on that, we develop content pillars and ideas that align with your positioning.",
    },
    {
      question: "Which platforms do you support?",
      answer:
        "We primarily work with YouTube, Instagram, LinkedIn, and TikTok. Content can be adapted to additional platforms depending on your requirements.",
    },
    {
      question: "Can I start with just video editing?",
      answer:
        "Absolutely. You can begin with a defined video editing scope and expand into a broader content partnership as your needs evolve.",
    },
    {
      question: "How much does personal branding cost?",
      answer:
        "Every project is different. Pricing depends on the number of deliverables, complexity of production, creative requirements, and level of involvement. Contact us to discuss a suitable engagement.",
    },
    {
      question: "How do we get started?",
      answer:
        "Start by submitting an inquiry. We'll learn about your business, goals, content requirements, and expectations before recommending an appropriate collaboration.",
    },
  ] as FAQItem[],
};

// 12. FINAL CTA DATA
export const FINAL_CTA_CONTENT = {
  eyebrow: "LET'S BUILD SOMETHING MEANINGFUL",
  headline: "You Have the Story. Let's Make the World See It.",
  description:
    "Your experience deserves to be communicated well. Let's turn your ideas into consistent, meaningful content and build a personal brand that reflects who you are.",
  primaryCtaText: "Start Your Project",
  primaryCtaLink: "/contact",
  secondaryCtaText: "Talk to Our Team",
  secondaryCtaLink: "/contact",
  subText: "Tell us about your goals. We'll help you figure out the next step.",
};
