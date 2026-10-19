export interface InfluenceNode {
  id: string;
  title: string;
  insight: string;
  icon: string;
}

export interface InfluenceEngineSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  nodes: InfluenceNode[];
}

export const DEFAULT_INFLUENCE_ENGINE: InfluenceEngineSettings = {
  badge: "The Signature System",
  title: "The Engine of",
  highlightedTitle: "Influence.",
  description: "Every element feeds into the next. We engineer a compounding ecosystem where your content creates trust, your trust builds community, and your community drives revenue.",
  nodes: [
    { id: "1", title: "Content", insight: "High-retention, value-driven media.", icon: "Film" },
    { id: "2", title: "Trust", insight: "Consistent delivery builds parasocial trust.", icon: "Shield" },
    { id: "3", title: "Community", insight: "Passive viewers become active advocates.", icon: "Users" },
    { id: "4", title: "Distribution", insight: "Omnichannel presence across all platforms.", icon: "Share2" },
    { id: "5", title: "Consistency", insight: "Algorithmic compounding through volume.", icon: "Repeat" },
    { id: "6", title: "Authority", insight: "Perceived as the top 1% in your industry.", icon: "Award" },
    { id: "7", title: "Opportunities", insight: "Inbound deals, speaking, and partnerships.", icon: "Briefcase" },
    { id: "8", title: "Revenue", insight: "Predictable, scalable business growth.", icon: "TrendingUp" }
  ]
};
