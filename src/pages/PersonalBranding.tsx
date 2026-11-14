import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";
import NotFound from "./NotFound";

// 12 Dedicated Modular Sections
import PBHero from "../components/personal-branding/PBHero";
import PBProblem from "../components/personal-branding/PBProblem";
import PBSolution from "../components/personal-branding/PBSolution";
import PBWorkflow from "../components/personal-branding/PBWorkflow";
import PBWhatWeCreate from "../components/personal-branding/PBWhatWeCreate";
import PBPlatformPresence from "../components/personal-branding/PBPlatformPresence";
import PBWhoWeWorkWith from "../components/personal-branding/PBWhoWeWorkWith";
import PBCreativeDifference from "../components/personal-branding/PBCreativeDifference";
import PBPartnershipPlans from "../components/personal-branding/PBPartnershipPlans";
import PBApproach from "../components/personal-branding/PBApproach";
import PBFAQ from "../components/personal-branding/PBFAQ";
import PBFinalCTA from "../components/personal-branding/PBFinalCTA";

const PersonalBranding: React.FC = () => {
  const { settings, loading } = useSiteSettings();

  // If globally disabled in settings
  if (!loading && settings.global?.pageToggles?.personalBranding === false) {
    return <NotFound />;
  }

  return (
    <Layout>
      <SEO
        title="Personal Branding by Motionly | Content & Creative Partner for Founders & Leaders"
        description="Turn your expertise into an authoritative, recognizable personal brand. Motionly manages video editing, content strategy, storytelling, and multi-platform distribution."
        url="https://motionly.media/personal-branding"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
                { "@type": "ListItem", position: 2, name: "Personal Branding", item: "https://motionly.media/personal-branding" },
              ],
            },
            {
              "@type": "Service",
              name: "Personal Branding by Motionly",
              description: "Strategic planning, professional video editing, creative storytelling, and content management for founders, entrepreneurs, coaches, and creators.",
              provider: { 
                "@type": "Organization", 
                name: "Motionly Media",
                url: "https://motionly.media"
              },
              serviceType: "Personal Brand Management & Video Production",
              areaServed: "Worldwide"
            }
          ]
        }}
      />

      <div className="min-h-screen bg-[#05070F] text-white">
        {/* 01. HERO SECTION */}
        <PBHero />

        {/* 02. THE PROBLEM */}
        <PBProblem />

        {/* 03. OUR SOLUTION */}
        <PBSolution />

        {/* 04. OUR WORKFLOW */}
        <PBWorkflow />

        {/* 05. WHAT WE CREATE */}
        <PBWhatWeCreate />

        {/* 06. PLATFORM PRESENCE */}
        <PBPlatformPresence />

        {/* 07. WHO WE WORK WITH */}
        <PBWhoWeWorkWith />

        {/* 08. OUR CREATIVE DIFFERENCE */}
        <PBCreativeDifference />

        {/* 09. PARTNERSHIP PLANS */}
        <PBPartnershipPlans />

        {/* 10. OUR APPROACH */}
        <PBApproach />

        {/* 11. FAQ */}
        <PBFAQ />

        {/* 12. FINAL CTA */}
        <PBFinalCTA />
      </div>
    </Layout>
  );
};

export default PersonalBranding;