import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import {
  AdminButton,
  AdminInput,
  AdminTextarea,
  AdminModal,
  AdminPageHeader,
  AdminSearchBar,
  AdminEmptyState,
} from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { DEFAULT_FAQS, type FAQItem } from "../../../lib/useSiteData";
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Save,
  ArrowUp,
  ArrowDown,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export const FAQManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 0,
  });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then((db) => {
      unsub = onSnapshot(collection(db, "faqs"), (snap) => {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as FAQItem[];

        items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setFaqs(items);
        setLoading(false);
      }, (err) => {
        console.error(err);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      order: faqs.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) return notify("Question cannot be empty", "err");
    if (!formData.answer.trim()) return notify("Answer cannot be empty", "err");

    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        order: Number(formData.order) || 0,
        updatedAt: Timestamp.now(),
      };

      if (editingFaq) {
        await setDoc(doc(db, "faqs", editingFaq.id), payload, { merge: true });
        logActivity(user, "updated", "faq", formData.question, editingFaq.id);
        notify("FAQ updated successfully");
      } else {
        const newRef = doc(collection(db, "faqs"));
        await setDoc(newRef, {
          ...payload,
          createdAt: Timestamp.now(),
        });
        logActivity(user, "created", "faq", formData.question, newRef.id);
        notify("FAQ added successfully");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      notify("Failed to save FAQ", "err");
    }
    setSaving(false);
  };

  const handleDelete = async (faq: FAQItem) => {
    if (!confirm(`Are you sure you want to delete this FAQ: "${faq.question}"?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "faqs", faq.id));
      logActivity(user, "deleted", "faq", faq.question, faq.id);
      notify("FAQ deleted successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to delete FAQ", "err");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Reset FAQ knowledgebase to Motionly's default questions & answers? This will overwrite custom FAQs.")) {
      return;
    }
    setSaving(true);
    try {
      const db = await getDb();
      // Clean up duplicates by removing existing
      for (const existing of faqs) {
        await deleteDoc(doc(db, "faqs", existing.id));
      }
      for (const faq of DEFAULT_FAQS) {
        await setDoc(doc(db, "faqs", faq.id), {
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          createdAt: Timestamp.now(),
        });
      }
      logActivity(user, "created", "faq", "Reset with Default Video Agency FAQs");
      notify("Default FAQ questions restored successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to seed FAQs", "err");
    }
    setSaving(false);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="FAQ Knowledgebase"
        subtitle="Manage frequently asked questions displayed on the website and embedded in search engine FAQ schema."
        badge={`${faqs.length} Active`}
        action={
          <div className="flex items-center gap-3">
            <AdminButton variant="secondary" icon={RotateCcw} onClick={handleSeedDefaults} loading={saving}>
              Reset to Defaults
            </AdminButton>
            <AdminButton icon={Plus} onClick={handleOpenAdd}>
              Add Question
            </AdminButton>
          </div>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <AdminSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search questions or answers..."
          count={filteredFaqs.length}
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <AdminEmptyState
          icon={HelpCircle}
          title={search ? "No matching FAQs found" : "No FAQs created yet"}
          description={
            search
              ? "Try adjusting your search keywords."
              : "Add answers to common client questions to build trust and boost SEO rankings."
          }
          action={
            <AdminButton icon={Plus} onClick={handleOpenAdd}>
              Create First Question
            </AdminButton>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {faq.order ?? index + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(faq)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="Edit question"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(faq)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete question"
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
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingFaq ? "Edit Question" : "Add New Question"}
        description="Provide a clear, helpful question and answer for prospective clients."
      >
        <form onSubmit={handleSave} className="space-y-6">
          <AdminInput
            label="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="e.g. What is your turnaround time?"
            required
          />

          <AdminTextarea
            label="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={5}
            placeholder="Provide a comprehensive and transparent answer..."
            required
          />

          <AdminInput
            label="Display Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            hint="Lower numbers appear first."
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" loading={saving} icon={Save}>
              {editingFaq ? "Update Question" : "Save Question"}
            </AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
