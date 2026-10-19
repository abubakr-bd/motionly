
export const heroStyles = {
  container: `relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-32`,
  contentWrapper: `relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center`,
  
  // The subtle glowing background mesh effect
  bgMesh: `absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60`,
  
  badge: `inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 bg-white/5 border-white/10 text-xs font-bold tracking-widest uppercase text-blue-400 backdrop-blur-md`,
  
  titleContainer: `max-w-5xl mx-auto mb-8`,
  title: `text-5xl sm:text-6xl lg:text-[7rem] font-black text-white tracking-tighter leading-[1.05]`,
  titleHighlight: `text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400`,
  
  subtitle: `text-lg sm:text-xl lg:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10`,
  
  ctaGroup: `flex flex-col sm:flex-row items-center gap-4 sm:gap-6`,
  
  // Ecosystem Nodes
  ecosystemContainer: `relative w-full max-w-4xl mx-auto mt-20 h-[400px] lg:h-[500px] flex items-center justify-center pointer-events-none`,
  centerAvatar: `relative z-20 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-white/20 p-1 bg-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.4)]`,
  orbitNode: `absolute z-10 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center gap-2 shadow-2xl`,
};
