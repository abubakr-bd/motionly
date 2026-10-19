import type { Variants } from "framer-motion";

export const timelineLine: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { 
    scaleY: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export const milestoneVariants: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};
