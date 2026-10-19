import { getDb } from "./firebaseLazy";
import type { 
  WorkspaceMember, 
  WorkspaceTask, 
  WorkspaceProject, 
  WorkspaceComment, 
  WorkspaceNotification, 
  TaskStatus, 
  WorkspaceActivity,
  TeamRole,
  WorkspacePermission
} from "../types/teamWorkspace";
import {
  SUPER_ADMIN_EMAILS,
  isSuperAdmin,
  canAccessFinance
} from "../types/teamWorkspace";

export const DEFAULT_CORE_MEMBERS: Omit<WorkspaceMember, "id">[] = [
  {
    name: "Abu Bakar Siddique",
    email: "abubakr.professional@gmail.com",
    role: "Founder",
    permission: "admin",
    hasFinanceAccess: true,
    skills: ["Creative Direction", "Executive Producer", "Brand Strategy", "Finance & Operations"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Abu Bakar Siddique",
    email: "motionlymedia.help@gmail.com",
    role: "Founder",
    permission: "admin",
    hasFinanceAccess: true,
    skills: ["Creative Direction", "Executive Producer", "Studio Administration"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Nazmul Hossen Shuvo",
    email: "shuvo@motionly.media",
    role: "CEO",
    permission: "admin",
    hasFinanceAccess: true,
    skills: ["Executive Leadership", "Growth Strategy", "Financial Planning", "Client Relations"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Nazmul Hossen Shuvo",
    email: "nazmul@motionly.media",
    role: "Head of Growth",
    permission: "lead",
    hasFinanceAccess: true,
    skills: ["Workflow Management", "Quality Assurance", "Client Strategy"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Mohammad Wasif Rahman",
    email: "wasif@motionly.media",
    role: "Senior Video Editor",
    permission: "member",
    hasFinanceAccess: false,
    skills: ["Premiere Pro", "After Effects", "Sound Design", "Color Grading"],
    active: true,
    status: "busy",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Abir Ratul",
    email: "abir@motionly.media",
    role: "Motion Designer",
    permission: "member",
    skills: ["Kinetic Typography", "2D Animation", "Short-Form Hooks"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Raiyan",
    email: "raiyan@motionly.media",
    role: "Social Media Manager",
    permission: "member",
    skills: ["Social Scripting", "Retention Pacing", "Packaging"],
    active: true,
    status: "available",
    joinedAt: new Date().toISOString()
  },
  {
    name: "Barno",
    email: "barno@motionly.media",
    role: "Content Strategist",
    permission: "member",
    skills: ["Narrative Structure", "Thumbnail Ideation", "B-roll Curation"],
    active: true,
    status: "in_review",
    joinedAt: new Date().toISOString()
  }
];

export const DEFAULT_INITIAL_PROJECTS: Omit<WorkspaceProject, "id">[] = [
  {
    name: "EquiSaaS BD Product Launch Series",
    clientName: "EquiSaaS BD",
    description: "Multi-part tech documentary and high-retention feature videos explaining new SaaS tooling.",
    status: "active",
    deadline: new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0],
    leadId: "lead_1",
    leadName: "Abu Bakar Siddique",
    memberIds: [],
    color: "#38bdf8",
    deliverables: "4x Shorts / Reels, 1x 12-min YouTube Episode",
    createdAt: new Date().toISOString()
  },
  {
    name: "Authority Founder Podcast & Viral Hooks",
    clientName: "Apex Ventures Media",
    description: "Weekly executive interview cutdowns with kinetic captions, sound design, and viral b-roll layering.",
    status: "active",
    deadline: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    leadId: "lead_2",
    leadName: "Nazmul Hossen Shuvo",
    memberIds: [],
    color: "#818cf8",
    deliverables: "8x Short-form Reels, 2x Podcast Full Cuts",
    createdAt: new Date().toISOString()
  },
  {
    name: "Varnox Signature Commercial 2026",
    clientName: "Varnox Luxury",
    description: "High-end cinematic commercial spot featuring dynamic color grading and custom soundscape.",
    status: "review",
    deadline: new Date(Date.now() + 1 * 86400000).toISOString().split("T")[0],
    leadId: "lead_1",
    leadName: "Mohammad Wasif Rahman",
    memberIds: [],
    color: "#10b981",
    deliverables: "30s Master TVC + 15s Social Cutdowns",
    createdAt: new Date().toISOString()
  }
];

export class TeamWorkspaceService {
  /**
   * Verify whether a given user email is authorized for /team.
   * Checks super-admin whitelist, team_members collection, and active users collection.
   */
  public static async verifyUserAccess(email: string): Promise<{
    isAuthorized: boolean;
    memberProfile: WorkspaceMember | null;
  }> {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const db = await getDb();
      const { collection, getDocs, doc, getDoc, setDoc } = await import("firebase/firestore");

      // Check team_members first
      const membersSnap = await getDocs(collection(db, "team_members"));
      let members = membersSnap.docs.map(d => ({ id: d.id, ...d.data() } as WorkspaceMember));

      // Auto-seed initial members if empty
      if (members.length === 0) {
        members = await this.seedInitialTeam();
      }

      // Check if user matches any member
      let foundMember = members.find(m => m.email.toLowerCase() === cleanEmail && m.active !== false);

      if (!foundMember) {
        // Fallback: check users collection (admin CMS users)
        const userDocId = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
        const userDoc = await getDoc(doc(db, "users", userDocId));
        if (userDoc.exists() && userDoc.data().active !== false) {
          const uData = userDoc.data();
          const perm: WorkspacePermission = (uData.role === "Founder" || uData.role === "Admin" || isSuperAdmin(cleanEmail)) ? "admin" : "member";
          const isSuper = isSuperAdmin(cleanEmail);
          
          foundMember = {
            id: `tm_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
            email: cleanEmail,
            name: uData.name || cleanEmail.split("@")[0],
            role: (uData.role as TeamRole) || (isSuper ? "Founder" : "Team Member"),
            permission: perm,
            hasFinanceAccess: isSuper ? true : false,
            skills: ["Video Editing", "Content Creation"],
            active: true,
            status: "available",
            joinedAt: new Date().toISOString()
          };

          // Save to team_members
          await setDoc(doc(db, "team_members", foundMember.id), foundMember);
        }
      }

      // If superadmin, always authorize with full executive permissions
      if (isSuperAdmin(cleanEmail)) {
        if (!foundMember) {
          const isShuvo = cleanEmail === "shuvo@motionly.media";
          foundMember = {
            id: `tm_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
            email: cleanEmail,
            name: isShuvo ? "Nazmul Hossen Shuvo" : "Abu Bakar Siddique",
            role: isShuvo ? "CEO" : "Founder",
            permission: "admin",
            hasFinanceAccess: true,
            skills: isShuvo 
              ? ["Executive Leadership", "Growth Strategy", "Financial Planning"] 
              : ["Creative Direction", "Executive Producer", "Studio Administration"],
            active: true,
            status: "available",
            joinedAt: new Date().toISOString()
          };
          await setDoc(doc(db, "team_members", foundMember.id), foundMember);
        } else {
          // Guarantee superadmin has admin permission and finance access
          foundMember.permission = "admin";
          foundMember.hasFinanceAccess = true;
        }
        return { isAuthorized: true, memberProfile: foundMember };
      }

      if (foundMember) {
        return { isAuthorized: true, memberProfile: foundMember };
      }

      return { isAuthorized: false, memberProfile: null };
    } catch (err) {
      console.error("verifyUserAccess error:", err);
      // Hard fallback for superadmin if network glitch
      if (isSuperAdmin(cleanEmail)) {
        const isShuvo = cleanEmail === "shuvo@motionly.media";
        return {
          isAuthorized: true,
          memberProfile: {
            id: `tm_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
            email: cleanEmail,
            name: isShuvo ? "Nazmul Hossen Shuvo" : "Abu Bakar Siddique",
            role: isShuvo ? "CEO" : "Founder",
            permission: "admin",
            hasFinanceAccess: true,
            skills: ["Executive Producer", "Financial Planning"],
            active: true,
            status: "available",
            joinedAt: new Date().toISOString()
          }
        };
      }
      return { isAuthorized: false, memberProfile: null };
    }
  }

  public static async seedInitialTeam(): Promise<WorkspaceMember[]> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const seeded: WorkspaceMember[] = [];

    for (const member of DEFAULT_CORE_MEMBERS) {
      const id = `tm_${member.email.replace(/[^a-zA-Z0-9]/g, "_")}`;
      const fullMember: WorkspaceMember = { id, ...member };
      await setDoc(doc(db, "team_members", id), fullMember);
      seeded.push(fullMember);
    }
    return seeded;
  }

  public static async seedInitialProjectsAndTasks(members: WorkspaceMember[]): Promise<void> {
    const db = await getDb();
    const { doc, setDoc, collection, getDocs } = await import("firebase/firestore");

    const projectsSnap = await getDocs(collection(db, "team_projects"));
    if (!projectsSnap.empty) return;

    const createdProjects: WorkspaceProject[] = [];

    for (let i = 0; i < DEFAULT_INITIAL_PROJECTS.length; i++) {
      const p = DEFAULT_INITIAL_PROJECTS[i];
      const id = `proj_${i + 1}`;
      const project: WorkspaceProject = { id, ...p };
      await setDoc(doc(db, "team_projects", id), project);
      createdProjects.push(project);
    }

    // Seed sample tasks
    const sampleTasks: Omit<WorkspaceTask, "id">[] = [
      {
        title: "Master Color Grade & Cinematic LUT Pass",
        description: "Apply bespoke color harmony LUTs, balance contrast, skin tones, and noise reduction on 4K raw cut.",
        projectId: createdProjects[0]?.id || "proj_1",
        projectName: createdProjects[0]?.name || "EquiSaaS BD Product Launch Series",
        assigneeId: members[2]?.id || "tm_wasif",
        assigneeName: members[2]?.name || "Mohammad Wasif Rahman",
        assigneeEmail: members[2]?.email || "wasif@motionly.media",
        status: "review",
        priority: "high",
        deadline: new Date(Date.now() + 1 * 86400000).toISOString().split("T")[0],
        labels: ["Color Grading", "DaVinci Resolve", "Episode 1"],
        videoDraftUrl: "https://frame.io/preview-cut-v2",
        commentsCount: 2,
        createdBy: "Abu Bakar Siddique",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Animate 3D Logo Intro & Kinetic Title Sequence",
        description: "Design snappy motion graphics lower thirds and custom title card with sound FX timing.",
        projectId: createdProjects[0]?.id || "proj_1",
        projectName: createdProjects[0]?.name || "EquiSaaS BD Product Launch Series",
        assigneeId: members[3]?.id || "tm_abir",
        assigneeName: members[3]?.name || "Abir Ratul",
        assigneeEmail: members[3]?.email || "abir@motionly.media",
        status: "in_progress",
        priority: "urgent",
        deadline: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
        labels: ["Motion Graphics", "After Effects", "Intro"],
        commentsCount: 1,
        createdBy: "Abu Bakar Siddique",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Cut 60s Fast-Paced Viral Hook Reel from Podcast Ep 4",
        description: "Isolate strongest 30-sec insight hook, add dynamic zooming, sound punch, and punchy captions.",
        projectId: createdProjects[1]?.id || "proj_2",
        projectName: createdProjects[1]?.name || "Authority Founder Podcast & Viral Hooks",
        assigneeId: members[4]?.id || "tm_raiyan",
        assigneeName: members[4]?.name || "Raiyan",
        assigneeEmail: members[4]?.email || "raiyan@motionly.media",
        status: "todo",
        priority: "high",
        deadline: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
        labels: ["Reels", "Shorts", "Viral Hook"],
        commentsCount: 0,
        createdBy: "Nazmul Hossen Shuvo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "B-roll Storyboarding & Pacing Audit",
        description: "Map timeline pacing against retention graph benchmarks and select cinematic b-roll clips.",
        projectId: createdProjects[1]?.id || "proj_2",
        projectName: createdProjects[1]?.name || "Authority Founder Podcast & Viral Hooks",
        assigneeId: members[5]?.id || "tm_barno",
        assigneeName: members[5]?.name || "Barno",
        assigneeEmail: members[5]?.email || "barno@motionly.media",
        status: "todo",
        priority: "medium",
        deadline: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
        labels: ["Strategy", "Storyboarding"],
        commentsCount: 0,
        createdBy: "Nazmul Hossen Shuvo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Sound Design, Foley & Audio Mastering for TVC",
        description: "Clean voiceover tracks, apply subtle atmospheric risers, impacts, and commercial broadcast mastering.",
        projectId: createdProjects[2]?.id || "proj_3",
        projectName: createdProjects[2]?.name || "Varnox Signature Commercial 2026",
        assigneeId: members[2]?.id || "tm_wasif",
        assigneeName: members[2]?.name || "Mohammad Wasif Rahman",
        assigneeEmail: members[2]?.email || "wasif@motionly.media",
        status: "done",
        priority: "high",
        deadline: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
        labels: ["Audio", "Mastering", "SFX"],
        videoDraftUrl: "https://frame.io/varnox-commercial-final",
        commentsCount: 3,
        createdBy: "Abu Bakar Siddique",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    for (let j = 0; j < sampleTasks.length; j++) {
      const taskId = `task_${Date.now()}_${j}`;
      await setDoc(doc(db, "team_tasks", taskId), { id: taskId, ...sampleTasks[j] });
    }
  }

  // --- Realtime Subscriptions ---

  public static subscribeTasks(callback: (tasks: WorkspaceTask[]) => void): () => void {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(collection(db, "team_tasks"), (snap) => {
        const list = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as WorkspaceTask))
          .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        callback(list);
      }, (err) => {
        console.error("Tasks subscribe error:", err);
      });
    });
    return () => { unsub?.(); };
  }

  public static subscribeProjects(callback: (projects: WorkspaceProject[]) => void): () => void {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(collection(db, "team_projects"), (snap) => {
        const list = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as WorkspaceProject))
          .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        callback(list);
      }, (err) => {
        console.error("Projects subscribe error:", err);
      });
    });
    return () => { unsub?.(); };
  }

  public static subscribeMembers(callback: (members: WorkspaceMember[]) => void): () => void {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(collection(db, "team_members"), (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkspaceMember));
        callback(list);
      }, (err) => {
        console.error("Members subscribe error:", err);
      });
    });
    return () => { unsub?.(); };
  }

  public static subscribeNotifications(
    userEmail: string, 
    callback: (notifications: WorkspaceNotification[]) => void
  ): () => void {
    let unsub: (() => void) | undefined;
    const cleanEmail = userEmail.trim().toLowerCase();
    getDb().then(async (db) => {
      const { collection, onSnapshot, query, orderBy, limit } = await import("firebase/firestore");
      const q = query(
        collection(db, "team_notifications"), 
        orderBy("createdAt", "desc"),
        limit(50)
      );
      unsub = onSnapshot(q, (snap) => {
        const list = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as WorkspaceNotification))
          .filter(n => !n.recipientEmail || n.recipientEmail.toLowerCase() === cleanEmail);
        callback(list);
      }, (err) => {
        console.error("Notifications subscribe error:", err);
      });
    });
    return () => { unsub?.(); };
  }

  public static subscribeTaskComments(
    taskId: string, 
    callback: (comments: WorkspaceComment[]) => void
  ): () => void {
    let unsub: (() => void) | undefined;
    getDb().then(async (db) => {
      const { collection, onSnapshot, query, where, orderBy } = await import("firebase/firestore");
      const q = query(
        collection(db, "team_comments"), 
        where("taskId", "==", taskId),
        orderBy("createdAt", "asc")
      );
      unsub = onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkspaceComment));
        callback(list);
      }, (err) => {
        console.error("Comments subscribe error:", err);
      });
    });
    return () => { unsub?.(); };
  }

  // --- Task Operations ---

  public static async createTask(
    data: Omit<WorkspaceTask, "id" | "commentsCount" | "createdAt" | "updatedAt">,
    currentUser: { name: string; email: string }
  ): Promise<WorkspaceTask> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newTask: WorkspaceTask = {
      ...data,
      id: taskId,
      commentsCount: 0,
      createdBy: currentUser.email,
      createdByName: currentUser.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(doc(db, "team_tasks", taskId), newTask);

    // Create notification if assigned to another user
    if (data.assigneeEmail && data.assigneeEmail.toLowerCase() !== currentUser.email.toLowerCase()) {
      await this.createNotification({
        recipientEmail: data.assigneeEmail,
        senderName: currentUser.name,
        title: "New Task Assigned",
        message: `${currentUser.name} assigned you to "${data.title}" in ${data.projectName}`,
        taskId,
        type: "assignment"
      });
    }

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "created",
      targetType: "task",
      targetId: taskId,
      targetName: data.title,
      details: `Created task under ${data.projectName}`
    });

    return newTask;
  }

  public static async updateTask(
    taskId: string, 
    updates: Partial<WorkspaceTask>,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    const payload = {
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(doc(db, "team_tasks", taskId), payload);

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "updated",
      targetType: "task",
      targetId: taskId,
      targetName: updates.title || "Task",
      details: "Updated task details"
    });
  }

  public static async updateTaskStatus(
    task: WorkspaceTask,
    newStatus: TaskStatus,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    if (task.status === newStatus) return;
    const oldStatus = task.status;

    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    await updateDoc(doc(db, "team_tasks", task.id), {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    // Post automatic status activity comment
    await this.addComment({
      taskId: task.id,
      userId: currentUser.email,
      userName: currentUser.name,
      userEmail: currentUser.email,
      content: `Moved status from ${oldStatus.toUpperCase().replace("_", " ")} to ${newStatus.toUpperCase().replace("_", " ")}`,
      type: "status_change",
      oldStatus,
      newStatus
    });

    // Notify assignee or creator if different person
    const recipient = task.assigneeEmail !== currentUser.email ? task.assigneeEmail : task.createdBy;
    if (recipient && recipient.toLowerCase() !== currentUser.email.toLowerCase()) {
      await this.createNotification({
        recipientEmail: recipient,
        senderName: currentUser.name,
        title: `Task Status: ${newStatus.toUpperCase().replace("_", " ")}`,
        message: `${currentUser.name} moved "${task.title}" to ${newStatus.toUpperCase().replace("_", " ")}`,
        taskId: task.id,
        type: "status_update"
      });
    }

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "status_changed",
      targetType: "task",
      targetId: task.id,
      targetName: task.title,
      details: `Moved to ${newStatus}`
    });
  }

  public static async deleteTask(
    taskId: string,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, deleteDoc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "team_tasks", taskId));

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "deleted",
      targetType: "task",
      targetId: taskId,
      targetName: "Task",
      details: `Deleted task ${taskId}`
    });
  }

  // --- Project Operations ---

  public static async createProject(
    data: Omit<WorkspaceProject, "id" | "createdAt" | "updatedAt">,
    currentUser: { name: string; email: string }
  ): Promise<WorkspaceProject> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const projId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newProject: WorkspaceProject = {
      ...data,
      id: projId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(doc(db, "team_projects", projId), newProject);

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "created",
      targetType: "project",
      targetId: projId,
      targetName: data.name,
      details: `Created new project for ${data.clientName}`
    });

    return newProject;
  }

  public static async updateProject(
    projectId: string,
    updates: Partial<WorkspaceProject>,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    await updateDoc(doc(db, "team_projects", projectId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "updated",
      targetType: "project",
      targetId: projectId,
      targetName: updates.name || "Project",
      details: "Updated project metadata"
    });
  }

  public static async deleteProject(
    projectId: string,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, deleteDoc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "team_projects", projectId));

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "deleted",
      targetType: "project",
      targetId: projectId,
      targetName: "Project",
      details: `Deleted project ${projectId}`
    });
  }

  // --- Comments & Notifications ---

  public static async addComment(
    data: Omit<WorkspaceComment, "id" | "createdAt">
  ): Promise<WorkspaceComment> {
    const db = await getDb();
    const { doc, setDoc, updateDoc, increment } = await import("firebase/firestore");
    const commentId = `cm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newComment: WorkspaceComment = {
      ...data,
      id: commentId,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "team_comments", commentId), newComment);

    // Increment commentsCount on task
    try {
      await updateDoc(doc(db, "team_tasks", data.taskId), {
        commentsCount: increment(1),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Failed to increment commentsCount:", e);
    }

    return newComment;
  }

  public static async createNotification(
    data: Omit<WorkspaceNotification, "id" | "read" | "createdAt">
  ): Promise<void> {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import("firebase/firestore");
      const notifId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      const newNotif: WorkspaceNotification = {
        ...data,
        id: notifId,
        read: false,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "team_notifications", notifId), newNotif);
    } catch (err) {
      console.warn("Failed to create notification:", err);
    }
  }

  public static async markNotificationRead(id: string): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "team_notifications", id), { read: true });
  }

  public static async markAllNotificationsRead(userEmail: string): Promise<void> {
    const db = await getDb();
    const { collection, getDocs, doc, writeBatch } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "team_notifications"));
    const batch = writeBatch(db);
    const cleanEmail = userEmail.toLowerCase();

    snap.docs.forEach((d) => {
      const data = d.data();
      if (!data.read && (!data.recipientEmail || data.recipientEmail.toLowerCase() === cleanEmail)) {
        batch.update(doc(db, "team_notifications", d.id), { read: true });
      }
    });

    await batch.commit();
  }

  // --- Member / Whitelist Management ---

  public static async addMemberToWhitelist(
    member: Omit<WorkspaceMember, "id" | "joinedAt">,
    currentUser: { name: string; email: string }
  ): Promise<WorkspaceMember> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const cleanEmail = member.email.trim().toLowerCase();
    const memberId = `tm_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;

    const newMember: WorkspaceMember = {
      ...member,
      id: memberId,
      email: cleanEmail,
      joinedAt: new Date().toISOString()
    };

    await setDoc(doc(db, "team_members", memberId), newMember);

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "invited_member",
      targetType: "member",
      targetId: memberId,
      targetName: member.name,
      details: `Added ${member.name} (${cleanEmail}) as ${member.role}`
    });

    return newMember;
  }

  public static async updateMember(
    memberId: string,
    updates: Partial<WorkspaceMember>,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    await updateDoc(doc(db, "team_members", memberId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "updated_member",
      targetType: "member",
      targetId: memberId,
      targetName: updates.name || "Member",
      details: "Updated member information"
    });
  }

  /**
   * Super Admin Access Management:
   * Only abubakr.professional@gmail.com, shuvo@motionly.media, motionlymedia.help@gmail.com
   * can grant/revoke Finance access or elevate roles.
   */
  public static async updateMemberAccess(
    memberId: string,
    updates: {
      role?: string;
      permission?: WorkspacePermission;
      hasFinanceAccess?: boolean;
      active?: boolean;
    },
    admin: { name: string; email: string }
  ): Promise<void> {
    if (!isSuperAdmin(admin.email)) {
      throw new Error("Unauthorized: Only Motionly Super Admins (abubakr.professional@gmail.com, shuvo@motionly.media, motionlymedia.help@gmail.com) can configure member roles and finance access.");
    }

    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    const payload: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (updates.role !== undefined) payload.role = updates.role;
    if (updates.permission !== undefined) payload.permission = updates.permission;
    if (updates.hasFinanceAccess !== undefined) payload.hasFinanceAccess = updates.hasFinanceAccess;
    if (updates.active !== undefined) payload.active = updates.active;

    await updateDoc(doc(db, "team_members", memberId), payload);

    await this.logActivity({
      userName: admin.name,
      userEmail: admin.email,
      action: "updated_permissions",
      targetType: "member",
      targetId: memberId,
      targetName: updates.role || "Member Access",
      details: `Super Admin configured permissions: Finance Access = ${updates.hasFinanceAccess ? "Granted" : "Restricted"}, Role = ${updates.role || "Unchanged"}, Level = ${updates.permission || "Unchanged"}`
    });
  }

  public static async removeMember(
    memberId: string,
    currentUser: { name: string; email: string }
  ): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");
    // Soft disable to preserve historical task assignment references
    await updateDoc(doc(db, "team_members", memberId), {
      active: false,
      updatedAt: new Date().toISOString()
    });

    await this.logActivity({
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: "revoked_member",
      targetType: "member",
      targetId: memberId,
      targetName: "Member",
      details: "Deactivated member access"
    });
  }

  // --- Central Team Activity Log ---

  private static async logActivity(activity: Omit<WorkspaceActivity, "id" | "timestamp">): Promise<void> {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import("firebase/firestore");
      const id = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      await setDoc(doc(db, "team_activity", id), {
        ...activity,
        id,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Failed to record team activity:", e);
    }
  }

  public static async getRecentActivity(limitCount = 20): Promise<WorkspaceActivity[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");
      const q = query(collection(db, "team_activity"), orderBy("timestamp", "desc"), limit(limitCount));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkspaceActivity));
    } catch {
      return [];
    }
  }
}
