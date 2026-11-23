import React from "react";
import { usePartners } from "../../lib/useSiteData";

export const ClientMarquee: React.FC = () => {
  const { partners } = usePartners();

  const basePartners = partners.length > 0 ? partners : [
    { id: "1", name: "EquiSaaS BD", logoUrl: "/partners/equisaas-bd.png" },
    { id: "2", name: "Samner BD", logoUrl: "/partners/samner-bd.png" },
    { id: "3", name: "Graduation Gate", logoUrl: "/partners/graduation-gate.png" },
    { id: "4", name: "Varnox", logoUrl: "/partners/varnox.png" },
    { id: "5", name: "CloudScale", logoUrl: "/partners/equisaas-bd.png" },
    { id: "6", name: "Nexus Media", logoUrl: "/partners/samner-bd.png" },
  ];

  // Quadruple array to create seamless infinite CSS marquee
  const marqueeList = [...basePartners, ...basePartners, ...basePartners, ...basePartners];

  return (
    <section className="py-12 sm:py-16 bg-[#070b14] border-b border-white/[0.08] overflow-hidden text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Trusted by founders, scale-ups, and international brands
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex items-center gap-10 sm:gap-16 w-max animate-marquee-clockwise hover:[animation-play-state:paused]">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center justify-center shrink-0 h-14 px-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-200 group"
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-7 sm:h-8 w-auto max-w-[130px] object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
