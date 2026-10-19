import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp, collection, getDocs } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { seedDatabase } from "../../../lib/seedData";
import { 
  DEFAULT_GLOBAL, 
  DEFAULT_CONTACT, 
  DEFAULT_SEO, 
  DEFAULT_LAYOUT 
} from "../../../lib/useSiteData";
import { Settings, Globe, Phone, Palette, Layout, Loader2, Save, Download, Upload, Database, ToggleRight } from "lucide-react";

export const GlobalSettingsManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("brand");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    global: DEFAULT_GLOBAL,
    contact: DEFAULT_CONTACT,
    seo: DEFAULT_SEO,
    layout: DEFAULT_LAYOUT
  });

  useEffect(() => {
    let unsub: any;
    let isMounted = true;

    // Safety timeout: ensure loading state is cleared within 1.5s even if Firestore is slow
    const timeoutId = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1500);

    getDb()
      .then((db) => {
        unsub = onSnapshot(
          doc(db, "settings", "site"),
          (snap) => {
            if (!isMounted) return;
            if (snap.exists()) {
              const d = snap.data();
              setForm({
                global: { ...DEFAULT_GLOBAL, ...(d.global || {}) },
                contact: { ...DEFAULT_CONTACT, ...(d.contact || {}) },
                seo: { ...DEFAULT_SEO, ...(d.seo || {}) },
                layout: { ...DEFAULT_LAYOUT, ...(d.layout || {}) }
              });
            }
            setLoading(false);
          },
          (err) => {
            console.error("Firestore settings load error:", err);
            if (isMounted) setLoading(false);
          }
        );
      })
      .catch((err) => {
        console.error("getDb error in GlobalSettingsManager:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      unsub?.();
    };
  }, []);

  const handleSave = async (section: keyof typeof form) => {
    setSaving(true);
    try {
      const db = await getDb();
      await setDoc(doc(db, "settings", "site"), { [section]: form[section], updatedAt: Timestamp.now() }, { merge: true });
      logActivity(user, "updated", "settings", section);
      notify(`${section.toUpperCase()} settings saved`);
    } catch {
      notify("Failed to save settings", "err");
    }
    setSaving(false);
  };

  const tabs = [
    { id: "brand", label: "Brand Identity", icon: Palette },
    { id: "contact", label: "Contact Links", icon: Phone },
    { id: "seo", label: "Global SEO", icon: Globe },
    { id: "layout", label: "Homepage Layout", icon: Layout },
    { id: "pages", label: "Page Toggles", icon: ToggleRight },
    { id: "data", label: "Backups & Data", icon: Download }
  ];

  const handleExport = async () => {
    try {
      const db = await getDb();
      const collections = ["blogs", "portfolio", "testimonials", "team", "pricing", "faqs"];
      const data: any = {};
      
      for (const col of collections) {
        const snap = await getDocs(collection(db, col));
        data[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      
      const siteSnap = await getDocs(collection(db, "settings"));
      data["settings"] = siteSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `motionly_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      logActivity(user, "archived", "settings", "Full Backup Exported");
      notify("Backup downloaded successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to export backup", "err");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Global Settings</h2>
          <p className="text-slate-500 mt-1">Manage branding, layout, and global configurations.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === t.id ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </aside>

        <main className="flex-1">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              {activeTab === "brand" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Brand Identity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Site Name" value={form.global.siteName} onChange={(e: any) => setForm({ ...form, global: { ...form.global, siteName: e.target.value } })} />
                    <AdminInput label="Logo URL" value={form.global.logoUrl} onChange={(e: any) => setForm({ ...form, global: { ...form.global, logoUrl: e.target.value } })} />
                  </div>
                  <AdminTextarea label="Global Site Description" value={form.global.siteDescription} onChange={(e: any) => setForm({ ...form, global: { ...form.global, siteDescription: e.target.value } })} rows={3} />
                  <div className="pt-4 flex justify-end"><AdminButton onClick={() => handleSave("global")} loading={saving}><Save className="w-4 h-4" /> Save Brand Details</AdminButton></div>
                </div>
              )}

              {activeTab === "pages" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Page Toggles</h3>
                  <p className="text-sm text-slate-500 mb-4">Turn specific pages on or off. When off, they will show a 404/Maintenance screen.</p>
                  
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="font-bold text-slate-700">Personal Branding Page</span>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600 rounded"
                        checked={form.global?.pageToggles?.personalBranding ?? true}
                        onChange={(e) => setForm({
                          ...form, 
                          global: {
                            ...form.global, 
                            pageToggles: { ...(form.global?.pageToggles || {}), personalBranding: e.target.checked }
                          }
                        })} 
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="font-bold text-slate-700">Services Page</span>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600 rounded"
                        checked={form.global?.pageToggles?.services ?? true}
                        onChange={(e) => setForm({
                          ...form, 
                          global: {
                            ...form.global, 
                            pageToggles: { ...(form.global?.pageToggles || {}), services: e.target.checked }
                          }
                        })} 
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="font-bold text-slate-700">Portfolio Page</span>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600 rounded"
                        checked={form.global?.pageToggles?.portfolio ?? true}
                        onChange={(e) => setForm({
                          ...form, 
                          global: {
                            ...form.global, 
                            pageToggles: { ...(form.global?.pageToggles || {}), portfolio: e.target.checked }
                          }
                        })} 
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="font-bold text-slate-700">About Page</span>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600 rounded"
                        checked={form.global?.pageToggles?.about ?? true}
                        onChange={(e) => setForm({
                          ...form, 
                          global: {
                            ...form.global, 
                            pageToggles: { ...(form.global?.pageToggles || {}), about: e.target.checked }
                          }
                        })} 
                      />
                    </label>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <AdminButton onClick={() => handleSave("global")} loading={saving}>
                      <Save className="w-4 h-4" /> Save Page Settings
                    </AdminButton>
                  </div>
                </div>
              )}
              
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Contact Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Support Email" value={form.contact.email} onChange={(e: any) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })} />
                    <AdminInput label="Calendly URL" value={form.contact.calendlyUrl} onChange={(e: any) => setForm({ ...form, contact: { ...form.contact, calendlyUrl: e.target.value } })} />
                    <AdminInput label="LinkedIn" value={form.contact.linkedin} onChange={(e: any) => setForm({ ...form, contact: { ...form.contact, linkedin: e.target.value } })} />
                    <AdminInput label="Instagram" value={form.contact.instagram} onChange={(e: any) => setForm({ ...form, contact: { ...form.contact, instagram: e.target.value } })} />
                  </div>
                  <div className="pt-4 flex justify-end"><AdminButton onClick={() => handleSave("contact")} loading={saving}><Save className="w-4 h-4" /> Save Contact</AdminButton></div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Global SEO (Fallback)</h3>
                  <AdminInput label="Default Title" value={form.seo.title} onChange={(e: any) => setForm({ ...form, seo: { ...form.seo, title: e.target.value } })} />
                  <AdminTextarea label="Default Description" value={form.seo.description} onChange={(e: any) => setForm({ ...form, seo: { ...form.seo, description: e.target.value } })} rows={3} />
                  <AdminInput label="Default OpenGraph Image URL" value={form.seo.image} onChange={(e: any) => setForm({ ...form, seo: { ...form.seo, image: e.target.value } })} />
                  <div className="pt-4 flex justify-end"><AdminButton onClick={() => handleSave("seo")} loading={saving}><Save className="w-4 h-4" /> Save SEO</AdminButton></div>
                </div>
              )}

              {activeTab === "layout" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Homepage Section Ordering</h3>
                      <p className="text-sm text-slate-500 mt-1">Reorder, enable, or disable sections displayed on the live homepage.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({
                        ...form,
                        layout: {
                          homepageSections: [
                            "hero", "partners", "portfolio", "painPoints", "difference",
                            "testimonials", "process", "team", "pricing", "blog", "faqs", "contact"
                          ]
                        }
                      })}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
                    >
                      Reset to Default
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(() => {
                      const sectionCatalog: Record<string, { label: string; desc: string }> = {
                        hero: { label: "Hero Banner", desc: "Top headline, showreel video, and primary action buttons" },
                        partners: { label: "Trusted Partners", desc: "Logo marquee of creators and brands" },
                        portfolio: { label: "Selected Work", desc: "Showcase grid of video edits and case studies" },
                        painPoints: { label: "Pain Points / Say Goodbye", desc: "Creator challenges and production friction" },
                        sayGoodbye: { label: "Pain Points / Say Goodbye", desc: "Creator challenges and production friction" },
                        "pain-points": { label: "Pain Points / Say Goodbye", desc: "Creator challenges and production friction" },
                        difference: { label: "The Difference", desc: "Comparison between fragmented workflow vs Motionly" },
                        testimonials: { label: "Client Reviews", desc: "Video reviews and high-trust client quotes" },
                        reviews: { label: "Client Reviews", desc: "Video reviews and high-trust client quotes" },
                        process: { label: "How It Works / Process", desc: "Step-by-step production flow and creative milestones" },
                        team: { label: "Team / About Us", desc: "Team roster, roles, and creative directors" },
                        about: { label: "Team / About Us", desc: "Team roster, roles, and creative directors" },
                        pricing: { label: "Pricing Engine", desc: "Transparent retainer and custom scope packages" },
                        blog: { label: "Latest Articles", desc: "Recent articles, insights, and case studies" },
                        latestBlog: { label: "Latest Articles", desc: "Recent articles, insights, and case studies" },
                        faqs: { label: "Frequently Asked Questions", desc: "Answers to common client and production questions" },
                        faq: { label: "Frequently Asked Questions", desc: "Answers to common client and production questions" },
                        contact: { label: "Contact & Booking", desc: "Direct inquiry form and Calendly scheduler" }
                      };

                      const currentList = Array.isArray(form.layout?.homepageSections) && form.layout.homepageSections.length > 0
                        ? form.layout.homepageSections
                        : [
                            "hero", "partners", "portfolio", "painPoints", "difference",
                            "testimonials", "process", "team", "pricing", "blog", "faqs", "contact"
                          ];

                      const moveSection = (idx: number, dir: -1 | 1) => {
                        const target = idx + dir;
                        if (target < 0 || target >= currentList.length) return;
                        const copy = [...currentList];
                        const temp = copy[idx];
                        copy[idx] = copy[target];
                        copy[target] = temp;
                        setForm({ ...form, layout: { homepageSections: copy } });
                      };

                      const removeSection = (secId: string) => {
                        setForm({
                          ...form,
                          layout: { homepageSections: currentList.filter(s => s !== secId) }
                        });
                      };

                      const allKeys = [
                        "hero", "partners", "portfolio", "painPoints", "difference",
                        "testimonials", "process", "team", "pricing", "blog", "faqs", "contact"
                      ];
                      const missingKeys = allKeys.filter(k => !currentList.includes(k));

                      return (
                        <div className="space-y-4">
                          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                            {currentList.map((secKey, idx) => {
                              const meta = sectionCatalog[secKey] || { label: secKey, desc: "Custom section" };
                              return (
                                <div key={`${secKey}-${idx}`} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-slate-600 text-xs flex items-center justify-center">
                                      {idx + 1}
                                    </span>
                                    <div>
                                      <p className="font-bold text-slate-900 text-sm">{meta.label}</p>
                                      <p className="text-xs text-slate-400">{meta.desc}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={idx === 0}
                                      onClick={() => moveSection(idx, -1)}
                                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition-colors"
                                      title="Move Up"
                                    >
                                      ↑
                                    </button>
                                    <button
                                      type="button"
                                      disabled={idx === currentList.length - 1}
                                      onClick={() => moveSection(idx, 1)}
                                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition-colors"
                                      title="Move Down"
                                    >
                                      ↓
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => removeSection(secKey)}
                                      className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-2 text-xs font-bold"
                                      title="Remove from Homepage"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {missingKeys.length > 0 && (
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
                                Add Hidden Section:
                              </span>
                              {missingKeys.map(k => (
                                <button
                                  key={k}
                                  type="button"
                                  onClick={() => setForm({
                                    ...form,
                                    layout: { homepageSections: [...currentList, k] }
                                  })}
                                  className="text-xs font-bold bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors"
                                >
                                  + {sectionCatalog[k]?.label || k}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <AdminButton onClick={() => handleSave("layout")} loading={saving}>
                      <Save className="w-4 h-4" /> Save Homepage Layout
                    </AdminButton>
                  </div>
                </div>
              )}

              {activeTab === "data" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-2">Backups & Data</h3>
                  <p className="text-sm text-slate-500 mb-8">Export all your CMS content (blogs, portfolio, team, settings) as a JSON file for safekeeping.</p>
                  
                  <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-4">
                    <h4 className="font-bold text-blue-900">Download Backup</h4>
                    <p className="text-sm text-blue-700">Creates a single .json file containing every collection in your database.</p>
                    <AdminButton onClick={handleExport} variant="primary">
                      <Download className="w-4 h-4" /> Export JSON Backup
                    </AdminButton>
                  </div>

                  <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl space-y-4">
                    <h4 className="font-bold text-amber-900">Restore Missing Blogs</h4>
                    <p className="text-sm text-amber-700">If your default demo blogs are missing, this will safely add them back without affecting other content.</p>
                    <AdminButton onClick={() => seedDatabase(notify, () => window.location.reload())} variant="secondary">
                      <Database className="w-4 h-4" /> Restore Blogs
                    </AdminButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
