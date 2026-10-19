import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { getLegacyAuth } from "../lib/firebase";
import { AdminLayout } from "../components/admin/layout/AdminLayout";
import { BlogManager } from "../components/admin/managers/BlogManager";
import { ReviewManager } from "../components/admin/managers/ReviewManager";
import { PortfolioManager } from "../components/admin/managers/PortfolioManager";
import { TeamManager } from "../components/admin/managers/TeamManager";
import { PricingManager } from "../components/admin/managers/PricingManager";
import { DashboardOverview } from "../components/admin/managers/DashboardOverview";
import { GlobalSettingsManager } from "../components/admin/managers/GlobalSettingsManager";
import { PersonalBrandingManager } from "../components/admin/managers/PersonalBrandingManager";
import { ProcessManager } from "../components/admin/managers/ProcessManager";
import { PartnersManager } from "../components/admin/managers/PartnersManager";

import { HeroManager } from "../components/admin/managers/HeroManager";
import { DifferenceManager } from "../components/admin/managers/DifferenceManager";
import { PainPointsManager } from "../components/admin/managers/PainPointsManager";
import { FAQManager } from "../components/admin/managers/FAQManager";
import { AccessManager } from "../components/admin/managers/AccessManager";

import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ msg, type }: { msg: string; type: "ok" | "err" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-8 right-8 z-[999] px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 ${
      type === "ok" ? "bg-slate-900 text-emerald-400 border border-emerald-500/30" : "bg-red-950 text-red-200 border border-red-500/30"
    }`}
  >
    <span className={`w-2 h-2 rounded-full ${type === "ok" ? "bg-emerald-400" : "bg-red-400"}`} />
    {msg}
  </motion.div>
);

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { signInWithPopup } = await import("firebase/auth");
      const { auth, googleProvider } = await getLegacyAuth();
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/60 to-slate-950 pointer-events-none" />
      <section className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="text-xl font-black text-white tracking-tight">Motionly <span className="text-blue-400 font-medium text-sm">Studio</span></span>
        </Link>
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/40 mb-3">
          Admin Workspace
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Sign in to Motionly Studio</h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Use an authorized Google account to manage website content, media, invoices, and operations.
        </p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          )}
          <span>{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>
      </section>
    </main>
  );
};

const Admin = () => {
  const { user, loading, role } = useAuth();
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading admin workspace...</p>
      </main>
    );
  }

  if (!user) return <AdminLogin />;

  const handleSignOut = async () => {
    const { auth } = await getLegacyAuth();
    await auth.signOut();
  };

  // If no role was assigned (meaning they aren't even a Viewer)
  if (!role) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <section className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            Access Control
          </span>
          <h1 className="text-2xl font-bold text-white">Access is not available</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            This account does not have permission to open the admin workspace. Contact the studio owner to request access.
          </p>
          <button 
            type="button" 
            onClick={handleSignOut} 
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors"
          >
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <>
      <AdminLayout onSignOut={handleSignOut}>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/hero" element={<HeroManager notify={showToast} />} />
          <Route path="/difference" element={<DifferenceManager notify={showToast} />} />
          <Route path="/pain-points" element={<PainPointsManager notify={showToast} />} />
          <Route path="/faqs" element={<FAQManager notify={showToast} />} />
          <Route path="/blogs" element={<BlogManager notify={showToast} />} />
          <Route path="/media" element={<div className="text-2xl font-black">Media Library (Coming Soon)</div>} />
          <Route path="/portfolio" element={<PortfolioManager notify={showToast} />} />
          <Route path="/reviews" element={<ReviewManager notify={showToast} />} />
          <Route path="/team" element={<TeamManager notify={showToast} />} />
          <Route path="/pricing" element={<PricingManager notify={showToast} />} />
          <Route path="/personal-branding" element={<PersonalBrandingManager notify={showToast} />} />
          <Route path="/process" element={<ProcessManager notify={showToast} />} />
          <Route path="/partners" element={<PartnersManager notify={showToast} />} />
          <Route path="/settings" element={<GlobalSettingsManager notify={showToast} />} />

          {/* Legacy Finance Routes -> Redirect cleanly to Team Finance Workspace */}
          <Route path="/invoices/*" element={<Navigate to="/team/finance/invoices" replace />} />
          <Route path="/invoices" element={<Navigate to="/team/finance/invoices" replace />} />
          <Route path="/finance/*" element={<Navigate to="/team/finance" replace />} />
          <Route path="/finance" element={<Navigate to="/team/finance" replace />} />

          {/* Access & Audit Management */}
          <Route path="/access" element={<AccessManager notify={showToast} currentAdminEmail={user?.email || "Admin"} />} />

          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </>
  );
};

export default Admin;
