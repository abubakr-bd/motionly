import React from "react";
import { Target, Layers, Sliders, MessageSquare } from "lucide-react";

export const WhyMotionly: React.FC = () => {
  const differentiators = [
    {
      num: "01",
      title: "Strategy before production",
      desc: "We understand the core objective before deciding how something should look.",
      icon: <Target className="w-4 h-4 text-[#4b5565] dark:text-[#a3a9b8]" />,
      detail: "No aesthetic without intention. Every scene, camera move, and graphic serves your core message"
    },
    {
      num: "02",
      title: "Creativity with purpose",
      desc: "We combine storytelling, design, and marketing thinking to create meaningful visual communication.",
      icon: <Layers className="w-4 h-4 text-[#4b5565] dark:text-[#a3a9b8]" />,
      detail: "Engineered for retention, narrative clarity, and customer conversion across all touchpoints"
    },
    {
      num: "03",
      title: "Craft and attention to detail",
      desc: "From pacing and typography to sound design and color, we care about the details that shape the final experience.",
      icon: <Sliders className="w-4 h-4 text-[#4b5565] dark:text-[#a3a9b8]" />,
      detail: "Frame-accurate foley, cinematic color grading, and typography tailored to your exact brand"
    },
    {
      num: "04",
      title: "Collaboration that works",
      desc: "We work closely with our clients, keeping communication clear and the creative process organized.",
      icon: <MessageSquare className="w-4 h-4 text-[#4b5565] dark:text-[#a3a9b8]" />,
      detail: "Direct async channels, sprint velocity, transparent milestones, and zero agency friction"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#2563eb] mb-3">
            The Motionly approach
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
            Creative thinking, deliberate execution
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            Great video is not about visual decoration. It is about making every frame serve the core message
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {differentiators.map((diff) => (
            <div
              key={diff.num}
              className="p-6 sm:p-7 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-medium text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-1 rounded-md tabular-nums">
                    {diff.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#eceff4] dark:bg-[#1a1e28] border border-black/[0.06] dark:border-[#eef0f5]/[0.08] flex items-center justify-center">
                    {diff.icon}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-[#111827] dark:text-[#eef0f5] mb-2">
                  {diff.title}
                </h3>

                <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed mb-4">
                  {diff.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08] text-xs text-[#6b7487] dark:text-[#7a8296]">
                {diff.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMotionly;
