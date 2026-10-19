import React, { useState } from "react";
import { type User } from "firebase/auth";
import { getAuth, getGoogleProvider } from "../../lib/firebaseLazy";
import { 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  LogOut, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Home, 
  Loader2 
} from "lucide-react";

interface TeamAuthGateProps {
  user: User | null;
  loading: boolean;
  isWhitelisted: boolean;
  onRefreshAuth: () => void;
  children?: React.ReactNode;
}

export const TeamAuthGate: React.FC<TeamAuthGateProps> = ({
  user,
  loading,
  isWhitelisted,
  onRefreshAuth,
  children
}) => {
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      const auth = await getAuth();
      const provider = await getGoogleProvider();
      const { signInWithPopup } = await import("firebase/auth");
      await signInWithPopup(auth, provider);
      onRefreshAuth();
    } catch (err: any) {
      console.error("Team sign-in error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setAuthError(err.message || "Failed to sign in. Please verify your Google account.");
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = await getAuth();
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      window.location.reload();
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a12] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center animate-pulse">
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl" />
        </div>
        <p className="text-sm font-medium text-slate-400 tracking-wide">
          Verifying Motionly workspace credentials...
        </p>
      </div>
    );
  }

  // State A: Logged in, but NOT Whitelisted
  if (user && !isWhitelisted) {
    return (
      <div className="min-h-screen bg-[#070a12] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg w-full bg-[#0d1322]/90 border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Access Restricted
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            Account Not Authorized
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            The workspace at <span className="text-cyan-400 font-mono font-medium">/team</span> is reserved strictly for internal Motionly team members. Your Google account does not currently have access.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">Currently signed in as</p>
              <p className="text-sm font-semibold text-slate-200 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`mailto:motionlymedia.help@gmail.com?subject=Motionly%20Team%20Workspace%20Access%20Request&body=Hi%20Motionly%20Team%2C%0A%0APlease%20whitelist%20my%20account%20(${user.email})%20for%20the%20team%20workspace.`}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleSignOut}
              type="button"
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700/60"
            >
              <LogOut className="w-4 h-4" /> Switch Account
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Return to Motionly Public Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  // State B: Logged in and Whitelisted -> allow into workspace
  if (user && isWhitelisted) {
    return <>{children}</>;
  }

  // State C: Not signed in at all
  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow flares */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-[#0d1322]/95 border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-2xl text-center">
        {/* Workspace Brand Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wide mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Motionly Internal Workspace
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Team Portal
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          Daily active cuts, collaborative video tasks, review pipelines, and agency project timelines.
        </p>

        {authError && (
          <div className="p-3.5 mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-left flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        {/* Google Sign-in Action */}
        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn}
          type="button"
          className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-xl hover:shadow-cyan-500/10 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {signingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
              Verifying Authorization...
            </>
          ) : (
            <>
              {/* Google G Icon */}
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Sign In with Motionly Account
            </>
          )}
        </button>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 gap-2.5 mt-8 pt-6 border-t border-slate-800/80 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>To Do → Review Pipeline</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Frame.io / Review Links</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Deadline Alerts &amp; Queue</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Team Workload Metrics</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/50">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Whitelist Secured
          </span>
          <a href="/" className="hover:text-slate-300 transition-colors">
            motionly.media
          </a>
        </div>
      </div>
    </div>
  );
};
