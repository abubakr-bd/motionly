export const caseStudiesStyles = {
  container: `relative py-32 bg-slate-950 overflow-hidden flex flex-col items-center border-t border-white/5`,
  
  studiesWrapper: `relative w-full max-w-6xl mx-auto px-6 mt-16 flex flex-col gap-12 lg:gap-24`,
  
  studyCard: `w-full bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col xl:flex-row gap-10 xl:gap-16 items-start backdrop-blur-xl`,
  
  // Left column: Profile and Metrics
  sidebar: `w-full xl:w-1/3 flex flex-col gap-8 shrink-0`,
  
  profileHeader: `flex items-center gap-4`,
  avatar: `w-16 h-16 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-lg overflow-hidden`,
  clientInfo: `flex flex-col`,
  clientName: `text-xl font-bold text-white`,
  clientNiche: `text-sm text-blue-400 font-medium`,
  
  metricsContainer: `grid grid-cols-2 xl:grid-cols-1 gap-4`,
  metricCard: `bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col`,
  metricValue: `text-3xl font-black text-white tracking-tight flex items-center gap-2`,
  metricLabel: `text-xs text-slate-400 font-medium uppercase tracking-wider mt-1`,
  
  // Right column: Transformation Story
  storyboard: `w-full xl:w-2/3 flex flex-col gap-6 md:gap-8`,
  
  storySection: `flex flex-col md:flex-row gap-4 md:gap-6 group`,
  storyPhase: `w-24 shrink-0 text-xs font-black uppercase tracking-widest text-slate-500 pt-1 group-hover:text-teal-400 transition-colors`,
  storyContent: `flex-1 text-slate-300 leading-relaxed bg-white/[0.02] border border-white/[0.03] p-5 rounded-xl group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all`,
  storyHighlight: `text-white font-medium`,
};
