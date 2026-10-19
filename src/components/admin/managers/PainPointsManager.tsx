import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea, AdminPageHeader, AdminCard } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { DEFAULT_PAIN_POINTS, type PainPointsSettings } from "../../../lib/useSiteData";
import { Save, Loader2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export const PainPointsManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PainPointsSettings>(DEFAULT_PAIN_POINTS);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then((db) => {
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().painPoints) {
          setForm({ ...DEFAULT_PAIN_POINTS, ...snap.data().painPoints });
        } else {
          setForm(DEFAULT_PAIN_POINTS);
        }
        setLoading(false);
      }, (err) => {
        console.error(err);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), {
        painPoints: form,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "Pain Points / Say Goodbye Section");
      notify("Pain points saved successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to save pain points", "err");
    }
    setSaving(false);
  };

  const addPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  const updatePoint = (index: number, value: string) => {
    const updated = [...form.points];
    updated[index] = value;
    setForm({ ...form, points: updated });
  };

  const removePoint = (index: number) => {
    setForm({ ...form, points: form.points.filter((_, i) => i !== index) });
  };

  const movePoint = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= form.points.length) return;
    const updated = [...form.points];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setForm({ ...form, points: updated });
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Pain Points (Say Goodbye)"
        subtitle="Manage the numbered pain points that resonate with creators looking for a reliable editing partner."
        badge="Live Sync"
        action={
          <AdminButton onClick={handleSave} loading={saving} icon={Save}>
            Save Changes
          </AdminButton>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard title="Headings & Framing" subtitle="The sticky left column text on the homepage.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Subtitle Kicker"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="e.g. A clearer production rhythm"
            />
            <AdminInput
              label="Section Headline"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Make room for the work only you can do"
              hint="The last word is automatically styled in accent blue."
            />
          </div>
          <div className="mt-4">
            <AdminTextarea
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="A dependable creative partner gives your team more time to plan..."
            />
          </div>
        </AdminCard>

        <AdminCard
          title="Numbered Pain Points"
          subtitle="Add, reorder, or edit the client friction points displayed on the right."
          action={
            <AdminButton size="sm" variant="secondary" icon={Plus} onClick={addPoint}>
              Add Pain Point
            </AdminButton>
          }
        >
          <div className="space-y-3">
            {form.points.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl group hover:bg-white hover:border-blue-300 transition-all"
              >
                <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-500 tabular-nums shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <input
                  type="text"
                  value={point}
                  onChange={(e) => updatePoint(index, e.target.value)}
                  placeholder="e.g. Editing takes time away from filming and planning"
                  className="flex-1 px-3 py-1.5 bg-transparent border-0 text-sm font-medium text-slate-900 focus:outline-none"
                />

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => movePoint(index, -1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === form.points.length - 1}
                    onClick={() => movePoint(index, 1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove point"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        <div className="flex justify-end pt-4">
          <AdminButton type="submit" size="lg" loading={saving} icon={Save}>
            Save Pain Points
          </AdminButton>
        </div>
      </form>
    </div>
  );
};
