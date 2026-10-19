import React, { useState, useEffect } from "react";
import type { SavedService } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminButton, AdminInput, AdminTextarea, AdminModal, AdminBadge } from "../ui/AdminUI";
import { Plus, Search, Layers, Edit, CheckCircle, XCircle, Loader2 } from "lucide-react";

export const ServicesManager = ({ 
  notify,
  basePath = "/admin"
}: { 
  notify: (msg: string, type?: "ok" | "err") => void;
  basePath?: string;
}) => {
  const [services, setServices] = useState<SavedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<SavedService | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    defaultRate: 1000,
    unit: "Video",
    category: "Production",
    active: true
  });

  const loadServices = async () => {
    setLoading(true);
    const data = await FinanceService.getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      defaultRate: 1000,
      unit: "Video",
      category: "Production",
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service: SavedService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      defaultRate: service.defaultRate,
      unit: service.unit || "Item",
      category: service.category || "General",
      active: service.active
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      if (editingService) {
        await FinanceService.updateService(editingService.id, formData);
        notify("Service updated successfully");
      } else {
        await FinanceService.createService(formData);
        notify("New service created and synced to Google Sheets");
      }
      setModalOpen(false);
      loadServices();
    } catch (err: any) {
      notify(err.message || "Failed to save service", "err");
    }
  };

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-finance finance-page finance-services-page">
      <header className="finance-page-heading">
        <div className="finance-heading-content">
          <p className="site-kicker">Finance / Billing</p>
          <h1>Service catalog</h1>
          <p>Reusable line items and default rates for invoices.</p>
        </div>
        <AdminButton onClick={handleOpenAdd} variant="primary">
          <Plus className="w-4 h-4 mr-2 inline" />
          Add Service
        </AdminButton>
      </header>

      {/* Filter / Search Bar */}
      <div className="finance-toolbar">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search services"
            placeholder="Search services by name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Services Grid / Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-xs font-bold uppercase tracking-wider">Loading Services...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-black text-slate-900 mb-1">No services found</h3>
          <p className="text-slate-500 text-xs mb-4">Add your first service or seed sample data.</p>
          <AdminButton onClick={handleOpenAdd} variant="secondary">Create Service</AdminButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(service => (
            <article key={service.id} className="finance-panel finance-service-card">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <AdminBadge color={service.active ? "green" : "gray"}>
                    {service.category || "General"}
                  </AdminBadge>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {service.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">{service.name}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{service.description || "No description provided."}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Default Rate</p>
                  <p className="text-lg font-black text-slate-900">BDT {service.defaultRate.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ {service.unit}</span></p>
                </div>
                <button type="button" onClick={() => handleOpenEdit(service)} aria-label={`Edit ${service.name}`} className="finance-icon-button">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal Create/Edit Service */}
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingService ? "Edit Service" : "Add Reusable Service"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminInput
            label="Service Name"
            placeholder="e.g. Short Form Video Editing"
            value={formData.name}
            onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <AdminInput
              label="Default Rate (BDT)"
              type="number"
              value={formData.defaultRate}
              onChange={(e: any) => setFormData({ ...formData, defaultRate: parseFloat(e.target.value) || 0 })}
              required
            />
            <AdminInput
              label="Unit of Measure"
              placeholder="e.g. Video, Day, Hour, Item"
              value={formData.unit}
              onChange={(e: any) => setFormData({ ...formData, unit: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AdminInput
              label="Category"
              placeholder="e.g. Production, Post-Production, Marketing"
              value={formData.category}
              onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
            />
            <div className="space-y-1.5 w-full">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Status</label>
              <select
                value={formData.active ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, active: e.target.value === "true" })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <AdminTextarea
            label="Service Description"
            placeholder="Detailed description of what is included in this service..."
            rows={3}
            value={formData.description}
            onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton type="submit" variant="primary">Save Service</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
