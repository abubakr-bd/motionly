import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";

export const brainPulse: Variants = {
  hidden: { opacity: 0.5, filter: "blur(20px)" },
  visible: { 
    opacity: [0.5, 1, 0.5],
    filter: ["blur(20px)", "blur(10px)", "blur(20px)"],
    transition: { 
      duration: 4, 
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const cardFloat = (delay: number, angle: number): Variants => {
  // Calculate a distance based on the angle to create a natural spread
  const distance = 120 + (Math.random() * 40);
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return {
    hidden: { opacity: 0, x: 0, y: 0, scale: 0.2, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x, 
      y, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        ...springs.premium,
        delay
      }
    },
    animate: {
      y: [y - 5, y + 5, y - 5],
      transition: {
        duration: 4 + Math.random() * 2,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay % 2
      }
    }
  };
};
