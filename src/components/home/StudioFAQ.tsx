import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      "Yes. Our creative collaboration process can accommodate remote clients and international projects across North America, Europe, Asia, and globally.",
  },
  {
    question: "Can I hire Motionly for a single project?",
    answer:
      "Absolutely. We offer project-based collaborations as well as ongoing creative partnerships depending on your timeline and production cadence.",
  },
  {
    question: "Do you provide custom packages?",
    answer:
      "Yes. We define project scope and deliverables according to your specific requirements, timeline, and distribution channels.",
  },
  {
    question: "How do I get started?",
    answer:
      "Tell us about your project through our inquiry form. Our team will review your requirements and discuss the appropriate next steps.",
  },
];

export const StudioFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50 dark:bg-[#0b0f19] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Context & Support (Sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                GOOD TO KNOW
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                A Few Things You Might{" "}
                <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
                  Be Wondering.
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Everything you need to know about working with Motionly, our production model, deliverables, and how we collaborate.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Have a specific question not listed here?
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Our creative directors are happy to talk through your scope, format ideas, or timeline requirements.
                </p>
                <div className="mt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Talk to our team directly</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? "bg-white dark:bg-slate-900/90 border-blue-500/40 dark:border-blue-500/40 shadow-sm"
                        : "bg-white/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left p-6 sm:p-7 gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                    >
                      <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
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
