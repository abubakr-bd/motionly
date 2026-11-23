import React from "react";
import { usePartners, useCollection, type TestimonialItem, DEFAULT_TESTIMONIALS } from "../../lib/useSiteData";
import { Star, Quote } from "lucide-react";

export const TrustAndProof: React.FC = () => {
  const { partners } = usePartners();
  const { items: fetchedTestimonials } = useCollection<TestimonialItem>("testimonials");
  
  const testimonials = fetchedTestimonials && fetchedTestimonials.length > 0 
    ? fetchedTestimonials.slice(0, 3) 
    : DEFAULT_TESTIMONIALS.slice(0, 3);

  const displayPartners = partners.length > 0 ? partners : [
    { id: "1", name: "EquiSaaS BD", logoUrl: "/partners/equisaas-bd.png" },
    { id: "2", name: "Samner BD", logoUrl: "/partners/samner-bd.png" },
    { id: "3", name: "Graduation Gate", logoUrl: "/partners/graduation-gate.png" },
    { id: "4", name: "Varnox", logoUrl: "/partners/varnox.png" },
  ];

  return (
    <section 
      id="proof" 
      className="py-24 sm:py-32 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315EFA] block mb-3">
            Trust &amp; Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.08] mb-4">
            Trusted by founders, creators, and teams.
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed font-normal">
            Real feedback from companies and leaders who rely on Motionly for high-standard creative video execution.
          </p>
        </div>

        {/* 01. Client & Partner Logos */}
        <div className="mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] block mb-6">
            Selected Collaborations &amp; Partners:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {displayPartners.map((item, index) => (
              <div
                key={item.id || index}
                className="h-20 sm:h-24 rounded-2xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] p-5 flex items-center justify-center group hover:border-[#315EFA]/40 transition-all duration-300"
              >
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={`${item.name} logo`}
                    className="h-8 sm:h-9 w-auto max-w-[130px] object-contain opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-xs font-mono font-medium text-[#6b7487] dark:text-[#7a8296] group-hover:text-[#315EFA]">
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 02. Real Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl sm:rounded-3xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#315EFA] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-base text-[#111827] dark:text-[#eef0f5] leading-relaxed mb-6 font-medium">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                <h4 className="text-sm font-semibold text-[#111827] dark:text-[#eef0f5]">
                  {test.name}
                </h4>
                <p className="text-xs text-[#6b7487] dark:text-[#7a8296] font-mono mt-0.5">
                  {test.role}{test.company ? `, ${test.company}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 03. Production Metrics & Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-[#f8f9fa] dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08]">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
              50+
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Video assets produced
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#315EFA] block mb-1">
              4.9 / 5
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Average client rating
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
              &lt; 5 Days
            </span>
            <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              Average project kickoff
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#eef0f5] block mb-1">
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
