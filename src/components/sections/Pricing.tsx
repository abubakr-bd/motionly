import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollection, type PricingPlan, DEFAULT_PRICING_PLANS } from "../../lib/useSiteData";
import { Check, ArrowUpRight } from "lucide-react";

export const Pricing = () => {
  const { items: plans, loading } = useCollection<PricingPlan>("pricing", "order", "asc");

  const displayPlans = plans && plans.length > 0 ? plans : DEFAULT_PRICING_PLANS;

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[140px] -z-10" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
            Pricing &amp; Retainers
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-4">
            Predictable terms. Relentless execution.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Choose a plan that fits your publishing rhythm. Every engagement starts with a clear scope and transparent turnaround.
          </p>
        </div>

        {loading && displayPlans.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {displayPlans.map((plan, index) => {
              const price = plan.price?.trim() || "Custom";
              const numericPrice = Number(price.replace(/,/g, ""));
              const hasNumericPrice = price !== "Custom" && !price.includes("$") && !Number.isNaN(numericPrice);
              const isPopular = Boolean(plan.popular || plan.recommended);

              return (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl backdrop-blur-xl transition-all duration-300 ${
                    isPopular
                      ? "bg-blue-50/70 dark:bg-gradient-to-b dark:from-[#0E1838] dark:to-[#080E21] border-2 border-blue-600 dark:border-blue-500/60 shadow-xl shadow-blue-600/15 dark:shadow-[0_0_60px_rgba(37,99,235,0.35)] scale-[1.02] z-10"
                      : "bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-slate-300 dark:bg-gradient-to-b dark:from-[#0B1021]/90 dark:to-[#060914]/90 dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md shadow-blue-600/40">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <strong className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                          {hasNumericPrice ? "$" : ""}{price}
                        </strong>
                        {hasNumericPrice && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">/ mo</span>}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-8 pt-5 border-t border-slate-200 dark:border-white/10">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
                        What&apos;s included
                      </p>
                      <ul className="space-y-2.5">
                        {plan.features?.map((feature, idx) => (
                          <li key={`${plan.id}-${idx}`} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full py-3.5 rounded-xl text-center text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 ${
                      isPopular
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-white dark:border dark:border-white/10 dark:hover:border-blue-400/40"
                    }`}
                  >
                    <span>{plan.cta || "Get Started"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
