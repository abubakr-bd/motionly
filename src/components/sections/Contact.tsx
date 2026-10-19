import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => (
  <section className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 p-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 p-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    
    <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <p 
          className="text-sm font-semibold tracking-widest uppercase mb-6"
          style={{ color: '#93c5fd' }}
        >
          Project inquiries
        </p>
        <h2 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8 !text-white"
          style={{ color: '#ffffff' }}
        >
          Make the next video count.
        </h2>
        <p 
          className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ color: '#e2e8f0' }}
        >
          Tell us what you are building. We will look at your goals and suggest a
          practical way to move the work forward.
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 mb-6"
          style={{ color: '#ffffff' }}
        >
          Talk to the studio
        </Link>
        <span 
          className="text-sm font-medium"
          style={{ color: '#cbd5e1' }}
        >
          Usually replies within 24 hours.
        </span>
      </motion.div>
    </div>
  </section>
);

export default Contact;
