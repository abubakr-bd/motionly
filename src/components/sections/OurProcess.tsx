import React from "react";
import { motion } from "framer-motion";
import { useSiteSettings, DEFAULT_PROCESS } from "../../lib/useSiteData";

const OurProcess = () => {
  const { settings } = useSiteSettings();
  const { title, subtitle, description } = settings.process;
  const cmsSteps = settings.process.steps || [];
  const activeSteps = cmsSteps.length > 0 ? cmsSteps : DEFAULT_PROCESS.steps;

  return (
    <section id="process" className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-4">{subtitle || "Our process"}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title || "Clear thinking. Stronger work."}</h2>
          </div>
          <p className="text-lg text-slate-400 max-w-sm">{description || "A focused creative process built around clear decisions and measurable work."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {activeSteps.map((step, index) => (
            <motion.div 
              key={step.id || `step-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Massive background number */}
              <div className="absolute -top-12 -left-4 text-8xl md:text-9xl font-black text-slate-800/50 select-none z-0 group-hover:text-blue-900/30 transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </div>
              
              <div className="relative z-10 pt-8 border-t border-slate-800 group-hover:border-blue-500 transition-colors duration-500">
                {step.label && <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">{step.label}</p>}
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-100">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
