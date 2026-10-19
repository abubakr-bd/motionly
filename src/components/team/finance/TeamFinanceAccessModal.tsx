import React, { useState } from "react";
import { 
  Shield, 
  X, 
  Check, 
  Lock, 
  Unlock, 
  DollarSign, 
  UserCheck, 
  AlertCircle, 
  Sparkles,
  Loader2,
  Info
} from "lucide-react";
import type { WorkspaceMember, WorkspacePermission, TeamRole } from "../../../types/teamWorkspace";
import { isSuperAdmin, canAccessFinance, SUPER_ADMIN_EMAILS } from "../../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../../lib/teamWorkspaceService";
import { useTeamTheme } from "../TeamThemeContext";

interface TeamFinanceAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onMemberUpdated: (updatedMember: WorkspaceMember) => void;
}

const AVAILABLE_ROLES: TeamRole[] = [
  "CEO",
  "Founder",
  "Finance Officer",
  "Chief Operating Officer",
  "Chief Financial Officer",
  "Creative Director",
  "Head of Growth",
  "Production Lead",
  "Senior Video Editor",
  "Motion Designer",
  "Social Media Manager",
  "Content Strategist",
  "Video Editor",
  "Team Member"
];

export const TeamFinanceAccessModal: React.FC<TeamFinanceAccessModalProps> = ({
  isOpen,
  onClose,
  members,
  currentUser,
  onMemberUpdated
}) => {
  const { theme } = useTeamTheme();
  const [savingMemberId, setSavingMemberId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Local state map for optimistic editing before saving
  const [memberStates, setMemberStates] = useState<Record<string, {
    role: string;
    permission: WorkspacePermission;
    hasFinanceAccess: boolean;
  }>>(() => {
    const map: Record<string, any> = {};
    members.forEach(m => {
      map[m.id] = {
        role: m.role,
        permission: m.permission,
        hasFinanceAccess: canAccessFinance(m)
      };
    });
    return map;
  });

  if (!isOpen) return null;

  const isUserSuperAdmin = isSuperAdmin(currentUser.email);

  const handleToggleFinanceAccess = (memberId: string) => {
    setMemberStates(prev => {
      const current = prev[memberId];
      if (!current) return prev;
      return {
        ...prev,
        [memberId]: {
          ...current,
          hasFinanceAccess: !current.hasFinanceAccess
        }
      };
    });
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMemberStates(prev => {
      const current = prev[memberId];
      if (!current) return prev;
      // Auto-grant finance access if elevated to CEO, Finance Officer, or Chief role
      const roleLower = newRole.toLowerCase();
      const shouldAutoGrant = 
        roleLower.includes("finance") || 
        roleLower.includes("ceo") || 
        roleLower.includes("chief") || 
        roleLower.includes("founder");

      return {
        ...prev,
        [memberId]: {
          ...current,
          role: newRole,
          hasFinanceAccess: shouldAutoGrant ? true : current.hasFinanceAccess
        }
      };
    });
  };

  const handlePermissionChange = (memberId: string, newPermission: WorkspacePermission) => {
    setMemberStates(prev => {
      const current = prev[memberId];
      if (!current) return prev;
      return {
        ...prev,
        [memberId]: {
          ...current,
          permission: newPermission
        }
      };
    });
  };

  const handleSaveMemberAccess = async (member: WorkspaceMember) => {
    if (!isUserSuperAdmin) {
      setErrorMessage("Unauthorized: Only verified Super Admins can alter finance permissions.");
      return;
    }

    const state = memberStates[member.id];
    if (!state) return;

    setSavingMemberId(member.id);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await TeamWorkspaceService.updateMemberAccess(
        member.id,
        {
          role: state.role,
          permission: state.permission,
          hasFinanceAccess: state.hasFinanceAccess
        },
        {
          name: currentUser.name,
          email: currentUser.email
        }
      );

      const updatedMember: WorkspaceMember = {
        ...member,
        role: state.role as TeamRole,
        permission: state.permission,
        hasFinanceAccess: state.hasFinanceAccess,
        updatedAt: new Date().toISOString()
      };

      onMemberUpdated(updatedMember);
      setSuccessMessage(`Access & roles updated successfully for ${member.name}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error("Save access error:", err);
      setErrorMessage(err.message || "Failed to update member access.");
    } finally {
      setSavingMemberId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-3xl border rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh] ${
          theme === "white"
            ? "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
            : theme === "gray"
            ? "bg-[#161c28] border-slate-700/80 text-slate-100"
            : "bg-[#0d1322] border-slate-800 text-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`flex items-start justify-between pb-4 border-b mb-5 ${
          theme === "white" ? "border-slate-200" : "border-slate-800"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  Super Admin Access Control
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                  Super Admin Only
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${theme === "white" ? "text-slate-600" : "text-slate-400"}`}>
                Configure who can view, edit, and create Motionly studio invoices, client payment records, and finance ledgers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === "white" 
                ? "text-slate-400 hover:text-slate-900 hover:bg-slate-100" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Super Admin Notice Card */}
        <div className={`p-4 rounded-2xl border mb-6 flex items-start gap-3 ${
          theme === "white"
            ? "bg-amber-50/70 border-amber-200 text-amber-900"
            : "bg-amber-950/20 border-amber-800/30 text-amber-300"
        }`}>
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold">Security Enforcement Rule:</p>
            <p className="mt-0.5 opacity-90">
              Only verified Motionly Super Admins (<span className="font-mono font-semibold">abubakr.professional@gmail.com</span>, <span className="font-mono font-semibold">shuvo@motionly.media</span>, <span className="font-mono font-semibold">motionlymedia.help@gmail.com</span>) can toggle Finance access or elevate roles. Finance Officer, CEO, and Chief Officers have default access.
            </p>
          </div>
        </div>

        {/* Feedback Messages */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Members Access List */}
        <div className="space-y-3">
          <p className={`text-xs font-bold uppercase tracking-wider ${
            theme === "white" ? "text-slate-500" : "text-slate-400"
          }`}>
            Team Roster Permissions ({members.length})
          </p>

          <div className="space-y-3">
            {members.map((member) => {
              const state = memberStates[member.id] || {
                role: member.role,
                permission: member.permission,
                hasFinanceAccess: canAccessFinance(member)
              };

              const isSuper = isSuperAdmin(member.email);
              const isSaving = savingMemberId === member.id;

              return (
                <div
                  key={member.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    state.hasFinanceAccess
                      ? theme === "white"
                        ? "bg-slate-50 border-slate-200"
                        : theme === "gray"
                        ? "bg-[#1c2333] border-slate-700/80"
                        : "bg-[#0b101e] border-slate-800"
                      : theme === "white"
                      ? "bg-white border-slate-200 opacity-90"
                      : theme === "gray"
                      ? "bg-[#161a25] border-slate-800 opacity-80"
                      : "bg-[#080d1a] border-slate-850 opacity-80"
                  }`}
                >
                  {/* Left: Avatar & Identity */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold truncate">{member.name}</h4>
                        {isSuper && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[9px] font-bold">
                            SUPER ADMIN
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${theme === "white" ? "text-slate-500" : "text-slate-400"}`}>
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Role Selector & Level */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Role selector */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-slate-500 font-semibold mb-0.5">Role</label>
                      <select
                        value={state.role}
                        disabled={isSuper || !isUserSuperAdmin}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                          theme === "white"
                            ? "bg-white border-slate-200 text-slate-900"
                            : theme === "gray"
                            ? "bg-[#202738] border-slate-700 text-slate-100"
                            : "bg-[#111a2e] border-slate-700 text-white"
                        } disabled:opacity-60`}
                      >
                        {AVAILABLE_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Permission level selector */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-slate-500 font-semibold mb-0.5">Level</label>
                      <select
                        value={state.permission}
                        disabled={isSuper || !isUserSuperAdmin}
                        onChange={(e) => handlePermissionChange(member.id, e.target.value as WorkspacePermission)}
                        className={`text-xs px-2 py-1.5 rounded-lg border font-medium transition-colors ${
                          theme === "white"
                            ? "bg-white border-slate-200 text-slate-900"
                            : theme === "gray"
                            ? "bg-[#202738] border-slate-700 text-slate-100"
                            : "bg-[#111a2e] border-slate-700 text-white"
                        } disabled:opacity-60`}
                      >
                        <option value="admin">Admin</option>
                        <option value="lead">Lead</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </div>

                  {/* Right: Finance Access Toggle & Save Action */}
                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    {/* Finance Toggle Button */}
                    <button
                      type="button"
                      disabled={isSuper || !isUserSuperAdmin}
                      onClick={() => handleToggleFinanceAccess(member.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        state.hasFinanceAccess
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                          : theme === "white"
                          ? "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                          : "bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"
                      } disabled:opacity-75 disabled:cursor-not-allowed`}
                      title={isSuper ? "Super Admins have permanent finance access" : "Toggle Finance & Invoice Access"}
                    >
                      {state.hasFinanceAccess ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Finance Granted</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Restricted</span>
                        </>
                      )}
                    </button>

                    {/* Save Button for this Member */}
                    <button
                      type="button"
                      disabled={isSaving || !isUserSuperAdmin}
                      onClick={() => handleSaveMemberAccess(member)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        theme === "white"
                          ? "bg-slate-900 hover:bg-slate-800 text-white"
                          : "bg-cyan-600 hover:bg-cyan-500 text-white"
                      } disabled:opacity-50`}
                    >
                      {isSaving ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
          theme === "white" ? "border-slate-200 text-slate-500" : "border-slate-800 text-slate-400"
        }`}>
          <span>
            Logged in as Super Admin: <strong className="text-cyan-400">{currentUser.email}</strong>
          </span>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl border font-bold transition-colors ${
              theme === "white"
                ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
