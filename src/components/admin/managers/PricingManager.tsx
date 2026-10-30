import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { 
  AdminButton, AdminInput, AdminTextarea, AdminBadge, 
  AdminPageHeader, AdminModal, AdminEmptyState 
} from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { DEFAULT_PRICING_PLANS } from "../../../lib/useSiteData";
import { Edit2, Trash2, Plus, Loader2, Check, Sparkles, RefreshCw, RotateCcw } from "lucide-react";

export const PricingManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    cta: "",
    popular: false,
    order: 0
  });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      const colRef = collection(db, "pricing");
      unsub = onSnapshot(colRef, snap => {
        const docs = snap.docs.map(d => ({ fid: d.id, ...d.data() }));
        docs.sort((a: any, b: any) => {
          const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });
        setItems(docs);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleSave = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      return notify("Plan Name and Price are required", "err");
    }
    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        name: form.name.trim(),
        price: form.price.trim(),
        description: form.description.trim(),
        features: Array.isArray(form.features)
          ? form.features
          : form.features.split("\n").map((s: string) => s.trim()).filter(Boolean),
        cta: form.cta.trim() || "Discuss this plan",
        popular: Boolean(form.popular),
        order: Number(form.order) || 0,
        updatedAt: Timestamp.now()
      };

      if (editingId) {
        await setDoc(doc(db, "pricing", editingId), payload, { merge: true });
        logActivity(user, "updated", "pricing", form.name, editingId);
        notify("Pricing tier updated");
      } else {
        const newRef = doc(collection(db, "pricing"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now() });
        logActivity(user, "created", "pricing", form.name, newRef.id);
        notify("Pricing tier added");
      }
      setIsAdding(false);
      setEditingId(null);
    } catch {
      notify("Failed to save pricing tier", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: any) => {
    setForm({
      name: item.name || "",
      price: item.price || "",
      description: item.description || "",
      features: Array.isArray(item.features) ? item.features.join("\n") : item.features || "",
      cta: item.cta || "",
      popular: item.popular || false,
      order: item.order ?? items.length
    });
    setEditingId(item.fid);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete pricing tier "${name}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "pricing", id));
      logActivity(user, "deleted", "pricing", name, id);
      notify("Pricing tier deleted");
    } catch {
      notify("Delete failed", "err");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Reset all pricing packages to Motionly's default retainer tiers (Starter $3,200, Growth $5,800, Authority $9,500, Enterprise)?")) return;
    setSaving(true);
    try {
      const db = await getDb();
      for (const plan of DEFAULT_PRICING_PLANS) {
        await setDoc(doc(db, "pricing", plan.id), {
          name: plan.name,
          price: plan.price,
          description: plan.description,
          features: plan.features,
          cta: plan.cta,
          popular: plan.popular || false,
          order: plan.order,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }, { merge: true });
      }
      logActivity(user, "updated", "pricing", "Loaded default pricing tiers");
      notify("Default pricing plans successfully loaded!");
    } catch (err) {
      console.error(err);
      notify("Failed to seed pricing plans", "err");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Pricing Engine"
        description="Configure client retainer tiers, included deliverables, pricing, and recommended highlights."
        action={
          <div className="flex items-center gap-2.5">
            <AdminButton variant="secondary" onClick={handleSeedDefaults} loading={saving}>
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Reset to Defaults</span>
            </AdminButton>
            <AdminButton
              onClick={() => {
                setForm({
                  name: "",
                  price: "",
                  description: "",
                  features: "",
                  cta: "Discuss this plan",
                  popular: false,
                  order: items.length
                });
                setEditingId(null);
                setIsAdding(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add Plan
            </AdminButton>
          </div>
        }
      />

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : items.length === 0 ? (
        <AdminEmptyState
          title="No pricing plans created"
          description="Create structured tiers to showcase your services and monthly retainer packages."
          actionLabel="Add Plan"
          onAction={() => {
            setForm({
              name: "",
              price: "",
              description: "",
              features: "",
              cta: "Discuss this plan",
              popular: false,
              order: items.length
            });
            setEditingId(null);
            setIsAdding(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {items.map(item => (
            <div
              key={item.fid}
              className={`bg-white rounded-3xl p-7 border transition-all flex flex-col group relative shadow-sm hover:shadow-md ${
                item.popular ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200/90"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    #{item.order ?? 0}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {item.price?.startsWith("$") ? item.price : `$${item.price}`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {item.description || "Tailored creative package for creators."}
                </p>
              </div>

              <div className="flex-1 mb-6 border-t border-slate-100 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Included Scope</p>
                <ul className="space-y-2.5">
                  {(Array.isArray(item.features) ? item.features : []).map((f: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl truncate max-w-[150px]">
                  {item.cta || "Discuss this plan"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Edit Plan"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.fid, item.name)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AdminModal
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title={editingId ? "Edit Pricing Tier" : "Add Pricing Tier"}
        description="Define terms, deliverables, and pricing for this retainer or scope package."
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="Plan Name"
              placeholder="e.g. Creator Scale"
              value={form.name}
              onChange={(e: any) => setForm({ ...form, name: e.target.value })}
            />
            <AdminInput
              label="Price (e.g. 4,900/mo or Custom)"
              placeholder="e.g. 4,900/mo"
              value={form.price}
              onChange={(e: any) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <AdminInput
            label="Brief Description"
            placeholder="e.g. For weekly creators publishing high-retention video content."
            value={form.description}
            onChange={(e: any) => setForm({ ...form, description: e.target.value })}
          />

          <AdminTextarea
            label="Features (One bullet per line)"
            rows={5}
            placeholder="Unlimited Revisions&#10;Dedicated Video Editor&#10;48-hour Turnaround&#10;Custom Motion Graphics&#10;Sound Design & Color Grading"
            value={form.features}
            onChange={(e: any) => setForm({ ...form, features: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <AdminInput
              label="CTA Button Label"
              placeholder="e.g. Discuss this plan"
              value={form.cta}
              onChange={(e: any) => setForm({ ...form, cta: e.target.value })}
            />

            <AdminInput
              label="Display Order"
              type="number"
              value={form.order}
              onChange={(e: any) => setForm({ ...form, order: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Featured Tier?</label>
              <div
                onClick={() => setForm({ ...form, popular: !form.popular })}
                className={`w-14 h-8 rounded-full transition-all cursor-pointer relative flex items-center ${
                  form.popular ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute w-6 h-6 bg-white rounded-full transition-transform ${
                    form.popular ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <AdminButton variant="secondary" onClick={() => setIsAdding(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editingId ? "Update Tier" : "Save Tier"}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
