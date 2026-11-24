import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { useSiteSettings } from "../lib/useSiteData";
import { useTheme } from "../lib/ThemeContext";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ArrowUpRight,
  ArrowDown,
  Mail,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Globe2,
  Zap,
  Sparkles,
  Layers,
  Sliders,
  MessageSquare
} from "lucide-react";

const projectTypes = [
  "SaaS Launch Video",
  "Personal Brand Engine",
  "3D Motion & CGI",
  "Commercial Production",
  "Monthly Video Retainer"
];

const budgetRanges = [
  "$2k – $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+"
];

const ContactPage = () => {
  const { settings } = useSiteSettings();
  const { theme } = useTheme();
  const contact = settings.contact;

  const rawCal = contact.calLink || contact.calendlyUrl || "motionly-media-rdgfxc/30min";
  const calLink = rawCal.trim().replace(/^https?:\/\/cal\.com\//i, "").replace(/^https?:\/\/calendly\.com\//i, "") || "motionly-media-rdgfxc/30min";
  const calNamespace = contact.calNamespace || "30min";
  const email = contact.email || "hello@motionly.media";

  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("SaaS Launch Video");
  const [selectedBudget, setSelectedBudget] = useState<string>("$5k – $10k");
  
  // Lazy mount Cal embed only when visible or requested to boost initial page speed
  const [shouldMountCal, setShouldMountCal] = useState(false);
  const calendarSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use IntersectionObserver to defer Cal.com until user scrolls near calendar
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldMountCal(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    if (calendarSectionRef.current) {
      observer.observe(calendarSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize Cal API configuration when mounted
  useEffect(() => {
    if (!shouldMountCal) return;

    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: calNamespace });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: "dark",
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
  }, [shouldMountCal, calNamespace]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToCalendar = () => {
    setShouldMountCal(true);
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socials = [
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Instagram", href: contact.instagram },
    { label: "Facebook", href: contact.facebook },
  ].filter((item) => Boolean(item.href));

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://motionly.media/contact" },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact Motionly Media",
        description: "Schedule a video strategy & creative briefing session with Motionly Media directors.",
        url: "https://motionly.media/contact",
      },
    ],
  };

  return (
    <Layout>
      <SEO
        title="Contact & Schedule | Motionly Media Studio"
        description="Schedule a 30-minute creative strategy & production briefing session with Motionly Media. We'll audit your hooks, review pacing, and map out your next high-converting video."
        url="https://motionly.media/contact"
        schema={contactSchema}
      />

      <div className="bg-[#070b14] text-[#eef0f5] min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-[650px] right-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[130px] -z-10" 
        />

        {/* Top Hero Section */}
        <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Heading & Value Proposition */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span className="text-[#38bdf8] font-bold uppercase tracking-wider">Creative Briefing &bull; 30-Min Strategy</span>
                  <span className="text-white/20">•</span>
                  <span className="text-emerald-400">Slots Open This Week</span>
                </div>

                <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
                  Let&apos;s map out your{" "}
                  <span className="block font-serif italic font-normal text-[#38bdf8] mt-1">
                    next breakthrough video.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-normal">
                  Tell us what you are launching. We&apos;ll audit your current retention curves, outline scroll-stopping hooks, and build a production blueprint tailored to your release goals.
                </p>

                {/* Scope & Deliverables Selector (Interactive UX Bridge) */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg mb-8">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    1. Select Your Production Scope
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {projectTypes.map((type) => {
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#38bdf8] text-[#070b14] font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-[1.02]"
                              : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    2. Approximate Budget Range
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {budgetRanges.map((range) => {
                      const isSelected = selectedBudget === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setSelectedBudget(range)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#315EFA] text-white font-bold shadow-[0_0_15px_rgba(49,94,250,0.4)] scale-[1.02]"
                              : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Dynamic Action Button */}
                  <button
                    type="button"
                    onClick={scrollToCalendar}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Schedule Call for {selectedType} ({selectedBudget})</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </button>
                </div>

                {/* Quick Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5 shadow-sm">
                    <Clock className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">30 Minutes</span>
                    <span className="text-[11px] text-slate-400">Focused &amp; Strategic</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5 shadow-sm">
                    <Video className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">Google Meet</span>
                    <span className="text-[11px] text-slate-400">Direct calendar link</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">No Pitch Fluff</span>
                    <span className="text-[11px] text-slate-400">Zero pressure</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">Studio Directors</span>
                    <span className="text-[11px] text-slate-400">Direct creative team</span>
                  </div>
                </div>

                {/* Studio Time Zones & SLA */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Dhaka BST &bull; New York EST &bull; London GMT</span>
                  </div>
                  <span>&bull;</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Avg Response: &lt; 4 Hours</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Asynchronous Contact Card */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#38bdf8] uppercase block mb-1">
                      Direct Studio Inbox
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Prefer to write or send a brief?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                      If your project has NDA requirements, an existing storyboard, or specific asset specifications, email our creative leadership directly.
                    </p>
                  </div>

                  {/* Email Box with One-Click Copy */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/5 text-[#38bdf8] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Direct Email</span>
                        <a
                          href={`mailto:${email}`}
                          className="text-xs sm:text-sm font-bold text-white hover:text-[#38bdf8] truncate block transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-mono text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Booking Buttons */}
                  <div className="pt-2">
                    <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Calendar Options:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <button
                        type="button"
                        onClick={scrollToCalendar}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#315EFA] hover:bg-[#254edb] text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Select Date &amp; Time</span>
                      </button>

                      <a
                        href={`https://cal.com/${calLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-white border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <span>Direct Tab</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>

                  {/* Social Connect */}
                  {socials.length > 0 && (
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-medium font-mono text-[11px]">Social channels:</span>
                      <div className="flex items-center gap-3">
                        {socials.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-slate-300 hover:text-[#38bdf8] transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Cal.com Embedded Scheduler Section (Lazy Mounted for Speed) */}
        <section 
          id="booking" 
          ref={calendarSectionRef}
          className="py-20 sm:py-28 relative border-t border-white/[0.08]"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase mb-3 inline-block">
                LIVE CALENDAR
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
                Book your session <span className="font-serif italic font-normal text-[#38bdf8]">online</span>.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-normal">
                Select a date and time slot below for {selectedType} ({selectedBudget}). You will immediately receive a Google Meet connection.
              </p>
            </div>

            {/* Interactive Cal.com Calendar Card */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-2xl min-h-[640px] p-2 sm:p-6 transition-all">
              
              {/* Top Toolbar within Frame */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 px-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white">
                    Cal.com Studio Calendar Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://cal.com/${calLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Open directly</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Cal.com Embed or Quick Skeleton Placeholder while loading */}
              <div className="w-full min-h-[580px] rounded-2xl overflow-hidden bg-transparent">
                {shouldMountCal ? (
                  <Cal
                    namespace={calNamespace}
                    calLink={calLink}
                    style={{ width: "100%", height: "100%", minHeight: "580px", overflow: "hidden" }}
                    config={{
                      layout: "month_view",
                      useSlotsViewOnSmallScreen: "true",
                      theme: "dark",
                    }}
                  />
                ) : (
                  <div className="min-h-[580px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-10 h-10 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-semibold text-white">Connecting to Studio Calendar...</p>
                    <p className="text-xs text-slate-400 mt-1">Direct Google Meet &amp; timezone synchronization</p>
                    <button
                      type="button"
                      onClick={() => setShouldMountCal(true)}
                      className="mt-4 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10"
                    >
                      Load Calendar Now
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Fallback / Help Notice */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                  <span>SSL Encrypted &bull; Direct Google Calendar Integration</span>
                </div>
                <div>
                  <span>Having trouble loading? </span>
                  <a
                    href={`https://cal.com/${calLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#38bdf8] hover:underline inline-flex items-center gap-0.5"
                  >
                    Book directly on Cal.com
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;
