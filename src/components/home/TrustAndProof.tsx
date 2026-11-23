import React, { useState } from "react";
import { useCollection, type TestimonialItem, DEFAULT_TESTIMONIALS } from "../../lib/useSiteData";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TrustAndProof: React.FC = () => {
  const { items: fetchedTestimonials } = useCollection<TestimonialItem>("testimonials");
  const testimonials = fetchedTestimonials && fetchedTestimonials.length > 0 
    ? fetchedTestimonials 
    : DEFAULT_TESTIMONIALS;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || DEFAULT_TESTIMONIALS[0];

  return (
    <section 
      id="testimonials" 
      className="py-20 sm:py-28 bg-[#f8f9fa] dark:bg-[#090b11] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-2.5">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-3">
              Trusted by Ambitious <br />
              <span className="font-serif italic font-normal text-[#315EFA]">
                Founders &amp; Product Teams.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
              Real feedback from companies that rely on Motionly for high-standard creative video execution.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-[#111827] dark:text-white shadow-xs hover:border-[#315EFA] transition-colors duration-150 active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-[#111827] dark:text-white shadow-xs hover:border-[#315EFA] transition-colors duration-150 active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Slider Card (Design Monks Style) */}
        <div className="rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/10 p-8 sm:p-12 shadow-lg mb-12 sm:mb-16 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
          <Quote className="w-16 h-16 text-[#315EFA]/10 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col justify-between h-full relative z-10"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-mono font-bold text-[#315EFA] ml-2">Verified Client</span>
                </div>

                {/* Quote Content */}
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#111827] dark:text-[#eef0f5] leading-snug mb-8 max-w-4xl tracking-tight">
                  &ldquo;{current.content}&rdquo;
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#315EFA]/10 text-[#315EFA] flex items-center justify-center font-bold text-sm">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#111827] dark:text-[#eef0f5]">
                      {current.name}
                    </h4>
                    <p className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                      {current.role}{current.company ? `, ${current.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                  0{currentIndex + 1} / 0{testimonials.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Production Metrics & Facts Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
          <div>
            <span className="text-2xl sm:text-4xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
              50+
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Video assets produced
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-4xl font-bold text-[#315EFA] block mb-1">
              4.9 / 5
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Average client rating
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-4xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
              &lt; 48h
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Sprint turnaround SLA
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-4xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
              100%
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Full commercial IP rights
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndProof;
