import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import type { DashboardSettings } from "./types";
import { DEFAULT_DASHBOARD } from "./types";
import { dashboardStyles as styles } from "./styles";
import { windowReveal, widgetReveal, chartBarReveal } from "./animations";
import { 
  BarChart3, PlaySquare, Calendar, 
  DollarSign, TrendingUp, CheckCircle2
} from "lucide-react";

interface DashboardProps {
  data?: DashboardSettings;
}

export const Dashboard: React.FC<DashboardProps> = ({ data = DEFAULT_DASHBOARD }) => {
  return (
    <section className={styles.container}>
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlightedText={data.highlightedTitle}
        description={data.description}
      />

      <div className={styles.dashboardWrapper}>
        <motion.div 
          variants={windowReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.appWindow}
          style={{ transformOrigin: "bottom center" }}
        >
          {/* Title Bar */}
          <div className={styles.titleBar}>
            <div className={styles.windowControls}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <div className="ml-auto mr-auto px-4 py-1 rounded-md bg-white/5 text-[10px] font-medium text-slate-400 tracking-wider">
              CLIENT PORTAL - MOTIONLY.MEDIA
            </div>
          </div>

          <div className={styles.appGrid}>
            
            {/* Main Chart Widget */}
            <motion.div variants={widgetReveal} className={`${styles.widgetBase} ${styles.mainChartWidget}`}>
              <div className={styles.widgetHeader}>
                <h3 className={styles.widgetTitle}><BarChart3 className="w-4 h-4 text-blue-400" /> Audience Growth</h3>
                <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Last 30 Days</span>
              </div>
              
              <div className="flex items-end gap-2 h-48 mt-auto pt-8 border-b border-white/10">
                {[40, 55, 45, 60, 80, 70, 95, 85, 110, 130, 120, 160].map((height, i) => (
                  <div key={i} className="flex-1 flex items-end justify-center h-full group relative">
                    <motion.div 
                      variants={chartBarReveal(i * 0.05 + 0.5)}
                      className={`${styles.mockBar} bg-gradient-to-t from-blue-600/50 to-teal-400/80 group-hover:from-blue-500 group-hover:to-teal-300 origin-bottom`}
                      style={{ height: `${(height / 160) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metrics Widget */}
            <motion.div variants={widgetReveal} className={`${styles.widgetBase} ${styles.metricsWidget}`}>
              <div className={styles.widgetHeader}>
                <h3 className={styles.widgetTitle}><PlaySquare className="w-4 h-4 text-rose-400" /> Watch Time</h3>
              </div>
              <div className="mt-4 flex flex-col gap-6">
                <div>
                  <div className={styles.metricValue}>2.4M<span className="text-lg text-slate-500 font-medium"> hrs</span></div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={styles.metricLabel}>Total Watch Time</span>
                    <span className={styles.trendUp}><TrendingUp className="w-3 h-3" /> +14%</span>
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <div className={styles.metricValue}>68%</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={styles.metricLabel}>Avg. Retention (60s)</span>
                    <span className={styles.trendUp}><TrendingUp className="w-3 h-3" /> +5%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Publishing Queue */}
            <motion.div variants={widgetReveal} className={`${styles.widgetBase} ${styles.queueWidget}`}>
              <div className={styles.widgetHeader}>
                <h3 className={styles.widgetTitle}><Calendar className="w-4 h-4 text-purple-400" /> Publishing Queue</h3>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { status: "Ready", title: "The Secret to Hooks", date: "Today, 10:00 AM" },
                  { status: "Editing", title: "How I Built This", date: "Tomorrow, 2:00 PM" },
                  { status: "Scripting", title: "My Top 5 Tools", date: "Friday, 9:00 AM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-4 h-4 ${item.status === 'Ready' ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{item.title}</span>
                        <span className="text-xs text-slate-400">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div variants={widgetReveal} className={`${styles.widgetBase} ${styles.aiWidget}`}>
              <div className={styles.widgetHeader}>
                <h3 className={styles.widgetTitle}>AI Insights</h3>
              </div>
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 mt-2">
                <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
                  Hooks starting with a negative framing (e.g. "Stop doing X") are currently retaining 22% better than positive framing for your audience.
                </p>
                <button className="mt-3 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wide">
                  Generate Script &rarr;
                </button>
              </div>
            </motion.div>

            {/* Revenue Attribution */}
            <motion.div variants={widgetReveal} className={`${styles.widgetBase} ${styles.revenueWidget}`}>
              <div className={styles.widgetHeader}>
                <h3 className={styles.widgetTitle}><DollarSign className="w-4 h-4 text-emerald-400" /> Lead Pipeline</h3>
              </div>
              <div className="flex flex-col justify-center h-full pb-4">
                <div className="flex items-end gap-3 mb-2">
                  <div className="text-4xl font-black text-white tracking-tight">$84.5k</div>
                  <div className="text-sm text-emerald-400 font-medium mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +32%
                  </div>
                </div>
                <span className={styles.metricLabel}>Estimated Pipeline from Content (30d)</span>
                
                <div className="mt-6 flex gap-1 h-2 rounded-full overflow-hidden">
                  <div className="w-[60%] bg-blue-500" title="YouTube: 60%" />
                  <div className="w-[25%] bg-teal-400" title="LinkedIn: 25%" />
                  <div className="w-[15%] bg-purple-500" title="Instagram: 15%" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium px-1">
                  <span>YouTube</span>
                  <span>LinkedIn</span>
                  <span>Insta</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
