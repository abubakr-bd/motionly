import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";

const services = [
  {
    number: "01",
    title: "Video editing",
    summary: "Build a stronger viewing experience with deliberate pacing, clean sound, and story-led visual choices.",
    details: ["Long-form and short-form editing", "Sound design and color finishing", "Motion graphics and captions"],
  },
  {
    number: "02",
    title: "Channel strategy",
    summary: "Give each release a clear audience, purpose, and path from idea to publication.",
    details: ["Topic and format planning", "Audience and competitor research", "Publishing systems and review"],
  },
  {
    number: "03",
    title: "Packaging and discovery",
    summary: "Help the right viewer understand why a video is worth their time before they press play.",
    details: ["Titles and descriptions", "Thumbnail concepts and design", "Search and metadata guidance"],
  },
  {
    number: "04",
    title: "Creative direction",
    summary: "Bring a consistent visual and editorial language to the content people associate with your brand.",
    details: ["Visual language and references", "Script and format development", "Feedback on performance patterns"],
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: { "@type": "Organization", name: "Motionly Media" },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://motionly.media/services" },
    ],
  },
];

const Services = () => (
  <Layout>
    <SEO
      title="Video Editing, Video Marketing & Production Services | Motionly Media"
      description="High-retention video editing, B2B SaaS video marketing, commercial video production, and VSL creation. Serving the US, UK, Canada, Australia, and ambitious brands worldwide."
      url="https://motionly.media/services"
      schema={schemas}
    />

    <section className="site-page-hero site-page-hero--compact">
      <div className="site-container">
        <div className="site-page-hero__copy site-page-hero__copy--wide">
          <p className="site-kicker">Full-Cycle Production &bull; Global Video Systems</p>
          <h1>Video Editing, Video Marketing &amp; Production Services</h1>
          <p className="site-page-hero__lede">
            From the first idea to the final cut, we bring the creative and practical pieces of your video operation together with deliberate pacing, clean sound, and story-led visual direction. Serving clients across the United States, United Kingdom, Canada, Australia, and ambitious brands worldwide.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Want to see these services in action? <Link to="/portfolio" className="text-blue-600 hover:underline font-medium">Browse our video portfolio &amp; case studies &rarr;</Link>
          </p>
        </div>
      </div>
    </section>

    <section className="site-page-section site-services-section">
      <div className="site-container">
        <div className="site-services-list">
          {services.map((service) => (
            <motion.article
              key={service.number}
              className="site-service-row"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.35 }}
            >
              <span className="site-service-row__number">{service.number}</span>
              <div className="site-service-row__main">
                <div className="site-service-row__intro">
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                </div>
                <ul>
                  {service.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
              <Link to="/contact" className="site-text-link">Discuss this service</Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="site-page-cta">
      <div className="site-container site-page-cta__inner">
        <div>
          <p className="site-kicker">A good place to start</p>
          <h2>Tell us what you are working toward.</h2>
        </div>
        <Link to="/contact" className="site-button">Book a strategy call</Link>
      </div>
    </section>
  </Layout>
);

export default Services;
