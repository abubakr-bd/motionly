import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { getDb } from "../lib/firebaseLazy";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/layout/SEO";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";
import { ArrowLeft, Shield, FileText, RotateCcw, ArrowUpRight } from "lucide-react";

const DEFAULT_CONTENT = `Last Updated: April 2026

1. Trial Packages
Once work has commenced and the assets are delivered, trial edits are non-refundable due to the custom nature of creative production.

2. Retainer Clients
Once a billing cycle has initiated and capacity has been allocated, refunds cannot be granted for that month. You may cancel future renewals at any time.

3. Exceptions
If we fail to deliver within the agreed timeline with no valid reason, a partial or full refund may be considered at our discretion on a case-by-case basis.

4. Revision Disputes
If you are unhappy with the quality of delivery, we encourage you to first request revisions. Refunds will only be considered after revision opportunities have been fully exhausted.

5. Cancellation Policy
You may cancel your retainer at any time. Cancellation takes effect at the end of the current billing cycle. No prorated refunds are issued for partial months.

6. Dispute Resolution
All disputes should first be raised via email at hello@motionly.media. We aim to resolve all issues fairly within 72 business hours.

7. Chargebacks
Initiating a chargeback without first contacting us is a violation of these terms and may result in permanent suspension of services.

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

const RefundPolicy: React.FC = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDb().then(async (db) => {
      const { doc, getDoc } = await import("firebase/firestore");
      getDoc(doc(db, "settings", "legal")).then(snap => {
        if (snap.exists() && snap.data().refund) setContent(snap.data().refund);
        setLoading(false);
      }).catch(() => setLoading(false));
    });
  }, []);

  return (
    <Layout>
      <SEO 
        title="Refund Policy | Motionly Media Studio" 
        description="Our commitment to fair, transparent billing and revision policies for video production sprints and ongoing retainers."
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
            Refund <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">Policy.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            Our commitment to clear sprint deliverables, unlimited revisions within scope, and fair retainer cancellations.
          </p>
        </header>

        {/* Content Container */}
        <section className="container mx-auto max-w-4xl px-4 sm:px-6">
          <LegalTabs />

          <div className="p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3" role="status">
                <div className="w-7 h-7 rounded-full border-2 border-[#2563EB] dark:border-[#38BDF8] border-t-transparent animate-spin" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Loading Refund Policy...</span>
              </div>
            ) : (
              <FormattedPolicy content={content} />
            )}
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-slate-500">
            <span>Motionly Media LLC &bull; Satisfaction &amp; Revision Principles</span>
            <Link to="/contact" className="text-[#2563EB] dark:text-[#38BDF8] hover:underline flex items-center gap-1 font-sans font-semibold text-xs">
              <span>Billing or invoicing questions? Contact our desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
