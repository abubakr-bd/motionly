import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";

// Design Monks Inspired Premium Agency Sections
import { HeroStudio } from "../components/home/HeroStudio";
import { ClientMarquee } from "../components/home/ClientMarquee";
import { SelectedWork } from "../components/home/SelectedWork";
import { IndustryShowcase } from "../components/home/IndustryShowcase";
import { WhyMotionly } from "../components/home/WhyMotionly";
import { CreativeCapabilities } from "../components/home/CreativeCapabilities";
import { StudioProcess } from "../components/home/StudioProcess";
import { TrustAndProof } from "../components/home/TrustAndProof";
import { TeamBehindTheScenes } from "../components/home/TeamBehindTheScenes";
import { JournalSection } from "../components/home/JournalSection";
import { FinalStudioCTA } from "../components/home/FinalStudioCTA";

const Landing: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <Layout>
      <SEO
        title={
          settings.seo.title ||
          "Motionly — Creative Video & Content Studio"
        }
        description={
          settings.seo.description ||
          "Creative videos built to move brands. We help SaaS companies, founders, and ambitious businesses turn complex ideas into compelling visual stories."
        }
        image={settings.seo.image}
      />

      <div className="bg-white text-[#111827] dark:bg-[#07080d] dark:text-[#eef0f5] min-h-screen relative transition-colors duration-200">
        {/* Section 04 — Hero Section */}
        <HeroStudio />

        {/* Section 06 — Trusted by Brands (Infinite Marquee) */}
        <ClientMarquee />

        {/* Section 05 — Creative Portfolio Showcase */}
        <SelectedWork />

        {/* Section 07 — Industry Showcase (Design Monks Pastel Cards) */}
        <IndustryShowcase />

        {/* Section 12 — Why Motionly (Comparison Matrix Table) */}
        <WhyMotionly />

        {/* Section 09 — What We Create (3 Capabilities) */}
        <CreativeCapabilities />

        {/* Section 10 — Our Creative Process */}
        <StudioProcess />

        {/* Section 08 — Client Testimonials Slider */}
        <TrustAndProof />

        {/* Section 11 — Meet The Team / Behind The Scenes */}
        <TeamBehindTheScenes />

        {/* Section 12 — Journal / Insights */}
        <JournalSection />

        {/* Section 13 — Final Conversion CTA */}
        <FinalStudioCTA />
      </div>
    </Layout>
  );
};

export default Landing;
