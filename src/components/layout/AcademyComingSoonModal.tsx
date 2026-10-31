import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Film, Sparkles, Send, Bell, ArrowRight } from "lucide-react";

interface AcademyComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademyComingSoonModal: React.FC<AcademyComingSoonModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return typeof window !== "undefined" && Boolean(localStorage.getItem("motionly_academy_waitlist"));
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      try {
        localStorage.setItem("motionly_academy_waitlist", email);
      } catch {
        // Ignore localStorage quota errors
      }
    }, 600);
  };

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop covering whole screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]"
            aria-hidden="true"
          />

          {/* Modal Container Centered on Main Screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#202020] rounded-[28px] sm:rounded-[36px] border border-[#E7E2DA] shadow-2xl overflow-hidden z-[10000] max-h-[90vh] my-auto flex flex-col font-sans"
            role="dialog"
            aria-modal="true"
            aria-labelledby="academy-modal-title"
          >
            {/* Top Multi-color Rainbow Stripe (Signature Academy detail) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-500 via-cyan-400 to-[#F47B35] shrink-0" />

            {/* Modal Header */}
            <div className="px-5 sm:px-7 pt-5 pb-4 flex items-center justify-between border-b border-[#E7E2DA] shrink-0 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <img
                  src="/academy-logo.png"
                  alt="Motionly Academy"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>

              {/* Status Pill & Close */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EA] border border-[#F47B35]/30 text-[#F47B35] text-[11px] font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#F47B35] animate-pulse" />
                  <span>COMING SOON</span>
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#F2EDE6] hover:bg-[#E8E1D5] text-[#202020] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B35] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="px-5 sm:px-8 py-6 overflow-y-auto space-y-6">
              
              {/* Hero Section of Popup */}
              <div className="space-y-3 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F2EDE6] text-xs font-bold text-[#202020]">
                  <span className="text-[#3B82F6]">✳</span>
                  <span>Learn Skills. Build Real Capabilities.</span>
                  <span className="text-[#F47B35]">✦</span>
                </div>

                <h2
                  id="academy-modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202020] tracking-tight leading-tight"
                >
                  Practical Learning for Serious Creators &amp; Editors
                </h2>

                <p className="text-xs sm:text-sm text-[#505050] leading-relaxed">
                  <strong className="text-[#202020]">Motionly Academy</strong> is the practical learning division of Motionly Media. We are not another platform selling unrealistic earning dreams. We train capable video editors, video marketers, and digital professionals through real agency raw footage, client briefs, and direct 1-on-1 feedback.
                </p>
              </div>

              {/* Visual Preview / Sneak Peek Grid */}
              <div className="rounded-2xl bg-[#F2EDE6] p-4 sm:p-5 border border-[#E7E2DA] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#858585]">
                    Sneak Peek • The 3-Pillar Framework
                  </span>
                  <span className="text-[11px] font-bold text-[#F47B35]">
                    Batch 01 Preparing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Pillar 1 */}
                  <div className="bg-white rounded-xl p-3.5 border border-[#E7E2DA] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#202020] bg-[#F2EDE6] px-2 py-0.5 rounded">
                        01
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#202020]">
                        Learn
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#202020]">Structured Lessons</div>
                    <p className="text-[11px] text-[#606060] leading-normal">
                      Concentrated 8–20 min masterclasses on pacing, rhythm, DaVinci CST, and Runway AI.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="bg-white rounded-xl p-3.5 border border-[#E7E2DA] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white bg-[#F47B35] px-2 py-0.5 rounded">
                        02
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#F47B35]">
                        Practice
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#202020]">Real 4K Raw Briefs</div>
                    <p className="text-[11px] text-[#606060] leading-normal">
                      Multi-cam Sony FX3 footage and client audio stems from active agency archives.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="bg-white rounded-xl p-3.5 border border-[#E7E2DA] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white bg-[#202020] px-2 py-0.5 rounded">
                        03
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#202020]">
                        Improve
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#202020]">1-on-1 Feedback</div>
                    <p className="text-[11px] text-[#606060] leading-normal">
                      Timestamped critique from senior editors on your timeline cuts, sound, and retention.
                    </p>
                  </div>
                </div>

                {/* Initial Tracks Sneak Peek */}
                <div className="pt-2 border-t border-[#E7E2DA] flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#505050]">
                  <span className="text-[#202020] font-bold">Upcoming Tracks:</span>
                  <span className="bg-white px-2.5 py-1 rounded-full border border-[#E7E2DA]">🎬 Commercial Video Editing</span>
                  <span className="bg-white px-2.5 py-1 rounded-full border border-[#E7E2DA]">📈 Video Marketing Funnels</span>
                  <span className="bg-white px-2.5 py-1 rounded-full border border-[#E7E2DA]">⚡ AI Creative Workflows</span>
                </div>
              </div>

              {/* Priority Waitlist Form (No link yet as instructed!) */}
              <div className="rounded-2xl bg-white p-5 border border-[#E7E2DA] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#202020] flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#F47B35]" />
                      <span>Join the Cohort 01 Early Access List</span>
                    </h3>
                    <p className="text-xs text-[#606060] mt-0.5">
                      Cohort size will be strictly limited to ensure personal mentor feedback for every student.
                    </p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You’re on the priority list! We’ll notify you first when private enrollment opens.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for early syllabus access..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs text-[#202020] placeholder-[#858585] focus:outline-none focus:border-[#F47B35]"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#F47B35] hover:bg-[#e06622] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm shrink-0 disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <span>Saving...</span>
                      ) : (
                        <>
                          <span>Notify Me First</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Notice that public link is not ready yet */}
              <div className="flex items-center justify-between text-[11px] text-[#858585] pt-1">
                <span>Motionly Media Learning Division</span>
                <span className="font-mono text-[10px]">Private Beta • Launching Soon</span>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="px-5 sm:px-7 py-3.5 bg-[#F2EDE6] border-t border-[#E7E2DA] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#606060] font-medium hidden sm:inline">
                Zero spam • Only relevant curriculum and launch announcements
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto ml-auto px-5 py-2 rounded-full bg-[#202020] hover:bg-[#333333] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AcademyComingSoonModal;