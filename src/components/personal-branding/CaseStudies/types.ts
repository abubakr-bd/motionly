export interface CaseStudyMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
}

export interface CaseStudy {
  id: string;
  clientName: string;
  niche: string;
  avatarUrl?: string;
  before: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: CaseStudyMetric[];
}

export interface CaseStudiesSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  studies: CaseStudy[];
}

export const DEFAULT_CASE_STUDIES: CaseStudiesSettings = {
  badge: "The Proof",
  title: "Don't just take",
  highlightedTitle: "our word for it.",
  description: "We don't sell views. We sell business transformations. Here is how we engineered authority for our partners.",
  studies: [
    {
      id: "1",
      clientName: "Alex H.",
      niche: "B2B SaaS Founder",
      before: "Zero presence. Relying solely on cold outreach for lead generation. No inbound authority.",
      strategy: "Position as a contrarian voice in B2B growth. Leverage Twitter and LinkedIn for top-of-funnel, YouTube for deep-dive trust building.",
      execution: "Published 3 high-quality YouTube videos per month. Repurposed into 15 short-form clips, 12 LinkedIn carousels, and a weekly newsletter.",
      results: "Transitioned from 100% outbound to 80% inbound. Scaled MRR by $40k within 6 months directly attributed to organic content.",
      metrics: [
        { label: "Audience Growth", value: "+45K", trend: "up" },
        { label: "Inbound Leads", value: "12/wk", trend: "up" },
        { label: "New MRR", value: "$40K", trend: "up" }
      ]
    },
    {
      id: "2",
      clientName: "Sarah M.",
      niche: "Real Estate Investor",
      before: "Posting randomly on TikTok. Viral hits but zero conversion to her paid community or coaching.",
      strategy: "Shift focus from 'entertainment' to 'education'. Build a cohesive funnel driving short-form traffic to long-form YouTube masterclasses.",
      execution: "Overhauled hook structure. Implemented strong CTAs in shorts. Launched a flagship weekly YouTube series.",
      results: "Stopped chasing viral vanity metrics. Built a highly engaged, buying audience. Sold out her mastermind in 48 hours.",
      metrics: [
        { label: "Community Members", value: "+850", trend: "up" },
        { label: "YouTube Watch Time", value: "12K hrs", trend: "up" },
        { label: "Launch Revenue", value: "$120K", trend: "up" }
      ]
    }
  ]
};
