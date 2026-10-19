import React, { useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, MonitorPlay, Users, MessageCircle, TrendingUp, BarChart3 } from "lucide-react";
import type { HeroSettings } from "./types";
import { DEFAULT_HERO } from "./types";
import { heroStyles as styles } from "./styles";
import { floatingNode, heroEcosystemContainer, lineDraw, profileIdle } from "./animations";
import { fadeUp } from "../animationVariants";
import { GlowButton } from "../ui/GlowButton";

interface HeroProps {
  data?: HeroSettings;
}

export const Hero: React.FC<HeroProps> = ({ data = DEFAULT_HERO }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className={styles.container} 
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Cursor Lighting */}
      <div 
        className="absolute z-10 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
        }}
      />
      
      {/* Background Ambient Glow & Mesh Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-600/20 to-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className={styles.contentWrapper}>
        
        {/* Main Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <div className={styles.badge}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {data.badge}
          </div>
          
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              {data.headlineLine1}
              <br />
              <span className={styles.titleHighlight}>{data.headlineLine2}</span>
            </h1>
          </div>
          
          <p className={styles.subtitle}>
            {data.subheadlineLine1} <br className="hidden sm:block" /> {data.subheadlineLine2}
          </p>
          
          <div className={styles.ctaGroup}>
            <Link to={data.primaryCtaLink}>
              <GlowButton variant="primary" glowColor="blue">
                {data.primaryCtaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlowButton>
            </Link>
            
            <Link to={data.secondaryCtaLink}>
              <GlowButton variant="secondary">
                <Play className="w-4 h-4 mr-2" />
                {data.secondaryCtaText}
              </GlowButton>
            </Link>
          </div>
        </motion.div>

        {/* Holographic Ecosystem Visualization */}
        <motion.div 
          variants={heroEcosystemContainer}
          initial="hidden"
          animate="visible"
          className={styles.ecosystemContainer}
        >
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <motion.path 
              d="M 50% 50% L 20% 25%" 
              stroke="url(#blue-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            <motion.path 
              d="M 50% 50% L 80% 25%" 
              stroke="url(#teal-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            <motion.path 
              d="M 50% 50% L 15% 75%" 
              stroke="url(#blue-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            <motion.path 
              d="M 50% 50% L 85% 75%" 
              stroke="url(#teal-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            <motion.path 
              d="M 50% 50% L 50% 10%" 
              stroke="url(#blue-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            <motion.path 
              d="M 50% 50% L 50% 90%" 
              stroke="url(#teal-gradient)" strokeWidth="2" fill="none"
              variants={lineDraw}
            />
            
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Avatar / 'YOU' */}
          <motion.div 
            className={styles.centerAvatar}
            initial={{ scale: 0, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div variants={profileIdle} animate="animate" className="w-full h-full">
              {data.avatarUrl ? (
                <img src={data.avatarUrl} alt="Creator" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner">
                  YOU
                </div>
              )}
            </motion.div>
            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          </motion.div>

          {/* Floating Nodes - Adding whileInView for sequential entrances */}
          <motion.div variants={floatingNode(1.0, 10)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2`}>
            <MessageCircle className="w-5 h-5 text-pink-500" />
            <span className="text-[10px] font-bold text-slate-300">Instagram</span>
          </motion.div>

          <motion.div variants={floatingNode(1.3, 12)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2`}>
            <Play className="w-5 h-5 text-red-500" />
            <span className="text-[10px] font-bold text-slate-300">YouTube</span>
          </motion.div>
          
          <motion.div variants={floatingNode(1.6, 8)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2`}>
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-bold text-slate-300">Community</span>
          </motion.div>

          <motion.div variants={floatingNode(1.9, 15)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[80%] left-[15%] -translate-x-1/2 -translate-y-1/2`}>
            <MonitorPlay className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-bold text-slate-300">LinkedIn</span>
          </motion.div>

          <motion.div variants={floatingNode(2.2, 10)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2`}>
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-[10px] font-bold text-slate-300">Revenue</span>
          </motion.div>
          
          <motion.div variants={floatingNode(2.5, 12)} initial="hidden" whileInView={["visible", "animate"]} viewport={{ once: true }} className={`${styles.orbitNode} top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2`}>
            <BarChart3 className="w-5 h-5 text-teal-400" />
            <span className="text-[10px] font-bold text-slate-300">Analytics</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
