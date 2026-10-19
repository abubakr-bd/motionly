import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { getDb } from "../lib/firebaseLazy";
import { Link } from "react-router-dom";
import SEO from "../components/layout/SEO";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";

const DEFAULT_CONTENT = `Welcome to Motionly Media.

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
You have the right to request access to your data, ask for correction or deletion, and withdraw consent. To do so, contact us at:
Email: hello@motionly.media

Data Retention
We keep your data only as long as necessary for service delivery or legal/business purposes.

Changes to This Policy
We may update this Privacy Policy at any time. Changes will be posted on this page.

Contact Us
Email: hello@motionly.media
Website: https://motionly.media`;

const PrivacyPolicy = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDb().then(async (db) => {
      const { doc, getDoc } = await import("firebase/firestore");
      getDoc(doc(db, "settings", "legal")).then(snap => {
        if (snap.exists() && snap.data().privacy) setContent(snap.data().privacy);
        setLoading(false);
      }).catch(() => setLoading(false));
    });
  }, []);

  return (
    <Layout>
      <SEO 
        title="Privacy Policy | Motionly Media" 
        description="Learn how Motionly Media collects, uses, and safeguards your data. We are committed to protecting your privacy."
      />
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Link to="/" className="site-text-link">
                Back to Home
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="site-kicker mb-4">Legal</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-none">
              Privacy <span className="text-gradient-blue italic">Policy.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              How we collect, use, and protect your personal information.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-4">
          <div className="container mx-auto max-w-4xl">
            {loading ? (
              <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading policy</span></div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="site-policy-card">
                <FormattedPolicy content={content} />
              </motion.div>
            )}

            {/* Bottom navigation between policy pages */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
              <div />
              <Link to="/terms" className="site-button-secondary">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
