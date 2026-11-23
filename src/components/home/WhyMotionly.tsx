import React from "react";
import { Check, X, Sparkles, Video, Users2, Building2 } from "lucide-react";

export const WhyMotionly: React.FC = () => {
  return (
    <section 
      id="comparison"
      className="py-20 sm:py-28 bg-[#070b14] text-white border-b border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#315EFA]/10 rounded-full blur-[140px] -z-10" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header (Directly inspired by Image 2) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#38bdf8] mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider font-bold">Why Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            Motionly&apos;s Alternative? <br />
            <span className="font-serif italic font-normal text-[#38bdf8]">
              Think One More Time!
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            See how our dedicated video production and motion design model stacks up against slow traditional agencies and expensive full-time hiring.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[760px] space-y-4">
            
            {/* Table Header Row */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-mono uppercase tracking-wider text-slate-400">
              <div className="col-span-5">Model / Platform</div>
              <div className="col-span-1 text-center">Speed</div>
              <div className="col-span-1 text-center">Flexibility</div>
              <div className="col-span-1 text-center">Quality</div>
              <div className="col-span-2 text-center">Scalability</div>
              <div className="col-span-2 text-center">Predictable Cost</div>
            </div>

            {/* Row 1: MOTIONLY (Highlighted Elevated Bento Row) */}
            <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0f172a] via-[#151f38] to-[#0f172a] border-2 border-[#315EFA]/60 shadow-[0_0_40px_rgba(49,94,250,0.25)]">
              <div className="grid grid-cols-12 gap-4 items-center">
                
                {/* Platform Name & Description */}
                <div className="col-span-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#315EFA] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Motionly Studio</span>
                      <span className="text-[10px] uppercase font-mono font-bold bg-[#38bdf8]/20 text-[#38bdf8] px-2 py-0.5 rounded-full border border-[#38bdf8]/30">
                        Recommended
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Expert-driven team committed to top-tier quality. Get effective results &amp; full creative squad without hiring in-house employees.
                    </p>
                  </div>
                </div>

                {/* Speed: Check */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Flexibility: Check */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Quality: Check */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Scalability: Check */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Predictable Cost: Check */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

              </div>
            </div>

            {/* Row 2: In-House Team */}
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                
                <div className="col-span-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                    <Users2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      In-House Video Editor
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      A full-time hire requires benefits, recruitment overhead, and carries a single narrow skill set with limited bandwidth.
                    </p>
                  </div>
                </div>

                {/* Speed: Cross */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Flexibility: Cross */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Quality: Check */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Scalability: Cross */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Predictable Cost: Cross */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

              </div>
            </div>

            {/* Row 3: Traditional Creative Agencies */}
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                
                <div className="col-span-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Traditional Creative Agencies
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Agencies offer heavy management layers but charge bloated retainers with 6–8 week delivery cycles and junior staff execution.
                    </p>
                  </div>
                </div>

                {/* Speed: Cross */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Flexibility: Cross */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Quality: Check */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Scalability: Check */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Predictable Cost: Cross */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyMotionly;
