import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Users, 
  Bell, 
  User as UserIcon, 
  Plus, 
  Search, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Layers,
  Clock,
  Shield,
  Sun,
  Moon,
  DollarSign
} from "lucide-react";
import type { WorkspaceMember, WorkspaceNotification, WorkspaceProject } from "../../types/teamWorkspace";
import { canAccessFinance, isSuperAdmin } from "../../types/teamWorkspace";
import { getAuth } from "../../lib/firebaseLazy";
import { useTeamTheme } from "./TeamThemeContext";

interface TeamLayoutProps {
  member: WorkspaceMember;
  notifications: WorkspaceNotification[];
  projects: WorkspaceProject[];
  unreadCount: number;
  onOpenCreateTask: () => void;
  onOpenAccessModal?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  children: React.ReactNode;
}

export const TeamLayout: React.FC<TeamLayoutProps> = ({
  member,
  notifications,
  projects,
  unreadCount,
  onOpenCreateTask,
  onOpenAccessModal,
  searchQuery,
  onSearchChange,
  children
}) => {
  const { theme } = useTeamTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);

  const isUserSuperAdmin = isSuperAdmin(member.email);

  const handleSignOut = async () => {
    try {
      const auth = await getAuth();
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      window.location.reload();
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  const currentPath = location.pathname;
  const userCanSeeFinance = canAccessFinance(member);

  const navItems = [
    { label: "Dashboard", path: "/team", icon: LayoutDashboard },
    { label: "Tasks", path: "/team/tasks", icon: CheckSquare },
    { label: "Projects", path: "/team/projects", icon: FolderKanban },
    ...(userCanSeeFinance ? [{ label: "Finance & Invoices", path: "/team/finance", icon: DollarSign }] : []),
    { label: "Team", path: "/team/members", icon: Users },
    { label: "Notifications", path: "/team/notifications", icon: Bell, badge: unreadCount },
    { label: "My Profile", path: "/team/profile", icon: UserIcon },
  ];

  const getPageTitle = () => {
    if (currentPath === "/team/tasks") return "Tasks Workspace";
    if (currentPath === "/team/projects") return "Agency Projects";
    if (currentPath.startsWith("/team/finance")) return "Finance & Invoices";
    if (currentPath === "/team/members") return "Team & Workload";
    if (currentPath === "/team/notifications") return "Notifications Center";
    if (currentPath === "/team/profile") return "My Workspace Profile";
    return "Workspace Dashboard";
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Founder": return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "CEO": return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
      case "Finance Officer": return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
      case "Chief Operating Officer":
      case "Chief Financial Officer":
      case "Chief Officer": return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
      case "Head of Growth": return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "Senior Video Editor": return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
      case "Motion Designer": return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      default: return "bg-slate-700/30 text-slate-300 border-slate-700/50";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      theme === "white"
        ? "bg-[#f8fafc] text-slate-900 selection:bg-cyan-500/20 selection:text-slate-900"
        : theme === "gray"
        ? "bg-[#131722] text-slate-100 selection:bg-cyan-500/30 selection:text-white"
        : "bg-[#070a12] text-slate-100 selection:bg-cyan-500/30 selection:text-white"
    }`}>
      {/* =========================================================================
          DESKTOP SIDEBAR + MAIN LAYOUT
      ========================================================================= */}
      <div className="flex flex-1 relative">
        {/* Left Desktop Sidebar */}
        <aside className={`hidden lg:flex flex-col w-64 border-r shrink-0 sticky top-0 h-screen overflow-y-auto transition-colors ${
          theme === "white"
            ? "bg-white border-slate-200 text-slate-900"
            : theme === "gray"
            ? "bg-[#181d2a] border-slate-700/80 text-slate-100"
            : "bg-[#0a0f1d] border-slate-800/80 text-slate-100"
        }`}>
          {/* Workspace Branding */}
          <div className={`p-5 border-b flex items-center justify-between ${
            theme === "white" ? "border-slate-200" : "border-slate-800/80"
          }`}>
            <Link to="/team" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-600/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-lg tracking-tighter">M</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-base font-bold tracking-tight ${
                    theme === "white" ? "text-slate-900" : "text-white"
                  }`}>Motionly</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-widest block -mt-0.5 ${
                  theme === "white" ? "text-cyan-700" : "text-cyan-400/90"
                }`}>
                  Creative Team
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Create Task Trigger */}
          <div className="px-4 pt-4 pb-2">
            <button
              onClick={onOpenCreateTask}
              type="button"
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Task
            </button>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex-1 px-3 py-3 space-y-1">
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-300"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}

            {/* Super Admin Manage Access Link in Sidebar */}
            {isUserSuperAdmin && onOpenAccessModal && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAccessModal}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group text-left ${
                    theme === "white"
                      ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm"
                      : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                  title="Super Admin: Manage member roles and finance permissions"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Manage Access</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Admin
                  </span>
                </button>
              </div>
            )}

            {/* Active Projects Quick Access */}
            <div className="pt-5 px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Active Projects</span>
              <span className="text-[10px] font-normal text-slate-600">{projects.length}</span>
            </div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
              {projects.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  to={`/team/projects?id=${p.id}`}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors group truncate"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: p.color || "#38bdf8" }}
                  />
                  <span className="truncate group-hover:underline text-[11px]">{p.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Member Profile Footer in Sidebar */}
          <div className={`p-3 border-t transition-colors ${
            theme === "white"
              ? "border-slate-200 bg-slate-50"
              : theme === "gray"
              ? "border-slate-700/80 bg-[#161a25]"
              : "border-slate-800/80 bg-[#080d1a]"
          }`}>
            <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 transition-colors ${
              theme === "white"
                ? "bg-white border-slate-200 shadow-sm"
                : theme === "gray"
                ? "bg-[#1e2536] border-slate-700"
                : "bg-slate-900/80 border-slate-800/80"
            }`}>
              <Link to="/team/profile" className="flex items-center gap-2.5 min-w-0 group">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs uppercase ${
                  theme === "white"
                    ? "bg-cyan-100 border border-cyan-300 text-cyan-800"
                    : "bg-cyan-500/20 border border-cyan-500/30 text-cyan-300"
                }`}>
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate transition-colors ${
                    theme === "white" 
                      ? "text-slate-900 group-hover:text-cyan-700" 
                      : "text-slate-200 group-hover:text-cyan-300"
                  }`}>
                    {member.name}
                  </p>
                  <span className={`inline-block px-1.5 py-0.2 text-[9px] font-semibold rounded-md border ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleSignOut}
                type="button"
                className={`p-1.5 rounded-lg transition-colors ${
                  theme === "white"
                    ? "text-slate-400 hover:text-red-600 hover:bg-red-50"
                    : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                }`}
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Workspace Main View Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-6">
          {/* Top Bar (Desktop & Mobile Header) */}
          <header className={`sticky top-0 z-30 backdrop-blur-xl border-b px-4 sm:px-6 py-3 flex items-center justify-between gap-3 transition-colors ${
            theme === "white"
              ? "bg-white/95 border-slate-200 text-slate-900"
              : theme === "gray"
              ? "bg-[#181d2a]/95 border-slate-700/80 text-slate-100"
              : "bg-[#0a0f1d]/90 border-slate-800/80 text-slate-100"
          }`}>
            {/* Mobile Brand / Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link to="/team" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-black text-sm">M</span>
                </div>
                <span className={`font-bold text-sm ${
                  theme === "white" ? "text-slate-900" : "text-white"
                }`}>Motionly</span>
              </Link>
              {isUserSuperAdmin && onOpenAccessModal && (
                <button
                  type="button"
                  onClick={onOpenAccessModal}
                  className="px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  title="Super Admin: Manage Access"
                >
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Access</span>
                </button>
              )}
            </div>

            {/* Desktop Page Title / Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2">
              <span className={`text-xs font-semibold ${
                theme === "white" ? "text-slate-500" : "text-slate-500"
              }`}>Workspace</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <h1 className={`text-sm font-bold tracking-tight ${
                theme === "white" ? "text-slate-900" : "text-white"
              }`}>
                {getPageTitle()}
              </h1>
            </div>

            {/* Global Quick Search Box */}
            <div className="flex-1 max-w-md mx-2 sm:mx-6">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search tasks, projects, people..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={`w-full rounded-xl pl-9 pr-3.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all ${
                    theme === "white"
                      ? "bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 placeholder:text-slate-500"
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5">
              {/* Notification Bell Dropdown Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
                  className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[9px] flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Preview */}
                {notifPopoverOpen && (
                  <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 border ${
                    theme === "white"
                      ? "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
                      : theme === "gray"
                      ? "bg-[#1e2536] border-slate-700 text-slate-100"
                      : "bg-[#0f172a] border-slate-700/80 text-white"
                  }`}>
                    <div className={`flex items-center justify-between pb-3 border-b mb-2 ${
                      theme === "white" ? "border-slate-200" : "border-slate-800"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${
                          theme === "white" ? "text-slate-900" : "text-white"
                        }`}>Notifications</span>
                        {unreadCount > 0 && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            theme === "white"
                              ? "bg-cyan-100 text-cyan-800"
                              : "bg-cyan-500/10 text-cyan-300"
                          }`}>
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <Link
                        to="/team/notifications"
                        onClick={() => setNotifPopoverOpen(false)}
                        className={`text-[11px] hover:underline ${
                          theme === "white" ? "text-cyan-700 font-semibold" : "text-cyan-400"
                        }`}
                      >
                        View all
                      </Link>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <p className={`text-xs text-center py-6 ${
                          theme === "white" ? "text-slate-500" : "text-slate-500"
                        }`}>
                          No notifications yet.
                        </p>
                      ) : (
                        notifications.slice(0, 4).map((n) => (
                          <div
                            key={n.id}
                            className={`p-2.5 rounded-xl border text-left transition-colors ${
                              n.read
                                ? theme === "white"
                                  ? "bg-slate-50 border-slate-200 text-slate-600"
                                  : "bg-slate-900/50 border-slate-800/50 text-slate-400"
                                : theme === "white"
                                ? "bg-cyan-50 border-cyan-200 text-slate-900"
                                : "bg-cyan-950/20 border-cyan-800/40 text-slate-200"
                            }`}
                          >
                            <p className={`text-xs font-semibold ${theme === "white" ? "text-slate-900" : "text-white"}`}>{n.title}</p>
                            <p className={`text-[11px] mt-0.5 line-clamp-2 ${theme === "white" ? "text-slate-600" : "text-slate-400"}`}>{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Layout Theme Quick Indicator */}
              <Link
                to="/team/profile"
                className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
                  theme === "white"
                    ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    : theme === "gray"
                    ? "bg-[#1e2536] border-slate-700 text-slate-200 hover:bg-[#262e42]"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
                title={`Layout: ${theme === "white" ? "Clean White" : theme === "gray" ? "Modern Gray" : "Dark Navy"} (Change in Profile)`}
              >
                {theme === "white" ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : theme === "gray" ? (
                  <Layers className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Moon className="w-4 h-4 text-cyan-400" />
                )}
              </Link>

              {/* Super Admin Quick Access Header Button */}
              {isUserSuperAdmin && onOpenAccessModal && (
                <button
                  type="button"
                  onClick={onOpenAccessModal}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border ${
                    theme === "white"
                      ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30"
                  }`}
                  title="Super Admin: Manage member roles and finance permissions"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Manage Access</span>
                </button>
              )}

              {/* Header "+ Task" Button */}
              <button
                onClick={onOpenCreateTask}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                Task
              </button>
            </div>
          </header>

          {/* Page Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>

      {/* =========================================================================
          MOBILE-ONLY BOTTOM NAVIGATION BAR (Thumb-friendly & Fixed)
      ========================================================================= */}
      <div className={`lg:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-2xl border-t px-2 py-1.5 flex items-center justify-around shadow-2xl transition-colors ${
        theme === "white"
          ? "bg-white/95 border-slate-200 text-slate-800 shadow-md"
          : theme === "gray"
          ? "bg-[#181d2a]/95 border-slate-700/80 text-slate-100"
          : "bg-[#0a0f1d]/95 border-slate-800/90 text-slate-100"
      }`}>
        <Link
          to="/team"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            currentPath === "/team" 
              ? "text-cyan-500 font-bold" 
              : theme === "white" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          to="/team/tasks"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            currentPath === "/team/tasks" 
              ? "text-cyan-500 font-bold" 
              : theme === "white" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CheckSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tasks</span>
        </Link>

        {/* Center Quick "+ Task" Button for phone thumbs */}
        <button
          onClick={onOpenCreateTask}
          type="button"
          className={`-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-600/40 border-2 active:scale-95 transition-transform ${
            theme === "white" ? "border-white" : theme === "gray" ? "border-[#181d2a]" : "border-[#0a0f1d]"
          }`}
          aria-label="Create Task"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <Link
          to="/team/projects"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            currentPath === "/team/projects" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <FolderKanban className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Projects</span>
        </Link>

        <Link
          to="/team/members"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            currentPath === "/team/members" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Team</span>
        </Link>

        <Link
          to="/team/profile"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            currentPath === "/team/profile" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <UserIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </Link>
      </div>
    </div>
  );
};
