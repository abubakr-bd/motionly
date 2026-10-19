import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { usePersonalBrandingData } from "../../../lib/usePersonalBrandingData";
import { Save, Loader2 } from "lucide-react";

export const PersonalBrandingManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const { data: defaultData, loading: dataLoading, DEFAULT_DATA } = usePersonalBrandingData();
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  
  // Local form state. We keep it as a raw string for complex arrays to allow easy JSON editing,
  // and direct state for strings.
  const [form, setForm] = useState(DEFAULT_DATA);

  // Sync with firebase when loaded
  useEffect(() => {
    if (!dataLoading) {
      setForm(defaultData);
    }
  }, [defaultData, dataLoading]);

  const handleSave = async (section: keyof typeof form) => {
    setSaving(true);
    try {
      const db = await getDb();
      await setDoc(doc(db, "personal_branding", "config"), { 
        [section]: form[section], 
        updatedAt: Timestamp.now() 
      }, { merge: true });
      logActivity(user, "updated", "settings", `personal-branding-${section}`);
      notify(`${section.toUpperCase()} settings saved`, "ok");
    } catch (error) {
      console.error(error);
      notify("Failed to save settings", "err");
    }
    setSaving(false);
  };

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "galaxy", label: "Galaxy" },
    { id: "brain", label: "AI Brain" },
    { id: "dashboard", label: "Dashboard" },
    { id: "timeline", label: "Timeline" },
    { id: "influence", label: "Influence" },
    { id: "caseStudies", label: "Case Studies" },
    { id: "pricing", label: "Pricing" },
    { id: "cta", label: "CTA" },
  ];

  if (dataLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Helper to safely parse JSON from textarea
  const handleJsonUpdate = (section: keyof typeof form, field: string, value: string) => {
    try {
      const parsed = JSON.parse(value);
      setForm(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: parsed
        }
      }));
    } catch (e) {
      // Allow invalid JSON while typing, but it won't save correctly if they don't fix it.
      // A better UX would store the string state separately, but this is a quick admin tool.
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Personal Branding CMS</h1>
          <p className="text-slate-500 mt-1">Manage the flagship Personal Branding page content.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex min-h-[600px]">
        
        {/* Sidebar Tabs */}
        <div className="w-64 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-white overflow-y-auto max-h-[800px]">
          
          {/* HERO SECTION */}
          {activeTab === "hero" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Hero Section</h2>
              <AdminInput 
                label="Badge Text" 
                value={form.hero.badge} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, badge: e.target.value}})} 
              />
              <AdminInput 
                label="Headline Line 1" 
                value={form.hero.headlineLine1} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, headlineLine1: e.target.value}})} 
              />
              <AdminInput 
                label="Headline Line 2" 
                value={form.hero.headlineLine2} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, headlineLine2: e.target.value}})} 
              />
              <AdminTextarea 
                label="Subheadline Line 1" 
                value={form.hero.subheadlineLine1} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, subheadlineLine1: e.target.value}})} 
              />
              <AdminTextarea 
                label="Subheadline Line 2" 
                value={form.hero.subheadlineLine2} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, subheadlineLine2: e.target.value}})} 
              />
              <AdminInput 
                label="Avatar URL" 
                value={form.hero.avatarUrl || ""} 
                onChange={(e: any) => setForm({...form, hero: {...form.hero, avatarUrl: e.target.value}})} 
              />
              <div className="pt-6 border-t border-slate-100">
                <AdminButton 
                  onClick={() => handleSave("hero")} 
                  disabled={saving} 
                  icon={saving ? Loader2 : Save}
                >
                  {saving ? "Saving..." : "Save Hero"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* GALAXY SECTION */}
          {activeTab === "galaxy" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Creator Galaxy</h2>
              <AdminInput label="Badge" value={form.galaxy.badge} onChange={(e: any) => setForm({...form, galaxy: {...form.galaxy, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.galaxy.title} onChange={(e: any) => setForm({...form, galaxy: {...form.galaxy, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.galaxy.description} onChange={(e: any) => setForm({...form, galaxy: {...form.galaxy, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("galaxy")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Galaxy"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* AI BRAIN SECTION */}
          {activeTab === "brain" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">AI Brain</h2>
              <AdminInput label="Badge" value={form.brain.badge} onChange={(e: any) => setForm({...form, brain: {...form.brain, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.brain.title} onChange={(e: any) => setForm({...form, brain: {...form.brain, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.brain.description} onChange={(e: any) => setForm({...form, brain: {...form.brain, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("brain")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save AI Brain"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* DASHBOARD SECTION */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Dashboard</h2>
              <AdminInput label="Badge" value={form.dashboard.badge} onChange={(e: any) => setForm({...form, dashboard: {...form.dashboard, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.dashboard.title} onChange={(e: any) => setForm({...form, dashboard: {...form.dashboard, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.dashboard.description} onChange={(e: any) => setForm({...form, dashboard: {...form.dashboard, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("dashboard")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Dashboard"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* TIMELINE SECTION */}
          {activeTab === "timeline" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Timeline</h2>
              <AdminInput label="Badge" value={form.timeline.badge} onChange={(e: any) => setForm({...form, timeline: {...form.timeline, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.timeline.title} onChange={(e: any) => setForm({...form, timeline: {...form.timeline, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.timeline.description} onChange={(e: any) => setForm({...form, timeline: {...form.timeline, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("timeline")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Timeline"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* INFLUENCE SECTION */}
          {activeTab === "influence" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Influence Engine</h2>
              <AdminInput label="Badge" value={form.influence.badge} onChange={(e: any) => setForm({...form, influence: {...form.influence, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.influence.title} onChange={(e: any) => setForm({...form, influence: {...form.influence, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.influence.description} onChange={(e: any) => setForm({...form, influence: {...form.influence, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("influence")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Influence Engine"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* CASE STUDIES SECTION */}
          {activeTab === "caseStudies" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Case Studies</h2>
              <AdminInput label="Badge" value={form.caseStudies.badge} onChange={(e: any) => setForm({...form, caseStudies: {...form.caseStudies, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.caseStudies.title} onChange={(e: any) => setForm({...form, caseStudies: {...form.caseStudies, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.caseStudies.description} onChange={(e: any) => setForm({...form, caseStudies: {...form.caseStudies, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("caseStudies")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Case Studies"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* PRICING SECTION */}
          {activeTab === "pricing" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Pricing</h2>
              <AdminInput label="Badge" value={form.pricing.badge} onChange={(e: any) => setForm({...form, pricing: {...form.pricing, badge: e.target.value}})} />
              <AdminInput label="Title" value={form.pricing.title} onChange={(e: any) => setForm({...form, pricing: {...form.pricing, title: e.target.value}})} />
              <AdminTextarea label="Description" value={form.pricing.description} onChange={(e: any) => setForm({...form, pricing: {...form.pricing, description: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("pricing")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save Pricing"}
                </AdminButton>
              </div>
            </div>
          )}

          {/* CTA SECTION */}
          {activeTab === "cta" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 mb-6">CTA</h2>
              <AdminInput label="Title" value={form.cta.title} onChange={(e: any) => setForm({...form, cta: {...form.cta, title: e.target.value}})} />
              <AdminInput label="Highlighted Title" value={form.cta.highlightedTitle} onChange={(e: any) => setForm({...form, cta: {...form.cta, highlightedTitle: e.target.value}})} />
              <AdminTextarea label="Description" value={form.cta.description} onChange={(e: any) => setForm({...form, cta: {...form.cta, description: e.target.value}})} />
              <AdminInput label="Button Text" value={form.cta.buttonText} onChange={(e: any) => setForm({...form, cta: {...form.cta, buttonText: e.target.value}})} />
              
              <div className="pt-6 border-t border-slate-100">
                <AdminButton onClick={() => handleSave("cta")} disabled={saving} icon={saving ? Loader2 : Save}>
                  {saving ? "Saving..." : "Save CTA"}
                </AdminButton>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
