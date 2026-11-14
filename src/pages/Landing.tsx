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
import { TeamEditorial } from "../components/home/TeamEditorial";
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
          "MOTIONLY — Independent Creative Video & Content Studio"
        }
        description={
          settings.seo.description ||
          "We turn complex ideas and ambitious visions into compelling visual experiences through strategic video production, motion design, and creative storytelling."
        }
        image={settings.seo.image}
      />

      <div className="bg-white text-slate-900 dark:bg-[#05070F] dark:text-slate-100 min-h-screen relative transition-colors duration-300">
        {/* Subtle Ambient Studio Atmosphere Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-blue-600/10 via-blue-500/5 to-transparent blur-[140px] -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[45%] right-[-10%] w-[650px] h-[650px] bg-blue-600/5 dark:bg-blue-600/10 blur-[160px] -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[80%] left-[-10%] w-[650px] h-[650px] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[160px] -z-10"
        />

        {/* 01 & 04. HERO SECTION */}
        <HeroStudio />

        {/* 05. SELECTED WORK GALLERY */}
        <SelectedWork />

        {/* 06. COLLABORATIONS / CLIENT LOGOS */}
        <Collaborations />

        {/* 07. CREATIVE CAPABILITIES */}
        <CreativeCapabilities />

        {/* 08. STUDIO PROCESS */}
        <StudioProcess />

        {/* 09. WHO WE WORK WITH */}
        <WhoWeWorkWith />

        {/* 10. WHY MOTIONLY / DIFFERENTIATORS */}
        <WhyMotionly />

        {/* 11. THE STUDIO / TEAM */}
        <TeamEditorial />

        {/* 12. JOURNAL / CREATIVE INSIGHTS */}
        <JournalSection />

        {/* 13. FAQ */}
        <StudioFAQ />

        {/* 14. FINAL EMOTIONAL CTA */}
        <FinalStudioCTA />
      </div>
    </Layout>
  );
};

export default Landing;
