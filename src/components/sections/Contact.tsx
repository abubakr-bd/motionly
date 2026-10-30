import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Clock } from "lucide-react";

export const Contact = () => (
  <section className="py-24 sm:py-32 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 dark:from-[#05070F] dark:via-[#080E21] dark:to-[#05070F] text-white relative overflow-hidden transition-colors duration-300">
    {/* Deep Ambient Glows */}
    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/10 dark:bg-blue-600/20 rounded-full blur-[140px] -z-10" />

    <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/15 dark:bg-white/[0.04] border border-white/20 dark:border-white/10 text-white dark:text-blue-400 mb-6 backdrop-blur-md">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Project Inquiries</span>
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
          Make the next video count.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-blue-100 dark:text-slate-300 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-normal">
          Tell us what you are building. We will analyze your goals, outline high-retention hooks, and map out a practical timeline.
        </p>

        <Link
          to="/contact"
          className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase bg-white text-slate-950 hover:bg-slate-100 dark:hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-black/20 dark:shadow-[0_0_35px_rgba(255,255,255,0.25)] mb-4 cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-600/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          <span className="relative z-10">Talk to the studio</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-200 dark:text-slate-400">
          <Clock className="w-4 h-4 text-white dark:text-blue-400" />
          <span>Usually replies within 24 hours. No obligation.</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
