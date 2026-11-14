import React from "react";
import { motion } from "framer-motion";
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
    <section className="py-16 sm:py-24 bg-white dark:bg-[#070B19] text-slate-900 dark:text-white transition-colors duration-300 relative border-t border-slate-200/80 dark:border-white/5">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-2 block">
            Selected Collaborations
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
            Working Alongside Ambitious Teams.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-normal">
            We collaborate with founders, growing businesses, and creative teams to bring ideas to life.
          </p>
        </div>

        {/* Clean, un-distorted logo display */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-18">
          {displayPartners.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300"
            >
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={`${item.name} logo`}
                  className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[180px] object-contain opacity-75 dark:opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to text if missing
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span className="text-base sm:text-lg font-bold tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                  {item.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborations;