import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";

// The 6 Art-Directed Editorial Homepage Sections
import { HeroStudio } from "../components/home/HeroStudio";
import { SelectedWork } from "../components/home/SelectedWork";
import { CreativeCapabilities } from "../components/home/CreativeCapabilities";
import { StudioProcess } from "../components/home/StudioProcess";
import { TrustAndProof } from "../components/home/TrustAndProof";
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
        {/* Section 1 — Hero */}
        <HeroStudio />

        {/* Section 2 — Selected Work */}
        <SelectedWork />

        {/* Section 3 — Our Capabilities */}
        <CreativeCapabilities />

        {/* Section 4 — How We Work */}
        <StudioProcess />

        {/* Section 5 — Trust & Proof */}
        <TrustAndProof />

        {/* Section 6 — Final CTA */}
        <FinalStudioCTA />
      </div>
    </Layout>
  );
};

export default Landing;
