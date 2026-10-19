import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { InfluenceEngineSettings } from "./types";
import { DEFAULT_INFLUENCE_ENGINE } from "./types";
import { engineStyles as styles } from "./styles";
import { corePulse, energyStream, nodeEntrance } from "./animations";
import type { LucideIcon } from "lucide-react";
import { 
  Film, Shield, Users, Share2, 
  Repeat, Award, Briefcase, TrendingUp
} from "lucide-react";

interface InfluenceEngineProps {
  data?: InfluenceEngineSettings;
}

const iconMap: Record<string, LucideIcon> = {
  Film, Shield, Users, Share2,
  Repeat, Award, Briefcase, TrendingUp
};

export const InfluenceEngine: React.FC<InfluenceEngineProps> = ({ data = DEFAULT_INFLUENCE_ENGINE }) => {
  const radius = 300; // Distance of nodes from center

  return (
    <section className={styles.container}>
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlightedText={data.highlightedTitle}
        description={data.description}
      />

      <div className={styles.engineWrapper}>
        
        {/* SVG Connection Lines with Energy Streams */}
        <svg className={styles.svgOverlay} viewBox="-450 -450 900 900">
          <defs>
            <radialGradient id="energy-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          
          {data.nodes.map((node, index) => {
            const angle = (index / data.nodes.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.line 
                key={`line-${node.id}`}
                x1="0" y1="0" x2={x} y2={y}
                stroke="url(#energy-gradient)"
                strokeWidth="2"
                variants={energyStream}
                initial="hidden"
                whileInView={["visible", "animate"]}
                viewport={{ once: true, margin: "-100px" }}
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            );
          })}
        </svg>

        {/* Central Core: INFLUENCE */}
        <motion.div 
          className={styles.core}
          variants={corePulse}
          initial="hidden"
          whileInView={["visible", "animate"]}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-sm tracking-[0.3em] text-blue-400 font-bold uppercase mb-1">The</span>
          <span className="text-2xl md:text-3xl font-black text-white tracking-tight">INFLUENCE</span>
          <span className="text-xs text-teal-400 font-medium mt-2 bg-teal-400/10 px-3 py-1 rounded-full">ENGINE</span>
        </motion.div>

        {/* Orbiting Nodes */}
        {data.nodes.map((node, index) => {
          const Icon = iconMap[node.icon] || Film;
          const angle = (index / data.nodes.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={node.id}
              className={styles.nodeContainer}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              variants={nodeEntrance(index * 0.15)}
              initial="hidden"
              whileInView={["visible", "animate"]}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Icon className="w-6 h-6 text-white group-hover:text-teal-400 transition-colors" />
              
              {/* Insight Tooltip */}
              <div className={styles.tooltip}>
                <h4 className="text-sm font-bold text-white mb-1">{node.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{node.insight}</p>
              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};
