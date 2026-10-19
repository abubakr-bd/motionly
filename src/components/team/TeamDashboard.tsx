import React from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FolderKanban, 
  Plus, 
  ArrowRight, 
  Flag, 
  Video, 
  ExternalLink,
  Flame,
  CheckSquare,
  Sparkles,
  ChevronRight
} from "lucide-react";
import type { 
  WorkspaceTask, 
  WorkspaceProject, 
  WorkspaceMember, 
  TaskStatus, 
  WorkspaceActivity 
} from "../../types/teamWorkspace";

interface TeamDashboardProps {
  currentUser: WorkspaceMember;
  tasks: WorkspaceTask[];
  projects: WorkspaceProject[];
  members: WorkspaceMember[];
  recentActivity: WorkspaceActivity[];
  onOpenCreateTask: () => void;
  onSelectTask: (task: WorkspaceTask) => void;
  onUpdateStatus: (task: WorkspaceTask, newStatus: TaskStatus) => void;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({
  currentUser,
  tasks,
  projects,
  members,
  recentActivity,
  onOpenCreateTask,
  onSelectTask,
  onUpdateStatus
}) => {
  const todayStr = new Date().toISOString().split("T")[0];

  // My Tasks
  const myTasks = tasks.filter(
    (t) => t.assigneeEmail.toLowerCase() === currentUser.email.toLowerCase() && t.status !== "done"
  );

  // Review Tasks
  const reviewTasks = tasks.filter((t) => t.status === "review");

  // Overdue Tasks
  const overdueTasks = tasks.filter(
    (t) => t.deadline && t.deadline < todayStr && t.status !== "done"
  );

  // Due Soon (Today or next 2 days)
  const dueSoonTasks = tasks.filter((t) => {
    if (!t.deadline || t.status === "done") return false;
    const diffDays = Math.ceil(
      (new Date(t.deadline).getTime() - new Date(todayStr).getTime()) / (1000 * 3600 * 24)
    );
    return diffDays >= 0 && diffDays <= 3;
  });

  const priorityBadge = (p: string) => {
    switch (p) {
      case "urgent":
        return <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">Urgent</span>;
      case "high":
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">High</span>;
      case "medium":
        return <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium">Low</span>;
    }
  };

  const statusBadge = (s: TaskStatus) => {
    switch (s) {
      case "todo":
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold">To Do</span>;
      case "in_progress":
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">In Progress</span>;
      case "review":
        return <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-semibold">In Review</span>;
      case "done":
        return <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">Done</span>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* =========================================================================
          HERO GREETING BANNER
      ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1627] via-[#0f1d33] to-[#091122] border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Creative Studio Pipeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hello, {currentUser.name.split(" ")[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              You have <span className="text-cyan-300 font-bold">{myTasks.length} active tasks</span> assigned. {overdueTasks.length > 0 && <span className="text-rose-400 font-bold">{overdueTasks.length} task(s) require immediate attention.</span>}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateTask}
              type="button"
              className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Create Task
            </button>
            <Link
              to="/team/tasks"
              className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700/60 flex items-center gap-1.5"
            >
              Kanban Board <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          KEY PRODUCTIVITY METRICS (Answers: What do I need to do? When is it due?)
      ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: My Open Tasks */}
        <Link
          to="/team/tasks?filter=my"
          className="p-4 sm:p-5 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0f1729] transition-all group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">My Open Tasks</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {myTasks.length}
            </span>
            <span className="text-[11px] text-slate-500">active cuts</span>
          </div>
        </Link>

        {/* Metric 2: In Review */}
        <Link
          to="/team/tasks?status=review"
          className="p-4 sm:p-5 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-purple-500/40 hover:bg-[#0f1729] transition-all group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">In Review</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-tight">
              {reviewTasks.length}
            </span>
            <span className="text-[11px] text-slate-500">awaiting notes</span>
          </div>
        </Link>

        {/* Metric 3: Overdue / Urgent */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
            overdueTasks.length > 0
              ? "bg-rose-950/20 border-rose-900/50 text-rose-300"
              : "bg-[#0d1322] border-slate-800/80 text-slate-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Overdue Tasks</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              overdueTasks.length > 0 ? "bg-rose-500/20 text-rose-400" : "bg-slate-800 text-slate-400"
            }`}>
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              overdueTasks.length > 0 ? "text-rose-400" : "text-slate-200"
            }`}>
              {overdueTasks.length}
            </span>
            <span className="text-[11px] text-slate-500">need action</span>
          </div>
        </div>

        {/* Metric 4: Active Projects */}
        <Link
          to="/team/projects"
          className="p-4 sm:p-5 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0f1729] transition-all group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Agency Projects</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {projects.length}
            </span>
            <span className="text-[11px] text-slate-500">in production</span>
          </div>
        </Link>
      </div>

      {/* =========================================================================
          MAIN 2-COLUMN SECTION: MY ACTION ITEMS + DEADLINES & ACTIVE PROJECTS
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): My Immediate Action Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                My Focus Tasks ({myTasks.length})
              </h2>
            </div>
            <Link to="/team/tasks?filter=my" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {myTasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0d1322] border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-slate-200">All caught up!</p>
                <p className="text-xs text-slate-500">You have no pending tasks assigned right now.</p>
              </div>
            ) : (
              myTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 hover:bg-[#0f172a] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {priorityBadge(task.priority)}
                      <span className="text-[11px] font-semibold text-cyan-400">
                        {task.projectName}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        Due {task.deadline || "No date"}
                      </span>
                      {task.videoDraftUrl && (
                        <span className="flex items-center gap-1 text-purple-400 font-medium">
                          <Video className="w-3.5 h-3.5" /> Video Draft
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                    {statusBadge(task.status)}
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateStatus(task, e.target.value as TaskStatus)}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Upcoming Agency Deadlines Strip */}
          <div className="pt-3">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Upcoming Studio Deadlines (Next 72 Hours)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dueSoonTasks.slice(0, 4).map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTask(t)}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between gap-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{t.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {t.assigneeName} • {t.projectName}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-bold shrink-0">
                    {t.deadline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Active Projects & Team Workload Glance */}
        <div className="space-y-6">
          {/* Active Projects Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Active Projects
              </h2>
              <Link to="/team/projects" className="text-xs text-cyan-400 hover:underline">
                All projects
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 3).map((proj) => {
                const projTasks = tasks.filter((t) => t.projectId === proj.id);
                const doneCount = projTasks.filter((t) => t.status === "done").length;
                const progressPct = projTasks.length > 0 ? Math.round((doneCount / projTasks.length) * 100) : 0;

                return (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white line-clamp-1">{proj.name}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: proj.color || "#38bdf8" }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{proj.deliverables}</p>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span>Progress ({doneCount}/{projTasks.length} tasks)</span>
                        <span className="font-mono font-bold text-cyan-400">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Workload Glance */}
          <div className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Team Workload Glance
              </h2>
              <Link to="/team/members" className="text-xs text-cyan-400 hover:underline">
                Full roster
              </Link>
            </div>

            <div className="space-y-2.5">
              {members.slice(0, 4).map((m) => {
                const memberTasksCount = tasks.filter(
                  (t) => t.assigneeEmail.toLowerCase() === m.email.toLowerCase() && t.status !== "done"
                ).length;

                return (
                  <div key={m.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-slate-200 font-medium truncate text-[11px]">{m.name}</p>
                        <p className="text-[9px] text-slate-500 truncate">{m.role}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold font-mono">
                      {memberTasksCount} active
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
