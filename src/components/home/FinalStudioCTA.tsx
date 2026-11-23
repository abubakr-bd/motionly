import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

export const FinalStudioCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#090b11] text-[#eef0f5] border-t border-white/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#315EFA] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#315EFA]" />
            <span className="uppercase tracking-wider">Start a Collaboration</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08] mb-6">
            Let&apos;s make something <br />
            <span className="font-serif italic font-normal text-[#315EFA]">
              worth remembering.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#a3a9b8] leading-relaxed mb-10 max-w-2xl font-normal">
            Have an idea, a campaign or a story worth telling? Let&apos;s bring it to life.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#315EFA] hover:bg-[#254cd4] text-white text-sm font-semibold shadow-lg shadow-[#315EFA]/30 active:scale-[0.97] transition-all duration-150 group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="mailto:hello@motionly.media"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm font-medium border border-white/[0.1] active:scale-[0.97] transition-all duration-150 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#a3a9b8]" />
              <span>hello@motionly.media</span>
            </a>
          </div>

          {/* Availability Status */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-mono text-[#7a8296]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="text-[#cbd5e1]">Currently booking select projects</span>
            </div>
            <span>&bull;</span>
            <div>
              Direct founder review on all inquiries
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalStudioCTA;
