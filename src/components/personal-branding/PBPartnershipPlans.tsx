import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PLANS_CONTENT } from "./content";
import { Check, ArrowUpRight, Layers } from "lucide-react";

export const PBPartnershipPlans: React.FC = () => {
  return (
    <section 
      id="pricing" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3.5">
            <span>{PLANS_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-5 leading-tight">
            Find the Right Way <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
              to Work Together.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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
              className={`relative p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-sm ${
                plan.popular
                  ? "bg-white dark:bg-[#0c101d] border-2 border-[#2563EB] dark:border-[#38BDF8] shadow-lg scale-[1.02] z-10"
                  : "bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#2563EB] text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-md">
                  {plan.badge || "RECOMMENDED"}
                </span>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#2563EB] dark:text-[#38BDF8] font-semibold mb-4">
                    {plan.tagline}
                  </p>

                  <div className="mb-3">
                    <strong className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                      {plan.priceTag}
                    </strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      {plan.priceSubtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {plan.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-5 border-t border-black/[0.06] dark:border-white/[0.08] mb-8">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                    <span>Included Scope</span>
                  </p>
                  <ul className="space-y-2.5">
                    {plan.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/contact"
                className={`w-full py-3.5 rounded-xl text-center text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-[#2563EB] hover:bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 border border-black/[0.08] dark:border-white/[0.08]"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing Strategy Explanation Note */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
            {PLANS_CONTENT.pricingNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PBPartnershipPlans;
