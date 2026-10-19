export interface HeroSettings {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadlineLine1: string;
  subheadlineLine2: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  avatarUrl?: string; // Central avatar in ecosystem
  // Allow switching layout via CMS
  layout: "center" | "split";
}

// Temporary default data until CMS is integrated
export const DEFAULT_HERO: HeroSettings = {
  badge: "Personal Branding Operating System",
  headlineLine1: "Build A Personal Brand",
  headlineLine2: "People Remember.",
  subheadlineLine1: "We don't just edit videos.",
  subheadlineLine2: "We engineer influence.",
  primaryCtaText: "Build My Brand",
  primaryCtaLink: "/contact",
  secondaryCtaText: "Watch Success Stories",
  secondaryCtaLink: "#case-studies",
  layout: "center"
};
