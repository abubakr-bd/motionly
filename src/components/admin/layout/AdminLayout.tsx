import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../lib/auth";
import {
  LayoutDashboard,
  Sparkles,
  Film,
  BookOpen,
  GitMerge,
  Split,
  ZapOff,
  MessageSquareQuote,
  Users,
  HelpCircle,
  Building2,
  Compass,
  Layers,
  Settings,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Search,
  ArrowUpRight,
  Shield,
  DollarSign,
  Grid,
  CheckCircle2,
  Sliders,
  Globe
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
  onSignOut: () => void | Promise<void>;
};

export interface CMSSection {
  name: string;
  shortName: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "core" | "story" | "social" | "config";
  description: string;
  badge?: string;
}

export const CMS_SECTIONS: CMSSection[] = [
  // 1. Core Content
  {
    name: "Dashboard",
    shortName: "Overview",
    path: "/admin",
    icon: LayoutDashboard,
    category: "core",
    description: "Website overview, live status & quick actions",
  },
  {
    name: "Homepage Hero",
    shortName: "Hero",
    path: "/admin/hero",
    icon: Sparkles,
    category: "core",
    description: "Main headline, CTA & video showreel",
    badge: "Hero",
  },
  {
    name: "Portfolio",
    shortName: "Portfolio",
    path: "/admin/portfolio",
    icon: Film,
    category: "core",
    description: "Video projects & client case studies",
    badge: "Key",
  },
  {
    name: "Journal (Blog)",
    shortName: "Blog",
    path: "/admin/blogs",
    icon: BookOpen,
    category: "core",
    description: "Articles, editorial posts & case writeups",
  },
  {
    name: "Personal Branding",
    shortName: "Branding",
    path: "/admin/personal-branding",
    icon: Compass,
    category: "core",
    description: "Founder & creator personal branding",
  },

  // 2. Story & Conversion
  {
    name: "How It Works",
    shortName: "Process",
    path: "/admin/process",
    icon: GitMerge,
    category: "story",
    description: "Production workflow steps & timeline",
  },
  {
    name: "The Difference",
    shortName: "Difference",
    path: "/admin/difference",
    icon: Split,
    category: "story",
    description: "Agency USPs & comparison value props",
  },
  {
    name: "Pain Points",
    shortName: "Pain Points",
    path: "/admin/pain-points",
    icon: ZapOff,
    category: "story",
    description: "Client video problems & solutions",
  },
  {
    name: "Pricing & Packages",
    shortName: "Pricing",
    path: "/admin/pricing",
    icon: Layers,
    category: "story",
    description: "Service tiers, deliverables & package rates",
  },

  // 3. Social Proof & Trust
  {
    name: "Client Reviews",
    shortName: "Reviews",
    path: "/admin/reviews",
    icon: MessageSquareQuote,
    category: "social",
    description: "Testimonials, ratings & client quotes",
  },
  {
    name: "Team Members",
    shortName: "Team",
    path: "/admin/team",
    icon: Users,
    category: "social",
    description: "Agency roster, editors & leadership",
  },
  {
    name: "Partners & Brands",
    shortName: "Brands",
    path: "/admin/partners",
    icon: Building2,
    category: "social",
    description: "Client logo marquee & layer configuration",
  },

  // 4. Site Configuration
  {
    name: "FAQ Knowledgebase",
    shortName: "FAQs",
    path: "/admin/faqs",
    icon: HelpCircle,
    category: "config",
    description: "Frequently asked questions & answers",
  },
  {
    name: "Site Settings",
    shortName: "Settings",
    path: "/admin/settings",
    icon: Settings,
    category: "config",
    description: "Global SEO, identity & contact metadata",
  },
  {
    name: "Access & Audit",
    shortName: "Security",
    path: "/admin/access",
    icon: ShieldCheck,
    category: "config",
    description: "Admin whitelist & security audit history",
  },
];

