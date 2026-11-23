import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Check,
  CheckCircle2,
  PenTool,
  Scissors,
  Camera,
  Volume2,
  MessageSquare,
  Send,
  Sparkles,
  ArrowRight,
  Layers,
  Film,
  Video,
  Mic,
  Sliders,
  Tv
} from "lucide-react";

interface ToolItem {
  name: string;
  badge?: string;
  color?: string;
  icon?: React.ReactNode;
}

const ToolPill: React.FC<{ tools: ToolItem[] }> = ({ tools }) => {
  return (
    <div className="flex items-center gap-1.5 flex-wrap pt-3 mt-3 border-t border-black/[0.05] dark:border-white/[0.06]">
      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-sky-50 dark:bg-sky-950/40 text-[#2563eb] dark:text-[#38bdf8] border border-sky-200/60 dark:border-sky-500/20 font-semibold mr-1">
        Tool stack
      </span>
      {tools.map((t, idx) => (
        <span
          key={idx}
          title={t.name}
          className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform cursor-default"
        >
          {t.badge ? (
            <span style={{ color: t.color }}>{t.badge}</span>
          ) : (
            t.icon || <span>{t.name.charAt(0)}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export const StudioProcess: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section 
      id="process" 
      className="py-24 sm:py-32 bg-[#f8fafc] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200 relative overflow-hidden"
    >
      {/* Background ambient grid accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.07]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER (MATCHING THE REFERENCE'S EDITORIAL TYPOGRAPHY)
        ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2563eb] dark:text-[#38bdf8] mb-3.5">
            <span>Our workflow</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            From your brief <br />
            <span className="font-serif italic font-normal text-[#2563eb] dark:text-[#38bdf8]">
              to the final cut
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal max-w-xl mx-auto">
            Every project follows the same clear steps. Our team plans, writes, shoots, and edits, using AI and pro tools to move faster.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP INTERACTIVE NODE FLOWCHART (lg:block)
        ========================================================================= */}
        <div className="hidden lg:block relative max-w-4xl mx-auto">
          
          {/* ----------------- STEP 01: BRIEF FROM BRAND ----------------- */}
          <div className="flex justify-center mb-10">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("01")}
              onMouseLeave={() => setHoveredNode(null)}
              className="inline-flex items-center justify-between gap-6 px-4 py-2.5 rounded-full bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-[#2563eb]/60 dark:hover:border-[#38bdf8]/60 transition-all z-10"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                  01
                </span>
                <span className="text-xs font-semibold text-[#111827] dark:text-[#eef0f5]">
                  Brief from your brand
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#6b7487] dark:text-[#7a8296] bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-0.5 rounded-full">
                Day 1
              </span>
            </motion.div>
          </div>

          {/* Vertical Stem 1 -> 2 */}
          <div className="flex justify-center -mt-10 mb-0">
            <svg width="4" height="48" viewBox="0 0 4 48" fill="none">
              <line x1="2" y1="0" x2="2" y2="48" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
            </svg>
          </div>

          {/* ----------------- STEP 02 & STEP 03: CONTENT PLAN + PLAN TO CLIENT ----------------- */}
          <div className="relative flex items-center justify-center gap-6 mb-8">
            {/* Step 02: Content Plan Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("02")}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-[360px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8] block mb-1">
                02 &bull; Content Plan
              </span>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                What to make, and how much
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                The content your brand and marketing needs.
              </p>
              <ToolPill
                tools={[
                  { name: "Notion", badge: "N", color: "#111827" },
                  { name: "Miro", badge: "M", color: "#f59e0b" },
                  { name: "Figma", badge: "Fg", color: "#a855f7" },
                ]}
              />
            </motion.div>

            {/* Connecting Horizontal Line to Step 03 */}
            <div className="flex items-center">
              <svg width="40" height="4" viewBox="0 0 40 4" fill="none">
                <line x1="0" y1="2" x2="40" y2="2" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
              </svg>
            </div>

            {/* Step 03: Plan to Client (Side Pill Card) */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("03")}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-[240px] p-4 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
            >
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8] block mb-1">
                03 &bull; Plan to Client
              </span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/40 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#111827] dark:text-[#eef0f5]">
                  Formats, volume &amp; timeline
                </span>
              </div>
            </motion.div>
          </div>

          {/* Vertical Stem with Step 04 Approval Pill */}
          <div className="flex flex-col items-center -my-2 mb-6">
            <svg width="4" height="24" viewBox="0 0 4 24" fill="none">
              <line x1="2" y1="0" x2="2" y2="24" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
            </svg>
            
            {/* Step 04 Approval Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium my-1 z-10 shadow-xs"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>04 &bull; You approve the plan</span>
            </motion.div>

            <svg width="4" height="24" viewBox="0 0 4 24" fill="none">
              <line x1="2" y1="0" x2="2" y2="24" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
            </svg>
          </div>

          {/* ----------------- STEP 05: SCRIPTING ----------------- */}
          <div className="flex justify-center mb-10">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("05")}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-[380px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8]">
                  05 &bull; Scripting
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                Hooks, scripts and shot lists
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                Our writers craft the narrative flow with a human touch and audience retention hooks.
              </p>
              <ToolPill
                tools={[
                  { name: "Google Docs", badge: "Docs", color: "#2563eb" },
                  { name: "ChatGPT / Claude", badge: "AI", color: "#10b981" },
                  { name: "Notion", badge: "N", color: "#6b7280" },
                ]}
              />
            </motion.div>
          </div>

          {/* Branching SVG from 05 to 06 (Left) and 07 (Right) */}
          <div className="flex justify-center -mt-10 mb-2">
            <svg width="480" height="48" viewBox="0 0 480 48" fill="none">
              {/* Center vertical down to fork */}
              <line x1="240" y1="0" x2="240" y2="16" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              {/* Horizontal bridge */}
              <path d="M 120 48 L 120 28 Q 120 16 136 16 L 344 16 Q 360 16 360 28 L 360 48" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.8" />
            </svg>
          </div>

          {/* ----------------- STEP 06 & STEP 07: PRODUCTION OPTIONS + EDITING ----------------- */}
          <div className="grid grid-cols-2 gap-12 items-start mb-6">
            
            {/* LEFT COLUMN: STEP 06 (OVERLAPPING PRODUCTION CARDS) */}
            <div className="relative pt-4">
              {/* Background Card: 06 • Digital / 3D Shoot */}
              <div className="absolute top-0 left-3 w-[330px] p-5 rounded-2xl bg-slate-100 dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.06] shadow-sm transform -rotate-2 select-none opacity-80 pointer-events-none text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  06 &bull; OR A DIGITAL 3D SHOOT
                </span>
                <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  3D Motion &amp; UI Capture
                </h4>
                <p className="text-[11px] text-slate-500">
                  No physical studio set needed
                </p>
              </div>

              {/* Foreground Card: 06 • Physical Shoot */}
              <motion.div
                whileHover={{ y: -4, rotate: 0 }}
                initial={{ rotate: 1 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredNode("06")}
                onMouseLeave={() => setHoveredNode(null)}
                className="relative w-[340px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left mt-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8]">
                    06 &bull; Physical Shoot
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                  Our crew on set
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                  Cameras, professional lighting packages, and clean directional sound.
                </p>
                <ToolPill
                  tools={[
                    { name: "Sony FX6 / RED", badge: "FX6", color: "#2563eb" },
                    { name: "Aputure Lights", badge: "Lux", color: "#f59e0b" },
                    { name: "Rode / Sennheiser", badge: "Mic", color: "#10b981" },
                  ]}
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: STEP 07 (EDITING & MOTION) */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredNode("07")}
                onMouseLeave={() => setHoveredNode(null)}
                className="w-[360px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8]">
                    07 &bull; Editing
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                  Cut, motion and visual effects
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                  Pacing, 2D/3D kinetic animation, DaVinci color grading, and finish.
                </p>
                <ToolPill
                  tools={[
                    { name: "Premiere Pro", badge: "Pr", color: "#9999ff" },
                    { name: "After Effects", badge: "Ae", color: "#d291ff" },
                    { name: "DaVinci Resolve", badge: "Dv", color: "#f97316" },
                    { name: "Cinema 4D", badge: "C4D", color: "#06b6d4" },
                  ]}
                />
              </motion.div>

              {/* Vertical connector down to 08 */}
              <svg width="4" height="40" viewBox="0 0 4 40" fill="none" className="my-1">
                <line x1="2" y1="0" x2="2" y2="40" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
              </svg>

              {/* STEP 08: SOUND & SFX */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredNode("08")}
                onMouseLeave={() => setHoveredNode(null)}
                className="w-[360px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8]">
                    08 &bull; Sound &amp; SFX
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                  Sound design, voice and music
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                  Foley effects, vocal noise suppression, and licensed commercial audio.
                </p>
                <ToolPill
                  tools={[
                    { name: "Audition", badge: "Au", color: "#14b8a6" },
                    { name: "Soundly", badge: "Snd", color: "#6366f1" },
                    { name: "Epidemic Sound", badge: "Ep", color: "#ec4899" },
                  ]}
                />
              </motion.div>
            </div>
          </div>

          {/* S-Curved Connector line linking 08 (Right) to 09 (Left) */}
          <div className="relative flex justify-center -my-2 mb-2">
            <svg width="600" height="60" viewBox="0 0 600 60" fill="none">
              <path
                d="M 480 0 L 480 20 Q 480 34 466 34 L 180 34 Q 166 34 166 48 L 166 60"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* ----------------- STEP 09: FEEDBACK & REVISION (Left) ----------------- */}
          <div className="flex justify-start pl-8 mb-4">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("09")}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-[360px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#38bdf8]">
                  09 &bull; Feedback
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                Your notes, right on the video
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                Comment directly on any frame with timestamped collaborative Frame.io reviews.
              </p>
              <ToolPill
                tools={[
                  { name: "Frame.io", badge: "Fio", color: "#a855f7" },
                  { name: "Slack", badge: "Slk", color: "#e11d48" },
                ]}
              />
            </motion.div>
          </div>

          {/* Curved Connector line down from 09 to 10 */}
          <div className="flex justify-center -my-2 mb-2">
            <svg width="400" height="48" viewBox="0 0 400 48" fill="none">
              <path
                d="M 166 0 L 166 16 Q 166 28 178 28 L 222 28 Q 234 28 234 40 L 234 48"
                stroke="#38bdf8"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* ----------------- STEP 10: DELIVERY (Center) ----------------- */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredNode("10")}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-[380px] p-6 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:border-[#2563eb]/50 dark:hover:border-[#38bdf8]/50 transition-all z-10 text-left ring-1 ring-[#2563eb]/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  10 &bull; Delivery
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5] mb-1">
                Final files, delivered
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                4K master exports, vertical cuts, and source project archives uploaded to Google Drive.
              </p>
              <ToolPill
                tools={[
                  { name: "Google Drive", badge: "Drv", color: "#10b981" },
                  { name: "ProRes 422 HQ", badge: "HQ", color: "#2563eb" },
                  { name: "Dropbox Backup", badge: "Db", color: "#0284c7" },
                ]}
              />
            </motion.div>
          </div>

        </div>

        {/* =========================================================================
            MOBILE & TABLET CLEAN TIMELINE (block lg:hidden)
        ========================================================================= */}
        <div className="block lg:hidden relative pl-6 border-l-2 border-sky-400/40 dark:border-sky-500/30 ml-4 space-y-6">
          
          {/* Step 01 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold">
                  01 &bull; KICKOFF
                </span>
                <span className="text-[10px] font-mono text-slate-500">Day 1</span>
              </div>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                Brief from your brand
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                Initial alignment on goals, audience, and creative expectations.
              </p>
            </div>
          </div>

          {/* Step 02 & 03 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-3">
              <div>
                <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold block mb-1">
                  02 &bull; CONTENT PLAN
                </span>
                <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                  What to make, and how much
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                  The content your marketing needs. Formats, volume, and timeline defined.
                </p>
                <ToolPill
                  tools={[
                    { name: "Notion", badge: "N", color: "#111827" },
                    { name: "Miro", badge: "M", color: "#f59e0b" },
                    { name: "Figma", badge: "Fg", color: "#a855f7" },
                  ]}
                />
              </div>

              {/* Approval badge */}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>04 &bull; You approve the plan</span>
              </div>
            </div>
          </div>

          {/* Step 05 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold block mb-1">
                05 &bull; SCRIPTING &amp; STORYBOARD
              </span>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                Hooks, scripts and shot lists
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                Our writers add the human touch, retention hooks, and visual timing beats.
              </p>
              <ToolPill
                tools={[
                  { name: "Google Docs", badge: "Docs", color: "#2563eb" },
                  { name: "Claude", badge: "AI", color: "#10b981" },
                  { name: "Notion", badge: "N", color: "#6b7280" },
                ]}
              />
            </div>
          </div>

          {/* Step 06 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold block mb-1">
                06 &bull; PRODUCTION / SHOOT
              </span>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                Our crew on set (or digital 3D/UI capture)
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                High-end cinema cameras, pro lighting, clean audio, or high-fidelity 60fps UI motion capture.
              </p>
              <ToolPill
                tools={[
                  { name: "Sony FX6", badge: "FX6", color: "#2563eb" },
                  { name: "Aputure", badge: "Lux", color: "#f59e0b" },
                  { name: "Sennheiser", badge: "Mic", color: "#10b981" },
                ]}
              />
            </div>
          </div>

          {/* Step 07 & 08 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-3">
              <div>
                <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold block mb-1">
                  07 &bull; EDITING &amp; 08 &bull; SOUND
                </span>
                <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                  Cut, motion, sound design and color
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                  Pacing, kinetic typography, DaVinci Resolve color suites, sound effects, and voice mixing.
                </p>
                <ToolPill
                  tools={[
                    { name: "Premiere Pro", badge: "Pr", color: "#9999ff" },
                    { name: "After Effects", badge: "Ae", color: "#d291ff" },
                    { name: "DaVinci", badge: "Dv", color: "#f97316" },
                    { name: "Audition", badge: "Au", color: "#14b8a6" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Step 09 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#2563eb] ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
              <span className="text-[11px] font-mono text-[#2563eb] dark:text-[#38bdf8] font-bold block mb-1">
                09 &bull; FEEDBACK
              </span>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                Your notes, right on the video
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                Leave timestamped comments directly on any frame via Frame.io.
              </p>
              <ToolPill
                tools={[
                  { name: "Frame.io", badge: "Fio", color: "#a855f7" },
                  { name: "Slack", badge: "Slk", color: "#e11d48" },
                ]}
              />
            </div>
          </div>

          {/* Step 10 */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#f8fafc] dark:ring-[#07080d]" />
            <div className="p-5 rounded-2xl bg-white dark:bg-[#11141c] border border-emerald-500/30 dark:border-emerald-500/30 shadow-md">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                10 &bull; DELIVERY
              </span>
              <h3 className="text-base font-bold text-[#111827] dark:text-[#eef0f5]">
                Final files, delivered
              </h3>
              <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] mt-1">
                4K master exports and format cutdowns uploaded directly to your Google Drive.
              </p>
              <ToolPill
                tools={[
                  { name: "Google Drive", badge: "Drv", color: "#10b981" },
                  { name: "ProRes 422 HQ", badge: "HQ", color: "#2563eb" },
                ]}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StudioProcess;
