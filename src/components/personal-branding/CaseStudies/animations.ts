import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";
export const studyCardEntrance: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springs.premium,
      staggerChildren: 0.2
    }
  }
};

export const metricEntrance: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: springs.premium
  }
};

export const storyPhaseEntrance: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.premium
  }
};
