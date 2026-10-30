import React, { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { 
  AdminButton, AdminInput, AdminTextarea, AdminBadge, 
  AdminPageHeader, AdminSearchBar, AdminModal, AdminEmptyState 
} from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { Edit2, Trash2, Plus, Loader2, Play, Star, CheckCircle, MessageSquare, Sparkles, RotateCcw } from "lucide-react";
import { DEFAULT_TESTIMONIALS } from "../../../lib/useSiteData";

export const ReviewManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "featured" | "video">("all");

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    avatar: "",
    content: "",
    videoId: "",
    rating: 5,
    status: "published",
    featured: false,
    order: 0
  });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      const colRef = collection(db, "testimonials");
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
    if (!form.name.trim() || !form.content.trim()) {
      return notify("Name and Review content are required", "err");
    }
    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        company: (form.company || "").trim(),
        avatar: (form.avatar || "").trim(),
        content: form.content.trim(),
        videoId: form.videoId.trim(),
        rating: Number(form.rating) || 5,
        status: form.status,
        featured: Boolean(form.featured),
        order: Number(form.order) || 0,
        updatedAt: Timestamp.now()
      };

      if (editingId) {
        await setDoc(doc(db, "testimonials", editingId), payload, { merge: true });
        logActivity(user, "updated", "testimonial", form.name, editingId);
        notify("Review updated");
      } else {
        const newRef = doc(collection(db, "testimonials"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now() });
        logActivity(user, "created", "testimonial", form.name, newRef.id);
        notify("Review added");
      }
      setIsAdding(false);
      setEditingId(null);
    } catch {
      notify("Failed to save review", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: any) => {
    setForm({
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      avatar: item.avatar || "",
      content: item.content || "",
      videoId: item.videoId || "",
      rating: item.rating ?? 5,
      status: item.status || "published",
      featured: item.featured || false,
      order: item.order ?? items.length
    });
    setEditingId(item.fid);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from "${name}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "testimonials", id));
      logActivity(user, "deleted", "testimonial", name, id);
      notify("Review deleted");
    } catch {
      notify("Delete failed", "err");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Reset reviews to Motionly's default founder testimonials (Sean Dorje, Nikhil Reddy, Chris Cunningham, etc.)? This will restore baseline reviews.")) return;
    setSaving(true);
    try {
      const db = await getDb();
      for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
        const item = DEFAULT_TESTIMONIALS[i];
        const payload = {
          name: item.name,
          role: item.role,
          company: item.company || "",
          avatar: item.avatar || "",
          content: item.content,
          videoId: item.videoId || "",
          rating: item.rating || 5,
          status: "published",
          featured: Boolean(item.featured),
          order: item.order ?? (i + 1),
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        await setDoc(doc(db, "testimonials", item.id), payload, { merge: true });
      }
      logActivity(user, "created", "testimonial", "Seeded Default Founder Reviews", "batch");
      notify("Founder reviews loaded successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to seed reviews", "err");
    }
    setSaving(false);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filter === "featured" && !item.featured) return false;
      if (filter === "video" && !item.videoId) return false;
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        item.name?.toLowerCase().includes(s) ||
        item.role?.toLowerCase().includes(s) ||
        item.content?.toLowerCase().includes(s)
      );
    });
  }, [items, filter, search]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Client Reviews & Testimonials"
        description="Manage partner testimonials, video reviews, and social proof shown on the homepage."
        action={
          <div className="flex items-center gap-2.5">
            <AdminButton variant="secondary" onClick={handleSeedDefaults} loading={saving}>
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" /> Reset to Defaults
            </AdminButton>
            <AdminButton
              onClick={() => {
                setForm({
                  name: "",
                  role: "",
                  company: "",
                  avatar: "",
                  content: "",
                  videoId: "",
                  rating: 5,
                  status: "published",
                  featured: false,
                  order: items.length
                });
                setEditingId(null);
                setIsAdding(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add Review
            </AdminButton>
          </div>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <AdminSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search reviews or clients..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "featured"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Featured ({items.filter(i => i.featured).length})
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "video"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            With Video ({items.filter(i => i.videoId).length})
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : filteredItems.length === 0 ? (
        <AdminEmptyState
          title={search || filter !== "all" ? "No matching reviews found" : "No client reviews yet"}
          description={
            search || filter !== "all"
              ? "Try adjusting your search query or filter."
              : "Add your first client testimonial, or load default founder reviews with one click."
          }
          actionLabel={search || filter !== "all" ? "Add Review" : "Load Default Reviews"}
          onAction={search || filter !== "all" ? () => {
            setForm({
              name: "",
              role: "",
              company: "",
              avatar: "",
              content: "",
              videoId: "",
              rating: 5,
              status: "published",
              featured: false,
              order: items.length
            });
            setEditingId(null);
            setIsAdding(true);
          } : handleSeedDefaults}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.fid}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col group relative"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-base flex items-center justify-center shadow-sm shrink-0">
                    {item.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                    <p className="text-xs text-slate-400 leading-snug">{item.role || "Creator / Brand"}</p>
                  </div>
                </div>
                {item.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                    Featured
                  </span>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (item.rating ?? 5)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 fill-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-4 mb-5 flex-1">
                "{item.content}"
              </p>

              {/* Video Badge */}
              {item.videoId && (
                <div className="mb-5 flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl w-fit">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Video Review Attached</span>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <AdminBadge color={item.status === "published" ? "green" : "gray"}>
                    {item.status || "published"}
                  </AdminBadge>
                  <span className="text-[10px] font-bold text-slate-400">#{item.order ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.fid, item.name)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Review"
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
        title={editingId ? "Edit Client Review" : "Add Client Review"}
        description="Share feedback from creators and brands to display on the live site."
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="Client Name"
              placeholder="e.g. Sean Dorje"
              value={form.name}
              onChange={(e: any) => setForm({ ...form, name: e.target.value })}
            />
            <AdminInput
              label="Role"
              placeholder="e.g. Founder"
              value={form.role}
              onChange={(e: any) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="Company Name"
              placeholder="e.g. Naïve"
              value={form.company}
              onChange={(e: any) => setForm({ ...form, company: e.target.value })}
            />
            <AdminInput
              label="Avatar URL (Optional)"
              placeholder="https://... (leave blank for initials)"
              value={form.avatar}
              onChange={(e: any) => setForm({ ...form, avatar: e.target.value })}
            />
          </div>

          <AdminTextarea
            label="Review Content"
            placeholder="What was their experience working with Motionly? Include specific achievements or impressions."
            rows={4}
            value={form.content}
            onChange={(e: any) => setForm({ ...form, content: e.target.value })}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Star Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= form.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 fill-slate-200"
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-slate-600 ml-2">{form.rating} out of 5 stars</span>
            </div>
          </div>

          <div className="space-y-2">
            <AdminInput
              label="YouTube Video ID (Optional)"
              placeholder="e.g. dQw4w9WgXcQ (leave blank if text only)"
              value={form.videoId}
              onChange={(e: any) => {
                let val = e.target.value.trim();
                const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
                if (match) val = match[1];
                setForm({ ...form, videoId: val });
              }}
            />
            {form.videoId && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img
                  src={`https://img.youtube.com/vi/${form.videoId}/hqdefault.jpg`}
                  alt="Preview"
                  className="w-20 h-12 rounded-xl object-cover bg-slate-900 shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Video Testimonial Preview</p>
                  <p className="text-slate-400">ID: {form.videoId}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Status</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <AdminInput
              label="Display Order"
              type="number"
              value={form.order}
              onChange={(e: any) => setForm({ ...form, order: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Featured Review?</label>
              <div
                onClick={() => setForm({ ...form, featured: !form.featured })}
                className={`w-14 h-8 rounded-full transition-all cursor-pointer relative flex items-center ${
                  form.featured ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <div
                  className={`absolute w-6 h-6 bg-white rounded-full transition-transform ${
                    form.featured ? "translate-x-7" : "translate-x-1"
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
              {editingId ? "Update Review" : "Save Review"}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
