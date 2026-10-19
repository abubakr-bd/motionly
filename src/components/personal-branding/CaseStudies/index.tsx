import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { CaseStudiesSettings } from "./types";
import { DEFAULT_CASE_STUDIES } from "./types";
import { caseStudiesStyles as styles } from "./styles";
import { studyCardEntrance, metricEntrance, storyPhaseEntrance } from "./animations";
import { TrendingUp, Activity, Minus } from "lucide-react";

interface CaseStudiesProps {
  data?: CaseStudiesSettings;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ data = DEFAULT_CASE_STUDIES }) => {
  return (
    <section className={styles.container}>
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlightedText={data.highlightedTitle}
        description={data.description}
      />

      <div className={styles.studiesWrapper}>
        {data.studies.map((study) => (
          <motion.div 
            key={study.id}
            variants={studyCardEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={styles.studyCard}
          >
            {/* Sidebar: Profile & Metrics */}
            <div className={styles.sidebar}>
              
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  {study.avatarUrl ? (
                    <img src={study.avatarUrl} alt={study.clientName} className="w-full h-full object-cover" />
                  ) : (
                    study.clientName.charAt(0)
                  )}
                </div>
                <div className={styles.clientInfo}>
                  <h3 className={styles.clientName}>{study.clientName}</h3>
                  <p className={styles.clientNiche}>{study.niche}</p>
                </div>
              </div>

              <div className={styles.metricsContainer}>
                {study.metrics.map((metric, i) => (
                  <motion.div key={i} variants={metricEntrance} className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {metric.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                      {metric.trend === 'down' && <Activity className="w-5 h-5 text-rose-400" />}
                      {metric.trend === 'neutral' && <Minus className="w-5 h-5 text-slate-400" />}
                      {metric.value}
                    </div>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </motion.div>
                ))}
              </div>
              
            </div>

            {/* Storyboard: The Transformation */}
            <div className={styles.storyboard}>
              
              <motion.div variants={storyPhaseEntrance} className={styles.storySection}>
                <div className={styles.storyPhase}>Before</div>
                <div className={styles.storyContent}>{study.before}</div>
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className="hidden md:flex justify-start ml-24 py-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-transparent" />
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className={styles.storySection}>
                <div className={styles.storyPhase}>Strategy</div>
                <div className={styles.storyContent}>{study.strategy}</div>
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className="hidden md:flex justify-start ml-24 py-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-transparent" />
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className={styles.storySection}>
                <div className={styles.storyPhase}>Execution</div>
                <div className={styles.storyContent}>{study.execution}</div>
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className="hidden md:flex justify-start ml-24 py-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-teal-500/50" />
              </motion.div>

              <motion.div variants={storyPhaseEntrance} className={styles.storySection}>
                <div className={`${styles.storyPhase} text-teal-400`}>Results</div>
                <div className={`${styles.storyContent} border-teal-500/20 bg-teal-500/5 shadow-[0_0_30px_rgba(20,184,166,0.05)]`}>
                  <span className={styles.storyHighlight}>{study.results}</span>
                </div>
              </motion.div>

            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};
