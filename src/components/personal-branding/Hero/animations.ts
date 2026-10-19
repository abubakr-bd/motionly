import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";

export const heroEcosystemContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    }
  }
};

export const floatingNode = (delay: number = 0, yOffset: number = 10): Variants => ({
  hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: { ...springs.premium, delay }
  },
  animate: {
    y: [-yOffset, yOffset, -yOffset],
    transition: {
      duration: 8 + Math.random() * 3,
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay * 0.5,
    }
  }
});

export const profileIdle: Variants = {
  animate: {
    y: [-5, 5, -5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.3, // Keep subtle
    transition: { duration: 2, ease: "easeInOut", delay: 1 }
  }
};
