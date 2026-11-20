import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const FinalStudioCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#07080d] text-[#eef0f5] border-t border-[#eef0f5]/[0.08] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Main Editorial Text Column (7 Cols) */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="font-mono text-xs text-[#2563eb] mb-3">
              Have something in mind?
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#eef0f5] leading-[1.08] mb-5">
              Let&apos;s make something worth remembering
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#a3a9b8] max-w-xl leading-relaxed mb-8">
              Have a product to launch, a story to tell, or an idea that needs the right creative direction? We would love to hear about it
            </p>

            {/* CTAs: 44px Height, 8px Radius, Sentence Case */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors duration-150 active:scale-[0.98]"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>

              <a
                href="mailto:hello@motionly.media"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#11141c] hover:bg-[#1a1e28] text-[#eef0f5] text-sm font-medium border border-[#eef0f5]/[0.08] transition-colors duration-150 active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-[#7a8296]" />
                <span>Talk to our team</span>
              </a>
            </div>

            {/* Status & Contact Meta */}
            <div className="mt-10 pt-6 border-t border-[#eef0f5]/[0.08] flex flex-wrap items-center gap-5 text-xs font-mono text-[#7a8296]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
                <span className="text-[#a3a9b8]">Currently booking select projects</span>
              </div>
              <span>•</span>
              <div>
                Direct: <span className="text-[#eef0f5]">hello@motionly.media</span>
              </div>
            </div>
          </div>

          {/* Real Studio Material (5 Cols - Offset Preview Card) */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden border border-[#eef0f5]/[0.08] hover:border-[#2563eb]/40 bg-[#11141c] shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07080d]">
                <img
                  src="https://img.youtube.com/vi/KDK1jHJXPrk/maxresdefault.jpg"
                  alt="Motionly studio reel preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#07080d]/35" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#07080d]/80 text-[#eef0f5] border border-white/[0.08]">
                    Studio reel
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[#a3a9b8] bg-[#07080d]/80 border border-white/[0.08]">
                    4K UHD
                  </span>
                </div>
              </div>

              {/* Studio Info Card */}
              <div className="p-6 bg-[#11141c]">
                <div className="flex items-center justify-between text-xs text-[#7a8296] mb-2 font-mono">
                  <span>Creative video studio</span>
                  <span>Global delivery</span>
                </div>
                <p className="text-sm font-medium text-[#eef0f5]">
                  End-to-end creative direction · 3D motion · Commercial storytelling
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-[#7a8296] pt-3 border-t border-[#eef0f5]/[0.08]">
                  <span>Average kickoff: &lt; 5 business days</span>
                  <Link
                    to="/contact"
                    className="text-[#2563eb] hover:text-[#60a5fa] font-medium inline-flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalStudioCTA;
