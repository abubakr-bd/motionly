import React, { useState } from "react";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  UserPlus, 
  Sparkles, 
  MessageSquare, 
  Filter,
  CheckCircle2
} from "lucide-react";
import type { 
  WorkspaceNotification, 
  WorkspaceTask 
} from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface TeamNotificationsProps {
  notifications: WorkspaceNotification[];
  tasks: WorkspaceTask[];
  currentUserEmail: string;
  onSelectTaskById: (taskId: string) => void;
}

export const TeamNotifications: React.FC<TeamNotificationsProps> = ({
  notifications,
  tasks,
  currentUserEmail,
  onSelectTaskById
}) => {
  const [filter, setFilter] = useState<"all" | "unread" | "assignment" | "status_update">("all");
  const [markingAll, setMarkingAll] = useState(false);

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "assignment") return n.type === "assignment";
    if (filter === "status_update") return n.type === "status_update";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await TeamWorkspaceService.markAllNotificationsRead(currentUserEmail);
    } catch (e) {
      console.error("Mark all read failed:", e);
    } finally {
      setMarkingAll(false);
    }
  };

  const handleMarkSingleRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await TeamWorkspaceService.markNotificationRead(id);
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  };

  const formatTimeAgo = (isoString: string) => {
    try {
      const now = Date.now();
      const past = new Date(isoString).getTime();
      const diffSecs = Math.floor((now - past) / 1000);

      if (diffSecs < 60) return "Just now";
      if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
      if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
      if (diffSecs < 172800) return "Yesterday";
      return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  const getNotificationIcon = (type: WorkspaceNotification["type"]) => {
    switch (type) {
      case "assignment":
        return {
          icon: UserPlus,
          color: "text-cyan-400",
          bg: "bg-cyan-500/10 border-cyan-500/20"
        };
      case "status_update":
        return {
          icon: CheckCircle2,
          color: "text-emerald-400",
          bg: "bg-emerald-500/10 border-emerald-500/20"
        };
      case "deadline_warning":
        return {
          icon: AlertTriangle,
          color: "text-rose-400",
          bg: "bg-rose-500/10 border-rose-500/20"
        };
      default:
        return {
          icon: MessageSquare,
          color: "text-blue-400",
          bg: "bg-blue-500/10 border-blue-500/20"
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Notification Center</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Stay aligned with task assignments, status progress, and director review updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={markingAll}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-cyan-400" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0b101e] border border-slate-800/80 rounded-2xl w-fit">
        {[
          { id: "all", label: "All Activity" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "assignment", label: "Assignments" },
          { id: "status_update", label: "Status Changes" }
        ].map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                active
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-850"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0b101e] border border-slate-800/80">
          <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">All caught up!</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {filter === "unread"
              ? "You have no unread notifications right now."
              : "No notifications found in this category. You will receive alerts when tasks are assigned or updated."}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((notif) => {
            const iconConfig = getNotificationIcon(notif.type);
            const Icon = iconConfig.icon;
            const relatedTask = notif.taskId ? tasks.find((t) => t.id === notif.taskId) : null;

            return (
              <div
                key={notif.id}
                onClick={() => {
                  if (notif.taskId) {
                    if (!notif.read) TeamWorkspaceService.markNotificationRead(notif.id);
                    onSelectTaskById(notif.taskId);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  !notif.read
                    ? "bg-[#0c1427] border-cyan-500/30 shadow-md shadow-cyan-500/5 hover:border-cyan-500/50"
                    : "bg-[#0b101e] border-slate-800/80 hover:border-slate-700/90"
                } flex items-start justify-between gap-4`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon Box */}
                  <div className={`p-2.5 rounded-xl border shrink-0 ${iconConfig.bg}`}>
                    <Icon className={`w-4 h-4 ${iconConfig.color}`} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                      <span>From {notif.senderName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(notif.createdAt)}</span>
                      </span>

                      {relatedTask && (
                        <>
                          <span>•</span>
                          <span className="text-cyan-400 font-medium hover:underline flex items-center gap-1">
                            <span>Open Task</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mark as read button */}
                <div className="shrink-0 flex items-center">
                  {!notif.read && (
                    <button
                      onClick={(e) => handleMarkSingleRead(notif.id, e)}
                      title="Mark as read"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
