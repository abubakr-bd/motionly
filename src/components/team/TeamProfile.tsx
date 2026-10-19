import React, { useState } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  ExternalLink,
  Edit2,
  Check,
  Film,
  Palette,
  Sun,
  Moon,
  Layers
} from "lucide-react";
import type { 
  WorkspaceMember, 
  WorkspaceTask 
} from "../../types/teamWorkspace";
import { isSuperAdmin } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";
import { getAuth } from "../../lib/firebaseLazy";
import { useTeamTheme } from "./TeamThemeContext";

interface TeamProfileProps {
  member: WorkspaceMember;
  tasks: WorkspaceTask[];
  onSelectTask: (task: WorkspaceTask) => void;
  onOpenCreateTask: () => void;
  onOpenAccessModal?: () => void;
}

export const TeamProfile: React.FC<TeamProfileProps> = ({
  member,
  tasks,
  onSelectTask,
  onOpenCreateTask,
  onOpenAccessModal
}) => {
  const { theme, setTheme } = useTeamTheme();
  const [editingSkills, setEditingSkills] = useState(false);
  const [skillsText, setSkillsText] = useState((member.skills || []).join(", "));
  const [savingSkills, setSavingSkills] = useState(false);
  const [taskFilter, setTaskFilter] = useState<"active" | "review" | "completed">("active");

  // Filter tasks assigned to this user
  const myTasks = tasks.filter(
    (t) => t.assigneeId === member.id || t.assigneeEmail.toLowerCase() === member.email.toLowerCase()
  );

  const activeTasks = myTasks.filter((t) => t.status === "todo" || t.status === "in_progress");
  const reviewTasks = myTasks.filter((t) => t.status === "review");
  const completedTasks = myTasks.filter((t) => t.status === "done");

  const displayedTasks = 
    taskFilter === "active" ? activeTasks :
    taskFilter === "review" ? reviewTasks :
    completedTasks;

  const handleUpdateStatus = async (status: WorkspaceMember["status"]) => {
    try {
      await TeamWorkspaceService.updateMember(member.id, { status }, {
        name: member.name,
        email: member.email
      });
    } catch (e) {
      console.error("Status update error:", e);
    }
  };

  const handleSaveSkills = async () => {
    setSavingSkills(true);
    try {
      const skills = skillsText.split(",").map(s => s.trim()).filter(Boolean);
      await TeamWorkspaceService.updateMember(member.id, { skills }, {
        name: member.name,
        email: member.email
      });
      setEditingSkills(false);
    } catch (err) {
      console.error("Failed to save skills:", err);
    } finally {
      setSavingSkills(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = await getAuth();
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const getDeadlineText = (deadlineStr: string) => {
    if (!deadlineStr) return "No date";
    const target = new Date(deadlineStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `Overdue by ${Math.abs(diff)}d`;
    if (diff === 0) return "Due Today";
    if (diff === 1) return "Due Tomorrow";
    return `Due in ${diff}d`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">My Workspace Profile</h1>
        <p className="text-sm text-slate-400 mt-1">
          Personal account information, current production workload, and assigned deliverables.
        </p>
      </div>

      {/* Main Profile Info Card */}
      <div className="rounded-2xl bg-[#0b101e] border border-slate-800/80 p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold text-cyan-300">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                  member.permission === "admin"
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    : member.permission === "lead"
                    ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                    : "bg-slate-800 text-slate-300 border-slate-700"
                }`}>
                  {member.permission.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-cyan-400 font-medium mt-0.5">{member.role}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{member.email}</span>
              </div>
            </div>
          </div>

          {/* Status Switcher & Sign Out */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(["available", "busy", "offline"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    member.status === st
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {st === "available" ? "🟢 Available" : st === "busy" ? "🟡 Editing" : "⚪ Offline"}
                </button>
              ))}
            </div>

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Creative Skills & Tools
            </span>
            {!editingSkills ? (
              <button
                onClick={() => setEditingSkills(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Skills</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveSkills}
                  disabled={savingSkills}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setEditingSkills(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {editingSkills ? (
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="e.g. Premiere Pro, DaVinci Resolve, Motion Design, After Effects"
              className="w-full px-3 py-2 bg-slate-900 border border-cyan-500/50 rounded-xl text-xs text-white focus:outline-none"
            />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {(member.skills || ["Video Editing", "Creative Direction"]).map((sk, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                >
                  {sk}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SUPER ADMIN ACCESS CONTROL (IF SUPER ADMIN)
      ========================================================================= */}
      {isSuperAdmin(member.email) && onOpenAccessModal && (
        <div className={`rounded-2xl border p-6 shadow-xl transition-all ${
          theme === "white"
            ? "bg-amber-50/80 border-amber-300 text-slate-900"
            : theme === "gray"
            ? "bg-[#1f222d] border-amber-500/40 text-white"
            : "bg-[#0c1222] border-amber-500/35 text-white"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-bold tracking-tight ${theme === "white" ? "text-slate-900" : "text-white"}`}>
                    Super Admin Access Control
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Verified Super Admin
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl ${theme === "white" ? "text-slate-600" : "text-slate-400"}`}>
                  You are signed in as an executive Super Admin (<strong className="text-amber-400">{member.email}</strong>). You have exclusive authority to grant or revoke Finance &amp; Invoicing workspace access and configure member roles.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenAccessModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <Shield className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Manage Access</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          WORKSPACE LAYOUT & THEME SETTINGS (DARK / WHITE / GRAY)
      ========================================================================= */}
      <div className="rounded-2xl bg-[#0b101e] border border-slate-800/80 p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Workspace Layout &amp; Theme</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Choose your preferred visual layout. Changes apply immediately and save to your account.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-semibold px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 w-fit">
            Active: {theme === "white" ? "Clean White" : theme === "gray" ? "Modern Gray" : "Dark Navy"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
          {/* Option 1: Dark Navy */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`group text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
              theme === "dark"
                ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-[#070a12]"
                : "border-slate-800 hover:border-slate-700 bg-[#070a12]/60"
            }`}
          >
            {/* Visual Mini Preview Palette */}
            <div className="h-14 w-full rounded-lg bg-[#070a12] border border-slate-800 p-2 flex gap-1.5 mb-3 shadow-inner">
              <div className="w-1/4 h-full rounded bg-[#0a0f1d] border border-slate-800 flex flex-col justify-around p-1">
                <div className="h-1 w-full bg-cyan-400 rounded-full" />
                <div className="h-1 w-3/4 bg-slate-700 rounded-full" />
                <div className="h-1 w-1/2 bg-slate-700 rounded-full" />
              </div>
              <div className="flex-1 h-full rounded bg-[#0b101e] border border-slate-800 p-1.5 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-1.5 w-1/3 bg-slate-400 rounded" />
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </div>
                <div className="h-2 w-full bg-slate-800 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Dark Navy</span>
              </div>
              {theme === "dark" && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Default high-contrast midnight palette with electric cyan accents and dark surfaces.
            </p>
          </button>

          {/* Option 2: Clean White */}
          <button
            type="button"
            onClick={() => setTheme("white")}
            className={`group text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
              theme === "white"
                ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-slate-50"
                : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
            }`}
          >
            {/* Visual Mini Preview Palette */}
            <div className="h-14 w-full rounded-lg bg-[#f8fafc] border border-slate-300 p-2 flex gap-1.5 mb-3 shadow-sm">
              <div className="w-1/4 h-full rounded bg-white border border-slate-200 flex flex-col justify-around p-1">
                <div className="h-1 w-full bg-cyan-600 rounded-full" />
                <div className="h-1 w-3/4 bg-slate-300 rounded-full" />
                <div className="h-1 w-1/2 bg-slate-300 rounded-full" />
              </div>
              <div className="flex-1 h-full rounded bg-white border border-slate-200 p-1.5 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-1.5 w-1/3 bg-slate-700 rounded" />
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                </div>
                <div className="h-2 w-full bg-slate-100 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Clean White</span>
              </div>
              {theme === "white" && (
                <span className="w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Crisp light layout with pure white surfaces &amp; charcoal typography for daylight clarity.
            </p>
          </button>

          {/* Option 3: Modern Gray */}
          <button
            type="button"
            onClick={() => setTheme("gray")}
            className={`group text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
              theme === "gray"
                ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-[#161a25]"
                : "border-slate-800 hover:border-slate-700 bg-[#141722]/60"
            }`}
          >
            {/* Visual Mini Preview Palette */}
            <div className="h-14 w-full rounded-lg bg-[#141722] border border-slate-700 p-2 flex gap-1.5 mb-3 shadow-inner">
              <div className="w-1/4 h-full rounded bg-[#191f2d] border border-slate-700 flex flex-col justify-around p-1">
                <div className="h-1 w-full bg-cyan-400 rounded-full" />
                <div className="h-1 w-3/4 bg-slate-600 rounded-full" />
                <div className="h-1 w-1/2 bg-slate-600 rounded-full" />
              </div>
              <div className="flex-1 h-full rounded bg-[#1e2536] border border-slate-700 p-1.5 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-1.5 w-1/3 bg-slate-300 rounded" />
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </div>
                <div className="h-2 w-full bg-slate-700 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Modern Gray</span>
              </div>
              {theme === "gray" && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Studio neutral graphite &amp; slate theme designed for soft contrast and reduced eye fatigue.
            </p>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[#0b101e] border border-cyan-900/30">
          <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider block">My Active Tasks</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-cyan-300">{activeTasks.length}</span>
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-amber-900/30">
          <span className="text-xs text-amber-400 font-medium uppercase tracking-wider block">In Review</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-300">{reviewTasks.length}</span>
            <Film className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-emerald-900/30">
          <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider block">Delivered</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-300">{completedTasks.length}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* My Tasks Section */}
      <div className="rounded-2xl bg-[#0b101e] border border-slate-800/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white">My Assigned Deliverables</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tasks assigned directly to you across all active agency projects.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setTaskFilter("active")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                taskFilter === "active"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Active ({activeTasks.length})
            </button>
            <button
              onClick={() => setTaskFilter("review")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                taskFilter === "review"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Review ({reviewTasks.length})
            </button>
            <button
              onClick={() => setTaskFilter("completed")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                taskFilter === "completed"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Delivered ({completedTasks.length})
            </button>
          </div>
        </div>

        {/* Task List */}
        {displayedTasks.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-900/50 border border-slate-800/80">
            <CheckCircle2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No tasks in this category</p>
            <p className="text-xs text-slate-400 mt-1">
              {taskFilter === "active"
                ? "You have no active tasks currently on your plate. Enjoy the breather or pick up a new task!"
                : "No tasks found under this filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedTasks.map((task) => {
              const deadline = getDeadlineText(task.deadline);
              const isOverdue = deadline.startsWith("Overdue");

              return (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="group p-4 rounded-xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 text-[10px] font-semibold truncate max-w-[150px]">
                        {task.projectName}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase ${
                        task.priority === "urgent"
                          ? "bg-rose-500/10 text-rose-400"
                          : task.priority === "high"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-400 truncate mt-0.5 max-w-xl">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className={`text-xs font-medium block ${
                        isOverdue ? "text-rose-400 font-semibold" : "text-slate-400"
                      }`}>
                        {deadline}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
