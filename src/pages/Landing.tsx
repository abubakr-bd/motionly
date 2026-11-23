import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";

// Premium Agency Sections
import { HeroStudio } from "../components/home/HeroStudio";
import { ClientMarquee } from "../components/home/ClientMarquee";
import { SelectedWork } from "../components/home/SelectedWork";
import { ServicesShowcase } from "../components/home/ServicesShowcase";
import { WhyMotionly } from "../components/home/WhyMotionly";
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
        {/* 01 — Hero */}
        <HeroStudio />

        {/* 02 — Trusted by Brands (Infinite Marquee) */}
        <ClientMarquee />

        {/* 03 — Selected Work / Portfolio */}
        <SelectedWork />

        {/* 04 — Our Services */}
        <ServicesShowcase />

        {/* 05 — Why Motionly (Comparison Matrix) */}
        <WhyMotionly />

        {/* 06 — Our Creative Process */}
        <StudioProcess />

        {/* 07 — Client Testimonials */}
        <TrustAndProof />

        {/* 08 — Meet The Team */}
        <TeamBehindTheScenes />

        {/* 09 — Journal / Insights */}
        <JournalSection />

        {/* 10 — Final CTA */}
        <FinalStudioCTA />
      </div>
    </Layout>
  );
};

export default Landing;
