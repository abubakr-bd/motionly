import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Invoice, FinanceSettings } from "../types/finance";
import { FinanceService } from "../lib/services/financeService";
import { PDFService } from "../lib/services/pdfService";
import { Download, FileText, ChevronDown, Image as ImageIcon, Copy, Check } from "lucide-react";

export const PublicInvoice = () => {
  const { id, publicToken } = useParams<{ id: string; publicToken: string }>();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPublicInvoice = async () => {
      setLoading(true);
      if (!id || !publicToken) {
        setError("Invalid invoice link.");
        setLoading(false);
        return;
      }

      const [inv, sData] = await Promise.all([
        FinanceService.getInvoiceById(id),
        FinanceService.getSettings()
      ]);

      if (!inv || inv.publicToken !== publicToken) {
        setError("Invoice not found or unauthorized token.");
        setLoading(false);
        return;
      }

      setInvoice(inv);
      setSettings(sData);
      setLoading(false);

      // Record client view event
      FinanceService.recordClientView(id).catch(console.error);
    };

    fetchPublicInvoice();
  }, [id, publicToken]);

  const handleDownloadPDF = async () => {
    if (!invoice || !settings) return;
    if (invoiceRef.current) {
      const ok = await PDFService.generateInvoicePDFFromElement(
        invoiceRef.current,
        `Motionly_Invoice_${invoice.invoiceNumber.replace("#", "")}`
      );
      if (!ok) {
        PDFService.generateProgrammaticPDF(invoice, settings.company, settings.bank, settings.branding);
      }
    } else {
      PDFService.generateProgrammaticPDF(invoice, settings.company, settings.bank, settings.branding);
    }
  };

  const handleDownloadPNG = async () => {
    if (!invoice || !invoiceRef.current) return;
    await PDFService.generateInvoicePNGFromElement(
      invoiceRef.current,
      `Motionly_Invoice_${invoice.invoiceNumber.replace("#", "")}`
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (copyError) {
      console.error("Could not copy invoice link:", copyError);
    }
  };

  if (loading) {
    return (
      <div className="site-invoice-loading" role="status">
        <span className="site-spinner" />
        <p>Loading invoice</p>
      </div>
    );
  }

  if (error || !invoice || !settings) {
    return (
      <div className="site-invoice-loading">
        <div className="site-invoice-error">
          <p className="site-kicker">Invoice</p>
          <h2>We could not open this invoice.</h2>
          <p className="text-slate-500 text-sm">{error || "Unable to load invoice."}</p>
        </div>
      </div>
    );
  }

  const branding = invoice.brandingOverride || settings.branding;
  const bank = invoice.bankInfoOverride || settings.bank;
  const terms = invoice.termsOverride || settings.defaultTerms;

  return (
    <div className="site-invoice-shell">
      {/* Top Floating Control Bar */}
      <div className="site-invoice-toolbar">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-sm">M</div>
          <div>
            <p className="text-xs font-black">Motionly Media Client Portal</p>
            <p className="text-[10px] text-slate-400">Invoice {invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Unified Download Dropdown Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
            aria-expanded={downloadDropdownOpen}
            aria-controls="invoice-download-menu"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${downloadDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {downloadDropdownOpen && (
            <>
              <button type="button" className="site-invoice-menu-backdrop" onClick={() => setDownloadDropdownOpen(false)} aria-label="Close download menu" />
              <div id="invoice-download-menu" className="site-invoice-download-menu">
                <button
                  type="button"
                  onClick={() => { setDownloadDropdownOpen(false); handleDownloadPDF(); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  Save as PDF
                </button>

                <button
                  type="button"
                  onClick={() => { setDownloadDropdownOpen(false); handleDownloadPNG(); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  Save as PNG Image
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => { setDownloadDropdownOpen(false); handleCopyLink(); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  {copiedLink ? "Copied Link!" : "Copy Invoice Link"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Document View */}
      <div className="site-invoice-document-wrap">
        <div
          ref={invoiceRef}
          className="site-invoice-paper"
          style={{ minHeight: "1050px" }}
        >
          {/* Watermark */}
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

            {/* Billed To & Dates */}
            <div className="grid grid-cols-2 gap-8 py-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Billed To</p>
                <h4 className="text-base font-black text-slate-900">{invoice.clientName}</h4>
                {invoice.clientCompany && <p className="text-xs font-bold text-slate-700">{invoice.clientCompany}</p>}
                {invoice.clientAddress && <p className="text-xs text-slate-500 font-medium whitespace-pre-line">{invoice.clientAddress}</p>}
                {invoice.clientEmail && <p className="text-xs text-slate-500 font-medium">{invoice.clientEmail}</p>}
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

            {/* Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Item & Description</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Rate</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.description}</td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-mono">{item.quantity} {item.unit || ""}</td>
                      <td className="py-3.5 px-4 text-right font-mono">{invoice.currency} {item.rate.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900 font-mono">{invoice.currency} {item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
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

            {/* Payment Details & Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-xs items-stretch">
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Bank Payment Details</p>
                  <div className="space-y-1 text-slate-700">
                    <p><strong className="text-slate-900 font-bold">Bank Name:</strong> {bank.bankName}</p>
                    <p><strong className="text-slate-900 font-bold">Account Name:</strong> {bank.accountName}</p>
                    <p><strong className="text-slate-900 font-bold">Account #:</strong> <span className="font-mono font-bold text-blue-600">{bank.accountNumber}</span></p>
                    <p><strong className="text-slate-900 font-bold">Branch:</strong> {bank.branchName}</p>
                    <p><strong className="text-slate-900 font-bold">Routing Number:</strong> <span className="font-mono">{bank.routingNumber}</span></p>
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
    </div>
  );
};

export default PublicInvoice;
