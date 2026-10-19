import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Portfolio from "../components/sections/Portfolio";
import SEO from "../components/layout/SEO";

const portfolioBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://motionly.media/portfolio" },
  ],
};

const PortfolioPage = () => (
  <Layout>
    <SEO
      title="Motionly Media Portfolio | Video Editing & Case Studies"
      description="Explore Motionly Media's portfolio of high-retention video editing, VSL production, YouTube growth, and commercial creative case studies."
      url="https://motionly.media/portfolio"
      schema={portfolioBreadcrumbs}
    />

    <section className="site-page-hero site-page-hero--compact">
      <div className="site-container site-page-hero__copy site-page-hero__copy--wide">
        <p className="site-kicker">Selected Work &amp; Case Studies</p>
        <h1>Motionly Media Video Portfolio &amp; Case Studies</h1>
        <p className="site-page-hero__lede">
          Editing shaped around the story. A curated showcase of high-retention video editing, VSL funnels, and creator campaigns produced by Motionly Media.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Looking for a specific production format? <Link to="/services" className="text-blue-600 hover:underline font-medium">Explore our video services &rarr;</Link>
        </p>
      </div>
    </section>

    <div className="site-portfolio-page"><Portfolio /></div>

    <section className="site-page-cta">
      <div className="site-container site-page-cta__inner">
        <div>
          <p className="site-kicker">Have a project in mind?</p>
          <h2>Let's talk through the brief.</h2>
        </div>
        <Link to="/contact" className="site-button">Contact Motionly</Link>
      </div>
    </section>
  </Layout>
);

export default PortfolioPage;
