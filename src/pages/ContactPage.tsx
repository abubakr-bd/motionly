import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";

const ContactPage = () => {
  const { settings } = useSiteSettings();
  const contact = settings.contact;

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const socials = [
    { label: "Instagram", href: contact.instagram },
    { label: "Facebook", href: contact.facebook },
    { label: "LinkedIn", href: contact.linkedin },
  ].filter((item) => Boolean(item.href));

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://motionly.media/contact" },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact Motionly Media",
        description: "Book a video strategy call with Motionly Media.",
        url: "https://motionly.media/contact",
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Contact Motionly Media | Book a Discovery Call"
        description="Ready to elevate your video content? Book a discovery call with Motionly Media to discuss video editing, channel strategy, and high-retention production."
        url="https://motionly.media/contact"
        schema={contactSchema}
      />

      <section className="site-page-hero site-contact-hero">
        <div className="site-container site-contact-hero__grid">
          <div className="site-page-hero__copy">
            <p className="site-kicker">Get in Touch with Motionly Media</p>
            <h1>Contact Motionly Media | Book a Discovery Call</h1>
            <p className="site-page-hero__lede">
              Let's talk about what comes next. Share your goals, the work you are making, and where you want it to go. We will use the first conversation to see if our team is the right fit.
            </p>
          </div>

          <motion.aside
            className="site-contact-details"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="site-kicker">Direct contact</p>
            <h2>Prefer to write?</h2>
            <a className="site-contact-details__email" href={`mailto:${contact.email}`}>{contact.email}</a>
            {socials.length > 0 && (
              <div className="site-contact-details__socials" aria-label="Social media links">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
                ))}
              </div>
            )}
            <p className="site-contact-details__note">Strategy calls are 30 minutes and have no obligation.</p>
          </motion.aside>
        </div>
      </section>

      <section className="site-page-section site-contact-booking">
        <div className="site-container">
          <div className="site-section-heading site-section-heading--split">
            <div>
              <p className="site-kicker">Start here</p>
              <h2>Book a strategy call.</h2>
            </div>
            <p>Choose a time that works for you. We will talk through your goals and recommend a practical next step.</p>
          </div>
          <div className="site-calendly-frame">
            {contact.calendlyUrl ? (
              <div
                className="calendly-inline-widget"
                data-url={contact.calendlyUrl}
                style={{ minWidth: "280px", height: "680px" }}
                role="region"
                aria-label="Schedule a strategy call"
              />
            ) : (
              <div className="site-calendly-fallback">
                <p>Online booking is temporarily unavailable.</p>
                <a className="site-button" href={`mailto:${contact.email}`}>Email the team</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
