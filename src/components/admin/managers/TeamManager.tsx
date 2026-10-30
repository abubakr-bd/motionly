import React, { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { AdminButton, AdminInput, AdminPageHeader, AdminSearchBar, AdminModal, AdminEmptyState } from "../ui/AdminUI";
import { useAuth } from "../../../lib/auth";
import { logActivity } from "../../../lib/activity";
import { Edit2, Trash2, Plus, Loader2, Users, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { DEFAULT_TEAM } from "../../../lib/useSiteData";

export const TeamManager = ({ notify }: any) => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    img: "",
    order: 0
  });

  useEffect(() => {
    let unsub: any;
    getDb().then(db => {
      const colRef = collection(db, "team");
      unsub = onSnapshot(colRef, snap => {
        const docs = snap.docs.map(d => ({ fid: d.id, ...d.data() }));
        docs.sort((a: any, b: any) => {
          const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });
        setItems(docs);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      return notify("Name and Role are required", "err");
    }
    setSaving(true);
    try {
      const db = await getDb();
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        img: form.img.trim(),
        order: Number(form.order) || 0,
        updatedAt: Timestamp.now()
      };

      if (editingId) {
        await setDoc(doc(db, "team", editingId), payload, { merge: true });
        logActivity(user, "updated", "team", form.name, editingId);
        notify("Member updated");
      } else {
        const newRef = doc(collection(db, "team"));
        await setDoc(newRef, { ...payload, createdAt: Timestamp.now() });
        logActivity(user, "created", "team", form.name, newRef.id);
        notify("Member added");
      }
      setIsAdding(false);
      setEditingId(null);
    } catch {
      notify("Failed to save member", "err");
    }
    setSaving(false);
  };

  const handleEdit = (item: any) => {
    setForm({
      name: item.name || "",
      role: item.role || "",
      img: item.img || "",
      order: item.order ?? items.length
    });
    setEditingId(item.fid);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from team?`)) return;
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "team", id));
      logActivity(user, "deleted", "team", name, id);
      notify("Member deleted");
    } catch {
      notify("Delete failed", "err");
    }
  };

  const moveOrder = async (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= items.length) return;
    const db = await getDb();
    const current = items[index];
    const swapWith = items[index + direction];
    
    await setDoc(doc(db, "team", current.fid), { order: index + direction }, { merge: true });
    await setDoc(doc(db, "team", swapWith.fid), { order: index }, { merge: true });
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset team roster to Motionly's default team members? This will restore default member profiles.")) return;
    setSaving(true);
    try {
      const db = await getDb();
      for (const existing of items) {
        if (existing.fid) {
          await deleteDoc(doc(db, "team", existing.fid));
        }
      }
      for (const member of DEFAULT_TEAM) {
        await setDoc(doc(db, "team", member.id), {
          name: member.name,
          role: member.role,
          img: member.img,
          order: member.order,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
      logActivity(user, "updated", "team", "Reset Team Roster to Defaults");
      notify("Default team members restored successfully!");
    } catch (err) {
      console.error(err);
      notify("Failed to reset team", "err");
    }
    setSaving(false);
  };

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const s = search.toLowerCase();
    return items.filter(
      item => item.name?.toLowerCase().includes(s) || item.role?.toLowerCase().includes(s)
    );
  }, [items, search]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <AdminPageHeader
        title="Team Roster"
        description="Manage team members, roles, avatars, and display ordering shown on the public site."
        action={
          <div className="flex items-center gap-2.5">
            <AdminButton variant="secondary" onClick={handleResetDefaults} loading={saving}>
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Reset to Defaults</span>
            </AdminButton>
            <AdminButton
              onClick={() => {
                setForm({ name: "", role: "", img: "", order: items.length });
                setEditingId(null);
                setIsAdding(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add Member
            </AdminButton>
          </div>
        }
      />

      <div className="w-full sm:w-80">
        <AdminSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search team members..."
        />
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : filteredItems.length === 0 ? (
        <AdminEmptyState
          title={search ? "No matching team members" : "No team members yet"}
          description={
            search
              ? "Try adjusting your search query."
              : "Introduce your creative directors, editors, and producers."
          }
          actionLabel="Add Member"
          onAction={() => {
            setForm({ name: "", role: "", img: "", order: items.length });
            setEditingId(null);
            setIsAdding(true);
          }}
        />
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <div
              key={item.fid}
              className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between group transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative shrink-0">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm bg-slate-100"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 text-white font-black text-base flex items-center justify-center shadow-sm">
                      {item.name?.charAt(0)?.toUpperCase() || "T"}
                    </div>
                  )}
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold border border-white">
                    {idx + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base truncate">{item.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      #{item.order ?? idx}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveOrder(idx, -1)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => moveOrder(idx, 1)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Edit Member"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.fid, item.name)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AdminModal
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title={editingId ? "Edit Team Member" : "Add Team Member"}
        description="Add a creative team member to be featured on the about/team section."
      >
        <div className="space-y-5">
          <AdminInput
            label="Full Name"
            placeholder="e.g. Alex Rivera"
            value={form.name}
            onChange={(e: any) => setForm({ ...form, name: e.target.value })}
          />

          <AdminInput
            label="Role / Title"
            placeholder="e.g. Lead Video Editor & Motion Designer"
            value={form.role}
            onChange={(e: any) => setForm({ ...form, role: e.target.value })}
          />

          <div className="space-y-2">
            <AdminInput
              label="Avatar / Image URL"
              placeholder="e.g. /employes/Wasif.png or https://..."
              value={form.img}
              onChange={(e: any) => setForm({ ...form, img: e.target.value })}
            />
            {form.img && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img
                  src={form.img}
                  alt="Avatar Preview"
                  className="w-12 h-12 rounded-xl object-cover bg-slate-900 shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Avatar Preview</p>
                  <p className="text-slate-400 truncate max-w-xs">{form.img}</p>
                </div>
              </div>
            )}
          </div>

          <AdminInput
            label="Display Order (lowest comes first)"
            type="number"
            value={form.order}
            onChange={(e: any) => setForm({ ...form, order: e.target.value })}
          />

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <AdminButton variant="secondary" onClick={() => setIsAdding(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editingId ? "Update Member" : "Save Member"}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
