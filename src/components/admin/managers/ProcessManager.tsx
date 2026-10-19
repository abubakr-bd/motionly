import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { AdminButton, AdminInput, AdminTextarea } from "../ui/AdminUI";
import { DEFAULT_PROCESS, type ProcessStep } from "../../../lib/useSiteData";
import { Loader2, Plus, GripVertical, Trash2, Save, Image as ImageIcon, X } from "lucide-react";

export const ProcessManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [header, setHeader] = useState({ title: "", subtitle: "", description: "" });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      unsub = onSnapshot(doc(db, "settings", "site"), snap => {
        if (snap.exists()) {
          const data = snap.data().process || {};
          setHeader({
            title: data.title || DEFAULT_PROCESS.title,
            subtitle: data.subtitle || DEFAULT_PROCESS.subtitle,
            description: data.description || DEFAULT_PROCESS.description,
          });
          
          // Migrate existing steps if they are missing fields
          const loadedSteps: ProcessStep[] = (data.steps || DEFAULT_PROCESS.steps).map((s: any, i: number) => ({
            id: s.id || `step-${Date.now()}-${i}`,
            label: s.label || "",
            title: s.title || "",
            description: s.description || "",
            icon: s.icon || "Circle",
            tags: s.tags || [],
            previews: s.previews || []
          }));
          setSteps(loadedSteps);
        } else {
          setHeader({ title: DEFAULT_PROCESS.title, subtitle: DEFAULT_PROCESS.subtitle, description: DEFAULT_PROCESS.description });
          setSteps(DEFAULT_PROCESS.steps);
        }
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), {
        process: { ...header, steps }
      }, { merge: true });
      logActivity(user, "updated", "settings", "Process Flow");
      notify("Process Flow saved successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to save Process Flow", "err");
    }
    setSaving(false);
  };

  const addStep = () => {
    setSteps([...steps, { 
      id: `step-${Date.now()}`, label: "NEW STEP", title: "", description: "", icon: "Circle", tags: [], previews: [] 
    }]);
  };

  const removeStep = (id: string) => {
    if (confirm("Are you sure you want to delete this step?")) {
      setSteps(steps.filter(s => s.id !== id));
    }
  };

  const updateStep = (id: string, field: keyof ProcessStep, value: any) => {
    setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Previews
  const addPreview = (id: string) => {
    setSteps(steps.map(s => {
      if (s.id === id) return { ...s, previews: [...s.previews, ""] };
      return s;
    }));
  };

  const updatePreview = (stepId: string, index: number, value: string) => {
    setSteps(steps.map(s => {
      if (s.id === stepId) {
        const newPreviews = [...s.previews];
        newPreviews[index] = value;
        return { ...s, previews: newPreviews };
      }
      return s;
    }));
  };

  const removePreview = (stepId: string, index: number) => {
    setSteps(steps.map(s => {
      if (s.id === stepId) {
        const newPreviews = [...s.previews];
        newPreviews.splice(index, 1);
        return { ...s, previews: newPreviews };
      }
      return s;
    }));
  };

  // Simple array move
  const moveStep = (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= steps.length) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[index + direction];
    newSteps[index + direction] = temp;
    setSteps(newSteps);
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Process Flow</h2>
          <p className="text-slate-500 mt-1">Manage the "How It Works" stages and their visual previews.</p>
        </div>
        <AdminButton onClick={handleSave} loading={saving}><Save className="w-4 h-4" /> Save Changes</AdminButton>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Section Header</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminInput label="Eyebrow (Subtitle)" value={header.subtitle} onChange={(e: any) => setHeader({ ...header, subtitle: e.target.value })} />
          <AdminInput label="Main Title" value={header.title} onChange={(e: any) => setHeader({ ...header, title: e.target.value })} />
        </div>
        <AdminTextarea label="Description" value={header.description} onChange={(e: any) => setHeader({ ...header, description: e.target.value })} rows={2} />
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => moveStep(index, -1)} disabled={index === 0} aria-label="Move step up" className="admin-button admin-button-secondary">Move up</button>
                  <button type="button" onClick={() => moveStep(index, 1)} disabled={index === steps.length - 1} aria-label="Move step down" className="admin-button admin-button-secondary">Move down</button>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{step.title || "Untitled Step"}</h4>
              </div>
              <button onClick={() => removeStep(step.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 ml-14">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdminInput label="Label (e.g. STRATEGY)" value={step.label} onChange={(e: any) => updateStep(step.id, 'label', e.target.value)} />
                <AdminInput label="Title" value={step.title} onChange={(e: any) => updateStep(step.id, 'title', e.target.value)} />
                <AdminInput label="Lucide Icon (e.g. Search)" value={step.icon} onChange={(e: any) => updateStep(step.id, 'icon', e.target.value)} />
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Chess Piece Metaphor</label>
                  <select 
                    value={step.chessPiece || "none"} 
                    onChange={(e) => updateStep(step.id, 'chessPiece', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="queen">Queen (Strategy/Vision)</option>
                    <option value="knight">Knight (Creative/Story)</option>
                    <option value="bishop">Bishop (Precision/Studio)</option>
                    <option value="rook">Rook (Structure/Editing)</option>
                    <option value="king">King (Packaging/Attention)</option>
                    <option value="pawn">Pawn (Execution/Launch)</option>
                  </select>
                </div>
              </div>
              
              <AdminTextarea label="Description" value={step.description} onChange={(e: any) => updateStep(step.id, 'description', e.target.value)} rows={2} />
              
              <AdminInput 
                label="Tags (Comma separated)" 
                value={step.tags.join(', ')} 
                onChange={(e: any) => updateStep(step.id, 'tags', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean))} 
              />

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-700 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Visual Previews (ImgBB URLs)</h5>
                  <button onClick={() => addPreview(step.id)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                    + Add Image
                  </button>
                </div>
                {step.previews.length === 0 ? (
                  <p className="text-sm text-slate-500">No previews added. Add ImgBB URLs to display them on the frontend.</p>
                ) : (
                  <div className="space-y-3">
                    {step.previews.map((url, pIdx) => (
                      <div key={pIdx} className="flex gap-3 items-center">
                        {url && <img src={url} alt="preview" className="w-12 h-12 object-cover rounded-lg border border-slate-200 bg-white" />}
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="https://i.ibb.co/..." 
                            value={url}
                            onChange={(e) => updatePreview(step.id, pIdx, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          />
                        </div>
                        <button onClick={() => removePreview(step.id, pIdx)} className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addStep} 
        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors flex flex-col items-center justify-center gap-2"
      >
        <Plus className="w-6 h-6" />
        Add New Step
      </button>
    </div>
  );
};
