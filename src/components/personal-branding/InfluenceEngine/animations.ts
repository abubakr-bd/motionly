import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";

export const corePulse: Variants = {
  hidden: { scale: 0.8, opacity: 0, filter: "blur(20px)" },
  visible: { 
    scale: 1, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: "easeOut" }
  },
  animate: {
    boxShadow: [
      "0 0 60px rgba(37,99,235,0.2)",
      "0 0 120px rgba(20,184,166,0.4)",
      "0 0 60px rgba(37,99,235,0.2)"
    ],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const energyStream: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 0.3,
    transition: { duration: 2, ease: "easeInOut" }
  },
  animate: {
    opacity: [0.1, 0.6, 0.1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const nodeEntrance = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      ...springs.premium,
      delay 
    }
  },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4 + Math.random() * 2,
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay % 2
    }
  }
});