const CATEGORIES = [
  { id: "core", title: "Core Website Content", count: 5 },
  { id: "story", title: "Story & Conversion", count: 4 },
  { id: "social", title: "Social Proof & Trust", count: 3 },
  { id: "config", title: "Site Configuration", count: 3 },
] as const;

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onSignOut }) => {
  const { user, role } = useAuth();
  const location = useLocation();

  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  // Auto-close drawers when navigating
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Find active item
  const currentSection = useMemo(() => {
    return CMS_SECTIONS.find((sec) => isActive(sec.path)) || {
      name: "Admin Studio",
      shortName: "Studio",
      path: "/admin",
      icon: LayoutDashboard,
      description: "Website Controls",
    };
  }, [location.pathname]);

  // Filtered sections for desktop sidebar
  const filteredSections = useMemo(() => {
    if (!desktopSearch.trim()) return CMS_SECTIONS;
    const q = desktopSearch.toLowerCase().trim();
    return CMS_SECTIONS.filter(
      (sec) =>
        sec.name.toLowerCase().includes(q) ||
        sec.shortName.toLowerCase().includes(q) ||
        sec.description.toLowerCase().includes(q)
    );
  }, [desktopSearch]);

  // Filtered sections for mobile modal
  const mobileFilteredSections = useMemo(() => {
    if (!mobileSearch.trim()) return CMS_SECTIONS;
    const q = mobileSearch.toLowerCase().trim();
    return CMS_SECTIONS.filter(
      (sec) =>
        sec.name.toLowerCase().includes(q) ||
        sec.shortName.toLowerCase().includes(q) ||
        sec.description.toLowerCase().includes(q)
    );
  }, [mobileSearch]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row antialiased text-slate-900 selection:bg-blue-600/10 selection:text-blue-900">
      {/* =========================================================================
          DESKTOP SIDEBAR (Clean, Polished, Categorized with Fast Search)
      ========================================================================= */}
      <aside className="hidden lg:flex fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#090d16] text-slate-200 border-r border-slate-800/80 flex-col shadow-xl">
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-[#070a12]">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight block leading-tight">Motionly</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block -mt-0.5">
                Website Controls
              </span>
            </div>
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Open Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Search Quick Filter in Sidebar */}
        <div className="p-3.5 border-b border-slate-800/60 bg-[#0a0f1c]/50">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={desktopSearch}
              onChange={(e) => setDesktopSearch(e.target.value)}
              placeholder="Quick search controls..."
              className="w-full pl-9 pr-7 py-1.5 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {desktopSearch && (
              <button
                type="button"
                onClick={() => setDesktopSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {CATEGORIES.map((cat) => {
            const items = filteredSections.filter((s) => s.category === cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="px-3 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  <span>{cat.title}</span>
                  <span className="text-[9px] text-slate-500">{items.length}</span>
                </div>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                          active
                            ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/30"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              active ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 text-[9px] font-bold rounded-md ${
                              active
                                ? "bg-white/20 text-white"
                                : "bg-slate-800 text-slate-400 border border-slate-700/60"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Quick Hub Transition Card to Team & Finance */}
          <div className="pt-2">
            <Link
              to="/team/finance"
              className="block p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-[#121929] border border-cyan-500/20 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all group shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Team &amp; Finance Hub
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Client billing, invoices, payment ledger &amp; team workload workspace.
              </p>
            </Link>
          </div>
        </div>

        {/* User Card & Sign Out Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#070a12] shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-500/30 shrink-0">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.email || "Admin User"}</p>
                <span className="inline-block text-[9px] font-semibold text-blue-400 uppercase tracking-wider">
                  {role || "Administrator"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN WORKSPACE LAYOUT (DESKTOP & MOBILE WRAPPER)
      ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 pb-24 lg:pb-12">
        {/* Sticky Desktop Topbar Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          {/* Left: Mobile Brand & Desktop Breadcrumbs */}
          <div className="flex items-center gap-3">
            {/* Mobile Brand Button */}
            <Link to="/admin" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-xs shadow-sm">
                M
              </div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight">Motionly</span>
            </Link>

            {/* Desktop Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-slate-500">Website CMS</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 font-bold bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/70">
                {currentSection.name}
              </span>
            </div>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Team Workspace Quick Link */}
            <Link
              to="/team/finance"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200/80 text-xs font-bold transition-all shadow-xs"
              title="Open Team Workspace & Finance"
            >
              <DollarSign className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden sm:inline">Finance &amp; Team</span>
            </Link>

            {/* Public Website Preview */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-200/60"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Live Website</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>

            {/* Mobile All Tools Button in Top Header */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 lg:hidden cursor-pointer"
              title="All Website Tools"
              aria-label="Open Website Tools"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* =========================================================================
          MOBILE-ONLY BOTTOM NAVIGATION BAR (Thumb-friendly, 5-button quick bar)
      ========================================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-2xl safe-area-bottom"
      >
        <Link
          to="/admin"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            location.pathname === "/admin"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          to="/admin/portfolio"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            location.pathname.startsWith("/admin/portfolio")
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Film className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Portfolio</span>
        </Link>

        <Link
          to="/admin/blogs"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            location.pathname.startsWith("/admin/blogs")
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Blog</span>
        </Link>

        <Link
          to="/admin/settings"
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors ${
            location.pathname.startsWith("/admin/settings")
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Settings</span>
        </Link>

        {/* Center / Action: Open All 14 Tools */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl min-w-[56px] transition-colors cursor-pointer ${
            mobileDrawerOpen ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">All Tools</span>
        </button>
      </nav>

      {/* =========================================================================
          MOBILE ALL TOOLS DRAWER / MODAL SHEET
      ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 bg-slate-950 text-white rounded-t-3xl border-t border-slate-800 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-250">
            {/* Sheet Handle & Header */}
            <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-[#070a12]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                  M
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">All Website Controls</h3>
                  <p className="text-[10px] text-slate-400">14 CMS sections for motionly.media</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input in Mobile Sheet */}
            <div className="p-3 bg-slate-900 border-b border-slate-800/80 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Filter website tools..."
                  className="w-full pl-9 pr-7 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                {mobileSearch && (
                  <button
                    type="button"
                    onClick={() => setMobileSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Tool Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                {mobileFilteredSections.map((sec) => {
                  const Icon = sec.icon;
                  const active = isActive(sec.path);

                  return (
                    <Link
                      key={sec.path}
                      to={sec.path}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                        active
                          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30 font-bold"
                          : "bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          active ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {sec.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                            active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                          }`}>
                            {sec.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold block leading-tight line-clamp-1">{sec.name}</span>
                        <span className={`text-[10px] mt-0.5 line-clamp-1 block ${
                          active ? "text-blue-100" : "text-slate-400"
                        }`}>
                          {sec.shortName}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Team & Finance Workspace Mobile Link */}
              <div className="pt-2">
                <Link
                  to="/team/finance"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 text-white text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span>Go to Team Workspace &amp; Finance</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

              {/* Sign Out on Mobile */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-slate-850 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out of Admin Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
