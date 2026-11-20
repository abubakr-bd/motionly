import React from "react";
import { usePartners } from "../../lib/useSiteData";
import { Sparkles } from "lucide-react";

export const Collaborations: React.FC = () => {
  const { partners } = usePartners();

  const displayPartners = partners.length > 0 ? partners : [
    { id: "1", name: "EquiSaaS BD", logoUrl: "/partners/equisaas-bd.png" },
    { id: "2", name: "Samner BD", logoUrl: "/partners/samner-bd.png" },
    { id: "3", name: "Graduation Gate", logoUrl: "/partners/graduation-gate.png" },
    { id: "4", name: "Varnox", logoUrl: "/partners/varnox.png" },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header: User Section 3 Exact Copy */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] font-mono text-[11px] uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRUSTED BY AMBITIOUS TEAMS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
            Working alongside creators, startups, and growing brands.
          </h2>
        </div>

        {/* Dynamic Partner Logo Display with Reactive Hover Illumination */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
          {displayPartners.map((item, index) => (
            <div
              key={item.id || index}
              className="h-24 rounded-2xl bg-slate-50 dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] p-5 flex items-center justify-center group hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={`${item.name} logo`}
                  className="h-9 sm:h-10 w-auto max-w-[140px] object-contain opacity-60 dark:opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
