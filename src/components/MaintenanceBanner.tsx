import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useSiteSettings } from "../lib/useSiteData";

const MaintenanceBanner = () => {
  const { settings } = useSiteSettings();
  const [dismissed, setDismissed] = React.useState(false);

  if (!settings.global.maintenanceMode || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -20, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        exit={{ y: -20, opacity: 0, x: "-50%" }}
        className="fixed top-[100px] md:top-[120px] left-1/2 -translate-x-1/2 z-[90] w-[95%] max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-white/10 py-2.5 px-6 rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-[10px] md:text-xs font-medium text-white/90 leading-tight">
            <span className="font-black uppercase tracking-widest text-blue-400 mr-2 border-r border-white/10 pr-2">System Update</span>
            {settings.global.maintenanceMessage}
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default MaintenanceBanner;
