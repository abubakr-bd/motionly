export const galaxyStyles = {
  container: `relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 bg-gradient-to-b from-transparent to-slate-950`,
  
  galaxyWrapper: `relative w-full max-w-[800px] aspect-square flex items-center justify-center mt-12 mb-8`,
  
  core: `relative z-30 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.6)] backdrop-blur-md overflow-hidden`,
  
  orbitRing1: `absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] border border-blue-500/20 rounded-full`,
  orbitRing2: `absolute w-[420px] h-[420px] sm:w-[550px] sm:h-[550px] border border-teal-500/20 rounded-full`,
  orbitRing3: `absolute w-[580px] h-[580px] sm:w-[750px] sm:h-[750px] border border-indigo-500/10 rounded-full`,
  
  planetContainer: `absolute inset-0 z-20`,
  planet: `absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer transition-colors duration-300 group`,
  
  tooltip: `absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`,
};
