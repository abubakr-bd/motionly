import React from "react";
import { Check } from "lucide-react";

export const WhoWeWorkWith: React.FC = () => {
  const audiences = [
    {
      category: "Tech & SaaS",
      headline: "For software companies, startups, and product teams",
      desc: "Communicate complex platforms, technical breakthroughs, and core workflows through clear visual walkthroughs.",
      deliverables: ["Product launch explainers", "UI motion graphics", "Feature release cuts", "Product Hunt launch kits"],
      imagePreview: "https://img.youtube.com/vi/pIEkY7YDIF0/maxresdefault.jpg",
      tag: "SaaS systems"
    },
    {
      category: "Founders & creators",
      headline: "For leaders building their personal brand",
      desc: "Share your expertise, company journey, and industry perspectives without sacrificing days each week to manual editing.",
      deliverables: ["Executive video sprints", "Podcast & interview cuts", "Short-form social clips", "Thumbnail packaging"],
      imagePreview: "/hero-thumb.webp",
      tag: "Founder media"
    },
    {
      category: "Businesses & brands",
      headline: "For growing companies and commercial brands",
      desc: "Elevate your market presence with polished commercial editing, brand films, and high-retention advertising assets.",
      deliverables: ["Paid social video ads", "Cinematic brand films", "Commercial post-production", "Multi-platform exports"],
      imagePreview: "https://img.youtube.com/vi/xygb6y5L9x8/maxresdefault.jpg",
      tag: "Commercials"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#2563eb] mb-3">
            Who we work with
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
            Different industries, different stories, one creative partner
          </h2>
          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            We adapt our production model and creative language to the specific demands of your sector and audience
          </p>
        </div>

        {/* 3 Audience Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {audiences.map((aud) => (
            <div
              key={aud.category}
              className="p-6 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#07080d] border border-black/[0.08] dark:border-white/[0.08] mb-5">
                  <img
                    src={aud.imagePreview}
                    alt={aud.category}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#07080d]/80 text-[10px] font-mono text-[#a3a9b8] border border-white/[0.08]">
                    {aud.tag}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#2563eb] mb-1.5 block">
                  {aud.category}
                </span>

                <h3 className="text-lg font-medium text-[#111827] dark:text-[#eef0f5] mb-2 leading-snug">
                  {aud.headline}
                </h3>

                <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-6">
                  {aud.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] space-y-2">
                {aud.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#4b5565] dark:text-[#a3a9b8]">
                    <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
