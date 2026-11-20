import React from "react";

export const StudioProcess: React.FC = () => {
  const steps = [
    {
      num: "01",
      name: "Discover",
      title: "Core objectives and narrative foundation",
      desc: "We learn about your business, audience, objectives, and the specific message you want to communicate.",
      visualBadge: "Discovery brief · Audience context",
      deliverable: "Strategic brief, references, and positioning alignment"
    },
    {
      num: "02",
      name: "Strategize",
      title: "Creative concept and production roadmap",
      desc: "We establish the creative direction, messaging architecture, script pacing, and production requirements.",
      visualBadge: "Creative concept · Script document",
      deliverable: "Pacing architecture, hooks, visual script, and moodboard"
    },
    {
      num: "03",
      name: "Create",
      title: "Storyboards and visual direction",
      desc: "Our creative team develops the visual style, styleframes, storyboards, and custom graphic assets.",
      visualBadge: "Styleframes · Kinetic storyboards",
      deliverable: "Full script, kinetic typography tests, and visual assets"
    },
    {
      num: "04",
      name: "Produce",
      title: "Editing, motion, and sound design",
      desc: "We bring the concept to life through editing, animation, motion graphics, color grading, and custom foley.",
      visualBadge: "NLE timeline · 4K 60fps animation",
      deliverable: "V1 review cut on Frame.io, 3D animations, and audio mix"
    },
    {
      num: "05",
      name: "Deliver",
      title: "Platform-ready mastering",
      desc: "We refine, polish, and export final video masters formatted for their intended distribution channels.",
      visualBadge: "ProRes 422 & web deliverables",
      deliverable: "16:9 widescreen, 9:16 vertical cuts, and source project files"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#2563eb] mb-3">
            How we work
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
            Good work does not happen by accident
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            Every successful project starts with understanding the objective and establishing the right creative direction
          </p>
        </div>

        {/* 5 Connected Steps */}
        <div className="space-y-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 sm:p-7 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-medium text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-1 rounded-md tabular-nums">
                      {st.num} {st.name}
                    </span>
                    <span className="text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
                      {st.visualBadge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-[#111827] dark:text-[#eef0f5] pt-0.5">
                    {st.title}
                  </h3>

                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed max-w-2xl">
                    {st.desc}
                  </p>
                </div>

                <div className="lg:col-span-4 p-4 rounded-xl bg-[#eceff4] dark:bg-[#1a1e28] border border-black/[0.06] dark:border-[#eef0f5]/[0.08]">
                  <span className="text-[11px] font-mono text-[#6b7487] dark:text-[#7a8296] block mb-1">
                    Production output
                  </span>
                  <p className="text-xs font-medium text-[#111827] dark:text-[#eef0f5]">
                    {st.deliverable}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioProcess;
