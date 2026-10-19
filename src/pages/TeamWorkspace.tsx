import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { getAuth } from "../lib/firebaseLazy";
import { TeamWorkspaceService } from "../lib/teamWorkspaceService";
import type { 
  WorkspaceMember, 
  WorkspaceTask, 
  WorkspaceProject, 
  WorkspaceNotification, 
  WorkspaceActivity,
  TaskStatus 
} from "../types/teamWorkspace";
import { canAccessFinance } from "../types/teamWorkspace";

import { TeamAuthGate } from "../components/team/TeamAuthGate";
import { TeamLayout } from "../components/team/TeamLayout";
import { TeamDashboard } from "../components/team/TeamDashboard";
import { TeamTasks } from "../components/team/TeamTasks";
import { TeamProjects } from "../components/team/TeamProjects";
import { TeamRoster } from "../components/team/TeamRoster";
import { TeamNotifications } from "../components/team/TeamNotifications";
import { TeamProfile } from "../components/team/TeamProfile";
import { TeamFinance } from "../components/team/finance/TeamFinance";
import { TeamFinanceRestricted } from "../components/team/finance/TeamFinanceRestricted";

import { TaskDetailModal } from "../components/team/TaskDetailModal";
import { CreateTaskModal } from "../components/team/CreateTaskModal";
import { CreateProjectModal } from "../components/team/CreateProjectModal";
import { InviteMemberModal } from "../components/team/InviteMemberModal";
import { TeamFinanceAccessModal } from "../components/team/finance/TeamFinanceAccessModal";
import { TeamThemeProvider } from "../components/team/TeamThemeContext";

