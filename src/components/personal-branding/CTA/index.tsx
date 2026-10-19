import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CTASettings } from "./types";
import { DEFAULT_CTA } from "./types";
import { ctaStyles as styles } from "./styles";
import { cinematicReveal } from "./animations";
import { ArrowRight } from "lucide-react";
import { GlowButton } from "../ui/GlowButton";

interface CTAProps {
  data?: CTASettings;
}

export const CTA: React.FC<CTAProps> = ({ data = DEFAULT_CTA }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section className={styles.container}>
      {/* Dynamic Background */}
      <motion.div className={styles.backgroundGlow} style={{ scale, opacity }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />

      <motion.div 
        className={styles.contentWrapper}
        variants={cinematicReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {data.title}
            <span className={styles.titleHighlight}>{data.highlightedTitle}</span>
          </h2>
        </div>

        <p className={styles.description}>
          {data.description}
        </p>

        <div className={styles.buttonContainer}>
          <GlowButton className="px-12 py-6 text-xl">
            {data.buttonText}
            <ArrowRight className="w-6 h-6 ml-2" />
          </GlowButton>
        </div>
      </motion.div>
    </section>
  );
};
