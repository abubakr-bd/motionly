import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollection, type PricingPlan } from "../../lib/useSiteData";

const Pricing = () => {
  const { items: plans, loading } = useCollection<PricingPlan>("pricing", "order", "asc");

  return (
    <section id="pricing" className="py-24 md:py-32 bg-slate-50 border-t border-slate-100">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Good work starts with clear terms.</h2>
          <p className="text-lg text-slate-500">Choose a plan that fits your publishing rhythm. Every engagement starts with a clear scope.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="mb-4">Pricing is being updated.</p>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Request a custom quote &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => {
              const price = plan.price?.trim() || "Custom";
              const numericPrice = Number(price.replace(/,/g, ""));
              const hasNumericPrice = price !== "Custom" && !price.includes("$") && !Number.isNaN(numericPrice);

              return (
                <motion.article 
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col p-8 md:p-10 rounded-3xl bg-white shadow-xl ${
                    plan.popular ? "ring-2 ring-blue-600 scale-100 md:scale-105 z-10" : "ring-1 ring-slate-100"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                      Recommended
                    </span>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <strong className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        {hasNumericPrice ? "$" : ""}{price}
                      </strong>
                      {hasNumericPrice && <span className="text-sm font-medium text-slate-500">/ mo</span>}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex-1 mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 pb-4 border-b border-slate-100">Plan includes</p>
                    <ul className="space-y-4">
                      {plan.features?.map((feature, idx) => (
                        <li key={`${plan.id}-${idx}`} className="flex items-start gap-3 text-sm text-slate-600">
                          <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    to="/contact" 
                    className={`w-full py-4 rounded-full text-center font-medium transition-colors ${
                      plan.popular 
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20" 
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    {plan.cta || "Discuss this plan"}
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
