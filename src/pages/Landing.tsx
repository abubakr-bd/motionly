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
      return <div key="portfolio" id="selected-work"><Portfolio limit={4} /></div>;
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
      <div className="bg-white">
        {activeSections.map((key) => renderSection(key))}
      </div>
    </Layout>
  );
};

export default Landing;
