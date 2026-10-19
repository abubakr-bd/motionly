import React, { useState, useEffect } from "react";
import type { Payment } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminButton, AdminInput, AdminBadge } from "../ui/AdminUI";
import { DollarSign, Search, Calendar, Filter, ArrowUpRight, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";

export const PaymentLedger = ({ 
  notify,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void;
  basePath?: string;
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("ALL");

  const loadPayments = async () => {
    setLoading(true);
    const data = await FinanceService.getPayments();
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const filtered = payments.filter(p => {
    const matchesSearch = 
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.transactionReference || "").toLowerCase().includes(search.toLowerCase());

    const matchesMethod = methodFilter === "ALL" || p.paymentMethod === methodFilter;

    return matchesSearch && matchesMethod;
  });

  const totalCollected = filtered.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="admin-finance finance-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance / Collections</p>
          <h1>Payment ledger</h1>
          <p>Recorded client payments across Motionly invoices.</p>
        </div>
        <div className="finance-total-card">
          <div className="finance-total-currency">
            BDT
          </div>
          <div>
            <p>Filtered total collected</p>
            <strong>BDT {totalCollected.toLocaleString()}</strong>
          </div>
        </div>
      </header>

      {/* Filter / Search Bar */}
      <div className="finance-toolbar">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search payments"
            placeholder="Search by invoice #, client name, or transaction reference..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={methodFilter}
            aria-label="Filter payments by method"
            onChange={e => setMethodFilter(e.target.value)}
            className="finance-control"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="bKash">bKash</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Other">Other</option>
          </select>

          <button type="button" onClick={loadPayments} aria-label="Refresh payments" className="finance-icon-button">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payments Datatable */}
      <section className="finance-table-panel" aria-label="Payment records">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-xs font-bold uppercase tracking-wider">Loading Ledger...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm font-bold">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="finance-table">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Payment Date</th>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Client</th>
                  <th className="py-4 px-6">Method</th>
                  <th className="py-4 px-6">Reference / Note</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                  <th className="py-4 px-6 text-center">Recorded By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map(payment => (
                  <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs">{payment.paymentDate}</td>
                    <td className="py-4 px-6">
                      <a
                        href={`${basePath}/invoices/view/${payment.invoiceId}`}
                        className="font-black text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {payment.invoiceNumber}
                        <ArrowUpRight className="w-3 h-3 inline" />
                      </a>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{payment.clientName || "N/A"}</td>
                    <td className="py-4 px-6">
                      <AdminBadge color={payment.paymentMethod === "bKash" ? "blue" : "gray"}>
                        {payment.paymentMethod}
                      </AdminBadge>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate">
                      <span className="font-mono text-xs text-slate-700 font-semibold">{payment.transactionReference || "-"}</span>
                      {payment.note && <p className="text-[11px] text-slate-400 truncate">{payment.note}</p>}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-emerald-600">
                      + BDT {payment.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center text-xs text-slate-400 truncate max-w-[120px]">
                      {payment.createdBy || "System"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
