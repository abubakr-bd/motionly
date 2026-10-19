import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { usePersonalBrandingData } from "../lib/usePersonalBrandingData";
import { useSiteSettings } from "../lib/useSiteData";
import NotFound from "./NotFound";

const PersonalBranding = () => {
  const { data, loading } = usePersonalBrandingData();
  const { settings, loading: globalLoading } = useSiteSettings();

  if (loading || globalLoading) {
    return <Layout><div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading services</span></div></Layout>;
  }

  if (settings.global?.pageToggles?.personalBranding === false) return <NotFound />;

  const { hero, galaxy, brain, dashboard, timeline, influence, caseStudies, pricing, cta } = data;

  return (
    <Layout>
      <SEO
        title="Personal Branding Video Systems | Motionly Media"
        description="Build authority and scale your personal brand with custom high-retention video production, positioning, and content engines by Motionly Media."
        url="https://motionly.media/personal-branding"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
                { "@type": "ListItem", position: 2, name: "Personal Branding", item: "https://motionly.media/personal-branding" },
              ],
            },
            {
              "@type": "Service",
              name: "Personal Branding Video Systems",
              description: "Video and content support for founders and creators building an authoritative personal brand.",
              provider: { "@type": "Organization", name: "Motionly Media" }
            }
          ]
        }}
      />

      <div className="site-personal-page">
        <section className="site-page-hero site-personal-hero">
          <div className="site-container site-personal-hero__grid">
            <div className="site-page-hero__copy">
              <p className="site-kicker">{hero.badge}</p>
              <h1>{hero.headlineLine1} <span>{hero.headlineLine2}</span></h1>
              <p className="site-page-hero__lede">{hero.subheadlineLine1} {hero.subheadlineLine2}</p>
              <div className="site-personal-hero__actions">
                <Link to={hero.primaryCtaLink || "/contact"} className="site-button">{hero.primaryCtaText}</Link>
                <a href={hero.secondaryCtaLink || "#case-studies"} className="site-text-link">{hero.secondaryCtaText}</a>
              </div>
            </div>
            <div className="site-personal-hero__note">
              <span>Motionly Media</span>
              <p>Positioning, production, and distribution built around your point of view.</p>
            </div>
          </div>
        </section>

        <section className="site-page-section">
          <div className="site-container site-personal-intro">
            <p className="site-kicker">{galaxy.badge}</p>
            <div>
              <h2>{galaxy.title} <span>{galaxy.highlightedTitle}</span></h2>
              <p>{galaxy.description}</p>
            </div>
          </div>
        </section>

        <section className="site-page-section site-page-section--muted">
          <div className="site-container site-personal-system">
            <div className="site-personal-system__intro">
              <p className="site-kicker">{brain.badge}</p>
              <h2>{brain.title} <span>{brain.highlightedTitle}</span></h2>
              <p>{brain.description}</p>
            </div>
            <ul className="site-personal-capabilities">
              {brain.cards.map((item, index) => <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="site-page-section">
          <div className="site-container site-personal-intro">
            <p className="site-kicker">{dashboard.badge}</p>
            <div>
              <h2>{dashboard.title} <span>{dashboard.highlightedTitle}</span></h2>
              <p>{dashboard.description}</p>
            </div>
          </div>
        </section>

        <section className="site-page-section site-page-section--muted">
          <div className="site-container">
            <div className="site-section-heading">
              <p className="site-kicker">{timeline.badge}</p>
              <h2>{timeline.title} <span>{timeline.highlightedTitle}</span></h2>
              <p className="site-personal-section-lede">{timeline.description}</p>
            </div>
            <ol className="site-personal-timeline">
              {timeline.milestones.map((item, index) => (
                <li key={item.id || index}>
                  <span>{item.stage}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="site-page-section">
          <div className="site-container">
            <div className="site-section-heading">
              <p className="site-kicker">{influence.badge}</p>
              <h2>{influence.title} <span>{influence.highlightedTitle}</span></h2>
              <p className="site-personal-section-lede">{influence.description}</p>
            </div>
            <ol className="site-personal-nodes">
              {influence.nodes.map((item, index) => (
                <li key={item.id || index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.insight}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="case-studies" className="site-page-section site-page-section--muted">
          <div className="site-container">
            <div className="site-section-heading">
              <p className="site-kicker">{caseStudies.badge}</p>
              <h2>{caseStudies.title} <span>{caseStudies.highlightedTitle}</span></h2>
              <p className="site-personal-section-lede">{caseStudies.description}</p>
            </div>
            <div className="site-personal-cases">
              {caseStudies.studies.map((study) => (
                <article key={study.id} className="site-personal-case">
                  <header>
                    {study.avatarUrl && <img src={study.avatarUrl} alt="" loading="lazy" />}
                    <div><h3>{study.clientName}</h3><p>{study.niche}</p></div>
                  </header>
                  <dl>
                    <div><dt>Starting point</dt><dd>{study.before}</dd></div>
                    <div><dt>Approach</dt><dd>{study.strategy}</dd></div>
                    <div><dt>Outcome</dt><dd>{study.results}</dd></div>
                  </dl>
                  <ul className="site-personal-metrics">
                    {study.metrics.map((metric, index) => <li key={`${metric.label}-${index}`}><span>{metric.label}</span><strong>{metric.value}</strong></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="site-page-section">
          <div className="site-container">
            <div className="site-section-heading">
              <p className="site-kicker">{pricing.badge}</p>
              <h2>{pricing.title} <span>{pricing.highlightedTitle}</span></h2>
              <p className="site-personal-section-lede">{pricing.description}</p>
            </div>
            <div className="site-personal-pricing">
              {pricing.models.map((model) => (
                <article key={model.id} className={model.isPopular ? "is-featured" : ""}>
                  {model.isPopular && <p className="site-kicker">Most selected</p>}
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>
                  <strong>{model.price}</strong>
                  <p className="site-personal-pricing__audience">{model.idealFor}</p>
                  <ul>{model.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <Link to="/contact" className={model.isPopular ? "site-button" : "site-button-secondary"}>Discuss this option</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="site-page-cta">
          <div className="site-container site-page-cta__inner">
            <div>
              <p className="site-kicker">Personal branding</p>
              <h2>{cta.title} <span>{cta.highlightedTitle}</span></h2>
              <p className="site-personal-cta-copy">{cta.description}</p>
            </div>
            <Link to="/contact" className="site-button">{cta.buttonText}</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PersonalBranding;
