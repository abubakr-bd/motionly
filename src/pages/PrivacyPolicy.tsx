import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { getDb } from "../lib/firebaseLazy";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/layout/SEO";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";
import { ArrowLeft, Shield, FileText, RotateCcw, ArrowUpRight } from "lucide-react";

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

const LegalTabs: React.FC = () => {
  const location = useLocation();
  const tabs = [
    { label: "Privacy Policy", path: "/privacy", icon: Shield },
    { label: "Terms of Service", path: "/terms", icon: FileText },
    { label: "Refund Policy", path: "/refund", icon: RotateCcw },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              active
                ? "bg-[#111827] text-white dark:bg-white dark:text-[#07080d] shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

const PrivacyPolicy: React.FC = () => {
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
        title="Privacy Policy | Motionly Media Studio" 
        description="Learn how Motionly Media collects, uses, and safeguards your data. We are committed to protecting your creative materials and personal privacy."
      />
      <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] transition-colors duration-200 pt-28 sm:pt-36 pb-24">
        {/* Hero Header */}
        <header className="container mx-auto max-w-4xl px-4 sm:px-6 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Studio Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <span>Motionly Studio Legal Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight mb-4 leading-tight">
            Privacy <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">Policy.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            How Motionly Media safeguards your private project assets, business details, and personal data.
          </p>
        </header>

        {/* Content Container */}
        <section className="container mx-auto max-w-4xl px-4 sm:px-6">
          <LegalTabs />

          <div className="p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3" role="status">
                <div className="w-7 h-7 rounded-full border-2 border-[#2563EB] dark:border-[#38BDF8] border-t-transparent animate-spin" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Loading Privacy Policy...</span>
              </div>
            ) : (
              <FormattedPolicy content={content} />
            )}
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-slate-500">
            <span>Motionly Media LLC &bull; Confidential &amp; Protected</span>
            <Link to="/contact" className="text-[#2563EB] dark:text-[#38BDF8] hover:underline flex items-center gap-1 font-sans font-semibold text-xs">
              <span>Have a question? Contact Legal Team</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
