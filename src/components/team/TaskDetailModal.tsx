import React, { useState, useEffect } from "react";
import { 
  X, 
  Calendar, 
  User, 
  FolderKanban, 
  Flag, 
  Tag, 
  Video, 
  ExternalLink, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Send,
  Loader2,
  ChevronRight,
  Sparkles
} from "lucide-react";
import type { 
  WorkspaceTask, 
  WorkspaceMember, 
  WorkspaceProject, 
  TaskStatus, 
  TaskPriority, 
  WorkspaceComment 
} from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface TaskDetailModalProps {
  task: WorkspaceTask | null;
  isOpen: boolean;
  onClose: () => void;
  projects: WorkspaceProject[];
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onTaskUpdated?: (updatedTask?: WorkspaceTask) => void;
  onTaskDeleted?: (deletedTaskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  projects,
  members,
  currentUser,
  onTaskUpdated,
  onTaskDeleted
}) => {
  if (!isOpen || !task) return null;

  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId);
  const [deadline, setDeadline] = useState(task.deadline);
  const [videoDraftUrl, setVideoDraftUrl] = useState(task.videoDraftUrl || "");
  const [description, setDescription] = useState(task.description);
  const [comments, setComments] = useState<WorkspaceComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [savingTask, setSavingTask] = useState(false);

  useEffect(() => {
    setStatus(task.status);
    setPriority(task.priority);
    setAssigneeId(task.assigneeId);
    setDeadline(task.deadline);
    setVideoDraftUrl(task.videoDraftUrl || "");
    setDescription(task.description);

    const unsub = TeamWorkspaceService.subscribeTaskComments(task.id, (list) => {
      setComments(list);
    });
    return () => unsub();
  }, [task]);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setStatus(newStatus);
    const updated: WorkspaceTask = {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    onTaskUpdated?.(updated);
    await TeamWorkspaceService.updateTaskStatus(task, newStatus, {
      name: currentUser.name,
      email: currentUser.email
    });
  };

  const handleSaveDetails = async () => {
    setSavingTask(true);
    try {
      const selectedAssignee = members.find((m) => m.id === assigneeId);
      const updatedFields = {
        priority,
        assigneeId,
        assigneeName: selectedAssignee ? selectedAssignee.name : task.assigneeName,
        assigneeEmail: selectedAssignee ? selectedAssignee.email : task.assigneeEmail,
        deadline,
        videoDraftUrl: videoDraftUrl.trim() || undefined,
        description: description.trim()
      };
      const updated: WorkspaceTask = {
        ...task,
        ...updatedFields,
        updatedAt: new Date().toISOString()
      };
      onTaskUpdated?.(updated);
      await TeamWorkspaceService.updateTask(
        task.id,
        updatedFields,
        { name: currentUser.name, email: currentUser.email }
      );
    } catch (err) {
      console.error("Save details error:", err);
    } finally {
      setSavingTask(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;

    setSubmittingComment(true);
    try {
      await TeamWorkspaceService.addComment({
        taskId: task.id,
        userId: currentUser.email,
        userName: currentUser.name,
        userEmail: currentUser.email,
        content: newComment.trim(),
        type: "comment"
      });
      setNewComment("");
      onTaskUpdated?.();
    } catch (e) {
      console.error("Error adding comment:", e);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete task "${task.title}"?`)) return;
    const deletedId = task.id;
    await TeamWorkspaceService.deleteTask(deletedId, {
      name: currentUser.name,
      email: currentUser.email
    });
    onTaskDeleted?.(deletedId);
    onClose();
  };

  const statusStages: { key: TaskStatus; label: string; color: string }[] = [
    { key: "todo", label: "To Do", color: "bg-slate-700 text-slate-300" },
    { key: "in_progress", label: "In Progress", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    { key: "review", label: "Review", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    { key: "done", label: "Done", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  ];

  const priorityColors = {
    low: "text-slate-400 border-slate-700 bg-slate-800/40",
    medium: "text-cyan-300 border-cyan-800/60 bg-cyan-950/30",
    high: "text-amber-300 border-amber-800/60 bg-amber-950/30",
    urgent: "text-rose-300 border-rose-800/60 bg-rose-950/30"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-[#0d1322] border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-3 bg-[#0a0f1d]">
          <div className="flex items-center gap-2 text-xs text-slate-400 min-w-0">
            <span className="font-semibold text-cyan-400">{task.projectName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="font-mono text-slate-500 truncate">ID: {task.id.slice(-6)}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {(currentUser.permission === "admin" || currentUser.email === task.createdBy) && (
              <button
                onClick={handleDelete}
                type="button"
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Title & Stage Navigator */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
              {task.title}
            </h1>

            {/* Task Flow Stage Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
              {statusStages.map((stage) => {
                const isActive = status === stage.key;
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => handleStatusChange(stage.key)}
                    className={`flex-1 min-w-[70px] py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isActive
                        ? `${stage.color} border shadow-md scale-[1.02]`
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                    <span>{stage.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Draft Preview Button if available */}
          {task.videoDraftUrl && (
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-purple-200">Video Draft / Frame.io Review</p>
                  <p className="text-[11px] text-purple-400 truncate font-mono">{task.videoDraftUrl}</p>
                </div>
              </div>
              <a
                href={task.videoDraftUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wide shrink-0 transition-colors shadow-md shadow-purple-600/30"
              >
                Open Cut <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Quick Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 mb-1">
                <User className="w-3 h-3 text-cyan-400" /> Assignee
              </span>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 mb-1">
                <Flag className="w-3 h-3 text-amber-400" /> Priority
              </span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className={`w-full border rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none ${priorityColors[priority]}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-cyan-400" /> Deadline
              </span>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Description & Brief */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Brief &amp; Editing Instructions
              </label>
              <button
                type="button"
                onClick={handleSaveDetails}
                disabled={savingTask}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {savingTask ? "Saving..." : "Save Changes"}
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add editing details, key beats, audio cues..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 leading-relaxed resize-none"
            />
          </div>

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {task.labels.map((l, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-[10px] font-semibold"
                >
                  #{l}
                </span>
              ))}
            </div>
          )}

          {/* Discussion & Activity Section */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              Activity &amp; Review Notes ({comments.length})
            </h3>

            {/* Comments List */}
            <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4 bg-slate-900/40 rounded-xl border border-slate-800/50">
                  No comments yet. Leave a note or feedback below.
                </p>
              ) : (
                comments.map((cm) => (
                  <div
                    key={cm.id}
                    className={`p-3 rounded-2xl border text-left ${
                      cm.type === "status_change"
                        ? "bg-slate-900/40 border-slate-800/60 text-slate-400 text-[11px]"
                        : "bg-slate-900/90 border-slate-800 text-slate-200 text-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-[11px]">{cm.userName}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(cm.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="leading-relaxed">{cm.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Write feedback, timestamp notes, or cut status..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {submittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
