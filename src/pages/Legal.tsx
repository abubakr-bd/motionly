import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { getDb } from "../lib/firebaseLazy";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";

const DEFAULT_PRIVACY = `Our Privacy Policy

Welcome to Motionly Media.

We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or work with us.

Last Updated on April, 6, 2026

Information We Collect
We may collect the following types of information:

Personal Information
- Name
- Email address
- Phone number
- Business details
- Any information you provide through forms or communication

Usage Data
- IP address
- Browser type
- Pages visited
- Time spent on our website

Client Project Data
- Video files
- Scripts
- Brand assets
- Business information shared for project execution

How We Use Your Information
We use your data to:
- Communicate with you
- Deliver our video marketing services
- Improve our website and services
- Send updates, offers, or important notices
- Analyze performance and optimize user experience

Client Content & Confidentiality
All client materials including Videos, Scripts, Assets, and Business strategies are treated as strictly confidential. We do not share, sell, or distribute client data without permission.

Sharing of Information
We do not sell your personal data. We may only share information with trusted tools/services (Google Drive, communication tools, etc.) or legal authorities if required by law.

Data Security
We take appropriate measures to protect your data, including secure storage systems, restricted access, and use of trusted platforms. However, no system is 100% secure.

Cookies & Tracking
Our website may use cookies to improve user experience and analyze website performance. You can disable cookies through your browser settings.

Third-Party Services
We may use third-party tools such as analytics tools, communication platforms, and payment processors. These services have their own privacy policies.

Your Rights
You have the right to request access to your data, ask for correction or deletion, and withdraw consent. To do so, contact us at: hello@motionly.media

Data Retention
We keep your data only as long as necessary for service delivery or legal/business purposes.

Changes to This Policy
We may update this Privacy Policy at any time. Changes will be posted on this page.

Contact Us
Email: hello@motionly.media
Website: https://motionly.media`;

const DEFAULT_TERMS = `Terms of Service

Last Updated: April 2026

1. Acceptance of Terms
By accessing our website and engaging our services, you agree to comply with these terms, encompassing any operational rules or guidelines published across the site.

2. Service Availability
We reserve the right to modify, pause, or discontinue our specific editing packages or retainers at any moment without prior notice.

3. Intellectual Property
You retain full rights to your raw footage. Motionly Media retains the right to display the final delivered product in our portfolio unless an NDA is explicitly signed.

4. Payment & Billing
All payments must be made in advance before project commencement. We accept international transfers and major payment processors.

5. Revisions
Unlimited revisions are included within the agreed scope. Out-of-scope changes may incur additional fees.

Contact: hello@motionly.media`;

const DEFAULT_REFUND = `Refund Policy

Last Updated: April 2026

1. Trial Packages
Once work has commenced and the assets are delivered, trial edits are non-refundable due to the custom nature of creative production.

2. Retainer Clients
Once a billing cycle has initiated and capacity has been allocated, refunds cannot be granted for that month. You may cancel future renewals at any time.

3. Exceptions
If we fail to deliver within the agreed timeline with no valid reason, a partial or full refund may be considered at our discretion.

4. Dispute Resolution
All disputes should first be raised via email at hello@motionly.media. We aim to resolve all issues within 72 hours.`;

const Legal = () => {
  const { hash } = useLocation();
  const [content, setContent] = useState({ privacy: DEFAULT_PRIVACY, terms: DEFAULT_TERMS, refund: DEFAULT_REFUND });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLegal = async () => {
      try {
        const db = await getDb();
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, "settings", "legal"));
        if (snap.exists()) {
          const data = snap.data();
          setContent({
            privacy: data.privacy || DEFAULT_PRIVACY,
            terms: data.terms || DEFAULT_TERMS,
            refund: data.refund || DEFAULT_REFUND,
          });
        }
      } catch (err) {
        console.error("Error fetching legal content:", err);
      }
      setLoading(false);
    };
    fetchLegal();
  }, []);

  useEffect(() => {
    if (hash && !loading) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash, loading]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="bg-slate-50/50">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4 block"
            >
              Transparency
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black text-slate-900 mb-8"
            >
              Legal <span className="text-gradient-blue italic">Information.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Everything you need to know about our data policies and service terms.
            </motion.p>
          </div>
        </section>

        <section className="pb-32 px-4">
          <div className="container mx-auto max-w-4xl">

            {/* Nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {[
                { id: 'privacy', label: 'Privacy Policy' },
                { id: 'terms', label: 'Terms of Service' },
                { id: 'refund', label: 'Refund Policy' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="site-button-secondary"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>

            {loading ? (
              <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading legal information</span></div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="site-policy-card"
              >
                {/* Privacy */}
                <div id="privacy" className="mb-20">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Privacy Policy</h2>
                  <FormattedPolicy content={content.privacy} />
                </div>

                <div className="h-px bg-slate-100 w-full mb-20" />

                {/* Terms */}
                <div id="terms" className="mb-20">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Terms of Service</h2>
                  <FormattedPolicy content={content.terms} />
                </div>

                <div className="h-px bg-slate-100 w-full mb-20" />

                {/* Refund */}
                <div id="refund">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Refund Policy</h2>
                  <FormattedPolicy content={content.refund} />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Legal;
