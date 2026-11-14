import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollection, type PricingPlan, DEFAULT_PRICING_PLANS } from "../../lib/useSiteData";
import { 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Video, 
  MessageSquare,
  Clock,
  Layers
} from "lucide-react";

export const Pricing = () => {
  const { items: plans, loading } = useCollection<PricingPlan>("pricing", "order", "asc");

  const displayPlans = plans && plans.length > 0 ? plans : DEFAULT_PRICING_PLANS;

  // Format price display and cadence cleanly
  const formatPrice = (rawPrice?: string) => {
    if (!rawPrice) {
      return { primary: "Custom Scope", suffix: "Tailored to your sprint volume" };
    }
    const trimmed = rawPrice.trim();
    if (trimmed.toLowerCase() === "custom") {
      return { primary: "Custom Scope", suffix: "Tailored to your sprint volume" };
    }
    // Has currency symbol or suffix already
    const hasCurrency = /[$€£]|usd/i.test(trimmed);
    const numericOnly = trimmed.replace(/[^0-9.]/g, "");
    if (numericOnly && !hasCurrency) {
      return { primary: `$${trimmed}`, suffix: "/ month" };
    }
    const isMonthly = /month|mo/i.test(trimmed);
    return { 
      primary: trimmed, 
      suffix: isMonthly ? "" : "/ month" 
    };
  };

  const getFeaturesList = (plan: PricingPlan): string[] => {
    if (Array.isArray(plan.features)) {
      return plan.features.filter(Boolean);
    }
    if (typeof plan.features === "string") {
      return (plan.features as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  return (
    <section 
      id="pricing" 
      className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Luminous Radial Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-blue-500/8 dark:bg-blue-600/15 rounded-full blur-[140px] -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-10 right-1/4 w-[420px] h-[320px] bg-indigo-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] -z-10" 
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-3.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>Pricing &amp; Retainers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-4">
            Flexible partnerships. Consistent creative execution.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            From high-growth SaaS and tech scale-ups to category-defining brands, we structure transparent, sprint-based partnerships tailored to your deliverable volume and turnaround needs.
          </p>
        </div>

        {loading && displayPlans.length === 0 ? (
          <div className="flex justify-center py-24">
            <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayPlans.length === 1 ? (
          /* ============================================================== */
          /* FLAGSHIP SINGLE PLAN LAYOUT (Executive Bento Showcase)         */
          /* ============================================================== */
          (() => {
            const plan = displayPlans[0];
            const priceData = formatPrice(plan.price);
            const features = getFeaturesList(plan);

            return (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-10 lg:p-12 bg-white/95 dark:bg-gradient-to-b dark:from-[#0E152E]/95 dark:to-[#070B18]/95 border-2 border-blue-600/30 dark:border-blue-500/40 shadow-2xl shadow-blue-600/10 dark:shadow-[0_0_80px_-15px_rgba(37,99,235,0.3)] backdrop-blur-xl">
                  {/* Floating Pill Badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/35 border border-white/20">
                      <Sparkles className="w-3 h-3 text-cyan-200" />
                      <span>{plan.popular ? "Most Popular Partnership" : "Dedicated Retainer Model"}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-3">
                    {/* Left Column: Plan Details, Pricing & Primary CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="mb-6">
                          <p className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-1.5">
                            Tailored Engagement
                          </p>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                            {plan.name}
                          </h3>
                          <div className="mb-4">
                            <strong className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                              {priceData.primary}
                            </strong>
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                              {priceData.suffix}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {plan.description}
                          </p>
                        </div>

                        {/* Agency Core Highlights */}
                        <div className="space-y-3 pt-5 border-t border-slate-200/90 dark:border-white/10 mb-8">
                          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <div className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                              <Zap className="w-3.5 h-3.5" />
                            </div>
                            <span>Rapid 24-48h sprint velocity on active video requests</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                              <Video className="w-3.5 h-3.5" />
                            </div>
                            <span>Dedicated senior video editor &amp; motion graphics lead</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                              <Shield className="w-3.5 h-3.5" />
                            </div>
                            <span>100% commercial IP &amp; full open project files ownership</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <div className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </div>
                            <span>Direct Slack Connect channel &amp; Frame.io workspace</span>
                          </div>
                        </div>
                      </div>

                      {/* Call to Action Button */}
                      <div>
                        <Link
                          to="/contact"
                          className="w-full py-4 px-6 rounded-2xl text-center text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] border border-blue-400/30 group"
                        >
                          <span>{plan.cta || "Let's Discuss Your Project"}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-3">
                          ⚡ Quick onboarding in 24h • No long-term lock-in • Pause or adjust anytime
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Included Deliverables & Features Grid */}
                    <div className="lg:col-span-7 bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                              Included Scope &amp; Capabilities
                            </h4>
                          </div>
                          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                            {features.length} Core Deliverables
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
                          {features.map((feature, idx) => (
                            <div
                              key={`${plan.id}-feat-${idx}`}
                              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all flex items-start gap-3 shadow-xs hover:shadow-sm"
                            >
                              <div className="w-5 h-5 rounded-md bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </div>
                              <span className="text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-200 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Capabilities pill tags at footer */}
                      <div className="pt-5 border-t border-slate-200 dark:border-white/10">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                          Deliverable Formats Covered:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "SaaS & Product Explainers",
                            "3D & 2D Motion Graphics",
                            "Viral Shorts & Reels",
                            "High-Converting Ad Creatives",
                            "Brand Storytelling",
                            "Frame.io Review Workflow"
                          ].map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()
        ) : (
          /* ============================================================== */
          /* MULTI-PLAN BALANCED GRID (2, 3, or 4+ plans)                   */
          /* ============================================================== */
          (() => {
            const gridClass =
              displayPlans.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : displayPlans.length === 3
                  ? "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto";

            return (
              <div className={`grid ${gridClass} gap-6 sm:gap-8 items-stretch`}>
                {displayPlans.map((plan, index) => {
                  const priceData = formatPrice(plan.price);
                  const isPopular = Boolean(plan.popular || plan.recommended);
                  const features = getFeaturesList(plan);

                  return (
                    <motion.article
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 ${
                        isPopular
                          ? "bg-blue-50/80 dark:bg-gradient-to-b dark:from-[#0E1838] dark:to-[#080E21] border-2 border-blue-600 dark:border-blue-500/60 shadow-xl shadow-blue-600/15 dark:shadow-[0_0_60px_rgba(37,99,235,0.35)] scale-[1.02] z-10"
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
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline gap-1.5 mb-3">
                            <strong className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                              {priceData.primary}
                            </strong>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {priceData.suffix}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {plan.description}
                          </p>
                        </div>

                        <div className="mb-8 pt-5 border-t border-slate-200 dark:border-white/10">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3.5">
                            What&apos;s included
                          </p>
                          <ul className="space-y-3">
                            {features.map((feature, idx) => (
                              <li
                                key={`${plan.id}-${idx}`}
                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-medium"
                              >
                                <div className="w-4 h-4 rounded-md bg-blue-600/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </div>
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
            );
          })()
        )}

        {/* ============================================================== */}
        {/* PARTNERSHIP VALUE PROPOSITIONS & REASSURANCE STRIP             */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-24 pt-12 border-t border-slate-200/90 dark:border-white/10"
        >
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
              Engineered for velocity, consistency, and zero overhead
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Why tech scale-ups and high-growth brands choose our dedicated partnership model over traditional agencies or random freelancers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3.5">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
                Predictable Sprints
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Transparent flat monthly retainers with reliable 24-48h sprint delivery. No hidden hourly fees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3.5">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
                Dedicated Creative Lead
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Your assigned senior editor and motion designer stay on your account, ensuring institutional knowledge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
                Full IP &amp; Source Files
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                You retain 100% intellectual property rights, open After Effects projects, project assets, and rendered masters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3.5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
                Direct Slack Connect
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                No clunky support tickets. Chat with your creative team in private Slack and review on Frame.io.
              </p>
            </div>
          </div>

          {/* Quick Custom Scope Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/25 border border-blue-200/80 dark:border-blue-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-slate-950 dark:text-white">
                Looking for a standalone commercial, 3D teaser, or single product launch video?
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                We also execute one-off creative sprints with dedicated delivery schedules.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20 active:scale-95"
            >
              <span>Book Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;