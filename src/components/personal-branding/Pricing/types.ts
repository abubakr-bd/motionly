export interface EngagementModel {
  id: string;
  name: string;
  description: string;
  price: string;
  idealFor: string;
  features: string[];
  isPopular?: boolean;
}

export interface PricingSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  models: EngagementModel[];
}

export const DEFAULT_PRICING: PricingSettings = {
  badge: "Partnership Models",
  title: "We don't sell retainers.",
  highlightedTitle: "We sell outcomes.",
  description: "Select the engagement model that aligns with your current growth stage and authority objectives.",
  models: [
    {
      id: "starter",
      name: "Starter",
      description: "Establish your baseline presence and test the waters.",
      price: "$2,500/mo",
      idealFor: "Founders just starting their personal brand journey.",
      features: [
        "4x YouTube Shorts / Reels per week",
        "Basic Hook Optimization",
        "Monthly Strategy Call",
        "Standard Analytics Dashboard"
      ]
    },
    {
      id: "growth",
      name: "Growth Partner",
      description: "Aggressive multi-platform audience acquisition.",
      price: "$5,000/mo",
      idealFor: "Creators ready to scale across platforms.",
      isPopular: true,
      features: [
        "2x Long-form YouTube Videos",
        "10x Repurposed Shorts",
        "Custom Thumbnail Design",
        "Bi-weekly Strategy Sprints",
        "SEO Optimization & Tagging"
      ]
    },
    {
      id: "authority",
      name: "Authority Accelerator",
      description: "The complete omnipresence operating system.",
      price: "$9,500/mo",
      idealFor: "Industry leaders wanting to dominate their niche.",
      features: [
        "4x Premium Long-form Videos",
        "20x Multi-platform Shorts",
        "Weekly LinkedIn/Twitter Ghostwriting",
        "Dedicated Content Strategist",
        "Funnel Integration Strategy",
        "Priority Slack Channel"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Full-scale media production and distribution.",
      price: "Custom",
      idealFor: "Large brands and high-net-worth individuals.",
      features: [
        "On-site Production Crew",
        "Podcast Management",
        "PR & Media Placements",
        "Custom Tech Stack Integration",
        "Everything in Authority Accelerator"
      ]
    }
  ]
};
