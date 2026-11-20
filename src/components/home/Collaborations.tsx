import React from "react";
import { usePartners } from "../../lib/useSiteData";

export const Collaborations: React.FC = () => {
  const { partners } = usePartners();

  const displayPartners = partners.length > 0 ? partners : [
    { id: "1", name: "EquiSaaS BD", logoUrl: "/partners/equisaas-bd.png" },
    { id: "2", name: "Samner BD", logoUrl: "/partners/samner-bd.png" },
    { id: "3", name: "Graduation Gate", logoUrl: "/partners/graduation-gate.png" },
    { id: "4", name: "Varnox", logoUrl: "/partners/varnox.png" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="font-mono text-xs text-[#2563eb] mb-2">
            Selected collaborations
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#111827] dark:text-[#eef0f5] tracking-tight mb-2">
            Working alongside ambitious teams
          </h2>
          <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8]">
            We collaborate with founders, product companies, and growing businesses to turn ideas into video assets
          </p>
        </div>

        {/* Clean, calibrated logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          {displayPartners.map((item, index) => (
            <div
              key={item.id || index}
              className="h-20 rounded-xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.06] dark:border-[#eef0f5]/[0.08] p-4 flex items-center justify-center group"
            >
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={`${item.name} logo`}
                  className="h-8 sm:h-9 w-auto max-w-[130px] object-contain opacity-70 dark:opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-150"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xs font-mono text-[#4b5565] dark:text-[#a3a9b8]">
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
