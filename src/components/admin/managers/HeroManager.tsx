import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminTextarea, AdminPageHeader, AdminCard } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { DEFAULT_HERO, type HeroSettings } from "../../../lib/useSiteData";
import { Save, Loader2, Play, Sparkles, ExternalLink } from "lucide-react";

export const HeroManager = ({ notify }: { notify: (msg: string, type?: "ok" | "err") => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HeroSettings>(DEFAULT_HERO);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getDb().then((db) => {
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().hero) {
          setForm({ ...DEFAULT_HERO, ...snap.data().hero });
        } else {
          setForm(DEFAULT_HERO);
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
        hero: form,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      logActivity(user, "updated", "settings", "Homepage Hero Section");
      notify("Homepage Hero settings saved successfully");
    } catch (err) {
      console.error(err);
      notify("Failed to save hero settings", "err");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const showreelId = form.showreelVideoId || "_1VaQCNUdnU";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Homepage Hero & Showcase"
        subtitle="Manage the primary landing headlines, call-to-actions, and main showreel video."
        badge="Live Sync"
        action={
          <AdminButton onClick={handleSave} loading={saving} icon={Save}>
            Save Changes
          </AdminButton>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        {/* Main Headlines */}
        <AdminCard title="Headlines & Text" subtitle="The first text visitors read on the homepage.">
          <div className="space-y-6">
            <AdminInput
              label="Kicker Badge"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="e.g. Video editing and creative direction"
              hint="Small pill badge displayed directly above the primary title."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput
                label="Headline (First Part)"
                value={form.headline1}
                onChange={(e) => setForm({ ...form, headline1: e.target.value })}
                placeholder="e.g. Make every frame"
              />
              <AdminInput
                label="Headline (Highlighted Part in Blue)"
                value={form.headline2}
                onChange={(e) => setForm({ ...form, headline2: e.target.value })}
                placeholder="e.g. mean more."
              />
            </div>

            <AdminTextarea
              label="Subheadline"
              value={form.subheadline}
              onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
              rows={3}
              placeholder="Story-led editing, motion design, and creative direction..."
            />
          </div>
        </AdminCard>

        {/* Buttons / CTAs */}
        <AdminCard title="Call to Action Buttons" subtitle="Customize the two buttons shown below the subheadline.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Primary Button (Dark)
              </div>
              <AdminInput
                label="Button Label"
                value={form.cta1}
                onChange={(e) => setForm({ ...form, cta1: e.target.value })}
                placeholder="e.g. Talk through a project"
              />
              <AdminInput
                label="Target Link"
                value={form.cta1Link || ""}
                onChange={(e) => setForm({ ...form, cta1Link: e.target.value })}
                placeholder="e.g. /contact"
              />
            </div>

            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Secondary Button (Light)
              </div>
              <AdminInput
                label="Button Label"
                value={form.cta2}
                onChange={(e) => setForm({ ...form, cta2: e.target.value })}
                placeholder="e.g. Explore work"
              />
              <AdminInput
                label="Target Link"
                value={form.cta2Link || ""}
                onChange={(e) => setForm({ ...form, cta2Link: e.target.value })}
                placeholder="e.g. #selected-work or /portfolio"
              />
            </div>
          </div>
        </AdminCard>

        {/* Showreel Video */}
        <AdminCard title="Main Showreel Video" subtitle="The spotlight video player prominently featured on the homepage.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <AdminInput
                label="YouTube Video ID"
                value={form.showreelVideoId || ""}
                onChange={(e) => setForm({ ...form, showreelVideoId: e.target.value })}
                placeholder="e.g. _1VaQCNUdnU"
                hint="Copy the video ID from the YouTube URL (the part after v= or in embed)."
              />

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Live video integration
                </p>
                <p>
                  Visitors can click this preview to watch your high-definition showreel directly on the homepage with no redirects.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Preview</p>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                <img
                  src={`https://img.youtube.com/vi/${showreelId}/hqdefault.jpg`}
                  alt="Showreel Preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-blue-600 shadow-lg">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">Video ID: <span className="font-mono text-slate-700">{showreelId}</span></p>
            </div>
          </div>
        </AdminCard>

        {/* Floating Save Bar */}
        <div className="flex justify-end pt-4">
          <AdminButton type="submit" size="lg" loading={saving} icon={Save}>
            Save Hero Configuration
          </AdminButton>
        </div>
      </form>
    </div>
  );
};
