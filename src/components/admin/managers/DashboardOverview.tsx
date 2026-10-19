import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { getDb } from "../../../lib/firebaseLazy";
import { useAuth } from "../../../lib/auth";
import { purgeOldActivities } from "../../../lib/activity";
import { Link } from "react-router-dom";
import { AdminPageHeader, AdminCard, AdminBadge } from "../ui/AdminUI";
import { 
  FileText, Video, MessageSquare, Users, ArrowUpRight, 
  Activity, Sparkles, Clock, ArrowRight, ShieldCheck, 
  HelpCircle, CreditCard, ChevronRight, Layers
} from "lucide-react";

export const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ blogs: 0, portfolio: 0, reviews: 0, team: 0, faqs: 0, partners: 0 });
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const db = await getDb();
        purgeOldActivities().catch(console.error);

        const [blogs, portfolio, reviews, team, faqs, partners] = await Promise.all([
          getDocs(query(collection(db, "blogs"))),
          getDocs(query(collection(db, "portfolio"))),
          getDocs(query(collection(db, "testimonials"))),
          getDocs(query(collection(db, "team"))),
          getDocs(query(collection(db, "faqs"))),
          getDocs(query(collection(db, "partners"))),
        ]);

        setStats({
          blogs: blogs.size,
          portfolio: portfolio.size,
          reviews: reviews.size,
          team: team.size,
          faqs: faqs.size,
          partners: partners.size,
        });

        const activitySnapshot = await getDocs(
          query(collection(db, "activity_logs"), orderBy("timestamp", "desc"), limit(20)),
        );
        const fifteenDaysAgo = Date.now() - 15 * 24 * 60 * 60 * 1000;
        const recentActivities = activitySnapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }) as any)
          .filter((activity) => {
            const timestamp = activity.timestamp;
            const time = timestamp?.toDate
              ? timestamp.toDate().getTime()
              : typeof timestamp === "number"
                ? timestamp
                : typeof timestamp === "string"
                  ? new Date(timestamp).getTime()
                  : 0;
            return !time || time >= fifteenDaysAgo;
          });

        setActivities(recentActivities);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const formatRelativeTime = (timestamp: any): string => {
    const dateMs = timestamp?.toDate && typeof timestamp.toDate === "function"
      ? timestamp.toDate().getTime()
      : typeof timestamp === "string"
        ? new Date(timestamp).getTime()
        : typeof timestamp === "number"
          ? timestamp
          : 0;

    if (!dateMs || Number.isNaN(dateMs)) return "Recently";

    const difference = Math.max(0, Date.now() - dateMs);
    const minutes = Math.floor(difference / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days <= 15) return `${days}d ago`;
    return new Date(dateMs).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatActivityItem = (activity: any) => {
    const actor = activity.userName || (activity.userEmail ? activity.userEmail.split("@")[0] : "Admin");
    const detail = activity.details || activity.targetName || (activity.invoiceId ? `Invoice ${activity.invoiceId}` : "");
    const action = (activity.action || "updated").toLowerCase().replace(/_/g, " ");
    return { actor, detail: detail || "Workspace record", action, time: formatRelativeTime(activity.timestamp) };
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading overview...</p>
      </div>
    );
  }

  const firstName = user?.displayName || user?.email?.split("@")[0] || "there";

  const metricCards = [
    { label: "Portfolio Items", value: stats.portfolio, path: "/admin/portfolio", icon: Video, color: "from-blue-600 to-indigo-600", desc: "Live videos" },
    { label: "Articles & Blog", value: stats.blogs, path: "/admin/blogs", icon: FileText, color: "from-emerald-500 to-teal-600", desc: "Published posts" },
    { label: "Client Reviews", value: stats.reviews, path: "/admin/reviews", icon: MessageSquare, color: "from-amber-500 to-orange-500", desc: "Social proof" },
    { label: "Team Members", value: stats.team, path: "/admin/team", icon: Users, color: "from-purple-500 to-pink-600", desc: "Active roster" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title={`Welcome back, ${firstName}`}
        description="Monitor your website content, recent activity, and studio operations in real time."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span>View Live Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.path}
              to={metric.path}
              className="group relative bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${metric.color} flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{metric.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-slate-600">{metric.label}</span>
                  <span className="text-[11px] font-medium text-slate-400">{metric.desc}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Recent Workspace Activity</h3>
                  <p className="text-xs text-slate-400">Audited updates across CMS and studio files</p>
                </div>
              </div>
              <Link to="/admin/access" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <span>View Full Audit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activities.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No activity recorded in the last 15 days.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {activities.slice(0, 10).map((activity) => {
                  const item = formatActivityItem(activity);
                  return (
                    <div key={activity.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {item.actor.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-slate-900 truncate">
                            <strong className="font-bold">{item.actor}</strong>{" "}
                            <span className="text-slate-500">{item.action}</span>{" "}
                            <span className="font-medium text-slate-700">{item.detail}</span>
                          </p>
                          <time className="text-[11px] text-slate-400">{item.time}</time>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full shrink-0">
                        {activity.module || "Workspace"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Quick Links */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Quick Actions</h3>
                <p className="text-xs text-slate-400">Fast shortcuts to update your website</p>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                to="/admin/hero"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Edit Hero & Showreel</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                to="/admin/portfolio"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Upload New Portfolio Project</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                to="/admin/blogs"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Write an Article / Blog Post</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                to="/admin/faqs"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Manage FAQ Knowledgebase</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                to="/admin/partners"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Curate Partners & Brand Logos</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors group"
              >
                <span>Site Branding & Layout</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Team Workspace & Finance Callout */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                Team &amp; Finance Hub
              </span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-white">Client Invoices &amp; Team Workspace</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Invoices, payment ledgers, and team workload tasks are now managed inside the dedicated Team Workspace with executive security clearance.
            </p>
            <div className="pt-1">
              <Link
                to="/team/finance"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Open Finance Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-950 to-blue-950 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">System Healthy</span>
            </div>
            <h4 className="text-base font-bold">Real-time Cloud Sync</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              All website edits update your live public production site instantly through Firebase real-time listeners.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Admin Access:</span>
              <span className="text-white font-bold">{user?.email || "Authenticated"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

