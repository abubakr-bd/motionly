import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Briefcase, 
  Shield, 
  Plus, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  UserCheck,
  Zap,
  MoreVertical,
  UserX,
  Lock,
  Unlock,
  DollarSign
} from "lucide-react";
import type { 
  WorkspaceMember, 
  WorkspaceTask, 
  TeamRole, 
  WorkspacePermission 
} from "../../types/teamWorkspace";
import { isSuperAdmin, canAccessFinance } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";
import { TeamFinanceAccessModal } from "./finance/TeamFinanceAccessModal";

interface TeamRosterProps {
  members: WorkspaceMember[];
  tasks: WorkspaceTask[];
  currentUser: WorkspaceMember;
  onOpenInviteMember: () => void;
  onOpenCreateTask: (projectId?: string, assigneeId?: string) => void;
  onSelectTask: (task: WorkspaceTask) => void;
  onFilterTasksByMember: (memberId: string) => void;
  onMemberUpdated?: (updatedMember: WorkspaceMember) => void;
  searchQuery?: string;
}

export const TeamRoster: React.FC<TeamRosterProps> = ({
  members,
  tasks,
  currentUser,
  onOpenInviteMember,
  onOpenCreateTask,
  onSelectTask,
  onFilterTasksByMember,
  onMemberUpdated,
  searchQuery = ""
}) => {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [localSearch, setLocalSearch] = useState("");
  const [activeMenuMemberId, setActiveMenuMemberId] = useState<string | null>(null);
  const [accessModalOpen, setAccessModalOpen] = useState(false);

  const isUserSuperAdmin = isSuperAdmin(currentUser.email);

  const canManage = currentUser.permission === "admin" || currentUser.permission === "lead";

  // Compute tasks per member
  const memberWorkloadMap = members.reduce((acc, m) => {
    const assignedTasks = tasks.filter(t => t.assigneeId === m.id || t.assigneeEmail.toLowerCase() === m.email.toLowerCase());
    const activeTasks = assignedTasks.filter(t => t.status !== "done");
    const completedTasks = assignedTasks.filter(t => t.status === "done");
    const inReviewTasks = assignedTasks.filter(t => t.status === "review");
    const inProgressTasks = assignedTasks.filter(t => t.status === "in_progress");

    acc[m.id] = {
      all: assignedTasks,
      active: activeTasks,
      completed: completedTasks,
      inReview: inReviewTasks,
      inProgress: inProgressTasks,
      count: activeTasks.length
    };
    return acc;
  }, {} as Record<string, {
    all: WorkspaceTask[];
    active: WorkspaceTask[];
    completed: WorkspaceTask[];
    inReview: WorkspaceTask[];
    inProgress: WorkspaceTask[];
    count: number;
  }>);

  // Search & Filter
  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredMembers = members.filter(m => {
    if (m.active === false && !canManage) return false;
    if (roleFilter !== "all") {
      if (roleFilter === "leads" && !["Founder", "Head of Growth", "Creative Director", "Production Lead"].includes(m.role)) {
        return false;
      }
      if (roleFilter === "editors" && !["Senior Video Editor", "Video Editor"].includes(m.role)) {
        return false;
      }
      if (roleFilter === "motion" && m.role !== "Motion Designer") {
        return false;
      }
      if (roleFilter === "strategy" && !["Social Media Manager", "Content Strategist"].includes(m.role)) {
        return false;
      }
    }
    if (effectiveSearch) {
      const matchName = m.name.toLowerCase().includes(effectiveSearch);
      const matchEmail = m.email.toLowerCase().includes(effectiveSearch);
      const matchRole = m.role.toLowerCase().includes(effectiveSearch);
      const matchSkill = m.skills?.some(s => s.toLowerCase().includes(effectiveSearch));
      return matchName || matchEmail || matchRole || matchSkill;
    }
    return true;
  });

  const getStatusColor = (status: WorkspaceMember["status"]) => {
    switch (status) {
      case "available":
        return { dot: "bg-emerald-400", text: "text-emerald-400", label: "Available" };
      case "busy":
        return { dot: "bg-cyan-400", text: "text-cyan-400", label: "In Production" };
      case "in_review":
        return { dot: "bg-amber-400", text: "text-amber-400", label: "In Review" };
      default:
        return { dot: "bg-slate-500", text: "text-slate-400", label: "Offline" };
    }
  };

  const getWorkloadSeverity = (count: number) => {
    if (count === 0) {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        label: "Ready for tasks",
        barColor: "bg-emerald-500"
      };
    }
    if (count <= 2) {
      return {
        badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
        label: "Optimal Load",
        barColor: "bg-cyan-500"
      };
    }
    if (count <= 4) {
      return {
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        label: "High Load",
        barColor: "bg-amber-500"
      };
    }
    return {
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      label: "Heavy Overload",
      barColor: "bg-rose-500"
    };
  };

  const handleUpdateSelfStatus = async (status: WorkspaceMember["status"]) => {
    try {
      await TeamWorkspaceService.updateMember(currentUser.id, { status }, {
        name: currentUser.name,
        email: currentUser.email
      });
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleToggleMemberActive = async (member: WorkspaceMember) => {
    setActiveMenuMemberId(null);
    try {
      await TeamWorkspaceService.updateMember(
        member.id,
        { active: !member.active },
        { name: currentUser.name, email: currentUser.email }
      );
    } catch (e) {
      console.error("Failed to toggle member active:", e);
    }
  };

  // Capacity stats
  const totalMembers = members.filter(m => m.active !== false).length;
  const availableMembers = members.filter(m => m.active !== false && m.status === "available").length;
  const inProdMembers = members.filter(m => m.active !== false && (m.status === "busy" || m.status === "in_review")).length;
  const totalActiveTasks = tasks.filter(t => t.status !== "done").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          HEADER & ACTIONS
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Team & Workload</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              {totalMembers} Whitelisted
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Realtime workload capacity, editor assignments, delivery velocity, and role access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick status toggle for current logged in user */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px] px-2 font-medium">My Status:</span>
            {(["available", "busy", "offline"] as const).map((st) => (
              <button
                key={st}
                onClick={() => handleUpdateSelfStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  currentUser.status === st
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "available" ? "🟢 Available" : st === "busy" ? "🟡 Editing" : "⚪ Offline"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isUserSuperAdmin && (
              <button
                type="button"
                onClick={() => setAccessModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-medium text-sm transition-all cursor-pointer"
                title="Super Admin: Manage finance and workspace permissions"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Super Admin Access</span>
              </button>
            )}

            {canManage && (
              <button
                onClick={onOpenInviteMember}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          CAPACITY PULSE METRICS
      ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0b101e] border border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Total Roster</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{totalMembers}</span>
            <Users className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-emerald-900/30">
          <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider block">Ready for Cut</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-300">{availableMembers}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-cyan-900/30">
          <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider block">In Production</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-cyan-300">{inProdMembers}</span>
            <Flame className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-blue-900/30">
          <span className="text-xs text-blue-400 font-medium uppercase tracking-wider block">Active Tasks</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-blue-300">{totalActiveTasks}</span>
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH & ROLE TABS
      ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2 bg-[#0b101e]/80 border border-slate-800/80 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "Entire Team" },
            { id: "leads", label: "Directors & Leads" },
            { id: "editors", label: "Video Editors" },
            { id: "motion", label: "Motion Designers" },
            { id: "strategy", label: "Growth & Content" }
          ].map(tab => {
            const active = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  active
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search member or skill..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* =========================================================================
          MEMBER CARDS & WORKLOAD MATRIX
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => {
          const workload = memberWorkloadMap[member.id] || {
            all: [],
            active: [],
            completed: [],
            inReview: [],
            inProgress: [],
            count: 0
          };
          const statusInfo = getStatusColor(member.status);
          const loadSeverity = getWorkloadSeverity(workload.count);
          const menuOpen = activeMenuMemberId === member.id;
          const isCurrentUser = member.id === currentUser.id || member.email.toLowerCase() === currentUser.email.toLowerCase();

          return (
            <div
              key={member.id}
              className={`rounded-2xl bg-[#0b101e] border ${
                member.active === false
                  ? "border-rose-900/40 opacity-70"
                  : isCurrentUser
                  ? "border-cyan-500/40 ring-1 ring-cyan-500/20"
                  : "border-slate-800/80 hover:border-slate-700"
              } p-5 flex flex-col justify-between transition-all duration-200 shadow-lg shadow-black/20`}
            >
              <div>
                {/* Top Profile Strip */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar with Status Indicator */}
                    <div className="relative">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-base font-bold text-cyan-400">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {/* Status indicator dot */}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b101e] ${statusInfo.dot}`}
                        title={statusInfo.label}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white truncate max-w-[150px]">
                          {member.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-semibold">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-[170px] mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu or Permission Badge */}
                  <div className="relative flex items-center gap-1.5 flex-wrap justify-end">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      member.permission === "admin"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                        : member.permission === "lead"
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}>
                      {member.permission.toUpperCase()}
                    </span>

                    {/* Finance Access status pill */}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border flex items-center gap-1 ${
                      canAccessFinance(member)
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-slate-800/80 text-slate-400 border-slate-700"
                    }`}>
                      {canAccessFinance(member) ? (
                        <>
                          <Unlock className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Finance</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-2.5 h-2.5 text-slate-500" />
                          <span>No Finance</span>
                        </>
                      )}
                    </span>

                    {/* Super Admin Quick Access Modal Trigger */}
                    {isUserSuperAdmin && (
                      <button
                        type="button"
                        onClick={() => setAccessModalOpen(true)}
                        className="p-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded transition-colors"
                        title="Configure Finance & Role Access (Super Admin)"
                      >
                        <Shield className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {canManage && !isCurrentUser && (
                      <button
                        onClick={() => setActiveMenuMemberId(menuOpen ? null : member.id)}
                        className="p-1 text-slate-500 hover:text-white transition-colors"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {menuOpen && (
                      <div className="absolute right-0 top-6 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-30 py-1 text-xs">
                        {isUserSuperAdmin && (
                          <button
                            onClick={() => {
                              setActiveMenuMemberId(null);
                              setAccessModalOpen(true);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-amber-300 flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5 text-amber-400" />
                            <span>Manage Access & Finance</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleMemberActive(member)}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                        >
                          <UserX className="w-3.5 h-3.5 text-rose-400" />
                          <span>{member.active === false ? "Re-activate" : "Deactivate Access"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Workload Capacity Meter */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>Current Workload</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${loadSeverity.badge}`}>
                      {loadSeverity.label}
                    </span>
                  </div>

                  {/* Capacity Bar: max capacity represented as 5 tasks */}
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${loadSeverity.barColor}`}
                      style={{ width: `${Math.min(100, (workload.count / 5) * 100)}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-white font-semibold">
                      {workload.count} Active {workload.count === 1 ? "Task" : "Tasks"}
                    </span>
                    <span>
                      {workload.completed.length} Delivered
                    </span>
                  </div>
                </div>

                {/* Active Tasks Preview */}
                {workload.active.length > 0 && (
                  <div className="mt-3.5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Tasks In Progress ({workload.active.length})
                    </span>
                    {workload.active.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => onSelectTask(t)}
                        className="group/task flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-800/60 hover:border-slate-700 cursor-pointer transition-all"
                      >
                        <span className="text-xs text-slate-300 group-hover/task:text-cyan-300 font-medium truncate max-w-[200px]">
                          {t.title}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase ${
                          t.status === "in_progress"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : t.status === "review"
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {t.status.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                    {workload.active.length > 2 && (
                      <button
                        onClick={() => onFilterTasksByMember(member.id)}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium pl-1 flex items-center gap-1 transition-colors"
                      >
                        <span>+{workload.active.length - 2} more tasks</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Skills tags */}
                {member.skills && member.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-750 text-[10px] text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions Card Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => onFilterTasksByMember(member.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span>Filter Board</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onOpenCreateTask(undefined, member.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded-lg hover:bg-slate-800/80 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Assign Task</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Super Admin Access Management Modal */}
      {accessModalOpen && (
        <TeamFinanceAccessModal
          isOpen={accessModalOpen}
          onClose={() => setAccessModalOpen(false)}
          members={members}
          currentUser={currentUser}
          onMemberUpdated={(updated) => {
            onMemberUpdated?.(updated);
          }}
        />
      )}
    </div>
  );
};
