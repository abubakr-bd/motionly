import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, Lock, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import type { WorkspaceMember } from "../../../types/teamWorkspace";
import { SUPER_ADMIN_EMAILS } from "../../../types/teamWorkspace";
import { useTeamTheme } from "../TeamThemeContext";

interface TeamFinanceRestrictedProps {
  currentUser: WorkspaceMember;
}

export const TeamFinanceRestricted: React.FC<TeamFinanceRestrictedProps> = ({ currentUser }) => {
  const { theme } = useTeamTheme();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-200">
      <div className={`p-8 sm:p-10 rounded-3xl border shadow-2xl text-center space-y-6 ${
        theme === "white"
          ? "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
          : theme === "gray"
          ? "bg-[#161c28] border-slate-700/80 text-slate-100"
          : "bg-[#0b101e] border-slate-800 text-white"
      }`}>
        {/* Icon Lock Shield */}
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/5">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Confidential Workspace
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Restricted Financial Access
          </h2>
          <p className={`text-sm leading-relaxed max-w-lg mx-auto ${
            theme === "white" ? "text-slate-600" : "text-slate-400"
          }`}>
            The Motionly Finance & Invoice suite contains sensitive studio revenue, client payment ledgers, and bank records. Access is restricted to the <strong>CEO</strong>, <strong>Finance Officer</strong>, <strong>Chief Officers</strong>, and authorized executives.
          </p>
        </div>

        {/* Member current role status */}
        <div className={`p-4 rounded-2xl border text-xs max-w-md mx-auto text-left flex items-start gap-3 ${
          theme === "white"
            ? "bg-slate-50 border-slate-200 text-slate-700"
            : theme === "gray"
            ? "bg-[#1c2333] border-slate-700/80 text-slate-300"
            : "bg-[#0f1729] border-slate-800 text-slate-300"
        }`}>
          <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div className="space-y-1">
            <p className="font-semibold">Your Current Profile:</p>
            <p className="text-[11px] opacity-80">
              Account: <span className="font-bold">{currentUser.email}</span> • Role: <span className="font-bold">{currentUser.role}</span>
            </p>
            <p className="text-[11px] opacity-80">
              Finance Status: <span className="text-rose-400 font-bold">Access Not Granted</span>
            </p>
          </div>
        </div>

        {/* Super Admins to contact */}
        <div className="space-y-3 pt-2">
          <p className={`text-xs font-semibold ${theme === "white" ? "text-slate-500" : "text-slate-400"}`}>
            To request finance & invoice clearance, contact a Motionly Super Admin:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUPER_ADMIN_EMAILS.map((adminEmail) => (
              <a
                key={adminEmail}
                href={`mailto:${adminEmail}?subject=Finance%20Access%20Request%20-%20${currentUser.name}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                  theme === "white"
                    ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                    : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{adminEmail}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-4">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wide shadow-md shadow-cyan-600/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Team Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
