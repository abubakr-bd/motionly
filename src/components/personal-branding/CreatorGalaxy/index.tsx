import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { CreatorGalaxySettings } from "./types";
import { DEFAULT_GALAXY } from "./types";
import { galaxyStyles as styles } from "./styles";
import { orbitMotion, counterOrbit, pulseRing, linePulse } from "./animations";
import { 
  ArrowRight,
  MonitorPlay,
  Users,
  Share2,
  MessageCircle,
  Play
} from "lucide-react";

interface CreatorGalaxyProps {
  data?: CreatorGalaxySettings;
}

export const CreatorGalaxy: React.FC<CreatorGalaxyProps> = ({ data = DEFAULT_GALAXY }) => {
  return (
    <section className={styles.container}>
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlightedText={data.highlightedTitle}
        description={data.description}
      />

      <div className={styles.galaxyWrapper}>
        
        {/* SVG Energy Pulses between orbits */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          <defs>
            <radialGradient id="glow-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle cx="50%" cy="50%" r="140" stroke="url(#glow-pulse)" strokeWidth="2" fill="none" variants={linePulse} initial="hidden" animate="visible" />
          <motion.circle cx="50%" cy="50%" r="210" stroke="url(#glow-pulse)" strokeWidth="2" fill="none" variants={linePulse} initial="hidden" animate="visible" style={{ animationDelay: '1s' }} />
          <motion.circle cx="50%" cy="50%" r="290" stroke="url(#glow-pulse)" strokeWidth="2" fill="none" variants={linePulse} initial="hidden" animate="visible" style={{ animationDelay: '2s' }} />
        </svg>

        {/* Core (Creator Avatar / YOU) */}
        <div className={styles.core}>
          <span className="text-xl sm:text-2xl font-black text-white z-10">YOU</span>
          <motion.div 
            variants={pulseRing}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-blue-500/20 rounded-full"
          />
        </div>

        {/* Orbit Ring 1 (Fastest, Inner) */}
        <div className={styles.orbitRing1} />
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(20)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(20)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-pink-500/20 hover:border-pink-500/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Visual Growth</div>
            <MessageCircle className="w-5 h-5 text-pink-500" />
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(20, -10)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(20, -10)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-red-500/20 hover:border-red-500/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Long-form Engine</div>
            <Play className="w-5 h-5 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Orbit Ring 2 (Medium) */}
        <div className={styles.orbitRing2} />
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(35, -5)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(35, -5)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-blue-500/20 hover:border-blue-500/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>B2B Authority</div>
            <MonitorPlay className="w-5 h-5 text-blue-500" />
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(35, -17.5)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(35, -17.5)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-sky-400/20 hover:border-sky-400/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Thought Leadership</div>
            <Share2 className="w-5 h-5 text-sky-400" />
          </motion.div>
        </motion.div>

        {/* Orbit Ring 3 (Slowest, Outer) */}
        <div className={styles.orbitRing3} />
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(60, -10, true)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(60, -10, true)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-amber-500/20 hover:border-amber-500/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Owned Audience</div>
            <Users className="w-5 h-5 text-amber-500" />
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(60, -30, true)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(60, -30, true)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-purple-500/20 hover:border-purple-500/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Deep Connections</div>
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.planetContainer}
          variants={orbitMotion(60, -50, true)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={counterOrbit(60, -50, true)} initial="hidden" animate="visible" className={`${styles.planet} hover:bg-teal-400/20 hover:border-teal-400/50`} whileHover={{ scale: 1.2 }}>
            <div className={styles.tooltip}>Global Reach</div>
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
