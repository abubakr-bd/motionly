export interface AIBrainSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  cards: string[];
}

export const DEFAULT_BRAIN: AIBrainSettings = {
  badge: "AI Content Brain",
  title: "A system that thinks",
  highlightedTitle: "10x faster.",
  description: "Our proprietary AI systems analyze millions of data points to generate viral concepts, hooks, and scripts tailored to your specific audience.",
  cards: [
    "Content Strategy",
    "Hook Generator",
    "Storytelling",
    "Audience Psychology",
    "Content Repurposing",
    "Distribution",
    "Brand Positioning",
    "Analytics"
  ]
};
