import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { 
  Edit2, Trash2, Plus, Loader2, Building2, ChevronUp, ChevronDown, 
  ExternalLink, Eye, EyeOff, Globe, Tag, Image as ImageIcon, Info, CheckCircle2, AlertCircle, Sliders
} from "lucide-react";
import { DEFAULT_PARTNERS, type PartnerItem } from "../../../lib/useSiteData";

export const PartnersManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<PartnerItem[]>([]);
  const [layers, setLayers] = useState<number>(() => {
    try {
      const cached = localStorage.getItem("motionly_partners_layers");
      if (cached) {
        const num = Number(cached);
        if (num >= 1 && num <= 3) return num;
      }
    } catch {}
    return 2;
  });
  const [savingLayers, setSavingLayers] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [logoPreviewError, setLogoPreviewError] = useState(false);

  const [form, setForm] = useState<{
    name: string;
    logoUrl: string;
    websiteUrl: string;
    description: string;
    category: string;
    enabled: boolean;
    order: number;
  }>({
    name: "",
    logoUrl: "",
    websiteUrl: "",
    description: "",
    category: "",
    enabled: true,
    order: 1,
  });

  useEffect(() => {
    let unsubPartners: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;

    getDb().then((db) => {
      const colRef = collection(db, "partners");
      unsubPartners = onSnapshot(
        colRef,
        (snap) => {
          if (snap.empty) {
            setItems(DEFAULT_PARTNERS);
          } else {
            const docs = snap.docs.map((d) => {
              const data = d.data();
              return {
                id: d.id,
                name: data.name || "",
                logoUrl: data.logoUrl || "",
                websiteUrl: data.websiteUrl || "",
                description: data.description || "",
                category: data.category || "",
                enabled: data.enabled !== undefined ? data.enabled : true,
                order: data.order ?? 0,
              } as PartnerItem;
            });
            docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            setItems(docs);
          }
          setLoading(false);
        },
        (err) => {
          console.error("Firestore error reading partners:", err);
          setItems(DEFAULT_PARTNERS);
          setLoading(false);
        }
      );

      unsubSettings = onSnapshot(doc(db, "settings", "partners"), (snap) => {
        if (snap.exists() && snap.data().layers !== undefined) {
          const count = Number(snap.data().layers) || 2;
          setLayers(count);
          try { localStorage.setItem("motionly_partners_layers", String(count)); } catch {}
        }
      });
    });

    return () => {
      unsubPartners?.();
      unsubSettings?.();
    };
  }, []);

  const handleUpdateLayers = async (newLayers: number) => {
    setSavingLayers(true);
    setLayers(newLayers);
    try {
      localStorage.setItem("motionly_partners_layers", String(newLayers));
      window.dispatchEvent(new Event("motionly_partners_layers_changed"));
    } catch {}

    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "partners"), { layers: newLayers }, { merge: true });
      await setDoc(doc(db, "settings", "site"), { partners: { layers: newLayers } }, { merge: true });
      logActivity(user, "updated", "partners_settings", `${newLayers} Layers`, "partners");
      notify(`Carousel set to ${newLayers} Layer${newLayers > 1 ? "s" : ""}`);
    } catch (err: any) {
      console.error(err);
      notify(err?.message ? `Failed: ${err.message}` : "Failed to update layer settings", "err");
    }
    setSavingLayers(false);
  };

  const resetForm = () => {
    setForm({
      name: "",
      logoUrl: "",
      websiteUrl: "",
      description: "",
      category: "",
      enabled: true,
      order: items.length + 1,
    });
    setEditingId(null);
    setLogoPreviewError(false);
  };

  const validateUrl = (url: string): string => {
    if (!url) return "";
    let trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = "https://" + trimmed;
    }
    return trimmed;
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      return notify("Partner Name is required", "err");
    }
    if (!form.logoUrl.trim()) {
      return notify("Logo Image URL is required", "err");
    }

    const formattedWebsite = validateUrl(form.websiteUrl);
    const formattedLogo = validateUrl(form.logoUrl);

    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        name: form.name.trim(),
        logoUrl: formattedLogo,
        websiteUrl: formattedWebsite,
        description: form.description.trim(),
        category: form.category.trim(),
        enabled: form.enabled,
        order: Number(form.order) || 1,
        updatedAt: Timestamp.now(),
      };

      if (editingId) {
        await setDoc(doc(db, "partners", editingId), payload, { merge: true });
        logActivity(user, "updated", "partners", form.name, editingId);
        notify("Partner updated successfully");
      } else {
        const newRef = doc(collection(db, "partners"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now() });
        logActivity(user, "created", "partners", form.name, newRef.id);
        notify("Partner added successfully");
      }

      setIsAdding(false);
      resetForm();
    } catch (err: any) {
      console.error(err);
      notify(err?.message ? `Failed: ${err.message}` : "Failed to save partner", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: PartnerItem) => {
    setForm({
      name: item.name || "",
      logoUrl: item.logoUrl || "",
      websiteUrl: item.websiteUrl || "",
      description: item.description || "",
      category: item.category || "",
      enabled: item.enabled !== undefined ? item.enabled : true,
      order: item.order ?? 1,
    });
    setEditingId(item.id);
    setLogoPreviewError(false);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete partner "${name}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "partners", id));
      logActivity(user, "deleted", "partners", name, id);
      notify("Partner deleted");
    } catch (err) {
      console.error(err);
      notify("Delete failed", "err");
    }
  };

  const toggleEnabled = async (item: PartnerItem) => {
    try {
      const db = await getDb();
      const newStatus = !item.enabled;
      await setDoc(doc(db, "partners", item.id), { enabled: newStatus }, { merge: true });
      logActivity(user, newStatus ? "enabled" : "disabled", "partners", item.name, item.id);
      notify(`Partner ${newStatus ? "enabled" : "disabled"}`);
    } catch {
      notify("Status update failed", "err");
    }
  };

  const moveOrder = async (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= items.length) return;
    const db = await getDb();
    const current = items[index];
    const swapWith = items[index + direction];

    await setDoc(doc(db, "partners", current.id), { order: index + direction + 1 }, { merge: true });
    await setDoc(doc(db, "partners", swapWith.id), { order: index + 1 }, { merge: true });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Partners &amp; Brands</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Manage partner logos, descriptions, category tags, and external website links.
          </p>
        </div>
        <AdminButton
          onClick={() => {
            if (isAdding) {
              setIsAdding(false);
              resetForm();
            } else {
              resetForm();
              setIsAdding(true);
            }
          }}
        >
          {isAdding ? (
            "Cancel"
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add Partner
            </>
          )}
        </AdminButton>
      </div>

      {/* Carousel Layer Configuration Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4.5 h-4.5 text-blue-600" />
              Carousel Layers (Rows)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select how many moving logo rows to display on the public website.
            </p>
          </div>
          {savingLayers && <span className="text-xs text-blue-600 font-semibold animate-pulse">Saving settings...</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {[
            { count: 1, title: "1 Layer", desc: "Single row scrolling left (Clockwise)" },
            { count: 2, title: "2 Layers", desc: "Dual rows (Row 1 left, Row 2 right anti-clockwise)" },
            { count: 3, title: "3 Layers", desc: "Triple alternating rows for maximum visual density" },
          ].map((opt) => {
            const isSelected = layers === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => handleUpdateLayers(opt.count)}
                disabled={savingLayers}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between relative cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                    : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className={`text-sm font-bold ${isSelected ? "text-blue-600" : "text-slate-900"}`}>
                    {opt.title}
                  </span>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-slate-500 font-normal leading-relaxed">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Drawer / Panel */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              {editingId ? "Edit Partner Record" : "Add New Partner"}
            </h3>
            <span className="text-xs text-slate-400 font-medium">All changes sync live to the homepage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Partner Name *"
              placeholder="e.g. EquiSaaS BD"
              value={form.name}
              onChange={(e: any) => setForm({ ...form, name: e.target.value })}
            />

            <AdminInput
              label="Category / Tag"
              placeholder="e.g. Technology, SaaS, Media"
              value={form.category}
              onChange={(e: any) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          {/* Logo URL Input + Live Preview Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <AdminInput
                label="Logo Image URL *"
                placeholder="https://example.com/logo.png"
                value={form.logoUrl}
                onChange={(e: any) => {
                  setForm({ ...form, logoUrl: e.target.value });
                  setLogoPreviewError(false);
                }}
              />
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Direct external image URL (PNG, SVG, WebP recommended).
              </p>
            </div>

            {/* Live Logo Preview Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Live Logo Preview</label>
              <div className="h-[70px] bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden shadow-inner">
                {form.logoUrl && !logoPreviewError ? (
                  <img
                    src={form.logoUrl}
                    alt="Logo Preview"
                    onError={() => setLogoPreviewError(true)}
                    className="max-h-12 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-400 flex flex-col items-center gap-1">
                    <ImageIcon className="w-5 h-5 text-slate-300" />
                    <span className="text-[11px] font-medium">
                      {form.logoUrl ? "Failed to load image" : "No URL entered"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Website URL"
              placeholder="https://equisaas-bd.com/"
              value={form.websiteUrl}
              onChange={(e: any) => setForm({ ...form, websiteUrl: e.target.value })}
            />

            <AdminInput
              label="Display Order"
              type="number"
              value={form.order}
              onChange={(e: any) => setForm({ ...form, order: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description / Details
            </label>
            <textarea
              rows={3}
              placeholder="Short company snippet or brand overview..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Enabled Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-sm font-bold text-slate-900 block">Enable Partner</span>
              <span className="text-xs text-slate-500 font-normal">
                When enabled, logo appears on the live marquee carousel.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, enabled: !form.enabled })}
              className={`w-12 h-6 rounded-full transition-colors p-1 relative flex items-center ${
                form.enabled ? "bg-blue-600 justify-end" : "bg-slate-300 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Form Submit Row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                resetForm();
              }}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <AdminButton onClick={handleSave} loading={saving}>
              {editingId ? "Update Partner" : "Save Partner"}
            </AdminButton>
          </div>
        </div>
      )}

      {/* Partners List / Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            Partners List ({items.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">Reorder or toggle visibility instantly</span>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No partners added yet. Click "Add Partner" above to create one.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
              >
                {/* Reorder handle buttons */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveOrder(idx, -1)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-bold text-slate-400">{item.order}</span>
                  <button
                    disabled={idx === items.length - 1}
                    onClick={() => moveOrder(idx, 1)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Logo Preview */}
                <div className="w-20 h-14 bg-slate-100 rounded-xl border border-slate-200/60 flex items-center justify-center p-2 shrink-0">
                  {item.logoUrl ? (
                    <img src={item.logoUrl} alt={item.name} className="max-h-10 max-w-full object-contain" />
                  ) : (
                    <Building2 className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                    {item.category && (
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full uppercase">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.description || "No description specified."}
                  </p>
                  {item.websiteUrl && (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline mt-1"
                    >
                      <Globe className="w-3 h-3" /> {item.websiteUrl} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {/* Status Toggle & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Status Badge */}
                  <button
                    onClick={() => toggleEnabled(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      item.enabled !== false
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {item.enabled !== false ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-green-600" /> Enabled
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-400" /> Disabled
                      </>
                    )}
                  </button>

                  {/* Edit button */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-600 hover:bg-slate-200/80 rounded-xl transition-all"
                    title="Edit Partner"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete Partner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersManager;
