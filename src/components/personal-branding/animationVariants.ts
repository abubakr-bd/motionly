import type { Variants } from "framer-motion";

// Standardized Motionly Physics (The "Motionly motion language")
export const springs = {
  // Premium, slow entrance with slight overshoot
  premium: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
  // Snappy but smooth hover/micro-interaction
  snappy: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
  // Very subtle floating/idle movement
  float: { type: "spring", stiffness: 40, damping: 15, mass: 1 },
} as const;

// Standard durations
export const durations = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  epic: 2.0
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springs.premium
  }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springs.premium
  }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springs.premium
  }
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)", y: 20 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { duration: durations.slow, ease: [0.16, 1, 0.3, 1] } // Cinematic ease
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springs.premium
  }
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export const orbitalMotion = (radius: number, duration: number, delay: number = 0): Variants => ({
  initial: { rotate: 0, x: radius, y: 0 },
  animate: {
    rotate: 360,
    x: radius,
    y: 0,
    transition: {
      rotate: { duration, ease: "linear", repeat: Infinity, delay },
    }
  }
});

export const svgPathDrawing: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" }
  }
};

// Using simpler physics for reduced motion preference can be handled within components
