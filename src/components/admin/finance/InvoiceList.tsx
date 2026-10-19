import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Invoice, InvoiceStatus } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { PDFService } from "../../../lib/services/pdfService";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { SendEmailModal } from "./SendEmailModal";
import { AdminButton, AdminBadge } from "../ui/AdminUI";
import { 
  Plus, Search, Filter, Download, Send, DollarSign, 
  Copy, Eye, Edit, Archive, CheckCircle2, AlertTriangle, 
  Clock, RefreshCw, ExternalLink, ChevronLeft, ChevronRight, Loader2,
  MoreVertical, Trash2, Files
} from "lucide-react";

export const InvoiceList = ({ 
  notify, 
  userEmail,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void; 
  userEmail: string;
  basePath?: string;
}) => {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [clientFilter, setClientFilter] = useState<string>("ALL");

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadInvoices = async () => {
    setLoading(true);
    const data = await FinanceService.getInvoices();
    setInvoices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleSeedData = async () => {
    setLoading(true);
    await FinanceService.seedSampleData(userEmail);
    notify("Sample Motionly invoice #00121 and services seeded successfully!");
    loadInvoices();
  };

  const handleDuplicate = async (id: string) => {
    try {
      const dup = await FinanceService.duplicateInvoice(id, userEmail);
      notify(`Duplicated as draft ${dup.invoiceNumber}`);
      navigate(`${basePath}/invoices/edit/${dup.id}`);
    } catch (err: any) {
      notify(err.message || "Failed to duplicate", "err");
    }
  };

  const handleArchive = async (id: string) => {
    if (confirm("Archive this invoice?")) {
      await FinanceService.archiveInvoice(id, userEmail);
      notify("Invoice archived");
      loadInvoices();
    }
  };

  const handleDelete = async (id: string, invoiceNumber: string) => {
    if (confirm(`Are you sure you want to delete invoice ${invoiceNumber}? This action cannot be undone.`)) {
      try {
        await FinanceService.deleteInvoice(id, userEmail);
        notify(`Invoice ${invoiceNumber} deleted!`);
        loadInvoices();
      } catch (err: any) {
        notify(err.message || "Failed to delete invoice", "err");
      }
    }
  };

  // Filtered dataset
  const filtered = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      (inv.clientCompany || "").toLowerCase().includes(search.toLowerCase()) ||
      (inv.project || "").toLowerCase().includes(search.toLowerCase()) ||
      (inv.poNumber || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    const matchesClient = clientFilter === "ALL" || inv.clientId === clientFilter;

    return matchesSearch && matchesStatus && matchesClient;
  });

  // Summary Metrics
  const activeInvoices = filtered.filter(i => i.status !== "CANCELLED" && i.status !== "ARCHIVED");
  const totalInvoiced = activeInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalCollected = activeInvoices.reduce((sum, i) => sum + (i.amountPaid || 0) + (i.advanceAmount || 0), 0);
  const totalOutstanding = activeInvoices.reduce((sum, i) => sum + i.balanceDue, 0);
  const totalOverdue = activeInvoices.filter(i => i.status === "OVERDUE").reduce((sum, i) => sum + i.balanceDue, 0);

  // Pagination Math
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedInvoices = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStatusChange = async (id: string, newStatus: InvoiceStatus) => {
    try {
      await FinanceService.updateInvoice(id, { status: newStatus }, userEmail);
      notify(`Invoice status updated to ${newStatus}`);
      loadInvoices();
    } catch (err: any) {
      notify(err.message || "Failed to update status", "err");
    }
  };

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "PAID": return "green";
      case "PARTIALLY_PAID": return "blue";
      case "OVERDUE": return "red";
      case "REJECTED": return "red";
      case "SENT": return "yellow";
      case "VIEWED": return "blue";
      default: return "gray";
    }
  };

  return (
    <div className="admin-finance finance-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance / Billing</p>
          <h1>Invoices</h1>
          <p>Track billing, payment status, and delivery for every client.</p>
        </div>
        
        <div className="finance-header-actions">
          <button
            type="button"
            onClick={handleSeedData}
            className="finance-secondary-link"
          >
            Seed Sample #00121 Data
          </button>
          <Link to={`${basePath}/invoices/new`} className="finance-primary-link">
            <Plus className="w-4 h-4" />
            New Invoice
          </Link>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="finance-metrics-grid">
        <div className="finance-metric-card">
          <p className="finance-metric-label">Total invoiced</p>
          <p className="finance-metric-value">BDT {totalInvoiced.toLocaleString()}</p>
        </div>

        <div className="finance-metric-card is-collected">
          <p className="finance-metric-label">Total collected</p>
          <p className="finance-metric-value">BDT {totalCollected.toLocaleString()}</p>
        </div>

        <div className="finance-metric-card is-outstanding">
          <p className="finance-metric-label">Outstanding</p>
          <p className="finance-metric-value">BDT {totalOutstanding.toLocaleString()}</p>
        </div>

        <div className="finance-metric-card is-overdue">
          <p className="finance-metric-label">Overdue</p>
          <p className="finance-metric-value">BDT {totalOverdue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="finance-toolbar">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search invoices"
            placeholder="Search by invoice #, client, company, project, or PO number..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            aria-label="Filter invoices by status"
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="finance-control"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="VIEWED">Viewed</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <button type="button" onClick={loadInvoices} aria-label="Refresh invoices" className="finance-icon-button">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Invoices Datatable */}
      <section className="finance-table-panel" aria-label="Invoice records">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-xs font-bold uppercase tracking-wider">Loading Invoices...</p>
          </div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm font-bold">No invoices found</p>
            <p className="text-xs mt-1">Try adjusting search filters or create a new invoice.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="finance-table">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Client</th>
                  <th className="py-4 px-6">Issue Date</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6 text-right">Total</th>
                  <th className="py-4 px-6 text-right">Paid</th>
                  <th className="py-4 px-6 text-right">Balance</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Sync</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <Link to={`${basePath}/invoices/view/${inv.id}`} className="font-black text-blue-600 hover:underline">
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-black text-slate-900">{inv.clientName}</p>
                      {inv.clientCompany && <p className="text-[11px] text-slate-400 font-semibold">{inv.clientCompany}</p>}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs">{inv.issueDate}</td>
                    <td className="py-4 px-6 font-mono text-xs">{inv.dueDate}</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      {inv.currency} {inv.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-600">
                      {inv.currency} {((inv.amountPaid || 0) + (inv.advanceAmount || 0)).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      {inv.currency} {inv.balanceDue.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <select
                        value={inv.status}
                        aria-label={`Status for invoice ${inv.invoiceNumber}`}
                        onChange={(e) => handleStatusChange(inv.id, e.target.value as InvoiceStatus)}
                        className={`finance-status-select px-2.5 py-1 text-[11px] font-black uppercase rounded-xl border border-slate-200 cursor-pointer focus:outline-none transition-all ${
                          inv.status === "PAID" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          inv.status === "PARTIALLY_PAID" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          inv.status === "OVERDUE" ? "bg-rose-50 text-rose-700 border-rose-200" :
                          inv.status === "REJECTED" ? "bg-rose-100 text-rose-800 border-rose-300 font-bold" :
                          inv.status === "SENT" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="SENT">SENT</option>
                        <option value="VIEWED">VIEWED</option>
                        <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                        <option value="PAID">PAID</option>
                        <option value="OVERDUE">OVERDUE</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        inv.googleSheetSyncStatus === "SYNCED" ? "bg-emerald-500" :
                        inv.googleSheetSyncStatus === "FAILED" ? "bg-red-500" : "bg-amber-400"
                      }`} role="img" aria-label={`Google Sheets: ${inv.googleSheetSyncStatus}`} />
                    </td>
                    <td className="py-4 px-6 text-right relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === inv.id ? null : inv.id);
                        }}
                        className="finance-icon-button"
                        aria-label={`Actions for invoice ${inv.invoiceNumber}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === inv.id && (
                        <>
                          <button
                            type="button"
                            className="fixed inset-0 z-20" 
                            onClick={() => setActiveMenuId(null)} 
                            aria-label="Close invoice actions"
                          />
                          <div className="absolute right-6 top-12 z-30 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 text-left text-xs font-semibold text-slate-700 space-y-0.5">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`${basePath}/invoices/view/${inv.id}`);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-slate-400" />
                              <span>View Invoice</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`${basePath}/invoices/edit/${inv.id}`);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-slate-400" />
                              <span>Edit Invoice</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                setSelectedInvoice(inv);
                                setPaymentModalOpen(true);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <DollarSign className="w-4 h-4 text-emerald-500" />
                              <span>Record Payment</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                setSelectedInvoice(inv);
                                setEmailModalOpen(true);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <Send className="w-4 h-4 text-blue-500" />
                              <span>Send Email</span>
                            </button>

                            <button
                              onClick={async () => {
                                setActiveMenuId(null);
                                try {
                                  const settings = await FinanceService.getSettings();
                                  PDFService.generateProgrammaticPDF(inv, settings.company, settings.bank, settings.branding);
                                  notify(`Downloading PDF for ${inv.invoiceNumber}...`);
                                } catch (err: any) {
                                  notify("Failed to generate PDF", "err");
                                }
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <Download className="w-4 h-4 text-slate-400" />
                              <span>Download PDF</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                const link = `${window.location.origin}/invoice/${inv.publicToken}`;
                                navigator.clipboard.writeText(link);
                                notify("Public invoice link copied to clipboard!");
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-slate-400" />
                              <span>Copy Link</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                handleDuplicate(inv.id);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition-colors"
                            >
                              <Files className="w-4 h-4 text-slate-400" />
                              <span>Duplicate</span>
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                handleArchive(inv.id);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-amber-600 transition-colors"
                            >
                              <Archive className="w-4 h-4 text-amber-500" />
                              <span>Archive</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                handleDelete(inv.id, inv.invoiceNumber);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-rose-50 flex items-center gap-2.5 text-rose-600 transition-colors font-semibold"
                            >
                              <Trash2 className="w-4 h-4 text-rose-600" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing Page {currentPage} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                aria-label="Previous page"
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                aria-label="Next page"
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Modals */}
      {selectedInvoice && (
        <>
          <RecordPaymentModal
            isOpen={paymentModalOpen}
            onClose={() => setPaymentModalOpen(false)}
            invoice={selectedInvoice}
            userEmail={userEmail}
            onSuccess={loadInvoices}
          />
          <SendEmailModal
            isOpen={emailModalOpen}
            onClose={() => setEmailModalOpen(false)}
            invoice={selectedInvoice}
            userEmail={userEmail}
            onSuccess={loadInvoices}
          />
        </>
      )}
    </div>
  );
};
