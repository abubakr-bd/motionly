import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Invoice, InvoiceItem, Client, SavedService, FinanceSettings } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminButton, AdminInput, AdminTextarea, AdminModal } from "../ui/AdminUI";
import { 
  Plus, Trash2, ArrowLeft, Save, UserPlus,
  DollarSign, FileText, CheckCircle2, ChevronDown, Loader2 
} from "lucide-react";

export const InvoiceEditor = ({ 
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
  const isEdit = Boolean(id);

  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<SavedService[]>([]);
  const [settings, setSettings] = useState<FinanceSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientTaxVatInfo, setClientTaxVatInfo] = useState("");

  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentTerms, setPaymentTerms] = useState("Due on Receipt");
  const [poNumber, setPoNumber] = useState("");
  const [project, setProject] = useState("");
  const [currency, setCurrency] = useState("BDT");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "item_1",
      description: "",
      quantity: 1,
      unit: "Item",
      rate: 0,
      discount: 0,
      amount: 0
    }
  ]);

  const [overallDiscount, setOverallDiscount] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [termsOverride, setTermsOverride] = useState("");

  // Modal Create Client
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "", company: "", email: "", phone: "", address: "", taxVatInfo: ""
  });

  const loadData = async () => {
    setLoading(true);
    const [cData, sData, setRes] = await Promise.all([
      FinanceService.getClients(),
      FinanceService.getServices(),
      FinanceService.getSettings()
    ]);

    setClients(cData);
    setServices(sData);
    setSettings(setRes);

    if (isEdit && id) {
      const inv = await FinanceService.getInvoiceById(id);
      if (inv) {
        setInvoiceNumber(inv.invoiceNumber);
        setSelectedClientId(inv.clientId);
        setClientName(inv.clientName);
        setClientCompany(inv.clientCompany || "");
        setClientEmail(inv.clientEmail || "");
        setClientPhone(inv.clientPhone || "");
        setClientAddress(inv.clientAddress || "");
        setClientTaxVatInfo(inv.clientTaxVatInfo || "");

        setIssueDate(inv.issueDate);
        setDueDate(inv.dueDate);
        setPaymentTerms(inv.paymentTerms || "Due on Receipt");
        setPoNumber(inv.poNumber || "");
        setProject(inv.project || "");
        setCurrency(inv.currency || "BDT");

        setItems(inv.items || []);
        setOverallDiscount(inv.discount || 0);
        setTaxPercent(inv.taxPercent || 0);
        setAdvanceAmount(inv.advanceAmount || 0);
        setNotes(inv.notes || "");
        setTermsOverride(inv.termsOverride || "");
      }
    } else {
      const genNum = await FinanceService.generateInvoiceNumber();
      setInvoiceNumber(genNum);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Client Selection Handler
  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    const found = clients.find(c => c.id === clientId);
    if (found) {
      setClientName(found.name);
      setClientCompany(found.company || "");
      setClientEmail(found.email || "");
      setClientPhone(found.phone || "");
      setClientAddress(found.address || "");
      setClientTaxVatInfo(found.taxVatInfo || "");
    }
  };

  // Add Item Line
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        description: "",
        quantity: 1,
        unit: "Item",
        rate: 0,
        discount: 0,
        amount: 0
      }
    ]);
  };

  // Select Saved Service for a line item
  const handleSelectService = (index: number, serviceId: string) => {
    const srv = services.find(s => s.id === serviceId);
    if (!srv) return;
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      serviceId: srv.id,
      description: srv.name,
      unit: srv.unit || "Item",
      rate: srv.defaultRate,
      amount: (updated[index].quantity * srv.defaultRate) - updated[index].discount
    };
    setItems(updated);
  };

  // Line item change handler
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    const target = { ...updated[index], [field]: value };
    
    // Recalculate amount for line
    const qty = field === "quantity" ? parseFloat(value) || 0 : target.quantity;
    const rate = field === "rate" ? parseFloat(value) || 0 : target.rate;
    const disc = field === "discount" ? parseFloat(value) || 0 : target.discount;

    target.amount = Math.max(0, (qty * rate) - disc);
    updated[index] = target;
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Save Client Quick Modal
  const handleCreateClientQuick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.name) return;
    try {
      const created = await FinanceService.createClient(newClientData);
      const updatedClients = await FinanceService.getClients();
      setClients(updatedClients);
      handleSelectClient(created.id);
      setClientModalOpen(false);
      notify("New client created!");
    } catch (err: any) {
      notify(err.message || "Failed to create client", "err");
    }
  };

  // Financial Math
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const taxAmount = (subtotal - overallDiscount) * (taxPercent / 100);
  const total = Math.max(0, subtotal - overallDiscount + taxAmount);
  const balanceDue = Math.max(0, total - advanceAmount);

  // Save Invoice Submit
  const handleSaveInvoice = async (saveStatus: "DRAFT" | "SENT" = "DRAFT") => {
    if (!clientName) {
      notify("Please select or enter a client name.", "err");
      return;
    }

    if (items.some(i => !i.description)) {
      notify("Please fill in description for all line items.", "err");
      return;
    }

    setSaving(true);

    try {
      const payload: Omit<Invoice, "id" | "publicToken" | "createdAt" | "updatedAt" | "googleSheetSyncStatus" | "createdBy"> = {
        invoiceNumber,
        clientId: selectedClientId || `cli_custom_${Date.now()}`,
        clientName,
        clientCompany,
        clientEmail,
        clientPhone,
        clientAddress,
        clientTaxVatInfo,
        issueDate,
        dueDate,
        paymentTerms,
        poNumber,
        project,
        currency,
        items,
        subtotal,
        discount: overallDiscount,
        taxPercent,
        taxAmount,
        advanceAmount,
        total,
        amountPaid: 0,
        balanceDue,
        status: saveStatus,
        notes,
        termsOverride
      };

      let savedInv: Invoice;
      if (isEdit && id) {
        savedInv = await FinanceService.updateInvoice(id, payload, userEmail);
        notify(`Invoice ${savedInv.invoiceNumber} updated!`);
      } else {
        savedInv = await FinanceService.createInvoice(payload, userEmail);
        notify(`Invoice ${savedInv.invoiceNumber} created and synced to Google Sheets!`);
      }

      navigate(`${basePath}/invoices/view/${savedInv.id}`);
    } catch (err: any) {
      notify(err.message || "Failed to save invoice", "err");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="admin-finance finance-loading-state" role="status">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading Invoice Editor...</p>
      </div>
    );
  }

  return (
    <div className="admin-finance finance-page finance-editor-page">
      <header className="finance-page-heading">
        <div className="finance-heading-back flex items-center gap-3">
          <Link to={`${basePath}/invoices`} aria-label="Back to invoices" className="finance-back-link">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="finance-heading-content">
            <p className="site-kicker">Finance / Billing</p>
            <h1>
              {isEdit ? `Edit Invoice ${invoiceNumber}` : "Create New Invoice"}
            </h1>
            <p>Build a clear invoice for your client.</p>
          </div>
        </div>

        <div className="finance-header-actions">
          <AdminButton variant="secondary" onClick={() => handleSaveInvoice("DRAFT")} loading={saving}>
            Save as Draft
          </AdminButton>
          <AdminButton variant="primary" onClick={() => handleSaveInvoice("SENT")} loading={saving}>
            <Save className="w-4 h-4 mr-1.5 inline" /> Save & Continue
          </AdminButton>
        </div>
      </header>

      <div className="finance-editor-grid">
        {/* Main Form Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION A: Invoice Meta */}
          <section className="finance-panel space-y-4">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Invoice Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Invoice Number"
                value={invoiceNumber}
                onChange={(e: any) => setInvoiceNumber(e.target.value)}
                required
              />
              <div className="space-y-1.5 w-full">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="finance-control"
                >
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5 w-full">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Issue Date</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="finance-control"
                />
              </div>

              <div className="space-y-1.5 w-full">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="finance-control"
                />
              </div>

              <div className="space-y-1.5 w-full">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="finance-control"
                >
                  <option value="Due on Receipt">Due on Receipt</option>
                  <option value="Net 7">Net 7 Days</option>
                  <option value="Net 15">Net 15 Days</option>
                  <option value="Net 30">Net 30 Days</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="PO Number (Optional)"
                placeholder="e.g. PO-8891"
                value={poNumber}
                onChange={(e: any) => setPoNumber(e.target.value)}
              />
              <AdminInput
                label="Project Name (Optional)"
                placeholder="e.g. Q3 Commercial Campaign"
                value={project}
                onChange={(e: any) => setProject(e.target.value)}
              />
            </div>
          </section>

          {/* SECTION B: Client Picker */}
          <section className="finance-panel space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Billed Client</h3>
              <button
                type="button"
                onClick={() => setClientModalOpen(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" />
                + Create New Client
              </button>
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Select Existing Client</label>
              <select
                value={selectedClientId}
                onChange={(e) => handleSelectClient(e.target.value)}
                className="finance-control"
              >
                <option value="">-- Choose Client --</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ""}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Client Full Name"
                placeholder="Mohammed Afjal Hossain"
                value={clientName}
                onChange={(e: any) => setClientName(e.target.value)}
                required
              />
              <AdminInput
                label="Company Name"
                placeholder="Company Name"
                value={clientCompany}
                onChange={(e: any) => setClientCompany(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminInput
                label="Client Email"
                placeholder="email@example.com"
                value={clientEmail}
                onChange={(e: any) => setClientEmail(e.target.value)}
              />
              <AdminInput
                label="Client Phone"
                placeholder="+880 1700-000000"
                value={clientPhone}
                onChange={(e: any) => setClientPhone(e.target.value)}
              />
            </div>

            <AdminInput
              label="Billing Address"
              placeholder="Address"
              value={clientAddress}
              onChange={(e: any) => setClientAddress(e.target.value)}
            />
          </section>

          {/* SECTION C: Line Items Table */}
          <section className="finance-panel space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Line Items</h3>
              <AdminButton onClick={handleAddItem} variant="secondary">
                <Plus className="w-4 h-4 mr-1 inline" /> Add Line Item
              </AdminButton>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={item.id} className="finance-line-item space-y-3 relative group">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black uppercase text-slate-400">Item #{idx + 1}</span>

                    {services.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">Preset Service:</span>
                        <select
                          onChange={(e) => handleSelectService(idx, e.target.value)}
                          className="finance-control"
                        >
                          <option value="">-- Choose Service --</option>
                          {services.map(s => (
                            <option key={s.id} value={s.id}>{s.name} ({s.defaultRate} BDT)</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    <div className="sm:col-span-6">
                      <AdminInput
                        placeholder="Description of service/deliverable..."
                        value={item.description}
                        onChange={(e: any) => handleItemChange(idx, "description", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <AdminInput
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e: any) => handleItemChange(idx, "quantity", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <AdminInput
                        type="number"
                        placeholder="Rate (BDT)"
                        value={item.rate}
                        onChange={(e: any) => handleItemChange(idx, "rate", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-1 text-right pb-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        disabled={items.length <= 1}
                        className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-30 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                    <span>Unit: {item.unit || "Item"}</span>
                    <span className="font-mono font-bold text-slate-900">
                      Amount: {currency} {(item.amount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column Totals & Settings */}
        <div className="space-y-6">
          <section className="finance-panel finance-total-summary space-y-4">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-3">Financial Calculation</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Subtotal:</span>
                <span className="font-mono font-bold text-white">{currency} {subtotal.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Discount Amount ({currency})</label>
                <input
                  type="number"
                  value={overallDiscount}
                  onChange={(e) => setOverallDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Advance Amount Received ({currency})</label>
                <input
                  type="number"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="font-black uppercase text-xs text-slate-300">Total Amount:</span>
                <span className="font-mono font-black text-lg text-blue-400">{currency} {total.toLocaleString()}</span>
              </div>

              <div className="pt-2 flex justify-between items-center bg-slate-800 p-3 rounded-2xl">
                <span className="font-black uppercase text-xs text-slate-300">Balance Due:</span>
                <span className="font-mono font-black text-base text-emerald-400">{currency} {balanceDue.toLocaleString()}</span>
              </div>
            </div>

            <AdminButton variant="primary" onClick={() => handleSaveInvoice("SENT")} loading={saving} className="w-full">
              Save & View Invoice
            </AdminButton>
          </section>

          <section className="finance-panel space-y-4">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Notes & Terms</h3>
            <AdminTextarea
              label="Invoice Notes for Client"
              placeholder="Thank you for working with Motionly Media..."
              rows={3}
              value={notes}
              onChange={(e: any) => setNotes(e.target.value)}
            />
          </section>
        </div>
      </div>

      {/* Modal Quick Create Client */}
      <AdminModal isOpen={clientModalOpen} onClose={() => setClientModalOpen(false)} title="Quick Create Client">
        <form onSubmit={handleCreateClientQuick} className="space-y-4">
          <AdminInput
            label="Client Name"
            placeholder="e.g. Mohammed Afjal Hossain"
            value={newClientData.name}
            onChange={(e: any) => setNewClientData({ ...newClientData, name: e.target.value })}
            required
          />
          <AdminInput
            label="Company Name"
            placeholder="Company Name"
            value={newClientData.company}
            onChange={(e: any) => setNewClientData({ ...newClientData, company: e.target.value })}
          />
          <AdminInput
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={newClientData.email}
            onChange={(e: any) => setNewClientData({ ...newClientData, email: e.target.value })}
          />
          <AdminInput
            label="Phone"
            placeholder="+880 1700-000000"
            value={newClientData.phone}
            onChange={(e: any) => setNewClientData({ ...newClientData, phone: e.target.value })}
          />
          <AdminInput
            label="Address"
            placeholder="Address"
            value={newClientData.address}
            onChange={(e: any) => setNewClientData({ ...newClientData, address: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="secondary" onClick={() => setClientModalOpen(false)}>Cancel</AdminButton>
            <AdminButton type="submit" variant="primary">Create Client</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
