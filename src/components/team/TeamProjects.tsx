import React, { useState } from "react";
import { 
  FolderKanban, 
  Plus, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  Film, 
  Search, 
  ArrowRight,
  MoreVertical,
  AlertTriangle,
  PlayCircle,
  CheckSquare,
  Sparkles,
  SlidersHorizontal,
  Trash2
} from "lucide-react";
import type { 
  WorkspaceProject, 
  WorkspaceTask, 
  WorkspaceMember, 
  ProjectStatus 
} from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface TeamProjectsProps {
  projects: WorkspaceProject[];
  tasks: WorkspaceTask[];
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onOpenCreateProject: () => void;
  onOpenCreateTask: (projectId?: string) => void;
  onSelectProjectFilter: (projectId: string) => void;
  searchQuery?: string;
}

export const TeamProjects: React.FC<TeamProjectsProps> = ({
  projects,
  tasks,
  members,
  currentUser,
  onOpenCreateProject,
  onOpenCreateTask,
  onSelectProjectFilter,
  searchQuery = ""
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [localSearch, setLocalSearch] = useState("");
  const [activeMenuProjectId, setActiveMenuProjectId] = useState<string | null>(null);

  const canManage = currentUser.permission === "admin" || currentUser.permission === "lead";

  // Calculate task statistics for each project
  const projectStatsMap = projects.reduce((acc, p) => {
    const projectTasks = tasks.filter(t => t.projectId === p.id);
    const total = projectTasks.length;
    const completed = projectTasks.filter(t => t.status === "done").length;
    const inReview = projectTasks.filter(t => t.status === "review").length;
    const inProgress = projectTasks.filter(t => t.status === "in_progress").length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Unique assignees in this project
    const assigneeIds = Array.from(new Set(projectTasks.map(t => t.assigneeId).filter(Boolean)));
    const assignedMembers = members.filter(m => assigneeIds.includes(m.id));

    acc[p.id] = {
      total,
      completed,
      inReview,
      inProgress,
      progressPercent,
      assignedMembers
    };
    return acc;
  }, {} as Record<string, {
    total: number;
    completed: number;
    inReview: number;
    inProgress: number;
    progressPercent: number;
    assignedMembers: WorkspaceMember[];
  }>);

  // Filtered projects
  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredProjects = projects.filter(p => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (effectiveSearch) {
      const matchName = p.name.toLowerCase().includes(effectiveSearch);
      const matchClient = p.clientName.toLowerCase().includes(effectiveSearch);
      const matchDeliverables = p.deliverables?.toLowerCase().includes(effectiveSearch);
      const matchLead = p.leadName?.toLowerCase().includes(effectiveSearch);
      return matchName || matchClient || matchDeliverables || matchLead;
    }
    return true;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "active":
        return {
          label: "In Production",
          bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
          dot: "bg-cyan-400"
        };
      case "review":
        return {
          label: "Client / Lead Review",
          bg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
          dot: "bg-amber-400"
        };
      case "completed":
        return {
          label: "Delivered",
          bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          dot: "bg-emerald-400"
        };
      case "on_hold":
        return {
          label: "On Hold",
          bg: "bg-slate-700/30 text-slate-400 border-slate-700/50",
          dot: "bg-slate-500"
        };
    }
  };

  const getDeadlineInfo = (deadlineStr: string) => {
    if (!deadlineStr) return { text: "No deadline", isOverdue: false, isNear: false };
    const target = new Date(deadlineStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)}d`, isOverdue: true, isNear: false };
    }
    if (diffDays === 0) {
      return { text: "Due Today", isOverdue: false, isNear: true };
    }
    if (diffDays === 1) {
      return { text: "Due Tomorrow", isOverdue: false, isNear: true };
    }
    return { text: `Due in ${diffDays} days`, isOverdue: false, isNear: diffDays <= 3 };
  };

  const handleUpdateStatus = async (projectId: string, newStatus: ProjectStatus) => {
    setActiveMenuProjectId(null);
    try {
      await TeamWorkspaceService.updateProject(
        projectId,
        { status: newStatus },
        { name: currentUser.name, email: currentUser.email }
      );
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleDeleteProject = async (p: WorkspaceProject) => {
    setActiveMenuProjectId(null);
    if (!window.confirm(`Delete project "${p.name}"? Tasks associated with this project will remain in the database.`)) {
      return;
    }
    try {
      await TeamWorkspaceService.deleteProject(p.id, {
        name: currentUser.name,
        email: currentUser.email
      });
    } catch (e) {
      console.error("Failed to delete project:", e);
    }
  };

  // Top metric counters
  const totalProjects = projects.length;
  const activeCount = projects.filter(p => p.status === "active").length;
  const reviewCount = projects.filter(p => p.status === "review").length;
  const completedCount = projects.filter(p => p.status === "completed").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          HEADER & ACTIONS
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Agency Projects</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              {projects.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Track video productions, commercial campaigns, deliverables, and team assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canManage && (
            <button
              onClick={onOpenCreateProject}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          METRICS STRIP
      ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0b101e] border border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Total Workflows</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{totalProjects}</span>
            <FolderKanban className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-cyan-900/30">
          <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider block">In Production</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-cyan-300">{activeCount}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-amber-900/30">
          <span className="text-xs text-amber-300 font-medium uppercase tracking-wider block">Client Review</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-300">{reviewCount}</span>
            <Clock className="w-5 h-5 text-amber-400/70" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b101e] border border-emerald-900/30">
          <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider block">Completed</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-300">{completedCount}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400/70" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH & FILTER TABS
      ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2 bg-[#0b101e]/80 border border-slate-800/80 rounded-2xl">
        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Projects" },
            { id: "active", label: "Active" },
            { id: "review", label: "In Review" },
            { id: "completed", label: "Completed" },
            { id: "on_hold", label: "On Hold" },
          ].map(tab => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
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

        {/* Local search input if global not used */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search projects or clients..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* =========================================================================
          PROJECT CARDS GRID
      ========================================================================= */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0b101e] border border-slate-800/80">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {effectiveSearch || statusFilter !== "all"
              ? "Try adjusting your search criteria or status filter to see other projects."
              : "Create your first agency production workflow to coordinate deliverables and assign tasks."}
          </p>
          {canManage && (
            <button
              onClick={onOpenCreateProject}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const stats = projectStatsMap[project.id] || {
              total: 0,
              completed: 0,
              inReview: 0,
              inProgress: 0,
              progressPercent: 0,
              assignedMembers: []
            };
            const statusBadge = getStatusBadge(project.status);
            const deadline = getDeadlineInfo(project.deadline);
            const menuOpen = activeMenuProjectId === project.id;

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-[#0b101e] border border-slate-800/80 hover:border-slate-700/90 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/20 hover:shadow-cyan-500/5"
              >
                {/* Accent Top Border */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: project.color || "#38bdf8" }}
                />

                <div className="p-5 flex-1 flex flex-col justify-between">
                  {/* Top Bar: Client Badge & Status & Menu */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium text-[11px] border border-slate-700/60 truncate max-w-[130px]">
                          {project.clientName}
                        </span>
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                          <span>{statusBadge.label}</span>
                        </div>
                      </div>

                      {/* Dropdown Options */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenuProjectId(menuOpen ? null : project.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {menuOpen && (
                          <div className="absolute right-0 top-7 w-48 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl z-30 py-1.5 text-xs">
                            <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                              Change Status
                            </div>
                            <button
                              onClick={() => handleUpdateStatus(project.id, "active")}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                            >
                              <span>In Production</span>
                              {project.status === "active" && <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(project.id, "review")}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                            >
                              <span>Client Review</span>
                              {project.status === "review" && <CheckSquare className="w-3.5 h-3.5 text-amber-400" />}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(project.id, "completed")}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                            >
                              <span>Delivered</span>
                              {project.status === "completed" && <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(project.id, "on_hold")}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                            >
                              <span>On Hold</span>
                              {project.status === "on_hold" && <CheckSquare className="w-3.5 h-3.5 text-slate-400" />}
                            </button>

                            {canManage && (
                              <>
                                <div className="border-t border-slate-800 my-1" />
                                <button
                                  onClick={() => handleDeleteProject(project)}
                                  className="w-full text-left px-3 py-1.5 hover:bg-rose-950/40 text-rose-400 flex items-center gap-1.5"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete Project</span>
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.name}
                    </h3>

                    {/* Project Description */}
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {project.description || "Production workflow for video assets and commercial social cutdowns."}
                    </p>
                  </div>

                  {/* Deliverables pill */}
                  {project.deliverables && (
                    <div className="mt-3.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2 text-xs">
                      <Film className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-[11px] leading-tight font-medium line-clamp-2">
                        {project.deliverables}
                      </span>
                    </div>
                  )}

                  {/* Progress Bar & Tasks breakdown */}
                  <div className="mt-4 pt-3 border-t border-slate-800/70">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400 text-[11px]">Tasks Progress</span>
                      <span className="text-slate-200 font-semibold text-[11px]">
                        {stats.completed}/{stats.total} ({stats.progressPercent}%)
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${stats.progressPercent}%`,
                          backgroundColor: project.color || "#38bdf8"
                        }}
                      />
                    </div>

                    {/* Mini task status badges */}
                    <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-400">
                      {stats.inProgress > 0 && (
                        <span className="text-cyan-300 font-medium">
                          {stats.inProgress} In Progress
                        </span>
                      )}
                      {stats.inReview > 0 && (
                        <span className="text-amber-300 font-medium">
                          {stats.inReview} In Review
                        </span>
                      )}
                      {stats.total === 0 && (
                        <span className="text-slate-500 italic">No tasks yet</span>
                      )}
                    </div>
                  </div>

                  {/* Project Lead & Deadline Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
                    {/* Lead */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                        {project.leadName ? project.leadName.charAt(0).toUpperCase() : "M"}
                      </div>
                      <span className="text-slate-300 text-[11px] truncate max-w-[100px]">
                        {project.leadName || "Lead"}
                      </span>
                    </div>

                    {/* Deadline */}
                    <div className={`flex items-center gap-1 text-[11px] font-medium ${
                      deadline.isOverdue
                        ? "text-rose-400 font-semibold"
                        : deadline.isNear
                        ? "text-amber-300"
                        : "text-slate-400"
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{deadline.text}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Card Bar */}
                <div className="bg-[#090d19] border-t border-slate-800/90 px-4 py-2.5 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProjectFilter(project.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Tasks ({stats.total})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenCreateTask(project.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800/80 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
