import React, { useState, useEffect } from "react";
import type { AdminUser, AdminAccessLog, AdminRole } from "../../../lib/services/accessService";
import { AccessService } from "../../../lib/services/accessService";
import { AdminButton, AdminBadge, AdminInput } from "../ui/AdminUI";
import { 
  ShieldCheck, UserPlus, History, Search, Trash2, CheckCircle2, 
  XCircle, Clock, ShieldAlert, Laptop, User, Lock, RefreshCw, Loader2 
} from "lucide-react";

export const AccessManager = ({ notify, currentAdminEmail }: { notify: (msg: string, type?: "ok" | "err") => void; currentAdminEmail?: string }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [logs, setLogs] = useState<AdminAccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "logs">("users");

  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Admin Form
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<AdminRole>("Admin");

  const loadData = async () => {
    setLoading(true);
    const [uData, lData] = await Promise.all([
      AccessService.getAdminUsers(),
      AccessService.getAccessLogs()
    ]);
    setUsers(uData);
    setLogs(lData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      notify("Please enter a valid email address", "err");
      return;
    }

    try {
      await AccessService.addAdminUser({
        email: newEmail.trim(),
        name: newName.trim() || newEmail.trim().split("@")[0],
        role: newRole,
        active: true,
        addedBy: currentAdminEmail || "Founder"
      });

      notify(`Access granted to ${newEmail}`);
      setAddModalOpen(false);
      setNewEmail("");
      setNewName("");
      setNewRole("Admin");
      loadData();
    } catch (err: any) {
      notify(err.message || "Failed to add admin", "err");
    }
  };

  const handleToggleActive = async (user: AdminUser) => {
    try {
      await AccessService.updateAdminUser(user.id, { active: !user.active });
      notify(`Status for ${user.email} updated`);
      loadData();
    } catch (err: any) {
      notify(err.message || "Failed to update user", "err");
    }
  };

  const handleRoleChange = async (user: AdminUser, role: AdminRole) => {
    try {
      await AccessService.updateAdminUser(user.id, { role });
      notify(`Role updated to ${role} for ${user.email}`);
      loadData();
    } catch (err: any) {
      notify(err.message || "Failed to update role", "err");
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (confirm(`Are you sure you want to revoke access for ${user.email}?`)) {
      try {
        await AccessService.deleteAdminUser(user.id);
        notify(`Access revoked for ${user.email}`);
        loadData();
      } catch (err: any) {
        notify(err.message || "Failed to remove user", "err");
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLogs = logs.filter(l => 
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (l.action && l.action.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading Access & Audit Control...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Access & Audit Management</h1>
              <p className="text-xs text-slate-500 font-medium">Manage Motionly Admin Panel access permissions and view audit login history.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AdminButton onClick={() => setAddModalOpen(true)} variant="primary">
            <UserPlus className="w-4 h-4 mr-1.5 inline" /> Grant Admin Access
          </AdminButton>
          <button 
            onClick={loadData}
            title="Refresh Data"
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-xs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Authorized Admins</p>
            <p className="text-2xl font-black text-slate-900">{users.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active Accounts</p>
            <p className="text-2xl font-black text-emerald-600">{users.filter(u => u.active !== false).length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Recorded Audit Events</p>
            <p className="text-2xl font-black text-purple-600">{logs.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "users" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Authorized Admins ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "logs" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <History className="w-4 h-4" />
            Audit Access History ({logs.length})
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search email or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* TAB 1: AUTHORIZED USERS */}
      {activeTab === "users" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Authorized Personnel Accounts</h3>
            <span className="text-xs text-slate-400 font-medium">Shuvo.motionly@gmail.com is configured with full Founder access</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 text-[10px] font-black uppercase text-slate-400 border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">User / Email</th>
                <th className="py-3 px-5">Assigned Role</th>
                <th className="py-3 px-5">Access Status</th>
                <th className="py-3 px-5">Date Granted</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
                        {u.name.charAt(0).toUpperCase() || u.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                        <p className="text-slate-500 text-xs font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <select
                      value={u.role || "Admin"}
                      onChange={(e) => handleRoleChange(u, e.target.value as AdminRole)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="Founder">Founder (Full Control)</option>
                      <option value="Admin">Admin (Management)</option>
                      <option value="HR">HR</option>
                      <option value="Editor">Editor</option>
                      <option value="Sales">Sales</option>
                      <option value="Viewer">Viewer (Read Only)</option>
                    </select>
                  </td>

                  <td className="py-4 px-5">
                    <AdminBadge color={u.active !== false ? "green" : "red"}>
                      {u.active !== false ? "Active" : "Disabled"}
                    </AdminBadge>
                  </td>

                  <td className="py-4 px-5 text-slate-500 font-mono text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                          u.active !== false 
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200" 
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                        }`}
                      >
                        {u.active !== false ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => handleDeleteUser(u)}
                        title="Revoke Access"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === "logs" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Access Audit History Log</h3>
            <span className="text-xs text-slate-400 font-medium">Real-time session audit entries</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-bold">No access log entries recorded yet.</div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="p-4 sm:px-6 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 font-black">
                      {log.displayName ? log.displayName.charAt(0).toUpperCase() : log.email.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 text-sm">{log.displayName || log.email}</p>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                          {log.role || "Admin"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                        <span className="font-mono text-slate-700">{log.email}</span>
                        <span aria-hidden="true">|</span>
                        <span className="text-slate-600 font-semibold">{log.action || "Accessed Admin Panel"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono font-bold text-slate-800">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">
                      {log.userAgent ? log.userAgent.substring(0, 35) + "..." : "Browser Session"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: Grant New Admin Access */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Grant Admin Access</h3>
                  <p className="text-xs text-slate-500">Authorize a user to log into Motionly Admin Panel.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <AdminInput
                label="Admin Google Email Address"
                placeholder="Shuvo.motionly@gmail.com"
                type="email"
                value={newEmail}
                onChange={(e: any) => setNewEmail(e.target.value)}
                required
              />

              <AdminInput
                label="Full Name / Display Name"
                placeholder="Nazmul Hossein Shuvo"
                value={newName}
                onChange={(e: any) => setNewName(e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Role</label>
                <select
                  value={newRole}
                  onChange={(e: any) => setNewRole(e.target.value as AdminRole)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900"
                >
                  <option value="Founder">Founder (Full System & Finance Access)</option>
                  <option value="Admin">Admin (General CMS & Invoices)</option>
                  <option value="HR">HR</option>
                  <option value="Editor">Editor</option>
                  <option value="Sales">Sales</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <AdminButton type="submit" variant="primary">
                  Grant Access
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
