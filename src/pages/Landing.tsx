import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";

// Studio Editorial Homepage Components
import { HeroStudio } from "../components/home/HeroStudio";
import { SelectedWork } from "../components/home/SelectedWork";
import { Collaborations } from "../components/home/Collaborations";
import { CreativeCapabilities } from "../components/home/CreativeCapabilities";
import { StudioProcess } from "../components/home/StudioProcess";
import { WhoWeWorkWith } from "../components/home/WhoWeWorkWith";
import { WhyMotionly } from "../components/home/WhyMotionly";
import Team from "../components/sections/Team";
import { JournalSection } from "../components/home/JournalSection";
import { StudioFAQ } from "../components/home/StudioFAQ";
import { FinalStudioCTA } from "../components/home/FinalStudioCTA";

const Landing: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <Layout>
      <SEO
        title={
          settings.seo.title ||
          "Motionly — Independent Creative Video & Content Studio"
        }
        description={
          settings.seo.description ||
          "From SaaS products to personal brands, we turn complex ideas into compelling visual experiences through strategic video production, motion design, and creative storytelling."
        }
        image={settings.seo.image}
      />

      {/* Clean ink neutral background: quiet, deliberate, zero color washes or blobs */}
      <div className="bg-[#f5f7fa] text-[#111827] dark:bg-[#07080d] dark:text-[#eef0f5] min-h-screen relative transition-colors duration-200">
        {/* 01 & 04. Hero */}
        <HeroStudio />

        {/* 05. Selected Work Gallery */}
        <SelectedWork />

        {/* 06. Collaborations */}
        <Collaborations />

        {/* 07. Creative Capabilities */}
        <CreativeCapabilities />

        {/* 08. Studio Process */}
        <StudioProcess />

        {/* 09. Who We Work With */}
        <WhoWeWorkWith />

        {/* 10. Why Motionly */}
        <WhyMotionly />

        {/* 11. The Studio / Team (16:9 Automated Infinite Loop Carousel) */}
        <Team />

        {/* 12. Journal */}
        <JournalSection />

        {/* 13. FAQ */}
        <StudioFAQ />

        {/* 14. Final CTA */}
        <FinalStudioCTA />
      </div>
    </Layout>
  );
};

export default Landing;
