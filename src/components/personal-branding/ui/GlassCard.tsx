import React from "react";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { fadeUp } from "../animationVariants";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hoverEffect = true,
  ...props 
}) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
      className={`relative bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[2rem] p-8 md:p-12 overflow-hidden backdrop-blur-xl transition-all duration-300 ${
        hoverEffect ? "hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/20" : ""
      } ${className}`}
      {...props}
    >
      {/* Subtle top reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {children}
    </motion.div>
  );
};
