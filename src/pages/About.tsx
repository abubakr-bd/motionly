import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import Team from "../components/sections/Team";
import SEO from "../components/layout/SEO";
import { DEFAULT_TEAM, useTeam } from "../lib/useSiteData";

const pillars = [
  {
    number: "01",
    title: "Editorial judgment",
    description: "Every cut serves the story. We shape pacing, sound, and visuals around the audience you need to reach.",
  },
  {
    number: "02",
    title: "A dependable team",
    description: "Editors and strategists work as one team, with clear ownership from brief to final delivery.",
  },
  {
    number: "03",
    title: "Measured improvement",
    description: "We use performance signals to make the next video clearer, more relevant, and more effective.",
  },
];

const About = () => {
  const { team } = useTeam();
  const featuredTeam = team.slice(0, 3);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://motionly.media/about" },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Motionly Media",
        description: "Meet the editors, motion designers, and strategists at Motionly Media.",
        url: "https://motionly.media/about",
      }
    ]
  };

  return (
  <Layout>
    <SEO
      title="About Motionly Media | Global Video Marketing & Production Studio"
      description="Meet Motionly Media—an elite team of video editors, directors, and strategists delivering Silicon Valley-grade production for clients across the US, UK, Canada, Australia, and worldwide."
      url="https://motionly.media/about"
      schema={aboutSchema}
    />

    <section className="site-page-hero">
      <div className="site-container site-page-hero__grid">
        <div className="site-page-hero__copy">
          <p className="site-kicker">Global Video Agency &bull; High-Retention Production Studio</p>
          <h1>About Motionly Media | Global Video Marketing &amp; Production Studio</h1>
          <p className="site-page-hero__lede">
            Good video starts with a clear point of view. We are an independent creative agency and production studio partnering with creators and brands who have something meaningful to say and want more people to hear it. Headquartered in Dhaka, Bangladesh, we deliver Silicon Valley-grade production and high-retention video systems to market leaders across the US, UK, Canada, Australia, and Europe.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Link to="/contact" className="site-button">Meet the team</Link>
            <Link to="/portfolio" className="site-button" style={{ background: '#f1f5f9', color: '#0f172a' }}>View our work</Link>
          </div>
        </div>
        <figure className="site-page-hero__image site-about-team-figure">
          <div className="site-about-team-preview">
            {featuredTeam.length > 0 ? featuredTeam.map((member, index) => (
              <img
                key={member.id}
                className={`site-about-team-preview__portrait portrait-${index + 1} ${featuredTeam.length === 2 && index === 1 ? "portrait-double" : ""}`}
                src={member.img}
                alt={member.name}
                width="640"
                height="800"
                loading={index === 0 ? "eager" : "lazy"}
                onError={(event) => {
                  const fallback = DEFAULT_TEAM.find((item) => item.id === member.id || item.name === member.name)?.img;
                  if (!fallback || event.currentTarget.dataset.fallbackAttempted) return;
                  event.currentTarget.dataset.fallbackAttempted = "true";
                  event.currentTarget.src = fallback;
                }}
              />
            )) : <p>Strategy<br />Editing<br />Design</p>}
          </div>
          <figcaption>Editors, strategists, and designers working as one team.</figcaption>
        </figure>
      </div>
    </section>

    <section className="site-page-section">
      <div className="site-container site-about-story">
        <p className="site-kicker">Why we exist</p>
        <div>
          <h2>Make every piece of content earn its place.</h2>
          <p>
            Publishing more is not a strategy on its own. The idea, the edit, and the way a video is presented all shape whether someone keeps watching and remembers the brand behind it.
          </p>
          <p>
            Motionly brings those decisions together. We help creators and growing teams build a reliable video practice without losing the character that made their work worth watching.
          </p>
        </div>
      </div>
    </section>

    <section className="site-page-section site-page-section--muted">
      <div className="site-container">
        <div className="site-section-heading">
          <p className="site-kicker">How we work</p>
          <h2>Thoughtful work. Clear ownership.</h2>
        </div>
        <div className="site-about-pillars">
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.number}
              className="site-about-pillar"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
            >
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <Team />

    <section className="site-page-cta">
      <div className="site-container site-page-cta__inner">
        <div>
          <p className="site-kicker">Start a conversation</p>
          <h2>Let's make your next video matter.</h2>
        </div>
        <Link to="/contact" className="site-button-secondary">Talk with Motionly</Link>
      </div>
    </section>
  </Layout>
  );
};

export default About;
