import React from "react";
import { theme } from "../theme";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  className = "",
  as: Component = "span" 
}) => {
  return (
    <Component 
      className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 ${className}`}
      style={{ backgroundImage: theme.gradients.primary }}
    >
      {children}
    </Component>
  );
};
