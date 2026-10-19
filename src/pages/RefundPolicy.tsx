import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { getDb } from "../lib/firebaseLazy";
import { Link } from "react-router-dom";
import SEO from "../components/layout/SEO";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";

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

const RefundPolicy = () => {
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
        title="Refund Policy | Motionly Media" 
        description="Our commitment to fair and transparent billing practices. Read our refund policy for trial packages and retainer clients."
      />
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Link to="/terms" className="site-text-link">
                Terms of Service
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="site-kicker mb-4">Legal</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-none">
              Refund <span className="text-gradient-blue italic">Policy.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              Our commitment to fair and transparent billing practices.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-4">
          <div className="container mx-auto max-w-4xl">
            {loading ? (
              <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading refund policy</span></div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="site-policy-card">
                <FormattedPolicy content={content} />
              </motion.div>
            )}

            {/* Bottom navigation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
              <Link to="/terms" className="site-text-link">
                Terms of Service
              </Link>
              <Link to="/" className="site-button">
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
