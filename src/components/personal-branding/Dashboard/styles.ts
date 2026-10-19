export const dashboardStyles = {
  container: `relative min-h-[120vh] py-32 bg-slate-950 overflow-hidden flex flex-col items-center border-t border-white/5`,
  
  dashboardWrapper: `relative w-full max-w-6xl mx-auto px-6 mt-16 perspective-[2000px]`,
  
  // The main dashboard window
  appWindow: `relative w-full bg-[#0B0F19] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),0_0_80px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col backdrop-blur-3xl`,
  
  // Mac-like title bar
  titleBar: `h-12 border-b border-white/5 flex items-center px-6 bg-white/[0.02]`,
  windowControls: `flex gap-2`,
  dot: `w-3 h-3 rounded-full`,
  dotRed: `bg-rose-500/80`,
  dotYellow: `bg-amber-500/80`,
  dotGreen: `bg-emerald-500/80`,
  
  // Main layout grid inside the app
  appGrid: `p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6`,
  
  // Widget panels
  widgetBase: `bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl p-5 md:p-6 hover:bg-white/[0.04] transition-colors backdrop-blur-xl shadow-lg`,
  
  // Specific widgets
  mainChartWidget: `md:col-span-8 flex flex-col gap-4 relative overflow-hidden`,
  metricsWidget: `md:col-span-4 flex flex-col gap-4`,
  queueWidget: `md:col-span-6 lg:col-span-4 flex flex-col gap-4`,
  aiWidget: `md:col-span-6 lg:col-span-4 flex flex-col gap-4`,
  revenueWidget: `md:col-span-12 lg:col-span-4 flex flex-col gap-4`,
  
  widgetHeader: `flex items-center justify-between mb-4`,
  widgetTitle: `text-sm font-semibold text-white/80 flex items-center gap-2`,
  
  // Graph and UI mock styles
  mockBar: `rounded-t-sm w-full transition-all duration-1000`,
  metricValue: `text-3xl font-black text-white tracking-tight`,
  metricLabel: `text-xs text-slate-400 font-medium uppercase tracking-wider`,
  trendUp: `text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded flex items-center gap-1`,
};
