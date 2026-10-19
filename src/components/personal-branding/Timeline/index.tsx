import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { TimelineSettings } from "./types";
import { DEFAULT_TIMELINE } from "./types";
import type { LucideIcon } from "lucide-react";
import { Target, TrendingUp, Magnet, Crown } from "lucide-react";

interface TimelineProps {
  data?: TimelineSettings;
}

const iconMap: Record<string, LucideIcon> = {
  Target,
  TrendingUp,
  Magnet,
  Crown
};

export const Timeline: React.FC<TimelineProps> = ({ data = DEFAULT_TIMELINE }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="relative w-full border-t border-white/5 bg-slate-950 h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-6 max-w-7xl mx-auto">
        <div className="-translate-y-20 mb-10 w-full flex justify-center">
          <SectionHeading
            badge={data.badge}
            title={data.title}
            highlightedText={data.highlightedTitle}
            description={data.description}
          />
        </div>

        <div className="relative w-full max-w-3xl flex items-center justify-center h-64">
          
          {/* Progress Bar */}
          <div className="absolute top-0 w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {data.milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon] || Target;

              // Render conditionally based on scroll position using a custom component hook or just rely on motion
              // Since we can't easily map scrollYProgress to conditionally mount/unmount in JSX without local state sync,
              // we will use opacity transforms for each milestone layered on top of each other.
              return (
                <MilestoneCard 
                  key={milestone.id}
                  milestone={milestone}
                  Icon={Icon}
                  index={index}
                  total={data.milestones.length}
                  progress={scrollYProgress}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface MilestoneCardProps {
  milestone: any;
  Icon: LucideIcon;
  index: number;
  total: number;
  progress: any;
}

// Extracted component to handle the specific useTransform logic per milestone
const MilestoneCard = ({ milestone, Icon, index, total, progress }: MilestoneCardProps) => {
  const range = 1 / total;
  const start = index * range;
  const peak = start + (range / 2);
  const end = (index + 1) * range;
  
  // Fade in, peak, fade out
  const opacity = useTransform(progress, 
    [start - 0.1, peak, end + 0.1], 
    [0, 1, 0]
  );
  
  const scale = useTransform(progress,
    [start, peak, end],
    [0.8, 1, 1.1]
  );
  
  const y = useTransform(progress,
    [start, peak, end],
    [50, 0, -50]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center text-center mt-12 pointer-events-none"
      style={{ opacity, scale, y }}
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.3)]">
        <Icon className="w-8 h-8 text-teal-400" />
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3 block">{milestone.stage}</span>
      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">{milestone.title}</h3>
      <p className="text-lg text-slate-400 max-w-lg mx-auto">{milestone.description}</p>
    </motion.div>
  );
};
