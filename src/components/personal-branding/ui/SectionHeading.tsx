import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animationVariants";
import { GradientText } from "./GradientText";

interface SectionHeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  highlightedText?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightedText,
  description,
  align = "center",
  className = ""
}) => {
  const alignClass = 
    align === "center" ? "items-center text-center mx-auto" : 
    align === "right" ? "items-end text-right ml-auto" : 
    "items-start text-left mr-auto";

  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col gap-6 max-w-3xl ${alignClass} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {badge}
        </div>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
        {title}
        {highlightedText && (
          <>
            <br />
            <GradientText>{highlightedText}</GradientText>
          </>
        )}
      </h2>
      
      {description && (
        <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
