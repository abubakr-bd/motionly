export const pricingStyles = {
  container: `relative py-32 bg-slate-950 overflow-hidden flex flex-col items-center border-t border-white/5`,
  
  gridWrapper: `relative w-full max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`,
  
  pricingCard: `relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group`,
  popularCard: `border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.1)] bg-blue-500/[0.02]`,
  
  popularBadge: `absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-lg`,
  
  cardHeader: `mb-8`,
  modelName: `text-xl font-bold text-white mb-2`,
  modelDesc: `text-sm text-slate-400 h-10 line-clamp-2`,
  
  price: `text-4xl font-black text-white tracking-tight mb-2`,
  idealFor: `text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1.5 rounded-md inline-block mb-8`,
  
  featuresList: `flex flex-col gap-4 flex-1 mb-8`,
  featureItem: `flex items-start gap-3 text-sm text-slate-300`,
  
  ctaWrapper: `mt-auto pt-8 border-t border-white/5`,
};
