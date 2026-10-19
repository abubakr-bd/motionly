export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TeamRole = 
  | "Founder"
  | "CEO"
  | "Chief Officer"
  | "Finance Officer"
  | "Chief Operating Officer"
  | "Chief Financial Officer"
  | "Creative Director" 
  | "Head of Growth"
  | "Senior Video Editor" 
  | "Motion Designer" 
  | "Social Media Manager"
  | "Content Strategist"
  | "Production Lead" 
  | "Video Editor"
  | "Team Member"
  | string;

export type WorkspacePermission = "admin" | "lead" | "member";

export type ProjectStatus = "active" | "review" | "completed" | "on_hold";

export type WorkspaceTheme = "dark" | "white" | "gray";

export const SUPER_ADMIN_EMAILS: readonly string[] = [
  "abubakr.professional@gmail.com",
  "shuvo@motionly.media",
  "motionlymedia.help@gmail.com"
];

export const isSuperAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  return SUPER_ADMIN_EMAILS.some((adm) => adm.toLowerCase() === clean);
};

export const canAccessFinance = (member?: WorkspaceMember | null): boolean => {
  if (!member) return false;
  const cleanEmail = (member.email || "").toLowerCase().trim();

  // 1. Super Admins always have absolute full access
  if (isSuperAdmin(cleanEmail)) return true;

  // 2. Explicit access granted by a Super Admin
  if (member.hasFinanceAccess === true) return true;

  // 3. Finance Officer, CEO, Founder, or Chief Officers
  const r = (member.role || "").toLowerCase().trim();
  if (
    r.includes("finance") ||
    r.includes("ceo") ||
    r.includes("chief") ||
    r.includes("cfo") ||
    r.includes("coo") ||
    r.includes("founder")
  ) {
    return true;
  }

  return false;
};

export interface WorkspaceMember {
  id: string;
  email: string;
  name: string;
  role: TeamRole;
  permission: WorkspacePermission;
  avatarUrl?: string;
  phone?: string;
  skills: string[];
  active: boolean;
  status: "available" | "busy" | "in_review" | "offline";
  theme?: WorkspaceTheme;
  hasFinanceAccess?: boolean; // Granted explicitly by Super Admin
  activeTasksCount?: number;
  completedTasksCount?: number;
  joinedAt: string;
  updatedAt?: string;
}

export interface TaskAttachment {
  name: string;
  url: string;
  type?: string;
  size?: string;
}

export interface WorkspaceTask {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assigneeId: string;
  assigneeName: string;
  assigneeEmail: string;
  assigneeAvatar?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string; // YYYY-MM-DD or ISO
  labels: string[];
  files?: TaskAttachment[];
  videoDraftUrl?: string; // e.g. Frame.io link, Google Drive cut, Loom review
  commentsCount: number;
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceProject {
  id: string;
  name: string;
  clientName: string;
  description: string;
  status: ProjectStatus;
  deadline: string;
  leadId: string;
  leadName: string;
  leadEmail?: string;
  memberIds: string[];
  color: string;
  deliverables: string;
  totalTasks?: number;
  completedTasks?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface WorkspaceComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  content: string;
  type: "comment" | "status_change" | "file_added" | "assignment";
  oldStatus?: TaskStatus;
  newStatus?: TaskStatus;
  createdAt: string;
}

export interface WorkspaceNotification {
  id: string;
  recipientEmail: string;
  senderName: string;
  title: string;
  message: string;
  taskId?: string;
  projectId?: string;
  read: boolean;
  createdAt: string;
  type: "assignment" | "status_update" | "mention" | "deadline_warning";
}

export interface WorkspaceActivity {
  id: string;
  userName: string;
  userEmail: string;
  action: string;
  targetType: "task" | "project" | "member";
  targetId: string;
  targetName: string;
  details?: string;
  timestamp: string;
}
