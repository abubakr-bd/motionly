import type { Variants } from "framer-motion";

export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 100, filter: "blur(20px)", scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Custom cinematic ease out
    }
  }
};
