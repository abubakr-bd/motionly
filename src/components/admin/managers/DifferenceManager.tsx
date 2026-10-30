import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea, AdminPageHeader, AdminCard } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { DEFAULT_DIFFERENCE, type DifferenceSettings } from "../../../lib/useSiteData";
import { Save, Loader2, Plus, Trash2, Split, Check, X, RotateCcw } from "lucide-react";

export const DifferenceManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<DifferenceSettings>(DEFAULT_DIFFERENCE);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then((db) => {
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().difference) {
          setForm({ ...DEFAULT_DIFFERENCE, ...snap.data().difference });
        } else {
          setForm(DEFAULT_DIFFERENCE);
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
        difference: form,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "The Difference Comparison");
      notify("The Difference section saved successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to save difference settings", "err");
    }
    setSaving(false);
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset The Difference section to Motionly's default comparison points? This will overwrite custom points.")) return;
    setSaving(true);
    setForm(DEFAULT_DIFFERENCE);
    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), {
        difference: DEFAULT_DIFFERENCE,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "Reset Difference to Defaults");
      notify("The Difference section reset to defaults successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to reset difference settings", "err");
    }
    setSaving(false);
  };

  const addPoint = (type: "statusQuo" | "motionly") => {
    if (type === "statusQuo") {
      setForm({ ...form, statusQuoPoints: [...form.statusQuoPoints, ""] });
    } else {
      setForm({ ...form, motionlyPoints: [...form.motionlyPoints, ""] });
    }
  };

  const updatePoint = (type: "statusQuo" | "motionly", index: number, value: string) => {
    if (type === "statusQuo") {
      const updated = [...form.statusQuoPoints];
      updated[index] = value;
      setForm({ ...form, statusQuoPoints: updated });
    } else {
      const updated = [...form.motionlyPoints];
      updated[index] = value;
      setForm({ ...form, motionlyPoints: updated });
    }
  };

  const removePoint = (type: "statusQuo" | "motionly", index: number) => {
    if (type === "statusQuo") {
      setForm({ ...form, statusQuoPoints: form.statusQuoPoints.filter((_, i) => i !== index) });
    } else {
      setForm({ ...form, motionlyPoints: form.motionlyPoints.filter((_, i) => i !== index) });
    }
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
        title="The Difference / Comparison"
        subtitle="Manage the side-by-side comparison section comparing the status quo vs the Motionly approach."
        badge="Live Sync"
        action={
          <div className="flex items-center gap-2.5">
            <AdminButton variant="secondary" onClick={handleResetDefaults} loading={saving}>
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Reset to Defaults</span>
            </AdminButton>
            <AdminButton onClick={handleSave} loading={saving} icon={Save}>
              Save Changes
            </AdminButton>
          </div>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard title="Section Overview" subtitle="General title and context displayed above the two cards.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Subtitle Badge"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="e.g. How we work"
            />
            <AdminInput
              label="Section Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. The Motionly approach"
            />
          </div>
          <div className="mt-4">
            <AdminTextarea
              label="Section Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
            />
          </div>
        </AdminCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Status Quo */}
          <AdminCard
            title="The Usual Approach (Status Quo)"
            subtitle="The fragmented, typical experience clients want to move away from."
            className="border-slate-200"
            action={
              <AdminButton
                size="sm"
                variant="secondary"
                icon={Plus}
                onClick={() => addPoint("statusQuo")}
              >
                Add Point
              </AdminButton>
            }
          >
            <div className="space-y-4">
              <AdminInput
                label="Card Title"
                value={form.statusQuoTitle}
                onChange={(e) => setForm({ ...form, statusQuoTitle: e.target.value })}
                placeholder="e.g. A fragmented workflow"
              />

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Comparison Points</p>
                {form.statusQuoPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-xs shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint("statusQuo", index, e.target.value)}
                      placeholder="e.g. Creative direction changes between contributors"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePoint("statusQuo", index)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>

          {/* Motionly Approach */}
          <AdminCard
            title="The Motionly Approach"
            subtitle="The distinct benefits and dependability provided by your team."
            className="border-blue-200/80 shadow-md shadow-blue-500/5"
            action={
              <AdminButton
                size="sm"
                variant="primary"
                icon={Plus}
                onClick={() => addPoint("motionly")}
              >
                Add Point
              </AdminButton>
            }
          >
            <div className="space-y-4">
              <AdminInput
                label="Card Title"
                value={form.motionlyTitle}
                onChange={(e) => setForm({ ...form, motionlyTitle: e.target.value })}
                placeholder="e.g. Motionly Media"
              />

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Motionly Advantage Points</p>
                {form.motionlyPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint("motionly", index, e.target.value)}
                      placeholder="e.g. A clear owner from brief to delivery"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePoint("motionly", index)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="flex justify-end pt-4">
          <AdminButton type="submit" size="lg" loading={saving} icon={Save}>
            Save Difference Section
          </AdminButton>
        </div>
      </form>
    </div>
  );
};