export const TeamWorkspace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth & Whitelist state
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [currentUser, setCurrentUser] = useState<WorkspaceMember | null>(null);

  // Realtime Data state
  const [tasks, setTasks] = useState<WorkspaceTask[]>([]);
  const [projects, setProjects] = useState<WorkspaceProject[]>([]);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [notifications, setNotifications] = useState<WorkspaceNotification[]>([]);
  const [recentActivity, setRecentActivity] = useState<WorkspaceActivity[]>([]);

  // Search & Navigation state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProjectFromOtherView, setFilterProjectFromOtherView] = useState<string | null>(null);

  // Modals state
  const [selectedTask, setSelectedTask] = useState<WorkspaceTask | null>(null);
  const [createTaskState, setCreateTaskState] = useState<{
    isOpen: boolean;
    initialProjectId?: string;
    initialAssigneeId?: string;
  }>({ isOpen: false });
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [inviteMemberModalOpen, setInviteMemberModalOpen] = useState(false);
  const [globalAccessModalOpen, setGlobalAccessModalOpen] = useState(false);

  // Check auth state
  const checkAuth = useCallback(async () => {
    try {
      setAuthLoading(true);
      const auth = await getAuth();
      const { onAuthStateChanged } = await import("firebase/auth");

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setFirebaseUser(user);
        if (user && user.email) {
          const { isAuthorized, memberProfile } = await TeamWorkspaceService.verifyUserAccess(user.email);
          setIsWhitelisted(isAuthorized);
          setCurrentUser(memberProfile);
        } else {
          setIsWhitelisted(false);
          setCurrentUser(null);
        }
        setAuthLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("Auth check failed:", err);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    let unsubAuth: (() => void) | undefined;
    checkAuth().then((unsub) => {
      unsubAuth = unsub;
    });
    return () => {
      unsubAuth?.();
    };
  }, [checkAuth]);

  // Realtime data subscriptions when whitelisted
  useEffect(() => {
    if (!isWhitelisted || !currentUser) return;

    const unsubTasks = TeamWorkspaceService.subscribeTasks((newTasks) => {
      setTasks(newTasks);
      // Keep selectedTask fresh if open
      setSelectedTask((prev) => {
        if (!prev) return null;
        return newTasks.find((t) => t.id === prev.id) || null;
      });
    });

    const unsubProjects = TeamWorkspaceService.subscribeProjects((newProjects) => {
      setProjects(newProjects);
    });

    const unsubMembers = TeamWorkspaceService.subscribeMembers((newMembers) => {
      setMembers(newMembers);
      // If current member profile has been updated in database, update local profile
      const updatedSelf = newMembers.find((m) => m.email.toLowerCase() === currentUser.email.toLowerCase());
      if (updatedSelf) {
        setCurrentUser(updatedSelf);
      }
    });

    const unsubNotifs = TeamWorkspaceService.subscribeNotifications(currentUser.email, (newNotifs) => {
      setNotifications(newNotifs);
    });

    // Initial fetch of recent activity
    TeamWorkspaceService.getRecentActivity(20).then(setRecentActivity);

    return () => {
      unsubTasks();
      unsubProjects();
      unsubMembers();
      unsubNotifs();
    };
  }, [isWhitelisted, currentUser?.email]);

  // Task Status handler with instant optimistic update
  const handleUpdateStatus = async (task: WorkspaceTask, newStatus: TaskStatus) => {
    if (!currentUser || task.status === newStatus) return;

    // Instant optimistic UI update
    const optimisticTask = { ...task, status: newStatus, updatedAt: new Date().toISOString() };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? optimisticTask : t)));
    if (selectedTask?.id === task.id) {
      setSelectedTask(optimisticTask);
    }

    try {
      await TeamWorkspaceService.updateTaskStatus(task, newStatus, {
        name: currentUser.name,
        email: currentUser.email
      });
    } catch (err) {
      console.error("Status update error:", err);
      // Rollback on error
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  };

  const handleTaskCreated = (newTask?: WorkspaceTask) => {
    if (newTask) {
      setTasks((prev) => [newTask, ...prev.filter((t) => t.id !== newTask.id)]);
    }
    setCreateTaskState({ isOpen: false });
  };

  const handleTaskDeleted = (deletedTaskId?: string) => {
    if (deletedTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deletedTaskId));
    }
    setSelectedTask(null);
  };

  const handleTaskUpdated = (updatedTask?: WorkspaceTask) => {
    if (updatedTask) {
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setSelectedTask(updatedTask);
    }
  };

  const handleMemberUpdated = (updatedMember: WorkspaceMember) => {
    setMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
    if (currentUser && currentUser.id === updatedMember.id) {
      setCurrentUser(updatedMember);
    }
  };

  const handleSelectTaskById = (taskId: string) => {
    const found = tasks.find((t) => t.id === taskId);
    if (found) {
      setSelectedTask(found);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // View routing switcher
  const renderActiveView = () => {
    if (!currentUser) return null;

    const path = location.pathname.toLowerCase();

    if (path.startsWith("/team/tasks")) {
      return (
        <TeamTasks
          tasks={tasks}
          projects={projects}
          members={members}
          currentUser={currentUser}
          onOpenCreateTask={() => setCreateTaskState({ isOpen: true })}
          onSelectTask={setSelectedTask}
          onUpdateStatus={handleUpdateStatus}
          searchQuery={searchQuery}
        />
      );
    }

    if (path.startsWith("/team/projects")) {
      return (
        <TeamProjects
          projects={projects}
          tasks={tasks}
          members={members}
          currentUser={currentUser}
          onOpenCreateProject={() => setCreateProjectModalOpen(true)}
          onOpenCreateTask={(projectId) => setCreateTaskState({ isOpen: true, initialProjectId: projectId })}
          onSelectProjectFilter={(projectId) => {
            setFilterProjectFromOtherView(projectId);
            navigate("/team/tasks");
          }}
          searchQuery={searchQuery}
        />
      );
    }

    if (path.startsWith("/team/finance")) {
      if (!canAccessFinance(currentUser)) {
        return <TeamFinanceRestricted currentUser={currentUser} />;
      }
      return (
        <TeamFinance
          currentUser={currentUser}
          members={members}
          onMemberUpdated={handleMemberUpdated}
        />
      );
    }

    if (path.startsWith("/team/members")) {
      return (
        <TeamRoster
          members={members}
          tasks={tasks}
          currentUser={currentUser}
          onOpenInviteMember={() => setInviteMemberModalOpen(true)}
          onOpenCreateTask={(projectId, assigneeId) =>
            setCreateTaskState({ isOpen: true, initialProjectId: projectId, initialAssigneeId: assigneeId })
          }
          onSelectTask={setSelectedTask}
          onFilterTasksByMember={(memberId) => {
            navigate("/team/tasks");
          }}
          onMemberUpdated={handleMemberUpdated}
          searchQuery={searchQuery}
        />
      );
    }

    if (path.startsWith("/team/notifications")) {
      return (
        <TeamNotifications
          notifications={notifications}
          tasks={tasks}
          currentUserEmail={currentUser.email}
          onSelectTaskById={handleSelectTaskById}
        />
      );
    }

    if (path.startsWith("/team/profile")) {
      return (
        <TeamProfile
          member={currentUser}
          tasks={tasks}
          onSelectTask={setSelectedTask}
          onOpenCreateTask={() => setCreateTaskState({ isOpen: true })}
          onOpenAccessModal={() => setGlobalAccessModalOpen(true)}
        />
      );
    }

    // Default: Dashboard (/team or /team/)
    return (
      <TeamDashboard
        currentUser={currentUser}
        tasks={tasks}
        projects={projects}
        members={members}
        recentActivity={recentActivity}
        onOpenCreateTask={() => setCreateTaskState({ isOpen: true })}
        onSelectTask={setSelectedTask}
        onUpdateStatus={handleUpdateStatus}
      />
    );
  };

  return (
    <TeamAuthGate
      user={firebaseUser}
      loading={authLoading}
      isWhitelisted={isWhitelisted}
      onRefreshAuth={checkAuth}
    >
      {currentUser && (
        <TeamThemeProvider member={currentUser}>
          <TeamLayout
            member={currentUser}
            notifications={notifications}
            projects={projects}
            unreadCount={unreadNotificationsCount}
            onOpenCreateTask={() => setCreateTaskState({ isOpen: true })}
            onOpenAccessModal={() => setGlobalAccessModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          >
            {renderActiveView()}
          </TeamLayout>

          {/* =========================================================================
              GLOBAL WORKSPACE MODALS
          ========================================================================= */}
          {/* Task Detail & Discussion Modal */}
          {selectedTask && (
            <TaskDetailModal
              task={selectedTask}
              isOpen={Boolean(selectedTask)}
              onClose={() => setSelectedTask(null)}
              projects={projects}
              members={members}
              currentUser={currentUser}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          )}

          {/* Quick Task Creation Modal */}
          <CreateTaskModal
            isOpen={createTaskState.isOpen}
            onClose={() => setCreateTaskState({ isOpen: false })}
            projects={projects}
            members={members}
            currentUser={currentUser}
            onTaskCreated={handleTaskCreated}
            initialProjectId={createTaskState.initialProjectId}
            initialAssigneeId={createTaskState.initialAssigneeId}
          />

          {/* Project Creation Modal */}
          <CreateProjectModal
            isOpen={createProjectModalOpen}
            onClose={() => setCreateProjectModalOpen(false)}
            members={members}
            currentUser={currentUser}
            onProjectCreated={() => {
              setCreateProjectModalOpen(false);
            }}
          />

          {/* Whitelist Member Invitation Modal */}
          <InviteMemberModal
            isOpen={inviteMemberModalOpen}
            onClose={() => setInviteMemberModalOpen(false)}
            currentUser={currentUser}
            onMemberAdded={() => {
              setInviteMemberModalOpen(false);
            }}
          />

          {/* Super Admin Access Management Modal */}
          {globalAccessModalOpen && (
            <TeamFinanceAccessModal
              isOpen={globalAccessModalOpen}
              onClose={() => setGlobalAccessModalOpen(false)}
              members={members}
              currentUser={currentUser}
              onMemberUpdated={handleMemberUpdated}
            />
          )}
        </TeamThemeProvider>
      )}
    </TeamAuthGate>
  );
};

export default TeamWorkspace;
