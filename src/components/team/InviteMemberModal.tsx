import React, { useState } from "react";
import { X, UserPlus, Mail, Shield, Wrench, Loader2 } from "lucide-react";
import type { TeamRole, WorkspacePermission, WorkspaceMember } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: WorkspaceMember;
  onMemberAdded: () => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onMemberAdded
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("Video Editor");
  const [permission, setPermission] = useState<WorkspacePermission>("member");
  const [skillsInput, setSkillsInput] = useState("Premiere Pro, Sound Design");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const skills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);

      await TeamWorkspaceService.addMemberToWhitelist(
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          role,
          permission,
          skills,
          active: true,
          status: "available"
        },
        { name: currentUser.name, email: currentUser.email }
      );

      onMemberAdded();
      onClose();
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Failed to add member:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const availableRoles: TeamRole[] = [
    "Founder",
    "Creative Director",
    "Head of Growth",
    "Senior Video Editor",
    "Video Editor",
    "Motion Designer",
    "Social Media Manager",
    "Content Strategist",
    "Production Lead",
    "Team Member"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#0d1322] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Team Member</h2>
              <p className="text-[11px] text-slate-400">Grant authorized access to Motionly workspace</p>
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
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tanvir Ahmed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              Approved Google Email <span className="text-cyan-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="editor@motionly.media or gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              User must log in with this exact email to pass the whitelist gate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Role in Agency
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamRole)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {availableRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Permissions
              </label>
              <select
                value={permission}
                onChange={(e) => setPermission(e.target.value as WorkspacePermission)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="member">Member</option>
                <option value="lead">Lead / Producer</option>
                <option value="admin">Admin / Founder</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              Specialties / Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="Premiere Pro, After Effects, Sound Design"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
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
              disabled={submitting || !email.trim() || !name.trim()}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Adding...
                </>
              ) : (
                "Whitelist Member"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
