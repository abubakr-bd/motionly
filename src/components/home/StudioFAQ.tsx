import React, { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We collaborate with SaaS companies, startups, founders, creators, and established businesses looking for professional video and creative production.",
  },
  {
    question: "What services does Motionly provide?",
    answer:
      "Our services include SaaS and product videos, motion graphics, personal branding content, commercial videos, and creative production.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. Our creative collaboration process accommodates remote clients and international projects across North America, Europe, Asia, and globally.",
  },
  {
    question: "Can I hire Motionly for a single project?",
    answer:
      "Yes. We offer project-based collaborations for specific launches as well as ongoing monthly creative partnerships.",
  },
  {
    question: "Do you provide custom packages?",
    answer:
      "Yes. We define project scope, deliverables, format variations, and sprint timelines according to your specific requirements.",
  },
  {
    question: "How do I get started?",
    answer:
      "Tell us about your project through our inquiry form. Our team will review your requirements and follow up with recommended next steps.",
  },
];

export const StudioFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section 
      id="faq" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Context & Support (Sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="font-mono text-xs text-[#2563eb] mb-3">
                Good to know
              </div>

              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
                A few things you might be wondering
              </h2>

              <p className="text-base text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-8">
                Everything you need to know about working with Motionly, our production model, deliverables, and collaboration process
              </p>

              <div className="p-6 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs">
                <h3 className="text-sm font-medium text-[#111827] dark:text-[#eef0f5] mb-1.5">
                  Have a specific scope in mind?
                </h3>
                <p className="text-xs text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-4">
                  Our creative directors are happy to talk through your deliverables, format ideas, or timeline requirements directly.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors"
                >
                  <span>Talk to our team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-xl border transition-colors duration-150 ${
                      isOpen
                        ? "bg-[#ffffff] dark:bg-[#11141c] border-black/[0.1] dark:border-[#eef0f5]/[0.12] shadow-xs"
                        : "bg-[#ffffff]/70 dark:bg-[#11141c]/60 border-black/[0.06] dark:border-[#eef0f5]/[0.08] hover:border-black/[0.1] dark:hover:border-[#eef0f5]/[0.12]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-medium text-[#111827] dark:text-[#eef0f5]">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-150 ${
                          isOpen
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#eceff4] dark:bg-[#1a1e28] text-[#4b5565] dark:text-[#a3a9b8]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                            <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] pt-4 font-normal">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioFAQ;
