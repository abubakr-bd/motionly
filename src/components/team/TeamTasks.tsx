import React, { useState } from "react";
import { 
  Plus, 
  Kanban, 
  List, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  Flag, 
  Video, 
  MessageSquare, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  GripVertical,
  Layers,
  Sparkles
} from "lucide-react";
import type { 
  WorkspaceTask, 
  WorkspaceProject, 
  WorkspaceMember, 
  TaskStatus, 
  TaskPriority 
} from "../../types/teamWorkspace";
import { useTeamTheme } from "./TeamThemeContext";

interface TeamTasksProps {
  tasks: WorkspaceTask[];
  projects: WorkspaceProject[];
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onOpenCreateTask: () => void;
  onSelectTask: (task: WorkspaceTask) => void;
  onUpdateStatus: (task: WorkspaceTask, newStatus: TaskStatus) => void;
  searchQuery: string;
}

export const TeamTasks: React.FC<TeamTasksProps> = ({
  tasks,
  projects,
  members,
  currentUser,
  onOpenCreateTask,
  onSelectTask,
  onUpdateStatus,
  searchQuery
}) => {
  const { theme } = useTeamTheme();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all");
  
  // Mobile / Tablet column focus filter
  const [activeMobileColumn, setActiveMobileColumn] = useState<string>("all");

  // Drag and Drop state
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    if (selectedProject !== "all" && t.projectId !== selectedProject) return false;
    if (selectedPriority !== "all" && t.priority !== selectedPriority) return false;
    if (selectedAssignee === "my" && t.assigneeEmail.toLowerCase() !== currentUser.email.toLowerCase()) return false;
    if (selectedAssignee !== "all" && selectedAssignee !== "my" && t.assigneeId !== selectedAssignee) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      const matchProject = t.projectName?.toLowerCase().includes(q);
      const matchAssignee = t.assigneeName?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchProject && !matchAssignee) return false;
    }
    return true;
  });

  const columns: { status: TaskStatus; title: string; color: string; badgeBg: string }[] = [
    { 
      status: "todo", 
      title: "To Do", 
      color: theme === "white" ? "border-slate-300" : "border-slate-700", 
      badgeBg: theme === "white" ? "bg-slate-200 text-slate-800" : "bg-slate-800 text-slate-300" 
    },
    { 
      status: "in_progress", 
      title: "In Progress", 
      color: "border-amber-500/40", 
      badgeBg: theme === "white" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-amber-500/20 text-amber-300" 
    },
    { 
      status: "review", 
      title: "Review", 
      color: "border-purple-500/40", 
      badgeBg: theme === "white" ? "bg-purple-100 text-purple-800 border border-purple-300" : "bg-purple-500/20 text-purple-300" 
    },
    { 
      status: "done", 
      title: "Done", 
      color: "border-emerald-500/40", 
      badgeBg: theme === "white" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-emerald-500/20 text-emerald-300" 
    },
  ];

  const getNextStatus = (current: TaskStatus): TaskStatus => {
    if (current === "todo") return "in_progress";
    if (current === "in_progress") return "review";
    if (current === "review") return "done";
    return "done";
  };

  const priorityBadge = (p: string) => {
    switch (p) {
      case "urgent":
        return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
          theme === "white" 
            ? "bg-rose-100 text-rose-800 border border-rose-300" 
            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
        }`}>Urgent</span>;
      case "high":
        return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
          theme === "white" 
            ? "bg-amber-100 text-amber-800 border border-amber-300" 
            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
        }`}>High</span>;
      case "medium":
        return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
          theme === "white" 
            ? "bg-cyan-100 text-cyan-800 border border-cyan-300" 
            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
        }`}>Medium</span>;
      default:
        return <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
          theme === "white" 
            ? "bg-slate-100 text-slate-700 border border-slate-200" 
            : "bg-slate-800 text-slate-400"
        }`}>Low</span>;
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    setDraggingTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent, colStatus: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== colStatus) {
      setDragOverColumn(colStatus);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Check if leaving to outside the column
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggingTaskId;
    if (taskId) {
      const draggedTask = tasks.find((t) => t.id === taskId);
      if (draggedTask && draggedTask.status !== targetStatus) {
        onUpdateStatus(draggedTask, targetStatus);
      }
    }
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200 max-w-full pb-10">
      {/* =========================================================================
          TOP CONTROLS & FILTER BAR
      ========================================================================= */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-colors ${
        theme === "white" 
          ? "bg-white border-slate-200 shadow-sm" 
          : theme === "gray" 
          ? "bg-[#181e2b] border-slate-700" 
          : "bg-[#0d1322] border-slate-800/80 shadow-sm"
      }`}>
        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Project filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className={`text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
              theme === "white"
                ? "bg-slate-50 border border-slate-300 text-slate-800"
                : "bg-slate-900 border border-slate-800 text-slate-200"
            }`}
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Assignee filter */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className={`text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
              theme === "white"
                ? "bg-slate-50 border border-slate-300 text-slate-800"
                : "bg-slate-900 border border-slate-800 text-slate-200"
            }`}
          >
            <option value="all">All Assignees</option>
            <option value="my">My Tasks Only</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Priority filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className={`text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
              theme === "white"
                ? "bg-slate-50 border border-slate-300 text-slate-800"
                : "bg-slate-900 border border-slate-800 text-slate-200"
            }`}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* View switcher & Action button */}
        <div className="flex items-center gap-2.5 self-end md:self-center">
          <div className={`flex items-center p-1 rounded-xl border ${
            theme === "white" 
              ? "bg-slate-100 border-slate-200" 
              : "bg-slate-900 border border-slate-800"
          }`}>
            <button
              onClick={() => setViewMode("kanban")}
              type="button"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === "kanban" 
                  ? "bg-cyan-600 text-white shadow-sm" 
                  : theme === "white" ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              type="button"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === "list" 
                  ? "bg-cyan-600 text-white shadow-sm" 
                  : theme === "white" ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          <button
            onClick={onOpenCreateTask}
            type="button"
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Mobile Column Quick Switcher Tabs (visible on small & tablet screens) */}
      {viewMode === "kanban" && (
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveMobileColumn("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeMobileColumn === "all"
                ? "bg-cyan-600 text-white shadow-sm"
                : theme === "white"
                ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            All Columns ({filteredTasks.length})
          </button>
          {columns.map((col) => {
            const count = filteredTasks.filter((t) => t.status === col.status).length;
            const isSelected = activeMobileColumn === col.status;
            return (
              <button
                key={col.status}
                onClick={() => setActiveMobileColumn(col.status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-cyan-600 text-white shadow-sm"
                    : theme === "white"
                    ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {col.title} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          DRAG & DROP KANBAN BOARD VIEW (4 COLUMNS - NEVER 2x2 BREAKAGE)
      ========================================================================= */}
      {viewMode === "kanban" && (
        <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            const isDragOver = dragOverColumn === col.status;
            const isHiddenOnMobile = activeMobileColumn !== "all" && activeMobileColumn !== col.status;

            return (
              <div
                key={col.status}
                onDragOver={(e) => handleDragOver(e, col.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.status)}
                className={`w-full min-w-[285px] sm:min-w-[320px] lg:min-w-0 flex-1 shrink-0 snap-start rounded-2xl p-3.5 sm:p-4 space-y-3 flex flex-col min-h-[540px] transition-all duration-200 border ${
                  isHiddenOnMobile ? "hidden lg:flex" : "flex"
                } ${
                  isDragOver
                    ? "border-2 border-dashed border-cyan-400 bg-cyan-500/10 ring-4 ring-cyan-500/10"
                    : theme === "white"
                    ? "bg-slate-50/90 border-slate-200 shadow-sm"
                    : theme === "gray"
                    ? "bg-[#181e2b] border-slate-700/80"
                    : "bg-[#0b101e] border-slate-800/80"
                }`}
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between pb-2.5 border-b ${
                  theme === "white" ? "border-slate-200" : "border-slate-800/80"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      theme === "white" ? "text-slate-800" : "text-white"
                    }`}>
                      {col.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${col.badgeBg}`}>
                      {colTasks.length}
                    </span>
                  </div>

                  {col.status === "todo" && (
                    <button
                      onClick={onOpenCreateTask}
                      className={`p-1 rounded-lg transition-colors ${
                        theme === "white" 
                          ? "text-slate-500 hover:text-slate-900 hover:bg-slate-200" 
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                      title="Add task to column"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Drag target indicator when hovering */}
                {isDragOver && (
                  <div className="p-3 text-center rounded-xl border border-dashed border-cyan-400 bg-cyan-500/20 text-cyan-300 text-xs font-bold animate-pulse">
                    Drop to move to {col.title}
                  </div>
                )}

                {/* Column Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                  {colTasks.length === 0 ? (
                    <div className={`py-12 text-center text-xs border border-dashed rounded-xl ${
                      theme === "white" 
                        ? "text-slate-500 border-slate-300 bg-white/60" 
                        : "text-slate-600 border-slate-800/70"
                    }`}>
                      No tasks in {col.title}
                      <p className="text-[10px] mt-1 opacity-75">Drag tasks here</p>
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const isOverdue = task.deadline && task.deadline < todayStr && task.status !== "done";
                      const isDragging = draggingTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onDragEnd={() => {
                            setDraggingTaskId(null);
                            setDragOverColumn(null);
                          }}
                          onClick={() => onSelectTask(task)}
                          className={`p-3.5 rounded-xl border transition-all cursor-grab active:cursor-grabbing group shadow-sm space-y-2.5 relative select-none ${
                            isDragging
                              ? "opacity-40 scale-95 ring-2 ring-cyan-400"
                              : theme === "white"
                              ? "bg-white border-slate-200/90 text-slate-900 hover:border-cyan-500 hover:shadow-md"
                              : theme === "gray"
                              ? "bg-[#202738] border-slate-700/80 text-slate-100 hover:border-cyan-400"
                              : "bg-[#0e1627] border-slate-800/90 text-white hover:border-cyan-500/40 hover:bg-[#111a2e]"
                          }`}
                        >
                          {/* Card Tags / Project & Drag Handle */}
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <GripVertical className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                theme === "white" 
                                  ? "text-slate-400 group-hover:text-cyan-600" 
                                  : "text-slate-600 group-hover:text-cyan-400"
                              }`} />
                              <span className={`text-[10px] font-bold truncate max-w-[130px] px-1.5 py-0.5 rounded ${
                                theme === "white"
                                  ? "text-cyan-800 bg-cyan-50 border border-cyan-200"
                                  : theme === "gray"
                                  ? "text-cyan-300 bg-cyan-950/40 border border-cyan-800/40"
                                  : "text-cyan-400 bg-cyan-950/30 border border-cyan-800/30"
                              }`}>
                                {task.projectName}
                              </span>
                            </div>
                            {priorityBadge(task.priority)}
                          </div>

                          {/* Title */}
                          <h4 className={`text-xs font-bold leading-relaxed line-clamp-2 transition-colors ${
                            theme === "white"
                              ? "text-slate-900 group-hover:text-cyan-700"
                              : theme === "gray"
                              ? "text-slate-100 group-hover:text-cyan-300"
                              : "text-white group-hover:text-cyan-300"
                          }`}>
                            {task.title}
                          </h4>

                          {/* Description if present */}
                          {task.description && (
                            <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                              theme === "white" ? "text-slate-600" : theme === "gray" ? "text-slate-300" : "text-slate-400"
                            }`}>
                              {task.description}
                            </p>
                          )}

                          {/* Card Footer: Assignee, Deadline & Quick Action */}
                          <div className={`pt-2 border-t flex items-center justify-between gap-2 text-[10px] ${
                            theme === "white" ? "border-slate-100" : "border-slate-800/60"
                          }`}>
                            {/* Assignee */}
                            <div className={`flex items-center gap-1.5 min-w-0 ${
                              theme === "white" ? "text-slate-700 font-medium" : "text-slate-400"
                            }`}>
                              <div className={`w-5 h-5 rounded-full font-bold flex items-center justify-center shrink-0 text-[9px] ${
                                theme === "white"
                                  ? "bg-slate-200 text-slate-800 border border-slate-300"
                                  : "bg-slate-800 text-slate-200"
                              }`}>
                                {task.assigneeName.charAt(0)}
                              </div>
                              <span className="truncate">{task.assigneeName.split(" ")[0]}</span>
                            </div>

                            {/* Deadline pill */}
                            <span className={`flex items-center gap-1 font-semibold ${
                              isOverdue ? "text-rose-500 font-bold" : theme === "white" ? "text-slate-600" : "text-slate-400"
                            }`}>
                              {isOverdue && <AlertCircle className="w-3 h-3 text-rose-500" />}
                              {task.deadline || "No date"}
                            </span>

                            {/* 1-Click quick move to next status */}
                            {task.status !== "done" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateStatus(task, getNextStatus(task.status));
                                }}
                                className={`p-1 rounded transition-colors ${
                                  theme === "white"
                                    ? "text-slate-600 hover:text-cyan-700 hover:bg-slate-100"
                                    : "text-slate-500 hover:text-cyan-300 hover:bg-slate-800"
                                }`}
                                title={`Move to ${getNextStatus(task.status).toUpperCase()}`}
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          LIST VIEW
      ========================================================================= */}
      {viewMode === "list" && (
        <div className={`border rounded-2xl overflow-hidden shadow-sm ${
          theme === "white" 
            ? "bg-white border-slate-200" 
            : theme === "gray" 
            ? "bg-[#181e2b] border-slate-700" 
            : "bg-[#0b101e] border-slate-800/80"
        }`}>
          <div className={`divide-y ${
            theme === "white" ? "divide-slate-200" : "divide-slate-800/80"
          }`}>
            {filteredTasks.length === 0 ? (
              <div className={`p-12 text-center text-xs ${
                theme === "white" ? "text-slate-500" : "text-slate-500"
              }`}>
                No matching tasks found.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className={`p-3.5 sm:p-4 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                    theme === "white" 
                      ? "hover:bg-slate-50 text-slate-900" 
                      : theme === "gray"
                      ? "hover:bg-[#202738] text-slate-100"
                      : "hover:bg-[#0f1729] text-white"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(task, task.status === "done" ? "todo" : "done");
                      }}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                        task.status === "done" 
                          ? "bg-emerald-500 border-emerald-500 text-white font-bold" 
                          : theme === "white"
                          ? "border-slate-300 hover:border-cyan-600 bg-white"
                          : "border-slate-700 hover:border-cyan-400"
                      }`}
                    >
                      {task.status === "done" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-bold ${
                          theme === "white" ? "text-cyan-700" : "text-cyan-400"
                        }`}>
                          {task.projectName}
                        </span>
                        {priorityBadge(task.priority)}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                        task.status === "done" 
                          ? "line-through text-slate-400" 
                          : theme === "white" 
                          ? "text-slate-900 group-hover:text-cyan-700" 
                          : "text-white group-hover:text-cyan-300"
                      }`}>
                        {task.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                    <span className={`text-xs flex items-center gap-1 ${
                      theme === "white" ? "text-slate-600" : "text-slate-400"
                    }`}>
                      <User className="w-3 h-3" /> {task.assigneeName.split(" ")[0]}
                    </span>

                    <span className={`text-xs flex items-center gap-1 font-mono ${
                      theme === "white" ? "text-slate-600" : "text-slate-400"
                    }`}>
                      <Clock className="w-3 h-3" /> {task.deadline}
                    </span>

                    <select
                      value={task.status}
                      onChange={(e) => onUpdateStatus(task, e.target.value as TaskStatus)}
                      className={`text-xs rounded-lg px-2 py-1 focus:outline-none ${
                        theme === "white"
                          ? "bg-slate-100 border border-slate-300 text-slate-900 font-medium"
                          : "bg-slate-900 border border-slate-700 text-slate-200"
                      }`}
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
        </div>
      )}
    </div>
  );
};
