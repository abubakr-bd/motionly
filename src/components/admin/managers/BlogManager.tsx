import React, { useState, useEffect, useMemo } from "react";
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea, AdminBadge, AdminPageHeader, AdminSearchBar, AdminEmptyState } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import ReactQuill from "react-quill-new";
import { Edit2, Trash2, Plus, ArrowLeft, Image as ImageIcon, Calendar, Globe, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { STATIC_BLOGS } from "../../../lib/staticBlogs";

export const BlogManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "editor">("list");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    category: "Strategy",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    publishDate: ""
  });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(q, snap => {
        setItems(snap.docs.map(d => ({ fid: d.id, ...d.data() })));
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleSave = async (forceStatus?: string) => {
    if (!form.title.trim()) return notify("Title is required", "err");
    setSaving(true);
    const finalStatus = forceStatus || form.status;
    
    try {
      const db = await getDb();
      const payload = {
        ...form,
        title: form.title.trim(),
        status: finalStatus,
        updatedAt: Timestamp.now(),
        date: form.publishDate || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      };

      if (editingId) {
        await setDoc(doc(db, "blogs", editingId), payload, { merge: true });
        logActivity(user, "updated", "blog", form.title, editingId);
        notify("Post updated successfully");
      } else {
        const newRef = doc(collection(db, "blogs"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now(), order: items.length });
        setEditingId(newRef.id);
        logActivity(user, "created", "blog", form.title, newRef.id);
        notify("Draft created");
      }
      setForm(prev => ({ ...prev, status: finalStatus }));
    } catch (err) {
      console.error(err);
      notify("Failed to save post", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: any) => {
    setForm({
      title: item.title || "",
      summary: item.summary || "",
      content: item.content || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "Strategy",
      status: item.status || "published",
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      publishDate: item.publishDate || ""
    });
    setEditingId(item.fid);
    setView("editor");
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete article "${title}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "blogs", id));
      logActivity(user, "deleted", "blog", title, id);
      notify("Post deleted");
    } catch {
      notify("Delete failed", "err");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Populate your blog with the 10 Motionly Master SEO articles (SaaS launch, YC pitch, VSLs, 3-second hooks, 3D motion, audio branding, etc.)?")) return;
    setSaving(true);
    try {
      const db = await getDb();
      for (let i = 0; i < STATIC_BLOGS.length; i++) {
        const item = STATIC_BLOGS[i];
        const payload = {
          title: item.title,
          summary: item.summary,
          content: item.content,
          imageUrl: item.imageUrl,
          category: item.category,
          status: "published",
          seoTitle: item.seoTitle || item.title,
          seoDescription: item.seoDescription || item.summary,
          date: item.date,
          publishDate: item.date,
          order: i + 1,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        await setDoc(doc(db, "blogs", item.id), payload, { merge: true });
      }
      logActivity(user, "created", "blog", "Seeded 10 SEO Master Articles", "batch");
      notify("10 SEO Master Articles loaded successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to seed articles", "err");
    }
    setSaving(false);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!search) return true;
      const s = search.toLowerCase();
      return item.title?.toLowerCase().includes(s) || item.summary?.toLowerCase().includes(s);
    });
  }, [items, categoryFilter, statusFilter, search]);

  if (view === "editor") {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setView("list")} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Posts
          </button>
          <div className="flex gap-3">
            <AdminButton variant="secondary" onClick={() => handleSave("draft")} loading={saving && form.status === "draft"}>
              Save Draft
            </AdminButton>
            <AdminButton onClick={() => handleSave("published")} loading={saving && form.status === "published"}>
              Publish Post
            </AdminButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <input 
              type="text" 
              placeholder="Post Title..." 
              className="w-full text-3xl sm:text-4xl font-black text-slate-900 placeholder-slate-300 border-none focus:ring-0 p-0 bg-transparent"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <AdminTextarea 
              placeholder="Brief summary for the blog card on homepage..." 
              value={form.summary}
              onChange={(e: any) => setForm({ ...form, summary: e.target.value })}
              rows={2}
            />
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden min-h-[500px]">
              <ReactQuill 
                theme="snow"
                value={form.content}
                onChange={content => setForm({ ...form, content })}
                className="h-[450px]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Featured Image
              </h3>
              <AdminInput 
                label="Image URL" 
                placeholder="https://..."
                value={form.imageUrl}
                onChange={(e: any) => setForm({ ...form, imageUrl: e.target.value })}
              />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Cover Preview" className="w-full h-36 object-cover rounded-2xl border border-slate-200" />
              )}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Publishing
              </h3>
              <AdminInput 
                label="Scheduled Date" 
                type="date"
                value={form.publishDate}
                onChange={(e: any) => setForm({ ...form, publishDate: e.target.value })}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  <option>Strategy</option>
                  <option>Production</option>
                  <option>Growth</option>
                  <option>Company</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> SEO Override
              </h3>
              <AdminInput 
                label="Meta Title" 
                value={form.seoTitle}
                onChange={(e: any) => setForm({ ...form, seoTitle: e.target.value })}
              />
              <AdminTextarea 
                label="Meta Description" 
                value={form.seoDescription}
                onChange={(e: any) => setForm({ ...form, seoDescription: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Articles & Blog Posts"
        description="Publish editorial insights, video production breakdowns, and creator strategy guides."
        action={
          <div className="flex items-center gap-2.5">
            <AdminButton variant="secondary" onClick={handleSeedDefaults} loading={saving}>
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" /> Reset to 10 SEO Articles
            </AdminButton>
            <AdminButton onClick={() => {
              setForm({ title: "", summary: "", content: "", imageUrl: "", category: "Strategy", status: "draft", seoTitle: "", seoDescription: "", publishDate: "" });
              setEditingId(null);
              setView("editor");
            }}>
              <Plus className="w-4 h-4" /> New Article
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
            placeholder="Search articles..."
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {["All", "Strategy", "Production", "Growth", "Company"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="h-5 w-px bg-slate-200 mx-1" />
          <button
            onClick={() => setStatusFilter(statusFilter === "published" ? "all" : "published")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "published" ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === "draft" ? "all" : "draft")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "draft" ? "bg-amber-500 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : filteredItems.length === 0 ? (
        <AdminEmptyState
          title={search || categoryFilter !== "All" ? "No matching articles found" : "No articles published yet"}
          description={
            search || categoryFilter !== "All"
              ? "Try adjusting your search query or category filter."
              : "Share insights and build SEO traffic by loading the 10 Motionly Master SEO blueprints or writing a new article."
          }
          actionLabel={search || categoryFilter !== "All" ? "Write Article" : "Load 10 SEO Master Articles"}
          onAction={search || categoryFilter !== "All" ? () => {
            setForm({ title: "", summary: "", content: "", imageUrl: "", category: "Strategy", status: "draft", seoTitle: "", seoDescription: "", publishDate: "" });
            setEditingId(null);
            setView("editor");
          } : handleSeedDefaults}
        />
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Post</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <tr key={item.fid} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{item.title}</p>
                    {item.summary && <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <AdminBadge color={item.status === "published" ? "green" : item.status === "draft" ? "yellow" : "gray"}>
                      {item.status || "published"}
                    </AdminBadge>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">
                    {item.date || "Not set"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.fid, item.title)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
