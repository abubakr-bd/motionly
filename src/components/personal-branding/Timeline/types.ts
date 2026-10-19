export interface TimelineMilestone {
  id: string;
  stage: string; // e.g. "0 Followers"
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export interface TimelineSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  milestones: TimelineMilestone[];
}

export const DEFAULT_TIMELINE: TimelineSettings = {
  badge: "The Growth Trajectory",
  title: "From zero to",
  highlightedTitle: "Industry Leader.",
  description: "Building a personal brand isn't an overnight success. It's a calculated, predictable system of compounding returns.",
  milestones: [
    {
      id: "1",
      stage: "Month 1-3",
      title: "Finding the Voice",
      description: "We test formats, establish your unique positioning, and optimize your production workflow.",
      icon: "Target"
    },
    {
      id: "2",
      stage: "Month 4-6",
      title: "Building Authority",
      description: "Consistent high-retention content starts ranking. You become the go-to expert in your niche.",
      icon: "TrendingUp"
    },
    {
      id: "3",
      stage: "Month 7-9",
      title: "Inbound Leads",
      description: "Your audience transforms into a community. High-ticket inbound leads start flowing predictably.",
      icon: "Magnet"
    },
    {
      id: "4",
      stage: "Month 10+",
      title: "The Empire",
      description: "Brand deals, speaking gigs, and exponential business growth. You are now impossible to ignore.",
      icon: "Crown"
    }
  ]
};
