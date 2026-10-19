import React, { useState, useEffect } from "react";
import type { FinanceSettings } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { DEFAULT_APPS_SCRIPT_CODE, GoogleSheetsService } from "../../../lib/services/googleSheetsService";
import { AdminButton, AdminInput, AdminTextarea, AdminBadge } from "../ui/AdminUI";
import { 
  Building, CreditCard, Shield, Copy, Check, RefreshCw, 
  Upload, Image as ImageIcon, FileText, CheckCircle2, AlertTriangle, ExternalLink, Loader2 
} from "lucide-react";

export const FinanceSettingsManager = ({ 
  notify,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void;
  basePath?: string;
}) => {
  const [settings, setSettings] = useState<FinanceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "company" | "bank" | "branding" | "sheets" | "email">("general");
  const [copiedScript, setCopiedScript] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    const data = await FinanceService.getSettings();
    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      await FinanceService.updateSettings(settings);
      notify("Finance settings saved successfully!");
    } catch (err: any) {
      notify(err.message || "Failed to save settings", "err");
    } finally {
      setSaving(false);
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(DEFAULT_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
    notify("Google Apps Script snippet copied to clipboard!");
  };

  if (loading || !settings) {
    return (
      <div className="admin-finance finance-loading-state" role="status">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-finance finance-page finance-settings-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance / Setup</p>
          <h1>Invoice settings</h1>
          <p>Manage the details and integrations used on client invoices.</p>
        </div>
        <AdminButton onClick={() => handleSave()} loading={saving} variant="primary">
          Save Settings
        </AdminButton>
      </header>

      {/* Tabs */}
      <div className="finance-tabs" role="group" aria-label="Invoice settings sections">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          aria-pressed={activeTab === "general"}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            activeTab === "general" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          General & Numbering
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          aria-pressed={activeTab === "company"}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            activeTab === "company" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Company Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          aria-pressed={activeTab === "bank"}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            activeTab === "bank" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Bank & Payment
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          aria-pressed={activeTab === "branding"}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            activeTab === "branding" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Central Branding
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sheets")}
          aria-pressed={activeTab === "sheets"}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            activeTab === "sheets" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          Google Sheets Integration
        </button>
      </div>

      {/* Tab Panels */}
      <section className="finance-panel finance-settings-panel">
        {/* General & Numbering */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <h3 className="text-base font-black text-slate-900">Invoice Numbering Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AdminInput
                label="Invoice Prefix"
                value={settings.numbering.prefix}
                onChange={(e: any) => setSettings({
                  ...settings,
                  numbering: { ...settings.numbering, prefix: e.target.value }
                })}
              />
              <AdminInput
                label="Starting Sequential Number"
                type="number"
                value={settings.numbering.startingNumber}
                onChange={(e: any) => setSettings({
                  ...settings,
                  numbering: { ...settings.numbering, startingNumber: parseInt(e.target.value, 10) || 1 }
                })}
              />
              <AdminInput
                label="Zero Padding Length"
                type="number"
                value={settings.numbering.numberPadding}
                onChange={(e: any) => setSettings({
                  ...settings,
                  numbering: { ...settings.numbering, numberPadding: parseInt(e.target.value, 10) || 5 }
                })}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">Next Generated Invoice Preview</p>
                <p className="text-lg font-black text-blue-600 font-mono">
                  {settings.numbering.prefix}{String(settings.numbering.startingNumber).padStart(settings.numbering.numberPadding, "0")}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-base font-black text-slate-900">Default Invoice Terms</h3>
              <AdminTextarea
                label="Default Payment & Terms Note"
                rows={3}
                value={settings.defaultTerms}
                onChange={(e: any) => setSettings({ ...settings, defaultTerms: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Company Profile */}
        {activeTab === "company" && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900">Motionly Media Entity Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Company Name"
                value={settings.company.companyName}
                onChange={(e: any) => setSettings({
                  ...settings,
                  company: { ...settings.company, companyName: e.target.value }
                })}
              />
              <AdminInput
                label="Support Email"
                value={settings.company.email}
                onChange={(e: any) => setSettings({
                  ...settings,
                  company: { ...settings.company, email: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Phone Number"
                value={settings.company.phone}
                onChange={(e: any) => setSettings({
                  ...settings,
                  company: { ...settings.company, phone: e.target.value }
                })}
              />
              <AdminInput
                label="Website URL"
                value={settings.company.website}
                onChange={(e: any) => setSettings({
                  ...settings,
                  company: { ...settings.company, website: e.target.value }
                })}
              />
            </div>
            <AdminInput
              label="Company Office Address"
              value={settings.company.companyAddress}
              onChange={(e: any) => setSettings({
                ...settings,
                company: { ...settings.company, companyAddress: e.target.value }
              })}
            />
            <AdminInput
              label="Tax / VAT / BIN Registration Info"
              value={settings.company.taxVatInfo || ""}
              onChange={(e: any) => setSettings({
                ...settings,
                company: { ...settings.company, taxVatInfo: e.target.value }
              })}
            />
          </div>
        )}

        {/* Bank & Payment */}
        {activeTab === "bank" && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900">Client Payment Instructions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Bank Name"
                placeholder="e.g. City Bank Limited"
                value={settings.bank.bankName}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, bankName: e.target.value }
                })}
              />
              <AdminInput
                label="Account Holder Name"
                placeholder="e.g. Motionly Media"
                value={settings.bank.accountName}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, accountName: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Account Number"
                placeholder="e.g. 1103984720001"
                value={settings.bank.accountNumber}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, accountNumber: e.target.value }
                })}
              />
              <AdminInput
                label="Branch Name"
                placeholder="e.g. Gulshan Branch, Dhaka"
                value={settings.bank.branchName}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, branchName: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Routing Number"
                placeholder="e.g. 225271842"
                value={settings.bank.routingNumber}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, routingNumber: e.target.value }
                })}
              />
              <AdminInput
                label="bKash Merchant / Personal Number"
                placeholder="e.g. +8801700000000"
                value={settings.bank.bkashNumber || ""}
                onChange={(e: any) => setSettings({
                  ...settings,
                  bank: { ...settings.bank, bkashNumber: e.target.value }
                })}
              />
            </div>
            <AdminTextarea
              label="Other Payment Instructions"
              rows={2}
              value={settings.bank.otherInstructions || ""}
              onChange={(e: any) => setSettings({
                ...settings,
                bank: { ...settings.bank, otherInstructions: e.target.value }
              })}
            />
          </div>
        )}

        {/* Central Branding */}
        {activeTab === "branding" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-black text-slate-900">Default Central Branding Assets</h3>
              <p className="text-xs text-slate-500 font-medium">Configure Motionly logo, background watermark, and official finance signatures.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Motionly Logo */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Official Motionly Logo</p>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.branding.logoEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, logoEnabled: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    Enabled
                  </label>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-center h-20">
                  <img
                    src={settings.branding.logoUrl || "/motionly_logo_brand.png"}
                    alt="Motionly Logo Preview"
                    className="max-h-14 max-w-full object-contain"
                  />
                </div>

                <AdminInput
                  label="Logo Asset URL"
                  placeholder="/motionly_logo_brand.png or https://..."
                  value={settings.branding.logoUrl || "/motionly_logo_brand.png"}
                  onChange={(e: any) => setSettings({
                    ...settings,
                    branding: { ...settings.branding, logoUrl: e.target.value }
                  })}
                />
              </div>

              {/* Card 2: Watermark System */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Watermark Configuration</p>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.branding.watermarkEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, watermarkEnabled: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    Enabled
                  </label>
                </div>

                <AdminInput
                  label="Watermark Display Text"
                  placeholder="MOTIONLY MEDIA"
                  value={settings.branding.watermarkText || "MOTIONLY MEDIA"}
                  onChange={(e: any) => setSettings({
                    ...settings,
                    branding: { ...settings.branding, watermarkText: e.target.value }
                  })}
                />

                <AdminInput
                  label="Watermark Image URL (Optional)"
                  placeholder="https://..."
                  value={settings.branding.watermarkUrl || ""}
                  onChange={(e: any) => setSettings({
                    ...settings,
                    branding: { ...settings.branding, watermarkUrl: e.target.value }
                  })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Opacity ({Math.round((settings.branding.watermarkOpacity || 0.07) * 100)}%)</label>
                    <input
                      type="range"
                      min="0.02"
                      max="0.3"
                      step="0.01"
                      value={settings.branding.watermarkOpacity || 0.07}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, watermarkOpacity: parseFloat(e.target.value) }
                      })}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Position</label>
                    <select
                      value={settings.branding.watermarkPosition || "center"}
                      onChange={(e: any) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, watermarkPosition: e.target.value }
                      })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="center">Center</option>
                      <option value="top-right">Top Right</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 3: Finance Officer Signature */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Finance Signature</p>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.branding.signatureEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, signatureEnabled: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    Enabled
                  </label>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center min-h-20 text-center">
                  {settings.branding.signatureUrl ? (
                    <img
                      src={settings.branding.signatureUrl}
                      alt="Signatory Signature"
                      className="max-h-12 object-contain"
                    />
                  ) : (
                    <p className="font-serif italic text-slate-600 font-bold text-sm">
                      {settings.branding.signatoryName || "Finance Officer"}
                    </p>
                  )}
                  <p className="text-[10px] font-black uppercase text-slate-400 mt-1">
                    {settings.branding.signatoryRole || "Chief Finance Officer"}
                  </p>
                </div>

                <AdminInput
                  label="Signature Image URL"
                  placeholder="https://... (PNG signature)"
                  value={settings.branding.signatureUrl || ""}
                  onChange={(e: any) => setSettings({
                    ...settings,
                    branding: { ...settings.branding, signatureUrl: e.target.value }
                  })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <AdminInput
                    label="Signatory Name"
                    placeholder="e.g. Nazmul Hossein Shuvo"
                    value={settings.branding.signatoryName || "Nazmul Hossein Shuvo"}
                    onChange={(e: any) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, signatoryName: e.target.value }
                    })}
                  />

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Signatory Title</label>
                    <select
                      value={settings.branding.signatoryRole || "Chief Finance Officer"}
                      onChange={(e: any) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, signatoryRole: e.target.value }
                      })}
                      className="w-full px-2 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="Chief Finance Officer">Chief Finance Officer</option>
                      <option value="Finance Officer">Finance Officer</option>
                      <option value="Head of Accounts">Head of Accounts</option>
                      <option value="Managing Director">Managing Director</option>
                      <option value="Authorized Signatory">Authorized Signatory</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Google Sheets Integration */}
        {activeTab === "sheets" && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Synchronized Google Spreadsheet
                </h4>
                <p className="text-xs text-emerald-700 font-medium">
                  ID: <span className="font-mono font-bold">1ykMwwRRI9nZIEfL98lg1QYcUDz_vckTiLyaDOwXZ0zU</span>
                </p>
              </div>
              <a
                href={GoogleSheetsService.getSpreadsheetUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5"
              >
                Open Google Sheet
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-900">
                <input
                  type="checkbox"
                  checked={settings.googleSheets.autoSync}
                  onChange={(e) => setSettings({
                    ...settings,
                    googleSheets: { ...settings.googleSheets, autoSync: e.target.checked }
                  })}
                  className="rounded w-4 h-4 text-emerald-600"
                />
                Automatically sync invoices, payments, clients, and services to Google Sheets
              </label>

              <AdminInput
                label="Google Apps Script Web App Endpoint URL"
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                value={settings.googleSheets.webhookUrl || ""}
                onChange={(e: any) => setSettings({
                  ...settings,
                  googleSheets: { ...settings.googleSheets, webhookUrl: e.target.value }
                })}
              />
            </div>

            {/* Google Apps Script Instructions */}
            <div className="p-6 bg-slate-900 text-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white">Google Apps Script Synchronization Code</h4>
                  <p className="text-xs text-slate-400">Copy this code into Google Sheets at Extensions, then open Apps Script and deploy it as a web app.</p>
                </div>
                <button
                  onClick={copyScript}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 flex items-center gap-2"
                >
                  {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedScript ? "Copied Code!" : "Copy Code"}
                </button>
              </div>

              <pre className="p-4 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto max-h-60 border border-slate-800">
                {DEFAULT_APPS_SCRIPT_CODE}
              </pre>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
