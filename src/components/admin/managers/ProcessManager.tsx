import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { AdminButton, AdminInput, AdminTextarea, AdminPageHeader, AdminCard } from "../ui/AdminUI";
import { DEFAULT_PROCESS, type ProcessStep } from "../../../lib/useSiteData";
import { 
  Loader2, Plus, Trash2, Save, RotateCcw, 
  ArrowUp, ArrowDown, GitMerge, Sparkles, Layers, Tag
} from "lucide-react";

export const ProcessManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [steps, setSteps] = useState<ProcessStep[]>(DEFAULT_PROCESS.steps);
  const [header, setHeader] = useState({
    title: DEFAULT_PROCESS.title,
    subtitle: DEFAULT_PROCESS.subtitle,
    description: DEFAULT_PROCESS.description,
  });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let isMounted = true;

    // Safety timeout: ensure loading state is cleared within 1s even if firestore/network is slow
    const timer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1000);

    getDb()
      .then((db) => {
        unsub = onSnapshot(
          doc(db, "settings", "site"),
          (snap) => {
            if (!isMounted) return;
            try {
              if (snap.exists() && snap.data().process) {
                const data = snap.data().process;
                setHeader({
                  title: data.title || DEFAULT_PROCESS.title,
                  subtitle: data.subtitle || DEFAULT_PROCESS.subtitle,
                  description: data.description || DEFAULT_PROCESS.description,
                });

                const rawSteps = Array.isArray(data.steps) && data.steps.length > 0
                  ? data.steps
                  : DEFAULT_PROCESS.steps;

                const loadedSteps: ProcessStep[] = rawSteps.map((s: any, i: number) => ({
                  id: s.id || `step-${i + 1}`,
                  label: s.label || String(i + 1).padStart(2, "0"),
                  title: s.title || `Step ${i + 1}`,
                  description: s.description || "",
                  icon: s.icon || "Search",
                  tags: Array.isArray(s.tags) ? s.tags : [],
                  previews: Array.isArray(s.previews) ? s.previews : []
                }));

                setSteps(loadedSteps);
              } else {
                setHeader({
                  title: DEFAULT_PROCESS.title,
                  subtitle: DEFAULT_PROCESS.subtitle,
                  description: DEFAULT_PROCESS.description,
                });
                setSteps(DEFAULT_PROCESS.steps);
              }
            } catch (err) {
              console.error("Error processing process data:", err);
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            console.error("Firestore snapshot error in ProcessManager:", err);
            if (isMounted) setLoading(false);
          }
        );
      })
      .catch((err) => {
        console.error("getDb error in ProcessManager:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      unsub?.();
    };
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), {
        process: { ...header, steps },
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "Production Framework");
      notify("Framework steps saved successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to save Framework", "err");
    }
    setSaving(false);
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset to Motionly's default 3-Step Framework (01 Strategy, 02 Build, 03 Launch)? This will overwrite custom steps.")) return;
    setSaving(true);
    setHeader({
      title: DEFAULT_PROCESS.title,
      subtitle: DEFAULT_PROCESS.subtitle,
      description: DEFAULT_PROCESS.description,
    });
    setSteps(DEFAULT_PROCESS.steps);

    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), {
        process: DEFAULT_PROCESS,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "Reset Framework to Website Defaults");
      notify("The 3-Step Framework reset to website defaults!");
    } catch (err) {
      console.error(err);
      notify("Failed to reset Framework", "err");
    }
    setSaving(false);
  };

  const addStep = () => {
    const nextNum = steps.length + 1;
    const padded = String(nextNum).padStart(2, "0");
    const newStep: ProcessStep = {
      id: `step-${Date.now()}`,
      label: padded,
      title: `Phase ${padded}`,
      description: "Describe the objectives, deliverables, and client touchpoints for this stage.",
      icon: "Sparkles",
      tags: ["DELIVERABLE", "TIMELINE", "QUALITY ASSURANCE"],
      previews: []
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) {
      return notify("You must keep at least 1 framework step", "err");
    }
    if (confirm("Are you sure you want to remove this framework step?")) {
      setSteps(steps.filter((s) => s.id !== id));
    }
  };

  const updateStep = (id: string, field: keyof ProcessStep, value: any) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setSteps(updated);
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Framework...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      <AdminPageHeader
        title="The Production Framework"
        subtitle="Manage the creative production pipeline steps displayed on the homepage."
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

      {/* Section Header Controls */}
      <AdminCard title="Framework Header" subtitle="Title and description displayed above the framework timeline.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AdminInput
              label="Eyebrow Subtitle"
              value={header.subtitle}
              onChange={(e) => setHeader({ ...header, subtitle: e.target.value })}
              placeholder="e.g. A simple 3 step framework we follow in every video."
            />
            <AdminInput
              label="Main Heading"
              value={header.title}
              onChange={(e) => setHeader({ ...header, title: e.target.value })}
              placeholder="e.g. The Motionly Framework."
            />
          </div>
          <AdminTextarea
            label="Supporting Description"
            value={header.description}
            onChange={(e) => setHeader({ ...header, description: e.target.value })}
            rows={2}
            placeholder="Brief overview explaining your proprietary process."
          />
        </div>
      </AdminCard>

      {/* Steps List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Framework Steps ({steps.length})</h3>
            <p className="text-xs text-slate-500">Each step represents a phase in your creative pipeline.</p>
          </div>
          <AdminButton onClick={addStep} size="sm">
            <Plus className="w-4 h-4" /> Add Step
          </AdminButton>
        </div>

        {steps.map((step, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          return (
            <div
              key={step.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 font-mono font-black text-sm flex items-center justify-center border border-blue-200/80">
                    {stepNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{step.title || `Step ${index + 1}`}</h4>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Step {index + 1} of {steps.length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Step Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(index, 1)}
                    disabled={index === steps.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Step Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                    title="Delete Step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <AdminInput
                  label="Step Title"
                  value={step.title}
                  onChange={(e) => updateStep(step.id, "title", e.target.value)}
                  placeholder="e.g. Strategy"
                />
                <AdminInput
                  label="Phase Label / Number"
                  value={step.label || stepNumber}
                  onChange={(e) => updateStep(step.id, "label", e.target.value)}
                  placeholder="e.g. 01"
                />
                <AdminInput
                  label="Icon Name"
                  value={step.icon || "Search"}
                  onChange={(e) => updateStep(step.id, "icon", e.target.value)}
                  placeholder="Search, Wand2, Rocket, Sparkles"
                  hint="Lucide icon name"
                />
              </div>

              <AdminTextarea
                label="Step Description"
                value={step.description}
                onChange={(e) => updateStep(step.id, "description", e.target.value)}
                rows={2}
                placeholder="Explain what happens during this step..."
              />

              <AdminInput
                label="Tags / Deliverables (Comma separated)"
                value={(step.tags || []).join(", ")}
                onChange={(e) =>
                  updateStep(
                    step.id,
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
                placeholder="e.g. HOOK & CONCEPT, SCRIPTING, VISUAL DIRECTION"
                hint="Key deliverables shown as badges on the card"
              />
            </div>
          );
        })}
      </div>

      {/* Big Add Step Dashed Button */}
      <button
        type="button"
        onClick={addStep}
        className="w-full py-5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/40 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        <span>Add Another Framework Step</span>
      </button>

      {/* Floating Save Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <AdminButton variant="secondary" onClick={handleResetDefaults} loading={saving}>
          <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
          <span>Reset to Defaults</span>
        </AdminButton>
        <AdminButton onClick={handleSave} size="lg" loading={saving} icon={Save}>
          Save Framework
        </AdminButton>
      </div>
    </div>
  );
};
