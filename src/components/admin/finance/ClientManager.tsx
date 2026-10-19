import React, { useState, useEffect } from "react";
import type { Client, Invoice } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminButton, AdminInput, AdminTextarea, AdminModal, AdminBadge } from "../ui/AdminUI";
import { Plus, Search, Users, Phone, Mail, Building, FileText, ChevronRight, X, Loader2 } from "lucide-react";

export const ClientManager = ({ 
  notify,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void;
  basePath?: string;
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClientDrawer, setSelectedClientDrawer] = useState<Client | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    taxVatInfo: "",
    notes: ""
  });

  const loadData = async () => {
    setLoading(true);
    const [cData, iData] = await Promise.all([
      FinanceService.getClients(),
      FinanceService.getInvoices()
    ]);
    setClients(cData);
    setInvoices(iData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      taxVatInfo: "",
      notes: ""
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      taxVatInfo: client.taxVatInfo || "",
      notes: client.notes || ""
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      if (editingClient) {
        await FinanceService.updateClient(editingClient.id, formData);
        notify("Client updated successfully");
      } else {
        await FinanceService.createClient(formData);
        notify("Client created and synced to Google Sheets");
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      notify(err.message || "Failed to save client", "err");
    }
  };

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const getClientStats = (clientId: string) => {
    const clientInvoices = invoices.filter(i => i.clientId === clientId && i.status !== "CANCELLED" && i.status !== "ARCHIVED");
    const totalInvoiced = clientInvoices.reduce((sum, i) => sum + i.total, 0);
    const totalPaid = clientInvoices.reduce((sum, i) => sum + (i.amountPaid || 0) + (i.advanceAmount || 0), 0);
    const outstanding = clientInvoices.reduce((sum, i) => sum + i.balanceDue, 0);
    return { count: clientInvoices.length, totalInvoiced, totalPaid, outstanding, clientInvoices };
  };

  return (
    <div className="admin-finance finance-page finance-clients-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance / Relationships</p>
          <h1>Clients</h1>
          <p>Client billing details, invoice history, and account balances.</p>
        </div>
        <AdminButton onClick={handleOpenAdd} variant="primary">
          <Plus className="w-4 h-4 mr-2 inline" />
          Add Client
        </AdminButton>
      </header>

      {/* Filter / Search Bar */}
      <div className="finance-toolbar">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search clients"
            placeholder="Search clients by name, company, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Client List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-xs font-bold uppercase tracking-wider">Loading Clients...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-black text-slate-900 mb-1">No clients found</h3>
          <p className="text-slate-500 text-xs mb-4">Create your first client to send invoices.</p>
          <AdminButton onClick={handleOpenAdd} variant="secondary">Add New Client</AdminButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(client => {
            const stats = getClientStats(client.id);
            return (
              <div 
                key={client.id}
                onClick={() => setSelectedClientDrawer(client)}
                role="button"
                tabIndex={0}
                aria-label={`View client ${client.name}`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedClientDrawer(client);
                  }
                }}
                className="finance-panel finance-client-card group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-black text-sm flex items-center justify-center">
                      {client.name.charAt(0)}
                    </span>
                    <AdminBadge color={stats.outstanding > 0 ? "yellow" : "green"}>
                      {stats.count} {stats.count === 1 ? "Invoice" : "Invoices"}
                    </AdminBadge>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{client.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">{client.company || "Individual Client"}</p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    {client.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Total Outstanding</p>
                    <p className={`text-base font-black ${stats.outstanding > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                      BDT {stats.outstanding.toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Client Detail Side Drawer */}
      {selectedClientDrawer && (
        <div className="finance-drawer-layer">
          <button type="button" className="finance-drawer-backdrop" onClick={() => setSelectedClientDrawer(null)} aria-label="Close client details" />
          <aside className="finance-client-drawer" role="dialog" aria-modal="true" aria-labelledby="finance-client-title">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h2 id="finance-client-title" className="text-xl font-black text-slate-900">{selectedClientDrawer.name}</h2>
                  <p className="text-xs text-slate-500 font-medium">{selectedClientDrawer.company || "No Company Specified"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(selectedClientDrawer)} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200">
                    Edit
                  </button>
                  <button type="button" onClick={() => setSelectedClientDrawer(null)} aria-label="Close client details" className="finance-icon-button">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              {(() => {
                const stats = getClientStats(selectedClientDrawer.id);
                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400">Total Invoiced</p>
                        <p className="text-sm font-black text-slate-900">BDT {stats.totalInvoiced.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                        <p className="text-[10px] font-black uppercase text-emerald-600">Total Paid</p>
                        <p className="text-sm font-black text-emerald-700">BDT {stats.totalPaid.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                        <p className="text-[10px] font-black uppercase text-amber-600">Outstanding</p>
                        <p className="text-sm font-black text-amber-700">BDT {stats.outstanding.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Profile Meta */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-xs text-slate-600">
                      <p><strong className="text-slate-900">Email:</strong> {selectedClientDrawer.email || "N/A"}</p>
                      <p><strong className="text-slate-900">Phone:</strong> {selectedClientDrawer.phone || "N/A"}</p>
                      <p><strong className="text-slate-900">Address:</strong> {selectedClientDrawer.address || "N/A"}</p>
                      {selectedClientDrawer.taxVatInfo && <p><strong className="text-slate-900">Tax/VAT:</strong> {selectedClientDrawer.taxVatInfo}</p>}
                      {selectedClientDrawer.notes && <p><strong className="text-slate-900">Notes:</strong> {selectedClientDrawer.notes}</p>}
                    </div>

                    {/* Associated Invoices */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Invoice History</h3>
                      {stats.clientInvoices.length === 0 ? (
                        <p className="text-xs text-slate-400 font-medium italic">No invoices recorded for this client.</p>
                      ) : (
                        <div className="space-y-2">
                          {stats.clientInvoices.map(inv => (
                            <a
                              key={inv.id}
                              href={`${basePath}/invoices/view/${inv.id}`}
                              className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-50/50 transition-colors"
                            >
                              <div>
                                <p className="text-xs font-black text-slate-900">{inv.invoiceNumber}</p>
                                <p className="text-[10px] text-slate-400">{inv.issueDate}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-900">BDT {inv.total.toLocaleString()}</p>
                                <span className={`text-[10px] font-bold ${inv.status === "PAID" ? "text-emerald-600" : "text-amber-600"}`}>
                                  {inv.status}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </aside>
        </div>
      )}

      {/* Modal Add / Edit Client */}
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingClient ? "Edit Client Profile" : "Create New Client"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AdminInput
              label="Client Name"
              placeholder="e.g. Mohammed Afjal Hossain"
              value={formData.name}
              onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <AdminInput
              label="Company Name"
              placeholder="e.g. Motionly Media / Tech Corp"
              value={formData.company}
              onChange={(e: any) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AdminInput
              label="Email Address"
              type="email"
              placeholder="client@example.com"
              value={formData.email}
              onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
            />
            <AdminInput
              label="Phone Number"
              placeholder="+880 1700-000000"
              value={formData.phone}
              onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <AdminInput
            label="Full Address"
            placeholder="House/Road, Area, City, Postcode, Country"
            value={formData.address}
            onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}
          />

          <AdminInput
            label="Tax / VAT Number"
            placeholder="e.g. BIN: 123456789"
            value={formData.taxVatInfo}
            onChange={(e: any) => setFormData({ ...formData, taxVatInfo: e.target.value })}
          />

          <AdminTextarea
            label="Internal Notes"
            placeholder="Internal client preferences or notes..."
            rows={3}
            value={formData.notes}
            onChange={(e: any) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton type="submit" variant="primary">Save Client</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
