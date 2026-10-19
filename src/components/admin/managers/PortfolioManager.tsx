import React, { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminSelect, AdminBadge, AdminPageHeader, AdminSearchBar, AdminModal, AdminEmptyState } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { Edit2, Trash2, Plus, Loader2, Play, ExternalLink, Video } from "lucide-react";

export const PortfolioManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [form, setForm] = useState({
    title: "",
    videoId: "",
    category: "Short-form",
    labels: "",
    status: "published",
    order: 0
  });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      const colRef = collection(db, "portfolio");
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
    if (!form.title.trim() || !form.videoId.trim()) {
      return notify("Title and Video ID are required", "err");
    }
    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        title: form.title.trim(),
        videoId: form.videoId.trim(),
        category: form.category.trim(),
        labels: Array.isArray(form.labels)
          ? form.labels
          : form.labels.split(",").map((s: string) => s.trim()).filter(Boolean),
        status: form.status,
        order: Number(form.order) || 0,
        updatedAt: Timestamp.now()
      };

      if (editingId) {
        await setDoc(doc(db, "portfolio", editingId), payload, { merge: true });
        logActivity(user, "updated", "portfolio", form.title, editingId);
        notify("Portfolio item updated");
      } else {
        const newRef = doc(collection(db, "portfolio"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now() });
        logActivity(user, "created", "portfolio", form.title, newRef.id);
        notify("Portfolio item added");
      }
      setIsAdding(false);
      setEditingId(null);
    } catch {
      notify("Failed to save portfolio item", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: any) => {
    setForm({
      title: item.title || "",
      videoId: item.videoId || "",
      category: item.category || "Short-form",
      labels: Array.isArray(item.labels) ? item.labels.join(", ") : item.labels || "",
      status: item.status || "published",
      order: item.order ?? items.length
    });
    setEditingId(item.fid);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "portfolio", id));
      logActivity(user, "deleted", "portfolio", title, id);
      notify("Portfolio item deleted");
    } catch {
      notify("Delete failed", "err");
    }
  };

  // Derive all unique categories
  const categories = useMemo(() => {
    const defaultCats = ["Short-form", "Long-form", "Commercial", "Documentary", "YouTube"];
    const found = items.map(i => i.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...found]));
  }, [items]);

  // Filter items by search & category
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const searchLower = search.toLowerCase();
      const labelsStr = Array.isArray(item.labels) ? item.labels.join(" ") : item.labels || "";
      const matchesSearch = !search ||
        item.title?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower) ||
        labelsStr.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, search]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Portfolio Showcase"
        description="Manage case studies, video showpieces, categories, and tags displayed across the site."
        action={
          <AdminButton
            onClick={() => {
              setForm({
                title: "",
                videoId: "",
                category: "Short-form",
                labels: "",
                status: "published",
                order: items.length
              });
              setEditingId(null);
              setIsAdding(true);
            }}
          >
            <Plus className="w-4 h-4" /> Add Project
          </AdminButton>
        }
      />

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <AdminSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search projects or labels..."
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === "All"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All ({items.length})
          </button>
          {categories.map(cat => {
            const count = items.filter(i => i.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : filteredItems.length === 0 ? (
        <AdminEmptyState
          title={search || selectedCategory !== "All" ? "No matching projects found" : "No portfolio items yet"}
          description={
            search || selectedCategory !== "All"
              ? "Try adjusting your search query or category filter."
              : "Showcase your best video edits and case studies to prospects."
          }
          actionLabel="Add Project"
          onAction={() => {
            setForm({
              title: "",
              videoId: "",
              category: "Short-form",
              labels: "",
              status: "published",
              order: items.length
            });
            setEditingId(null);
            setIsAdding(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.fid}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <a
                    href={`https://youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    title="Watch on YouTube"
                  >
                    <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
                  </a>
                </div>
                <div className="absolute top-3 left-3">
                  <AdminBadge color={item.status === "published" ? "green" : "gray"}>
                    {item.status || "published"}
                  </AdminBadge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <AdminBadge color="blue">{item.category}</AdminBadge>
                  <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    #{item.order ?? 0}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(Array.isArray(item.labels) ? item.labels : []).map((l: string) => (
                    <span
                      key={l}
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {l}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[120px]">
                    ID: {item.videoId}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.fid, item.title)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        title={editingId ? "Edit Portfolio Project" : "Add Portfolio Project"}
        description="Enter the YouTube video ID, title, category, and tags for this showcase item."
      >
        <div className="space-y-5">
          <AdminInput
            label="Project Title"
            placeholder="e.g. Behind The Scenes: 10M View Case Study"
            value={form.title}
            onChange={(e: any) => setForm({ ...form, title: e.target.value })}
          />

          <div className="space-y-2">
            <AdminInput
              label="YouTube Video ID"
              placeholder="e.g. dQw4w9WgXcQ (only the ID, not full URL)"
              value={form.videoId}
              onChange={(e: any) => {
                let val = e.target.value.trim();
                // If user pasted a full YouTube URL, auto-extract the ID
                const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
                if (match) val = match[1];
                setForm({ ...form, videoId: val });
              }}
            />
            {form.videoId && (
              <div className="mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                <img
                  src={`https://img.youtube.com/vi/${form.videoId}/hqdefault.jpg`}
                  alt="Preview"
                  className="w-24 h-14 rounded-xl object-cover bg-slate-900 shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Thumbnail Preview</p>
                  <p className="text-slate-400">YouTube ID: {form.videoId}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

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
          </div>

          <AdminInput
            label="Labels / Tags (comma separated)"
            placeholder="Motion Graphics, Sound Design, Color Grading"
            value={form.labels}
            onChange={(e: any) => setForm({ ...form, labels: e.target.value })}
          />

          <AdminInput
            label="Display Order (lowest comes first)"
            type="number"
            value={form.order}
            onChange={(e: any) => setForm({ ...form, order: e.target.value })}
          />

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <AdminButton variant="secondary" onClick={() => setIsAdding(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editingId ? "Update Project" : "Add Project"}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
