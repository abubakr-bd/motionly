import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { PricingSettings } from "./types";
import { DEFAULT_PRICING } from "./types";
import { pricingStyles as styles } from "./styles";
import { pricingCardEntrance } from "./animations";
import { Check, ArrowRight } from "lucide-react";

interface PricingProps {
  data?: PricingSettings;
}

export const Pricing: React.FC<PricingProps> = ({ data = DEFAULT_PRICING }) => {
  return (
    <section className={styles.container}>
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlightedText={data.highlightedTitle}
        description={data.description}
      />

      <div className={styles.gridWrapper}>
        {data.models.map((model, index) => (
          <motion.div
            key={model.id}
            variants={pricingCardEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className={`${styles.pricingCard} ${model.isPopular ? styles.popularCard : ''}`}
          >
            {model.isPopular && (
              <div className={styles.popularBadge}>Most Common</div>
            )}

            <div className={styles.cardHeader}>
              <h3 className={styles.modelName}>{model.name}</h3>
              <p className={styles.modelDesc}>{model.description}</p>
            </div>

            <div className={styles.price}>{model.price}</div>
            <div className={styles.idealFor}>{model.idealFor}</div>

            <ul className={styles.featuresList}>
              {model.features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className={styles.ctaWrapper}>
              <button className="w-full py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2 group">
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
