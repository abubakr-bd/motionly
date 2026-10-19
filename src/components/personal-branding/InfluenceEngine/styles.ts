export const engineStyles = {
  container: `relative min-h-[120vh] flex flex-col items-center py-32 bg-slate-950 overflow-hidden`,
  
  engineWrapper: `relative w-full max-w-[900px] h-[800px] mt-24 mx-auto flex items-center justify-center`,
  
  core: `relative z-30 w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-950 border-2 border-blue-500/50 flex flex-col items-center justify-center shadow-[0_0_100px_rgba(37,99,235,0.4)] backdrop-blur-xl`,
  
  nodeContainer: `absolute w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 rounded-full bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl cursor-pointer transition-colors duration-500 group hover:border-teal-400 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] z-20`,
  
  tooltip: `absolute top-[110%] left-1/2 -translate-x-1/2 w-48 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 text-center`,
  
  svgOverlay: `absolute inset-0 w-full h-full pointer-events-none z-10`,
};
