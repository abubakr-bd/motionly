import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  FileText, 
  CreditCard, 
  Users, 
  Layers, 
  Settings, 
  Shield, 
  Plus, 
  ArrowLeft,
  Lock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import type { WorkspaceMember } from "../../../types/teamWorkspace";
import { isSuperAdmin } from "../../../types/teamWorkspace";
import { useTeamTheme } from "../TeamThemeContext";

// Finance core views
import { FinanceOverview } from "../../admin/finance/FinanceOverview";
import { InvoiceList } from "../../admin/finance/InvoiceList";
import { InvoiceEditor } from "../../admin/finance/InvoiceEditor";
import { InvoiceViewer } from "../../admin/finance/InvoiceViewer";
import { PaymentLedger } from "../../admin/finance/PaymentLedger";
import { ClientManager } from "../../admin/finance/ClientManager";
import { ServicesManager } from "../../admin/finance/ServicesManager";
import { FinanceSettingsManager } from "../../admin/finance/FinanceSettingsManager";
import { TeamFinanceAccessModal } from "./TeamFinanceAccessModal";

interface TeamFinanceProps {
  currentUser: WorkspaceMember;
  members: WorkspaceMember[];
  onMemberUpdated: (updatedMember: WorkspaceMember) => void;
}

export const TeamFinance: React.FC<TeamFinanceProps> = ({
  currentUser,
  members,
  onMemberUpdated
}) => {
  const { theme } = useTeamTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const isUserSuperAdmin = isSuperAdmin(currentUser.email);
  const path = location.pathname.toLowerCase();

  // Navigation tab items
  const tabs = [
    { label: "Overview", path: "/team/finance", icon: DollarSign, match: (p: string) => p === "/team/finance" || p === "/team/finance/overview" },
    { label: "Invoices", path: "/team/finance/invoices", icon: FileText, match: (p: string) => p.startsWith("/team/finance/invoices") },
    { label: "Payment Ledger", path: "/team/finance/payments", icon: CreditCard, match: (p: string) => p.startsWith("/team/finance/payments") },
    { label: "Clients", path: "/team/finance/clients", icon: Users, match: (p: string) => p.startsWith("/team/finance/clients") },
    { label: "Rate Card", path: "/team/finance/services", icon: Layers, match: (p: string) => p.startsWith("/team/finance/services") },
    { label: "Settings", path: "/team/finance/settings", icon: Settings, match: (p: string) => p.startsWith("/team/finance/settings") },
  ];

  // Render the appropriate finance subview
  const renderFinanceContent = () => {
    // 1. New Invoice
    if (path === "/team/finance/invoices/new") {
      return (
        <InvoiceEditor 
          basePath="/team/finance" 
          notify={showToast} 
          userEmail={currentUser.email} 
        />
      );
    }

    // 2. Edit Invoice (/team/finance/invoices/edit/:id)
    if (path.startsWith("/team/finance/invoices/edit/")) {
      return (
        <InvoiceEditor 
          basePath="/team/finance" 
          notify={showToast} 
          userEmail={currentUser.email} 
        />
      );
    }

    // 3. View Invoice (/team/finance/invoices/view/:id)
    if (path.startsWith("/team/finance/invoices/view/")) {
      return (
        <InvoiceViewer 
          basePath="/team/finance" 
          notify={showToast} 
          userEmail={currentUser.email} 
        />
      );
    }

    // 4. Invoices List
    if (path.startsWith("/team/finance/invoices")) {
      return (
        <InvoiceList 
          basePath="/team/finance" 
          notify={showToast} 
          userEmail={currentUser.email} 
        />
      );
    }

    // 5. Payment Ledger
    if (path.startsWith("/team/finance/payments")) {
      return (
        <PaymentLedger 
          basePath="/team/finance" 
          notify={showToast} 
        />
      );
    }

    // 6. Clients
    if (path.startsWith("/team/finance/clients")) {
      return (
        <ClientManager 
          basePath="/team/finance" 
          notify={showToast} 
        />
      );
    }

    // 7. Services
    if (path.startsWith("/team/finance/services")) {
      return (
        <ServicesManager 
          basePath="/team/finance" 
          notify={showToast} 
        />
      );
    }

    // 8. Settings
    if (path.startsWith("/team/finance/settings")) {
      return (
        <FinanceSettingsManager 
          basePath="/team/finance" 
          notify={showToast} 
        />
      );
    }

    // Default: Finance Overview
    return (
      <FinanceOverview 
        basePath="/team/finance" 
        notify={showToast} 
      />
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Suite Bar: Title, Role Badge, and Super Admin Access Action */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
        theme === "white"
          ? "bg-white border-slate-200 text-slate-900"
          : theme === "gray"
          ? "bg-[#161c28] border-slate-700/80 text-slate-100"
          : "bg-[#0b101e] border-slate-800 text-white"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                Finance & Invoices Workspace
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                Executive Clearance
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${theme === "white" ? "text-slate-600" : "text-slate-400"}`}>
              Full client billing, master invoices, payment ledger, and revenue tracking.
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Role badge */}
          <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold border ${
            theme === "white"
              ? "bg-slate-100 border-slate-200 text-slate-700"
              : "bg-slate-900 border-slate-800 text-slate-300"
          }`}>
            Role: <strong className="text-cyan-400 font-bold">{currentUser.role}</strong>
          </span>

          {/* Super Admin Access Control Button (Visible exclusively to Super Admins) */}
          {isUserSuperAdmin && (
            <button
              type="button"
              onClick={() => setAccessModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Only super admins can configure finance permissions"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Manage Finance Access</span>
            </button>
          )}

          {/* Quick Create Invoice Action */}
          <Link
            to="/team/finance/invoices/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Invoice</span>
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-1 overflow-x-auto ${
        theme === "white"
          ? "bg-slate-100/90 border-slate-200/90"
          : theme === "gray"
          ? "bg-[#191f2d] border-slate-700/80"
          : "bg-[#0a0f1d] border-slate-800/80"
      }`}>
        {tabs.map((tab) => {
          const isActive = tab.match(path);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? theme === "white"
                    ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200/80"
                    : theme === "gray"
                    ? "bg-[#242c3e] text-white shadow-md border border-slate-600/60 font-bold"
                    : "bg-[#111a2e] text-white shadow-md border border-cyan-500/30 font-bold"
                  : theme === "white"
                  ? "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "opacity-70"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {renderFinanceContent()}
      </div>

      {/* Super Admin Access Management Modal */}
      {accessModalOpen && (
        <TeamFinanceAccessModal
          isOpen={accessModalOpen}
          onClose={() => setAccessModalOpen(false)}
          members={members}
          currentUser={currentUser}
          onMemberUpdated={onMemberUpdated}
        />
      )}

      {/* Toast Notification Box */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border animate-in slide-in-from-bottom duration-200 ${
          toast.type === "ok"
            ? "bg-slate-900 text-emerald-400 border-emerald-500/30"
            : "bg-red-950 text-red-200 border-red-500/30"
        }`}>
          {toast.type === "ok" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
};
