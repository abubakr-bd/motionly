import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";

export const CreativeCapabilities: React.FC = () => {
  return (
    <section 
      id="services" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#2563eb] mb-3">
            Core studio capabilities
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-4">
            From the first idea to the final frame
          </h2>

          <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
            Every project has a different story to tell. We bring together strategy, motion design, and creative direction to make that story resonate
          </p>
        </div>

        {/* 4 Distinct Large Service Panels */}
        <div className="space-y-6 sm:space-y-8">
          {/* SERVICE 01 — SAAS & PRODUCT VIDEOS */}
          <div className="rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-mono text-[#2563eb] mb-2 block">
                    01 Capability · SaaS &amp; product videos
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] dark:text-[#eef0f5] tracking-tight mb-3">
                    Make your product make sense
                  </h3>
                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                    Complex software deserves clear communication. We create SaaS explainers, feature walkthroughs, UI animations, and launch videos that help audiences understand what you build and why it matters.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    "SaaS explainer videos",
                    "Product demo videos",
                    "Feature launch videos",
                    "UI motion design",
                    "2D and 3D animations",
                    "Product marketing cuts"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4b5565] dark:text-[#a3a9b8]">
                      <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#2563eb] text-white text-xs font-medium hover:bg-[#1d4ed8] transition-colors duration-150 active:scale-[0.98]"
                  >
                    <span>Explore product videos</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                  </Link>
                </div>
              </div>

              {/* Project Visual Mockup */}
              <div className="lg:col-span-6 rounded-xl overflow-hidden bg-[#07080d] aspect-video border border-black/[0.08] dark:border-white/[0.08] relative">
                <img
                  src="https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg"
                  alt="SaaS & Product Video Work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#07080d]/40 flex items-end p-5">
                  <div>
                    <span className="text-[11px] font-mono text-[#a3a9b8] block">
                      Case example · Bolto AI
                    </span>
                    <p className="text-sm font-medium text-white">
                      SaaS platform architecture explainer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SERVICE 02 — PERSONAL BRANDING */}
          <div className="rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Preview */}
              <div className="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden bg-[#07080d] aspect-video border border-black/[0.08] dark:border-white/[0.08] relative">
                <img
                  src="/hero-thumb-mobile.webp"
                  alt="Personal Branding System"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hero-thumb.webp";
                  }}
                />
                <div className="absolute inset-0 bg-[#07080d]/40 flex items-end p-5">
                  <div>
                    <span className="text-[11px] font-mono text-[#a3a9b8] block">
                      Ecosystem architecture
                    </span>
                    <p className="text-sm font-medium text-white">
                      Executive positioning and social content sprints
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div>
                  <span className="text-xs font-mono text-[#2563eb] mb-2 block">
                    02 Capability · Personal branding
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] dark:text-[#eef0f5] tracking-tight mb-3">
                    Turn your expertise into authority
                  </h3>
                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                    Your ideas deserve more than occasional posts. We help founders, entrepreneurs, coaches, and creators develop consistent content through creative direction, professional video editing, and clear storytelling.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    "Content direction",
                    "Short-form video editing",
                    "Long-form production",
                    "Motion design accents",
                    "Content repurposing",
                    "Creative packaging"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4b5565] dark:text-[#a3a9b8]">
                      <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/personal-branding"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#2563eb] text-white text-xs font-medium hover:bg-[#1d4ed8] transition-colors duration-150 active:scale-[0.98]"
                  >
                    <span>Explore personal branding</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Row of Two Services: Service 03 & 04 Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* SERVICE 03 — COMMERCIAL & BRAND FILMS */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#2563eb] mb-2 block">
                    03 Capability · Commercial films
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#111827] dark:text-[#eef0f5] tracking-tight mb-2">
                    Give your brand a story worth watching
                  </h3>
                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                    Create stronger connections through memorable visual storytelling. From launch campaigns to brand films, we help businesses communicate value through deliberate creative production.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {[
                    "Brand films and commercials",
                    "Launch video campaigns",
                    "Commercial editing and color",
                    "Paid acquisition creative",
                    "Visual storytelling"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4b5565] dark:text-[#a3a9b8]">
                      <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08]">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors"
                >
                  <span>Explore brand films</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* SERVICE 04 — MOTION DESIGN & CREATIVE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#2563eb] mb-2 block">
                    04 Capability · Motion design
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#111827] dark:text-[#eef0f5] tracking-tight mb-2">
                    Make the ordinary look extraordinary
                  </h3>
                  <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
                    Bring ideas to life through purposeful animation, clean 2D and 3D motion design, and visually disciplined execution that reinforces your product.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {[
                    "2D vector animation",
                    "3D product renders and animation",
                    "Kinetic typography",
                    "Title and identity design",
                    "Visual effects and compositing"
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4b5565] dark:text-[#a3a9b8]">
                      <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08]">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] transition-colors"
                >
                  <span>Explore motion design</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeCapabilities;
