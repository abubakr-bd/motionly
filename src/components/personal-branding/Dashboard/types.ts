export interface DashboardSettings {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
}

export const DEFAULT_DASHBOARD: DashboardSettings = {
  badge: "The Command Center",
  title: "A transparent view of",
  highlightedTitle: "your empire.",
  description: "We don't operate in the dark. Our custom client portal gives you real-time visibility into production, metrics, and revenue attribution.",
};
