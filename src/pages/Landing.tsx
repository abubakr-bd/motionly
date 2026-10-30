import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import Hero from "../components/sections/Hero";
import Partners from "../components/sections/Partners";
import Portfolio from "../components/sections/Portfolio";
import SayGoodbye from "../components/sections/SayGoodbye";
import Difference from "../components/sections/Difference";
import Testimonials from "../components/sections/Testimonials";
import OurProcess from "../components/sections/OurProcess";
import Team from "../components/sections/Team";
import Pricing from "../components/sections/Pricing";
import LatestBlog from "../components/sections/LatestBlog";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

import { useSiteSettings } from "../lib/useSiteData";

const renderSection = (key: string) => {
  switch (key) {
    case "hero":
      return <Hero key="hero" />;
    case "partners":
      return <Partners key="partners" />;
    case "portfolio":
      return <div key="portfolio" id="work"><Portfolio /></div>;
    case "painPoints":
    case "sayGoodbye":
    case "pain-points":
      return <SayGoodbye key="painPoints" />;
    case "difference":
      return <Difference key="difference" />;
    case "testimonials":
    case "reviews":
      return <Testimonials key="testimonials" />;
    case "process":
      return <OurProcess key="process" />;
    case "team":
    case "about":
      return <div key="team" id="about"><Team /></div>;
    case "pricing":
      return <Pricing key="pricing" />;
    case "blog":
    case "latestBlog":
      return <LatestBlog key="blog" />;
    case "faqs":
    case "faq":
      return <FAQ key="faqs" />;
    case "contact":
      return <Contact key="contact" />;
    default:
      return null;
  }
};

const DEFAULT_SECTIONS = [
  "hero",
  "partners",
  "portfolio",
  "painPoints",
  "difference",
  "testimonials",
  "process",
  "team",
  "pricing",
  "blog",
  "faqs",
  "contact"
];

const Landing = () => {
  const { settings } = useSiteSettings();

  const activeSections = settings.layout?.homepageSections && settings.layout.homepageSections.length > 0
    ? settings.layout.homepageSections
    : DEFAULT_SECTIONS;

  return (
    <Layout>
      <SEO 
        title={settings.seo.title || "Motionly Media | Video Editing and Creative Direction"}
        description={settings.seo.description || "Story-led video editing, motion design, and creative direction for creators and ambitious brands."}
        image={settings.seo.image}
      />
      <div className="bg-white text-slate-900 dark:bg-[#05070F] dark:text-slate-100 min-h-screen relative overflow-x-hidden transition-colors duration-300">
        {/* Subtle Ambient Radial Lighting - Adaptive for Light and Dark */}
        <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-500/15 via-blue-400/5 to-transparent dark:from-blue-600/15 dark:via-blue-500/5 blur-[140px] -z-10" />
        <div className="pointer-events-none fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/10 blur-[150px] -z-10" />
        <div className="pointer-events-none fixed top-[75%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[150px] -z-10" />

        {activeSections.map((key) => renderSection(key))}
      </div>
    </Layout>
  );
};

export default Landing;
