import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { ArrowUpRight, Mail, Calendar, Clock, Video, ShieldCheck, Check, Copy } from "lucide-react";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";

const Cal = lazy(() => import("@calcom/embed-react"));

export const FinalStudioCTA: React.FC = () => {
  const { settings } = useSiteSettings();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const contact = settings.contact;

  const rawCal = contact.calLink || contact.calendlyUrl || "motionly-media-rdgfxc/30min";
  const calLink = rawCal.trim().replace(/^https?:\/\/cal\.com\//i, "").replace(/^https?:\/\/calendly\.com\//i, "") || "motionly-media-rdgfxc/30min";
  const calNamespace = contact.calNamespace || "30min";
  const email = contact.email || "hello@motionly.media";

  const [copied, setCopied] = useState(false);
  const [shouldLoadCal, setShouldLoadCal] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoadCal) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCal(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (calendarRef.current) {
      observer.observe(calendarRef.current);
    }
    return () => observer.disconnect();
  }, [shouldLoadCal]);

  useEffect(() => {
    if (!shouldLoadCal) return;
    (async function initCal() {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi({ namespace: calNamespace });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: isDark ? "dark" : "light",
          styles: {
            branding: {
              brandColor: "#315EFA",
            },
          },
        });
      } catch (err) {
        console.warn("Cal.com embed initialized via fallback:", err);
      }
    })();
  }, [shouldLoadCal, calNamespace, isDark]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-[#090b11] text-[#eef0f5] border-t border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Value Proposition & Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#315EFA] mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-wider">Start a Collaboration</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.08] mb-5">
                Let&apos;s make something <br />
                <span className="font-serif italic font-normal text-[#38d9d9]">
                  worth remembering.
                </span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#a3a9b8] leading-relaxed mb-8 font-normal">
                Have an idea, a campaign, or a story worth telling? Select a time slot directly on our live calendar to map out your next high-converting video.
              </p>

              {/* Session Perks Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#38d9d9] shrink-0" />
                  <div className="text-xs">
                    <span className="font-semibold block text-white">30 Minutes</span>
                    <span className="text-[11px] text-[#7a8296]">Focused &amp; strategic</span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                  <Video className="w-4 h-4 text-[#38d9d9] shrink-0" />
                  <div className="text-xs">
                    <span className="font-semibold block text-white">Google Meet</span>
                    <span className="text-[11px] text-[#7a8296]">Instant calendar invite</span>
                  </div>
                </div>
              </div>

              {/* Direct Email Action Box */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-[#315EFA]/15 text-[#38d9d9] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7a8296] block">
                      Direct Studio Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-[#38d9d9] truncate block transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 active:scale-95"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#a3a9b8]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability Status */}
            <div className="pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#7a8296]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span className="text-[#cbd5e1]">Currently booking select projects</span>
              </div>
              <span className="hidden sm:inline">&bull;</span>
              <div className="w-full sm:w-auto">Direct founder review on all inquiries</div>
            </div>
          </div>

          {/* Right Column: Live Cal.com Calendar Card */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0c101d] border border-white/[0.1] shadow-2xl p-2.5 sm:p-5 overflow-hidden">
              
              {/* Header within Card Frame */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08] px-2 sm:px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    Live Booking Calendar
                  </span>
                </div>

                <a
                  href={`https://cal.com/${calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#38d9d9] hover:underline transition-colors"
                >
                  <span>Open in new tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Cal.com React Component */}
              <div className="w-full min-h-[580px] rounded-2xl overflow-hidden bg-transparent">
                <Cal
                  namespace={calNamespace}
                  calLink={calLink}
                  style={{ width: "100%", height: "100%", minHeight: "580px", overflow: "hidden" }}
                  config={{
                    layout: "month_view",
                    useSlotsViewOnSmallScreen: "true",
                    theme: isDark ? "dark" : "light",
                  }}
                />
              </div>

              {/* Bottom Security & Calendar info */}
              <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#7a8296] px-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Meet &bull; Instant Confirmation</span>
                </div>
                <span>Timezone: Auto-detected</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalStudioCTA;
