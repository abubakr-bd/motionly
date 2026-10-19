import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { getDb } from "../lib/firebaseLazy";
import { Link } from "react-router-dom";
import SEO from "../components/layout/SEO";
import { FormattedPolicy } from "../components/legal/FormattedPolicy";

const DEFAULT_CONTENT = `Last Updated: April 2026

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

6. Confidentiality
We treat all client materials, strategies, and communications as strictly confidential. We do not disclose client information to third parties without explicit permission.

7. Limitation of Liability
Motionly Media shall not be held liable for indirect, incidental, or consequential damages arising from the use of our services beyond the amount paid for the specific service.

8. Governing Law
These terms are governed by applicable international business law. Disputes will first be attempted to be resolved through good-faith negotiation.

Contact Us
Email: hello@motionly.media
Website: https://motionly.media`;

const TermsOfService = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDb().then(async (db) => {
      const { doc, getDoc } = await import("firebase/firestore");
      getDoc(doc(db, "settings", "legal")).then(snap => {
        if (snap.exists() && snap.data().terms) setContent(snap.data().terms);
        setLoading(false);
      }).catch(() => setLoading(false));
    });
  }, []);

  return (
    <Layout>
      <SEO 
        title="Terms of Service | Motionly Media" 
        description="The rules and guidelines governing your use of Motionly Media services. By accessing our website, you agree to comply with these terms."
      />
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Link to="/privacy" className="site-text-link">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="site-kicker mb-4">Legal</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-none">
              Terms of <span className="text-gradient-blue italic">Service.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              The rules and guidelines governing your use of our services.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-4">
          <div className="container mx-auto max-w-4xl">
            {loading ? (
              <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading terms</span></div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="site-policy-card">
                <FormattedPolicy content={content} />
              </motion.div>
            )}

            {/* Bottom navigation between policy pages */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
              <Link to="/privacy" className="site-text-link">
                Privacy Policy
              </Link>
              <Link to="/refund" className="site-button-secondary">
                Refund Policy
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TermsOfService;
