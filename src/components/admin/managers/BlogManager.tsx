import React, { useState, useEffect, useMemo, useRef } from "react";
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminBadge, AdminPageHeader, AdminSearchBar, AdminEmptyState } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  Globe,
  Loader2,
  RotateCcw,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  RemoveFormatting,
  PanelRightOpen,
  PanelRightClose,
  Eye,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Sparkles
} from "lucide-react";
import { STATIC_BLOGS } from "../../../lib/staticBlogs";

/**
 * Custom MS Word Lite Ribbon Toolbar
 */
const WordToolbar = ({ quillRef }: { quillRef: React.RefObject<any> }) => {
  const handleUndo = () => {
    quillRef.current?.getEditor()?.history?.undo();
  };

  const handleRedo = () => {
    quillRef.current?.getEditor()?.history?.redo();
  };

  return (
    <div
      id="ms-word-toolbar"
      className="sticky top-0 z-30 flex items-center flex-wrap gap-1 px-3 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 rounded-t-2xl shadow-xs"
    >
      {/* 1. History (Undo / Redo) */}
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={handleUndo}
          className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRedo}
          className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 2. Text Styles (Paragraph / Heading Dropdown) */}
      <div className="flex items-center">
        <select
          className="ql-header text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
          defaultValue=""
          title="Text Style"
        >
          <option value="">Normal Text</option>
          <option value="1">Heading 1 (Main Title)</option>
          <option value="2">Heading 2 (Section)</option>
          <option value="3">Heading 3 (Sub-point)</option>
        </select>
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 3. Font Formats (Bold, Italic, Underline, Strike) */}
      <div className="flex items-center gap-0.5">
        <button type="button" className="ql-bold" title="Bold (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" className="ql-italic" title="Italic (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" className="ql-underline" title="Underline (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </button>
        <button type="button" className="ql-strike" title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 4. Text & Highlight Colors */}
      <div className="flex items-center gap-1">
        <select className="ql-color" title="Font Color" />
        <select className="ql-background" title="Highlight Color" />
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 5. Text Alignment */}
      <div className="flex items-center">
        <select className="ql-align" title="Text Alignment" />
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 6. Lists, Blockquote, Code */}
      <div className="flex items-center gap-0.5">
        <button type="button" className="ql-list" value="bullet" title="Bulleted List">
          <List className="w-4 h-4" />
        </button>
        <button type="button" className="ql-list" value="ordered" title="Numbered List">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" className="ql-blockquote" title="Quote Callout">
          <Quote className="w-4 h-4" />
        </button>
        <button type="button" className="ql-code-block" title="Code Block">
          <Code className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

      {/* 7. Insert (Link & Image) */}
      <div className="flex items-center gap-0.5">
        <button type="button" className="ql-link" title="Insert Link (Ctrl+K)">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button type="button" className="ql-image" title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="button" className="ql-clean" title="Clear Formatting">
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

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
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [showInspector, setShowInspector] = useState(true);
  const [inspectorTab, setInspectorTab] = useState<"publish" | "media" | "seo">("publish");
  const quillRef = useRef<any>(null);

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

  // Quill Custom Modules configuration
  const quillModules = useMemo(() => ({
    toolbar: {
      container: "#ms-word-toolbar",
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }), []);

  // Word count and Reading Time metrics
  const stats = useMemo(() => {
    const text = (form.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    const readMinutes = Math.max(1, Math.ceil(words / 220));
    return { words, chars, readMinutes };
  }, [form.content]);

  // Generate URL slug from title
  const computedSlug = useMemo(() => {
    if (editingId && !STATIC_BLOGS.some(b => b.id === editingId)) {
      return editingId;
    }
    return form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "new-article";
  }, [form.title, editingId]);

  const handleSave = async (forceStatus?: string) => {
    if (!form.title.trim()) return notify("Article title is required", "err");
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
        notify("Article updated successfully");
      } else {
        const docId = computedSlug;
        const newRef = doc(db, "blogs", docId);
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now(), order: items.length });
        setEditingId(docId);
        logActivity(user, "created", "blog", form.title, docId);
        notify("Article created and saved");
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
      publishDate: item.publishDate || item.date || ""
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

  const copyLiveLink = () => {
    const url = `https://motionly.media/blog/${editingId || computedSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
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

  // =========================================================================
  // VIEW: MS WORD LITE EDITOR
  // =========================================================================
  if (view === "editor") {
    return (
      <div className="min-h-screen -mt-4 pb-16 bg-slate-100/70 dark:bg-[#070a12] transition-colors">
        {/* Top Floating App Bar */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Back & Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setView("list")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Articles</span>
              </button>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />
              <div className="min-w-0 hidden sm:flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs md:max-w-md">
                  {form.title || "Untitled Document"}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                  form.status === "published"
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40"
                    : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800/40"
                }`}>
                  {form.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {editingId && (
                <a
                  href={`/blog/${editingId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Preview on live site"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setShowInspector(!showInspector)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  showInspector
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                title="Toggle Document Inspector"
              >
                {showInspector ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Settings</span>
              </button>

              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
              >
                {saving && form.status === "draft" ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving && form.status === "published" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish Article</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* The Document Canvas (Centered Paper Sheet) */}
            <div className="flex-1 w-full min-w-0">
              <div className="ms-word-editor bg-white dark:bg-[#101524] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/50 border border-slate-200/90 dark:border-slate-800 overflow-hidden">
                {/* MS Word Ribbon Toolbar */}
                <WordToolbar quillRef={quillRef} />

                {/* The "Paper" Writing Sheet */}
                <div className="p-6 sm:p-10 md:p-14 bg-white dark:bg-[#101524]">
                  {/* Category Pill Tag */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-200/70 dark:border-blue-800/40">
                      {form.category}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      /blog/{computedSlug}
                    </span>
                  </div>

                  {/* Document Headline / Title Input (Large, Never cut off) */}
                  <textarea
                    rows={2}
                    placeholder="Document Title (e.g. The Science of the First 3 Seconds)..."
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full text-2xl sm:text-4xl font-black text-slate-950 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 border-none focus:ring-0 p-0 bg-transparent resize-none leading-tight tracking-tight focus:outline-none"
                  />

                  {/* Document Subtitle / Summary Teaser */}
                  <div className="mt-3 mb-6">
                    <textarea
                      rows={2}
                      placeholder="Article summary / lead paragraph for social cards & search snippet..."
                      value={form.summary}
                      onChange={e => setForm({ ...form, summary: e.target.value })}
                      className="w-full text-sm sm:text-base text-slate-600 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 border-none focus:ring-0 p-0 bg-transparent resize-none leading-relaxed italic focus:outline-none"
                    />
                  </div>

                  <hr className="border-t border-slate-200 dark:border-slate-800/80 mb-6" />

                  {/* Rich Text Editor */}
                  <div className="min-h-[520px]">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={form.content}
                      onChange={content => setForm(prev => ({ ...prev, content }))}
                      modules={quillModules}
                      placeholder="Start typing your article here... Use the toolbar above for headings, bold, colors, quotes, code, and images."
                    />
                  </div>
                </div>

                {/* Classic Word Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>Page 1 of 1</span>
                    <span>&bull;</span>
                    <span>{stats.words.toLocaleString()} words</span>
                    <span>&bull;</span>
                    <span>{stats.chars.toLocaleString()} characters</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>~{stats.readMinutes} min read</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ready to publish
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Document Inspector Sidebar */}
            {showInspector && (
              <div className="w-full lg:w-80 shrink-0 space-y-4">
                {/* Inspector Tabs */}
                <div className="flex items-center p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
                  <button
                    type="button"
                    onClick={() => setInspectorTab("publish")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      inspectorTab === "publish"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Post Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorTab("media")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      inspectorTab === "media"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Cover
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorTab("seo")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      inspectorTab === "seo"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    SEO &amp; Share
                  </button>
                </div>

                {/* Tab 1: Publishing Details */}
                {inspectorTab === "publish" && (
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, status: "draft" })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            form.status === "draft"
                              ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, status: "published" })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            form.status === "published"
                              ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          Published
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Strategy</option>
                        <option>Production</option>
                        <option>Growth</option>
                        <option>Editing</option>
                        <option>SaaS</option>
                        <option>Company</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Scheduled Date
                      </label>
                      <input
                        type="date"
                        value={form.publishDate}
                        onChange={e => setForm({ ...form, publishDate: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        Permanent URL
                      </label>
                      <div className="flex items-center gap-1.5 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate">
                          /blog/{computedSlug}
                        </span>
                        <button
                          type="button"
                          onClick={copyLiveLink}
                          className="p-1 text-slate-400 hover:text-blue-600 ml-auto shrink-0"
                          title="Copy Link"
                        >
                          {copiedSlug ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Featured Media */}
                {inspectorTab === "media" && (
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" /> Featured Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={form.imageUrl}
                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {form.imageUrl ? (
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img
                          src={form.imageUrl}
                          alt="Cover Preview"
                          className="w-full h-36 object-cover"
                          onError={(e: any) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: "" })}
                          className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 text-white rounded-lg text-xs"
                          title="Remove cover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-32 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-1">
                        <ImageIcon className="w-6 h-6 stroke-1" />
                        <span className="text-[11px]">No cover image set</span>
                      </div>
                    )}

                    {/* Quick Presets */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Quick Unsplash Presets
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" })}
                          className="text-[10px] font-medium p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-left truncate"
                        >
                          📊 SaaS Metrics
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80" })}
                          className="text-[10px] font-medium p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-left truncate"
                        >
                          🎬 Video Studio
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" })}
                          className="text-[10px] font-medium p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-left truncate"
                        >
                          ⚡ 3D Graphics
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80" })}
                          className="text-[10px] font-medium p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-left truncate"
                        >
                          👤 Founder Story
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: SEO & Social Preview */}
                {inspectorTab === "seo" && (
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                    {/* Live Google Preview Card */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Google Search Preview
                      </label>
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                          <span>motionly.media</span>
                          <span>&rsaquo;</span>
                          <span>blog</span>
                          <span>&rsaquo;</span>
                          <span className="truncate">{computedSlug}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 line-clamp-1 hover:underline cursor-pointer">
                          {form.seoTitle || form.title || "Untitled Article | Motionly Media"}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {form.seoDescription || form.summary || "Read the latest video marketing and high-retention video production insights from Motionly Media."}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Meta Title
                        </label>
                        <span className={`text-[10px] font-mono ${(form.seoTitle || form.title).length > 60 ? "text-amber-500" : "text-slate-400"}`}>
                          {(form.seoTitle || form.title).length} / 60
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={form.title || "Leave empty to use main title"}
                        value={form.seoTitle}
                        onChange={e => setForm({ ...form, seoTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Meta Description
                        </label>
                        <span className={`text-[10px] font-mono ${(form.seoDescription || form.summary).length > 160 ? "text-amber-500" : "text-slate-400"}`}>
                          {(form.seoDescription || form.summary).length} / 160
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder={form.summary || "Leave empty to use article summary"}
                        value={form.seoDescription}
                        onChange={e => setForm({ ...form, seoDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: ARTICLES DIRECTORY & TABLE LIST
  // =========================================================================
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
              setForm({
                title: "",
                summary: "",
                content: "",
                imageUrl: "",
                category: "Strategy",
                status: "draft",
                seoTitle: "",
                seoDescription: "",
                publishDate: new Date().toISOString().split("T")[0]
              });
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
                  ? "bg-slate-900 text-white shadow-xs"
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
            setForm({
              title: "",
              summary: "",
              content: "",
              imageUrl: "",
              category: "Strategy",
              status: "draft",
              seoTitle: "",
              seoDescription: "",
              publishDate: new Date().toISOString().split("T")[0]
            });
            setEditingId(null);
            setView("editor");
          } : handleSeedDefaults}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Post</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map(item => (
                <tr key={item.fid} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm">{item.title}</p>
                    {item.summary && <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{item.summary}</p>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <AdminBadge color={item.status === "published" ? "green" : item.status === "draft" ? "yellow" : "gray"}>
                      {item.status || "published"}
                    </AdminBadge>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {item.date || "Not set"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-xl transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.fid, item.title)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/60 rounded-xl transition-colors"
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

export default BlogManager;
