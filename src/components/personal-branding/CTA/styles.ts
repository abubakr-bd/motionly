export const ctaStyles = {
  container: `relative min-h-[80vh] flex flex-col items-center justify-center py-32 bg-slate-950 overflow-hidden`,
  
  contentWrapper: `relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center`,
  
  titleContainer: `mb-10 max-w-3xl`,
  title: `text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter leading-[0.9]`,
  titleHighlight: `text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-teal-200 block mt-2`,
  
  description: `text-xl md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed mb-16`,
  
  buttonContainer: `relative group`,
  
  backgroundGlow: `absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`,
};
