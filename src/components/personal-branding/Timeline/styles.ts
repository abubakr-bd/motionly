export const timelineStyles = {
  container: `relative min-h-screen py-24 px-6 max-w-7xl mx-auto flex flex-col items-center`,
  
  timelineWrapper: `relative w-full max-w-3xl mt-20 pl-8 md:pl-0`,
  
  // The central vertical glowing line
  lineCore: `absolute top-0 bottom-0 left-8 md:left-1/2 w-0.5 bg-white/10 origin-top`,
  lineGlow: `absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-gradient-to-b from-blue-500 via-teal-400 to-transparent blur-md -ml-[1px] origin-top`,
  
  milestoneContainer: `relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-20 last:mb-0`,
  
  // The dot on the timeline
  milestoneDotContainer: `absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-slate-950 border-2 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.4)] z-20`,
  
  contentCard: `w-full md:w-[42%] pl-12 md:pl-0 pt-2 md:pt-0`,
  contentInner: `p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/[0.07] transition-colors`,
  
  stageBadge: `text-xs font-black uppercase tracking-widest text-teal-400 mb-2 block`,
  title: `text-2xl font-bold text-white mb-3`,
  description: `text-slate-400 leading-relaxed`,
};
