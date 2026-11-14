import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PLANS_CONTENT } from "./content";
import { Check, ArrowUpRight, Sparkles, ShieldAlert, Layers } from "lucide-react";

export const PBPartnershipPlans: React.FC = () => {
  return (
    <section 
      id="pricing" 
      className="py-20 sm:py-28 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5">
            <span>{PLANS_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Find the Right Way <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
              to Work Together.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {PLANS_CONTENT.description}
          </p>
        </div>

        {/* 3 Clean Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch mb-12">
          {PLANS_CONTENT.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative p-7 sm:p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#0E1838] to-[#080E21] border-2 border-blue-500/60 shadow-2xl shadow-blue-600/20 scale-[1.02] z-10"
                  : "bg-gradient-to-b from-[#0E152E]/80 to-[#070B19]/90 border border-white/10 hover:border-blue-500/30 shadow-lg"
              }`}
            >
              {/* Subtle Most Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                  {plan.badge || "MOST POPULAR"}
                </span>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium mb-4">
                    {plan.tagline}
                  </p>

                  <div className="mb-3">
                    <strong className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {plan.priceTag}
                    </strong>
                    <p className="text-xs text-slate-400 mt-1">
                      {plan.priceSubtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {plan.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-5 border-t border-white/10 mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-3.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Potential Deliverables</span>
                  </p>
                  <ul className="space-y-2.5">
                    {plan.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/contact"
                className={`w-full py-3.5 rounded-xl text-center text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30"
                    : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-blue-400/40"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing Strategy Explanation Note */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            {PLANS_CONTENT.pricingNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PBPartnershipPlans;