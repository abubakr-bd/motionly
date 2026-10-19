import React from "react";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { theme } from "../theme";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  glowColor?: "blue" | "teal";
}

export const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  variant = "primary", 
  glowColor = "blue",
  className = "",
  ...props 
}) => {
  const isPrimary = variant === "primary";
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wide rounded-full overflow-hidden transition-all duration-300 active:scale-95 ${
        isPrimary 
          ? "text-white bg-blue-600 hover:bg-blue-500" 
          : "text-white bg-white/5 border border-white/10 hover:bg-white/10"
      } ${className}`}
      style={{
        boxShadow: isPrimary 
          ? (glowColor === "teal" ? theme.shadows.glowTeal : theme.shadows.glowBlue) 
          : "none"
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Magnetic/Ripple hover effect overlay can be added here if needed */}
    </motion.button>
  );
};
