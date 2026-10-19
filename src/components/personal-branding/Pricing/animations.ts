import type { Variants } from "framer-motion";
import { springs } from "../animationVariants";

export const pricingCardEntrance: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.premium
  }
};
