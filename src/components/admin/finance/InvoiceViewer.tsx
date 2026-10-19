import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Invoice, FinanceSettings, ActivityLog, Payment } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { GoogleSheetsService } from "../../../lib/services/googleSheetsService";
import { PDFService } from "../../../lib/services/pdfService";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { SendEmailModal } from "./SendEmailModal";
import { AdminButton, AdminBadge } from "../ui/AdminUI";
import { 
  Download, Send, DollarSign, Copy, Eye, Edit, Archive, ArrowLeft, 
  CheckCircle2, Clock, AlertTriangle, RefreshCw, ExternalLink, FileText, Check, Loader2,
  ChevronDown, Image as ImageIcon
} from "lucide-react";

export const InvoiceViewer = ({ 
  notify, 
  userEmail,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void; 
  userEmail: string;
  basePath?: string;
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"preview" | "payments" | "audit" | "sheets">("preview");

  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);

  const invoiceDocRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    const [invData, sData, logData, payData] = await Promise.all([
      FinanceService.getInvoiceById(id),
      FinanceService.getSettings(),
      FinanceService.getActivityLogs(id),
      FinanceService.getPayments(id)
    ]);

    setInvoice(invData);
    setSettings(sData);
    setLogs(logData);
    setPayments(payData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading || !invoice || !settings) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading Invoice...</p>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/invoice/${invoice.id}/${invoice.publicToken}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    notify("Public invoice link copied to clipboard!");
  };

  const handleDownloadPDF = async () => {
    if (invoiceDocRef.current) {
      notify("Generating high quality A4 PDF...");
      const ok = await PDFService.generateInvoicePDFFromElement(
        invoiceDocRef.current,
        `Motionly_Invoice_${invoice.invoiceNumber.replace("#", "")}`
      );
      if (ok) notify("PDF downloaded successfully!");
      else PDFService.generateProgrammaticPDF(invoice, settings.company, settings.bank, settings.branding);
    } else {
      PDFService.generateProgrammaticPDF(invoice, settings.company, settings.bank, settings.branding);
    }
  };

  const handleDownloadPNG = async () => {
    if (invoiceDocRef.current) {
      notify("Exporting high resolution PNG image...");
      const ok = await PDFService.generateInvoicePNGFromElement(
        invoiceDocRef.current,
        `Motionly_Invoice_${invoice.invoiceNumber.replace("#", "")}`
      );
      if (ok) notify("PNG image downloaded!");
      else notify("Failed to export PNG", "err");
    } else {
      notify("Invoice preview not ready", "err");
    }
  };

  const handleDuplicate = async () => {
    try {
      const dup = await FinanceService.duplicateInvoice(invoice.id, userEmail);
      notify(`Duplicated as new draft ${dup.invoiceNumber}`);
      navigate(`${basePath}/invoices/edit/${dup.id}`);
    } catch (err: any) {
      notify(err.message || "Failed to duplicate", "err");
    }
  };

  const handleSyncSheets = async () => {
    setSyncing(true);
    const res = await GoogleSheetsService.syncInvoice(invoice, settings.googleSheets.webhookUrl);
    await FinanceService.updateInvoiceSyncStatus(invoice.id, res.status, res.message);
    notify(res.message || "Google Sheets synchronization updated!", res.success ? "ok" : "err");
    setSyncing(false);
    loadData();
  };

  const handleArchive = async () => {
    if (confirm("Are you sure you want to archive this invoice?")) {
      await FinanceService.archiveInvoice(invoice.id, userEmail);
      notify("Invoice archived");
      navigate(`${basePath}/invoices`);
    }
  };

  const branding = invoice.brandingOverride || settings.branding;
  const bank = invoice.bankInfoOverride || settings.bank;
  const terms = invoice.termsOverride || settings.defaultTerms;

  return (
    <div className="admin-finance finance-page finance-viewer-page">
      <header className="finance-page-heading">
        <div className="finance-heading-back flex items-center gap-3">
          <Link to={`${basePath}/invoices`} aria-label="Back to invoices" className="finance-back-link">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="finance-heading-content">
            <div className="flex items-center gap-3">
              <h1>{invoice.invoiceNumber}</h1>
              <AdminBadge color={
                invoice.status === "PAID" ? "green" :
                invoice.status === "PARTIALLY_PAID" ? "blue" :
                invoice.status === "OVERDUE" ? "red" : "gray"
              }>
                {invoice.status}
              </AdminBadge>
            </div>
            <p>Created for {invoice.clientName} ({invoice.clientCompany || "Individual"})</p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <AdminButton onClick={() => setRecordPaymentOpen(true)} variant="primary">
            <DollarSign className="w-4 h-4 mr-1.5 inline" />
            Record Payment
          </AdminButton>

          {/* Unified Download Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              className="finance-primary-link"
            >
              <Download className="w-4 h-4" />
              <span>Download / Save</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${downloadDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {downloadDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setDownloadDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-30 space-y-1">
                  <button
                    type="button"
                    onClick={() => { setDownloadDropdownOpen(false); handleDownloadPDF(); }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    Save as PDF
                  </button>

                  <button
                    type="button"
                    onClick={() => { setDownloadDropdownOpen(false); handleDownloadPNG(); }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    Save as PNG Image
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    type="button"
                    onClick={() => { setDownloadDropdownOpen(false); handleCopyLink(); }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    {copiedLink ? "Copied Link!" : "Copy Public Link"}
                  </button>
                </div>
              </>
            )}
          </div>

          <AdminButton onClick={() => setSendEmailOpen(true)} variant="secondary">
            <Send className="w-4 h-4 mr-1.5 inline" />
            Send
          </AdminButton>
          <AdminButton onClick={() => navigate(`${basePath}/invoices/edit/${invoice.id}`)} variant="secondary">
            <Edit className="w-4 h-4 mr-1.5 inline" />
            Edit
          </AdminButton>
          <button type="button" onClick={handleDuplicate} aria-label="Duplicate invoice" className="finance-icon-button">
            Copy
          </button>
          <button type="button" onClick={handleArchive} aria-label="Archive invoice" className="finance-icon-button is-danger">
            <Archive className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="finance-tabs-shell">
        <div className="finance-tabs" role="group" aria-label="Invoice details views">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            aria-pressed={activeTab === "preview"}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "preview" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Invoice Document
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payments")}
            aria-pressed={activeTab === "payments"}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "payments" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Payment History ({payments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            aria-pressed={activeTab === "audit"}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "audit" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Audit Timeline ({logs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sheets")}
            aria-pressed={activeTab === "sheets"}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "sheets" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            Google Sheets Sync ({invoice.googleSheetSyncStatus})
          </button>
        </div>

        <div className="finance-viewed-status">
          <span>Client Viewed: <strong className={invoice.firstViewedAt ? "text-emerald-600" : "text-slate-400"}>{invoice.firstViewedAt ? "Yes" : "No"}</strong></span>
        </div>
      </div>

      {/* TAB 1: INVOICE PREVIEW */}
      {activeTab === "preview" && (
        <div className="finance-document-stage">
          <div
            ref={invoiceDocRef}
            className="finance-invoice-document relative overflow-hidden"
            style={{ minHeight: "1050px" }}
          >
            {/* Watermark Overlay */}
            {branding.watermarkEnabled && (
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center select-none z-0"
                style={{ opacity: branding.watermarkOpacity || 0.06 }}
              >
                <img 
                  src={branding.watermarkUrl || branding.logoUrl || "/motionly_logo_brand.png"} 
                  alt="Watermark" 
                  className="max-w-[480px] max-h-[480px] object-contain" 
                />
              </div>
            )}

            {/* Document Content */}
            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    {branding.logoEnabled !== false && (
                      <img
                        src={branding.logoUrl || "/motionly_logo_brand.png"}
                        alt="Motionly Media Logo"
                        className="h-10 sm:h-12 max-w-[200px] object-contain"
                        onError={(e: any) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-slate-900">{settings.company.companyName}</h2>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{settings.company.website}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{settings.company.companyAddress}</p>
                  <p className="text-xs text-slate-500 font-medium">Email: {settings.company.email} | Phone: {settings.company.phone}</p>
                  {settings.company.taxVatInfo && <p className="text-[11px] text-slate-400 font-semibold">{settings.company.taxVatInfo}</p>}
                </div>

                <div className="text-right">
                  <h3 className="text-3xl font-black text-blue-600 tracking-tight mb-1">INVOICE</h3>
                  <p className="text-lg font-black text-slate-900 font-mono">{invoice.invoiceNumber}</p>
                  <div className="inline-block mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      invoice.status === "PAID" ? "bg-emerald-100 text-emerald-800" :
                      invoice.status === "PARTIALLY_PAID" ? "bg-blue-100 text-blue-800" :
                      invoice.status === "OVERDUE" ? "bg-rose-100 text-rose-800" : "bg-slate-100 text-slate-700"
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client & Meta Bar */}
              <div className="grid grid-cols-2 gap-8 py-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Billed To</p>
                  <h4 className="text-base font-black text-slate-900">{invoice.clientName}</h4>
                  {invoice.clientCompany && <p className="text-xs font-bold text-slate-700">{invoice.clientCompany}</p>}
                  {invoice.clientAddress && <p className="text-xs text-slate-500 font-medium whitespace-pre-line">{invoice.clientAddress}</p>}
                  {invoice.clientEmail && <p className="text-xs text-slate-500 font-medium">{invoice.clientEmail}</p>}
                  {invoice.clientPhone && <p className="text-xs text-slate-500 font-medium">{invoice.clientPhone}</p>}
                </div>

                <div className="space-y-2 text-right">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issue Date</p>
                    <p className="text-xs font-black text-slate-900 font-mono">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Due Date</p>
                    <p className="text-xs font-black text-slate-900 font-mono">{invoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Terms</p>
                    <p className="text-xs font-bold text-slate-700">{invoice.paymentTerms}</p>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Item & Description</th>
                      <th className="py-3 px-4 text-center">Qty / Unit</th>
                      <th className="py-3 px-4 text-right">Rate</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {invoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900">{item.description}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600 font-mono">
                          {item.quantity} {item.unit || ""}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono">
                          {invoice.currency} {item.rate.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-slate-900 font-mono">
                          {invoice.currency} {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Breakdown */}
              {(() => {
                const subtotal = invoice.subtotal || 0;
                const discount = invoice.discount || 0;
                const advance = invoice.advanceAmount || 0;
                const tax = invoice.taxAmount || 0;
                const paid = invoice.amountPaid || 0;
                const calculatedTotal = Math.max(0, subtotal - discount + tax);
                const calculatedBalance = Math.max(0, calculatedTotal - advance - paid);

                return (
                  <div className="flex justify-end pt-2">
                    <div className="w-full max-w-xs space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-semibold text-slate-500">Subtotal:</span>
                        <span className="font-mono font-bold text-slate-900">{invoice.currency} {subtotal.toLocaleString()}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                          <span className="font-semibold">Discount:</span>
                          <span className="font-mono font-bold">-{invoice.currency} {discount.toLocaleString()}</span>
                        </div>
                      )}

                      {tax > 0 && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span className="font-semibold">Tax ({invoice.taxPercent}%):</span>
                          <span className="font-mono font-bold">+{invoice.currency} {tax.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between py-2 border-b-2 border-slate-900 text-sm">
                        <span className="font-black text-slate-900 uppercase">Total Amount:</span>
                        <span className="font-mono font-black text-blue-600">{invoice.currency} {calculatedTotal.toLocaleString()}</span>
                      </div>

                      {advance > 0 && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-blue-600">
                          <span className="font-semibold">Advance Received:</span>
                          <span className="font-mono font-bold">-{invoice.currency} {advance.toLocaleString()}</span>
                        </div>
                      )}

                      {paid > 0 && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-600">
                          <span className="font-semibold">Amount Paid:</span>
                          <span className="font-mono font-bold">-{invoice.currency} {paid.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between py-2 bg-slate-900 text-white px-3 rounded-xl">
                        <span className="font-black uppercase text-xs">Balance Due:</span>
                        <span className="font-mono font-black text-sm">{invoice.currency} {calculatedBalance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Payment Info & Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-xs items-stretch">
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Bank Payment Details</p>
                    <div className="space-y-1 text-slate-700">
                      <p><strong className="text-slate-900 font-bold">Bank:</strong> {bank.bankName}</p>
                      <p><strong className="text-slate-900 font-bold">Account Name:</strong> {bank.accountName}</p>
                      <p><strong className="text-slate-900 font-bold">Account #:</strong> <span className="font-mono font-bold text-blue-600">{bank.accountNumber}</span></p>
                      <p><strong className="text-slate-900 font-bold">Branch:</strong> {bank.branchName}</p>
                      <p><strong className="text-slate-900 font-bold">Routing #:</strong> <span className="font-mono">{bank.routingNumber}</span></p>
                      {bank.bkashNumber && <p><strong className="text-slate-900 font-bold">bKash:</strong> <span className="font-mono">{bank.bkashNumber}</span></p>}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Terms & Conditions</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{terms}</p>
                  </div>

                  {branding.signatureEnabled && (
                    <div className="pt-2 text-right">
                      <div className="h-12 border-b border-slate-300 w-44 ml-auto flex flex-col items-center justify-end pb-1">
                        <img 
                          src={branding.signatureUrl || "/cfo_signature.png"} 
                          alt="CFO Signature" 
                          className="max-h-12 object-contain mix-blend-multiply" 
                          onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <p className="text-xs font-black text-slate-900 mt-1.5 tracking-tight">
                        {branding.signatoryName || "Nazmul Hossein Shuvo"}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        {branding.signatoryRole || "Chief Finance Officer"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENTS */}
      {activeTab === "payments" && (
        <section className="finance-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Payment Ledger</h3>
            <AdminButton onClick={() => setRecordPaymentOpen(true)} variant="primary">
              <DollarSign className="w-4 h-4 mr-1 inline" /> Record Payment
            </AdminButton>
          </div>

          {payments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No payments recorded for this invoice yet.</p>
          ) : (
            <div className="finance-table-scroll">
              <table className="finance-table">
                <thead className="bg-slate-50 font-black uppercase text-slate-400">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Reference</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map(p => (
                    <tr key={p.id}>
                      <td className="p-3 font-mono">{p.paymentDate}</td>
                      <td className="p-3 font-bold">{p.paymentMethod}</td>
                      <td className="p-3 font-mono">{p.transactionReference || "-"}</td>
                      <td className="p-3 text-right font-black text-emerald-600">+ BDT {p.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === "audit" && (
        <section className="finance-panel space-y-4">
          <h3 className="text-base font-black text-slate-900 mb-4">Activity Timeline</h3>
          <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
            {logs.map(log => (
              <div key={log.id} className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                <p className="text-xs font-black text-slate-900">{log.details}</p>
                <p className="text-[10px] text-slate-400 font-medium">By {log.userEmail} - {new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: GOOGLE SHEETS SYNC */}
      {activeTab === "sheets" && (
        <section className="finance-panel space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Google Sheets Synchronization</h3>
              <p className="text-xs text-slate-500 font-medium">Status for invoice record in external master spreadsheet.</p>
            </div>
            <AdminButton onClick={handleSyncSheets} loading={syncing} variant="primary">
              <RefreshCw className="w-4 h-4 mr-1.5 inline" /> Sync Now
            </AdminButton>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Sync Status</p>
              <AdminBadge color={invoice.googleSheetSyncStatus === "SYNCED" ? "green" : "yellow"}>
                {invoice.googleSheetSyncStatus}
              </AdminBadge>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Last Synced</p>
              <p className="font-mono font-bold text-slate-900">{invoice.lastSyncedAt ? new Date(invoice.lastSyncedAt).toLocaleString() : "Never"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-black uppercase text-slate-400">Sync Log</p>
              <p className="text-slate-600 font-mono text-[11px] truncate">{invoice.syncError || "Clean sync."}</p>
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      <RecordPaymentModal
        isOpen={recordPaymentOpen}
        onClose={() => setRecordPaymentOpen(false)}
        invoice={invoice}
        userEmail={userEmail}
        onSuccess={loadData}
      />

      <SendEmailModal
        isOpen={sendEmailOpen}
        onClose={() => setSendEmailOpen(false)}
        invoice={invoice}
        userEmail={userEmail}
        onSuccess={loadData}
      />
    </div>
  );
};
