import { useEffect, useState } from "react";
import { getDb } from "./firebaseLazy";

// Import Types and Defaults
import type { HeroSettings } from "../components/personal-branding/Hero/types";
import { DEFAULT_HERO } from "../components/personal-branding/Hero/types";

import type { CreatorGalaxySettings } from "../components/personal-branding/CreatorGalaxy/types";
import { DEFAULT_GALAXY } from "../components/personal-branding/CreatorGalaxy/types";

import type { AIBrainSettings } from "../components/personal-branding/AIBrain/types";
import { DEFAULT_BRAIN } from "../components/personal-branding/AIBrain/types";

import type { DashboardSettings } from "../components/personal-branding/Dashboard/types";
import { DEFAULT_DASHBOARD } from "../components/personal-branding/Dashboard/types";

import type { TimelineSettings } from "../components/personal-branding/Timeline/types";
import { DEFAULT_TIMELINE } from "../components/personal-branding/Timeline/types";

import type { InfluenceEngineSettings } from "../components/personal-branding/InfluenceEngine/types";
import { DEFAULT_INFLUENCE_ENGINE } from "../components/personal-branding/InfluenceEngine/types";

import type { CaseStudiesSettings } from "../components/personal-branding/CaseStudies/types";
import { DEFAULT_CASE_STUDIES } from "../components/personal-branding/CaseStudies/types";

import type { PricingSettings } from "../components/personal-branding/Pricing/types";
import { DEFAULT_PRICING } from "../components/personal-branding/Pricing/types";

import type { CTASettings } from "../components/personal-branding/CTA/types";
import { DEFAULT_CTA } from "../components/personal-branding/CTA/types";

export interface PersonalBrandingData {
  hero: HeroSettings;
  galaxy: CreatorGalaxySettings;
  brain: AIBrainSettings;
  dashboard: DashboardSettings;
  timeline: TimelineSettings;
  influence: InfluenceEngineSettings;
  caseStudies: CaseStudiesSettings;
  pricing: PricingSettings;
  cta: CTASettings;
}

const DEFAULT_DATA: PersonalBrandingData = {
  hero: DEFAULT_HERO,
  galaxy: DEFAULT_GALAXY,
  brain: DEFAULT_BRAIN,
  dashboard: DEFAULT_DASHBOARD,
  timeline: DEFAULT_TIMELINE,
  influence: DEFAULT_INFLUENCE_ENGINE,
  caseStudies: DEFAULT_CASE_STUDIES,
  pricing: DEFAULT_PRICING,
  cta: DEFAULT_CTA,
};

export function usePersonalBrandingData() {
  const [data, setData] = useState<PersonalBrandingData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    
    getDb().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      
      unsub = onSnapshot(doc(db, "personal_branding", "config"), (docSnap) => {
        if (docSnap.exists()) {
          const dbData = docSnap.data() as Partial<PersonalBrandingData>;
          
          // Merge with defaults to ensure all fields exist even if db is incomplete
          setData({
            hero: { ...DEFAULT_HERO, ...(dbData.hero || {}) },
            galaxy: { ...DEFAULT_GALAXY, ...(dbData.galaxy || {}) },
            brain: { ...DEFAULT_BRAIN, ...(dbData.brain || {}) },
            dashboard: { ...DEFAULT_DASHBOARD, ...(dbData.dashboard || {}) },
            timeline: { ...DEFAULT_TIMELINE, ...(dbData.timeline || {}) },
            influence: { ...DEFAULT_INFLUENCE_ENGINE, ...(dbData.influence || {}) },
            caseStudies: { ...DEFAULT_CASE_STUDIES, ...(dbData.caseStudies || {}) },
            pricing: { ...DEFAULT_PRICING, ...(dbData.pricing || {}) },
            cta: { ...DEFAULT_CTA, ...(dbData.cta || {}) },
          });
        } else {
          setData(DEFAULT_DATA);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching personal branding data:", error);
        setData(DEFAULT_DATA);
        setLoading(false);
      });
    });
    
    return () => unsub?.();
  }, []);

  return { data, loading, DEFAULT_DATA };
}
