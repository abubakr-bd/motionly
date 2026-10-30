import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCollection, type FAQItem, DEFAULT_FAQS } from "../../lib/useSiteData";

const FAQ = () => {
  const { items: faqs, loading } = useCollection<FAQItem>("faqs", "order", "asc");
  const displayFaqs = faqs.length > 0 ? faqs : (loading ? [] : DEFAULT_FAQS);

  const faqSchema = displayFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayFaqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4"
          >
            Common questions.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto font-normal"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayFaqs.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-slate-50 dark:bg-[#090D1A] border border-slate-200 dark:border-white/10 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400">FAQs are being prepared. Check back soon.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50/80 border border-slate-200/90 hover:border-blue-400/30 rounded-3xl p-6 sm:p-8 shadow-sm dark:bg-[#090D1A]/90 dark:border-white/10 dark:hover:border-blue-500/30 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300"
          >
            <Accordion type="single" collapsible className="w-full divide-y divide-slate-200 dark:divide-white/10">
              {displayFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-none py-1 group/item"
                >
                  <AccordionTrigger className="text-base sm:text-lg font-bold text-slate-900 group-hover/item:text-blue-600 dark:text-white dark:group-hover/item:text-blue-300 hover:no-underline text-left py-5 gap-4 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pb-5 font-normal">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
