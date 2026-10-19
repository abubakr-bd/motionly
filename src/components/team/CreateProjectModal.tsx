import React, { useState } from "react";
import { X, FolderKanban, Calendar, User, Palette, FileText, Loader2 } from "lucide-react";
import type { WorkspaceMember } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onProjectCreated: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  members,
  currentUser,
  onProjectCreated
}) => {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("4x Reels/Shorts, 1x YouTube Master Cut");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]
  );
  const [leadId, setLeadId] = useState(currentUser.id);
  const [color, setColor] = useState("#38bdf8");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const selectedLead = members.find((m) => m.id === leadId) || currentUser;
      await TeamWorkspaceService.createProject(
        {
          name: name.trim(),
          clientName: clientName.trim() || "Motionly Client",
          description: description.trim(),
          status: "active",
          deadline,
          leadId: selectedLead.id,
          leadName: selectedLead.name,
          memberIds: [selectedLead.id],
          color,
          deliverables: deliverables.trim()
        },
        { name: currentUser.name, email: currentUser.email }
      );

      onProjectCreated();
      onClose();
      setName("");
      setClientName("");
      setDescription("");
    } catch (err) {
      console.error("Project creation failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const paletteColors = [
    "#38bdf8", // Cyan
    "#818cf8", // Indigo
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ec4899", // Pink
    "#a855f7", // Purple
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create Agency Project</h2>
              <p className="text-[11px] text-slate-400">Track client deliverables, cuts, and team milestones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. EquiSaaS BD Launch Series, Tech Founder Podcast"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Client / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. EquiSaaS BD, Varnox"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                Project Lead
              </label>
              <select
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Deliverables &amp; Format Scope
            </label>
            <input
              type="text"
              placeholder="e.g. 4x Reels, 1x Longform YouTube, 1x Trailer"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Target Deadline
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                Accent Color
              </label>
              <div className="flex items-center gap-2 pt-1">
                {paletteColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      color === c ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Overview
            </label>
            <textarea
              rows={2}
              placeholder="Target goals, style reference, storytelling angle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
