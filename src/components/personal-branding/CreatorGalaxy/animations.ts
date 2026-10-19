import type { Variants } from "framer-motion";
import { durations } from "../animationVariants";

export const pulseRing: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: [0.8, 1.2, 0.8],
    opacity: [0, 0.5, 0],
    transition: { 
      duration: durations.epic, 
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

export const orbitMotion = (duration: number, delay: number = 0, reverse: boolean = false): Variants => ({
  hidden: { rotate: 0 },
  visible: {
    rotate: reverse ? -360 : 360,
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      delay
    }
  }
});

// Used to keep the icon upright while the parent rotates
export const counterOrbit = (duration: number, delay: number = 0, reverse: boolean = false): Variants => ({
  hidden: { rotate: 0 },
  visible: {
    rotate: reverse ? 360 : -360,
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      delay
    }
  }
});

export const linePulse: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: [0, 0.5, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1
    }
  }
};
