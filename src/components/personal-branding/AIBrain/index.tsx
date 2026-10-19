import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { AIBrainSettings } from "./types";
import { DEFAULT_BRAIN } from "./types";
import { brainStyles as styles } from "./styles";
import { brainPulse, cardFloat } from "./animations";
import { Zap, Lightbulb, FileText, Layout, TrendingUp } from "lucide-react";

interface AIBrainProps {
  data?: AIBrainSettings;
}

const icons = [Lightbulb, FileText, Layout, TrendingUp, Zap];

export const AIBrain: React.FC<AIBrainProps> = ({ data = DEFAULT_BRAIN }) => {
  return (
    <section className="relative w-full border-t border-white/5 bg-slate-950 overflow-hidden">
      <div className={styles.container}>
        
        <div className={styles.textColumn}>
          <SectionHeading
            badge={data.badge}
            title={data.title}
            highlightedText={data.highlightedTitle}
            description={data.description}
            align="left"
          />
        </div>

        <div className={styles.visualColumn}>
          {/* Central Glowing Brain Effect */}
          <motion.div 
            variants={brainPulse}
            initial="hidden"
            animate="visible"
            className={styles.brainCore} 
          />
          
          {/* Abstract SVG Neural Network */}
          <svg className={styles.brainMesh} viewBox="0 0 400 400">
            <motion.path 
              d="M200 50 Q350 150 200 350 Q50 150 200 50" 
              fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              transition={{ duration: 2 }}
            />
            <motion.path 
              d="M100 150 L300 250 M100 250 L300 150 M200 50 L200 350 M50 200 L350 200" 
              fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </svg>

          {/* Floating Generated Cards */}
          <div className={styles.cardsContainer}>
            {data.cards.map((card, index) => {
              const Icon = icons[index % icons.length];
              // Distribute cards evenly in a circle around the brain
              const angle = (index / data.cards.length) * Math.PI * 2;
              
              return (
                <motion.div
                  key={index}
                  variants={cardFloat(0.5 + (index * 0.3), angle)}
                  initial="hidden"
                  whileInView={["visible", "animate"]}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`${styles.contentCard} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-bold text-white whitespace-nowrap">{card}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
