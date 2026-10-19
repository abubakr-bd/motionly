import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Invoice, FinanceSettings } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { ExternalLink, Loader2 } from "lucide-react";

export const FinanceOverview = ({ 
  notify,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void;
  basePath?: string;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [iData, sData] = await Promise.all([
      FinanceService.getInvoices(),
      FinanceService.getSettings()
    ]);
    setInvoices(iData);
    setSettings(sData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeInvoices = invoices.filter(i => i.status !== "CANCELLED" && i.status !== "ARCHIVED");
  
  const totalInvoiced = activeInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalCollected = activeInvoices.reduce((sum, i) => sum + (i.amountPaid || 0) + (i.advanceAmount || 0), 0);
  const outstanding = activeInvoices.reduce((sum, i) => sum + i.balanceDue, 0);
  
  const overdueInvoices = activeInvoices.filter(i => i.status === "OVERDUE");
  const overdueTotal = overdueInvoices.reduce((sum, i) => sum + i.balanceDue, 0);

  const paidCount = activeInvoices.filter(i => i.status === "PAID").length;
  const partialCount = activeInvoices.filter(i => i.status === "PARTIALLY_PAID").length;
  const draftCount = invoices.filter(i => i.status === "DRAFT").length;

  return (
    <div className="admin-finance finance-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance</p>
          <h1>Overview</h1>
          <p>Revenue, collections, and invoice activity in one place.</p>
        </div>
        <div className="finance-header-actions">
          <a
            href="https://docs.google.com/spreadsheets/d/1ykMwwRRI9nZIEfL98lg1QYcUDz_vckTiLyaDOwXZ0zU/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="finance-secondary-link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Sheet Record
          </a>
          <Link to={`${basePath}/invoices/new`} className="finance-primary-link">
            New Invoice
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-xs font-bold uppercase tracking-wider">Loading Financial Data...</p>
        </div>
      ) : (
        <>
          {/* Key Metric Cards */}
          <div className="finance-metrics-grid">
            <div className="finance-metric-card">
              <p className="finance-metric-label">Total invoiced</p>
              <p className="finance-metric-value">BDT {totalInvoiced.toLocaleString()}</p>
              <p className="finance-metric-note">Across {activeInvoices.length} active invoices</p>
            </div>

            <div className="finance-metric-card is-collected">
              <p className="finance-metric-label">Collected</p>
              <p className="finance-metric-value">BDT {totalCollected.toLocaleString()}</p>
              <p className="finance-metric-note">
                {totalInvoiced > 0 ? `${((totalCollected / totalInvoiced) * 100).toFixed(1)}% of total invoiced` : "0%"}
              </p>
            </div>

            <div className="finance-metric-card is-outstanding">
              <p className="finance-metric-label">Outstanding</p>
              <p className="finance-metric-value">BDT {outstanding.toLocaleString()}</p>
              <p className="finance-metric-note">Pending client payment</p>
            </div>

            <div className="finance-metric-card is-overdue">
              <p className="finance-metric-label">Overdue</p>
              <p className="finance-metric-value">BDT {overdueTotal.toLocaleString()}</p>
              <p className="finance-metric-note">{overdueInvoices.length} overdue invoices</p>
            </div>
          </div>

          {/* Counts & Progress Breakdown */}
          <div className="finance-overview-grid">
            <section className="finance-panel finance-breakdown-panel">
              <header className="finance-panel-heading">
                <div>
                  <p className="site-kicker">Invoice activity</p>
                  <h2>Invoice status</h2>
                </div>
              </header>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400">Fully Paid</p>
                  <p className="text-xl font-black text-emerald-600">{paidCount}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400">Partially Paid</p>
                  <p className="text-xl font-black text-blue-600">{partialCount}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400">Overdue</p>
                  <p className="text-xl font-black text-rose-600">{overdueInvoices.length}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400">Drafts</p>
                  <p className="text-xl font-black text-slate-600">{draftCount}</p>
                </div>
              </div>

              {/* Visual collection ratio bar */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>Collection Progress</span>
                  <span>{totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${totalInvoiced > 0 ? (totalCollected / totalInvoiced) * 100 : 0}%` }}
                  />
                  <div 
                    className="bg-amber-400 h-full transition-all duration-500"
                    style={{ width: `${totalInvoiced > 0 ? (outstanding / totalInvoiced) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </section>

            {/* Google Sheets Sync Card */}
            <aside className="finance-panel finance-sync-panel">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="finance-sync-status">
                    {settings?.googleSheets?.webhookUrl ? "Connected" : "Setup Required"}
                  </span>
                </div>
                <h2>Google Sheets Sync</h2>
                <p className="finance-sync-description">
                  Financial records are synchronized in real-time with external Motionly master spreadsheet.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to={basePath === "/team/finance" ? "/team/finance/settings" : "/admin/finance/settings"}
                  className="finance-secondary-link"
                >
                  Configure Sync Settings
                </Link>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
};
