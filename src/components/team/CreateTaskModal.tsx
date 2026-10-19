import React, { useState } from "react";
import { X, Calendar, User, FolderKanban, Flag, Tag, Video, Sparkles, Loader2 } from "lucide-react";
import type { WorkspaceMember, WorkspaceProject, WorkspaceTask, TaskPriority, TaskStatus } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: WorkspaceProject[];
  members: WorkspaceMember[];
  currentUser: WorkspaceMember;
  onTaskCreated: (newTask?: WorkspaceTask) => void;
  initialProjectId?: string;
  initialAssigneeId?: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  projects,
  members,
  currentUser,
  onTaskCreated,
  initialProjectId,
  initialAssigneeId
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId || projects[0]?.id || "");
  const [assigneeId, setAssigneeId] = useState(initialAssigneeId || currentUser.id);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]
  );
  const [labelsInput, setLabelsInput] = useState("Video Editing, Review");
  const [videoDraftUrl, setVideoDraftUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      if (initialProjectId) setProjectId(initialProjectId);
      else if (!projectId && projects.length > 0) setProjectId(projects[0].id);

      if (initialAssigneeId) setAssigneeId(initialAssigneeId);
    }
  }, [isOpen, initialProjectId, initialAssigneeId, projects]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const selectedProject = projects.find((p) => p.id === projectId);
      const selectedAssignee = members.find((m) => m.id === assigneeId);

      const labels = labelsInput
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      const createdTask = await TeamWorkspaceService.createTask(
        {
          title: title.trim(),
          description: description.trim(),
          projectId: projectId || "general",
          projectName: selectedProject ? selectedProject.name : "General Project",
          assigneeId: assigneeId || currentUser.id,
          assigneeName: selectedAssignee ? selectedAssignee.name : currentUser.name,
          assigneeEmail: selectedAssignee ? selectedAssignee.email : currentUser.email,
          status,
          priority,
          deadline,
          labels,
          videoDraftUrl: videoDraftUrl.trim() || undefined,
          createdBy: currentUser.email,
          createdByName: currentUser.name
        },
        { name: currentUser.name, email: currentUser.email }
      );

      onTaskCreated(createdTask);
      onClose();
      // Reset form
      setTitle("");
      setDescription("");
      setVideoDraftUrl("");
    } catch (err) {
      console.error("Task creation failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const priorityColors = {
    low: "text-slate-400 border-slate-700 bg-slate-800/40",
    medium: "text-cyan-300 border-cyan-800/60 bg-cyan-950/30",
    high: "text-amber-300 border-amber-800/60 bg-amber-950/30",
    urgent: "text-rose-300 border-rose-800/60 bg-rose-950/30"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#0d1322] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Task</h2>
              <p className="text-[11px] text-slate-400">Assign agency cut, review, or creative deliverable</p>
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
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Task Title <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rough Cut Pass for YouTube Ep 1, Sound Foley, Color LUT..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description &amp; Editing Brief
            </label>
            <textarea
              rows={3}
              placeholder="Key beats, retention pacing notes, timestamps, audio requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 resize-none"
            />
          </div>

          {/* Project & Assignee Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
                Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
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

          {/* Priority & Status & Deadline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-amber-400" />
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none ${priorityColors[priority]}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Stage / Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Deadline
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Video Draft / Frame.io Review Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              Review / Draft Video URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://frame.io/... or Google Drive link"
              value={videoDraftUrl}
              onChange={(e) => setVideoDraftUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Tags / Labels */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Tags / Labels (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. YouTube Longform, Hook, DaVinci Resolve"
              value={labelsInput}
              onChange={(e) => setLabelsInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Actions */}
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
              disabled={submitting || !title.trim()}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
