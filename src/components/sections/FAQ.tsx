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
    <section id="faq" className="py-24 md:py-32 bg-slate-50 border-t border-slate-100">
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Common questions.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-md mx-auto"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayFaqs.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <p className="text-slate-400">FAQs are being prepared. Check back soon.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl ring-1 ring-slate-100"
          >
            <Accordion type="single" collapsible className="w-full divide-y divide-slate-100">
              {displayFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-none"
                >
                  <AccordionTrigger className="text-lg font-bold text-slate-900 hover:text-blue-600 hover:no-underline text-left py-6 gap-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6">
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
