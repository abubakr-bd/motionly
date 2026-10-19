export const brainStyles = {
  container: `relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 py-24 max-w-7xl mx-auto gap-16`,
  
  textColumn: `w-full lg:w-1/2 flex flex-col items-start text-left z-10`,
  
  visualColumn: `w-full lg:w-1/2 relative h-[500px] flex items-center justify-center pointer-events-none`,
  
  brainCore: `absolute z-0 w-64 h-64 rounded-full bg-teal-500/30 mix-blend-screen`,
  brainMesh: `absolute inset-0 z-10 w-full h-full text-blue-500/40`,
  
  cardsContainer: `absolute inset-0 pointer-events-none z-30`,
  contentCard: `absolute flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl shadow-lg backdrop-blur-xl`,
};
