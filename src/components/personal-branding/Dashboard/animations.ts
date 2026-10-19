import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";
export const windowReveal: Variants = {
  hidden: { opacity: 0, y: 100, rotateX: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      ...springs.premium,
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const widgetReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.premium
  }
};

export const chartBarReveal = (delay: number): Variants => ({
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      delay
    }
  }
});
