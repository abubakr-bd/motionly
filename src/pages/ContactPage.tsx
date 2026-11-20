import React, { useEffect, useState } from "react";
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
  Mail,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Globe2,
  Zap
} from "lucide-react";

const ContactPage = () => {
  const { settings } = useSiteSettings();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const contact = settings.contact;

  const rawCal = contact.calLink || contact.calendlyUrl || "motionly-media-rdgfxc/30min";
  const calLink = rawCal.trim().replace(/^https?:\/\/cal\.com\//i, "").replace(/^https?:\/\/calendly\.com\//i, "") || "motionly-media-rdgfxc/30min";
  const calNamespace = contact.calNamespace || "30min";
  const email = contact.email || "hello@motionly.media";

  const [copied, setCopied] = useState(false);
  const [calLoaded, setCalLoaded] = useState(false);

  // Initialize Cal API configuration (Layout, Themes, Namespace)
  useEffect(() => {
    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: calNamespace });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: isDark ? "dark" : "light",
          styles: {
            branding: {
              brandColor: "#2563EB",
            },
          },
        });
        setCalLoaded(true);
      } catch (err) {
        console.warn("Cal.com embed initialized via fallback:", err);
        setCalLoaded(true);
      }
    })();
  }, [calNamespace, isDark]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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

      {/* Top Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] transition-colors duration-200">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#2563EB] dark:text-[#38BDF8] mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Creative Briefing &bull; 30-Minute Strategy Session</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-6">
                Let&apos;s map out your{" "}
                <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
                  next breakthrough video.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8 font-normal">
                Tell us what you are launching. We&apos;ll audit your current retention curves, outline scroll-stopping hooks, and build a production blueprint tailored to your exact release objectives.
              </p>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1.5 shadow-xs">
                  <Clock className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">30 Minutes</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Focused &amp; Strategic</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1.5 shadow-xs">
                  <Video className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Google Meet</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Direct calendar link</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1.5 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">No Pitch Fluff</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero pressure</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Studio Directors</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Direct creative team</span>
                </div>
              </div>

              {/* What We'll Cover Agenda */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c101d] border border-black/[0.06] dark:border-white/[0.08] space-y-3 shadow-xs">
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-[#2563EB] dark:text-[#38BDF8] flex items-center gap-2">
                  <span>What we cover during this call:</span>
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] mt-2 shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white font-semibold">Retention Hook Audit:</strong> We break down audience drop-off points in your category and structure opening hooks designed to prevent scrolling past.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] mt-2 shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white font-semibold">Visual &amp; Motion Direction:</strong> Concrete recommendations for UI capture, 2D/3D motion graphics, typography rhythm, and sound design.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] mt-2 shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white font-semibold">Production Architecture:</strong> Exact turnaround schedules (5-7 days for sprints), milestones, and deliverables tailored to your release date.</span>
                  </li>
                </ul>
              </div>

              {/* Studio Time Zones & SLA */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span>Dhaka BST (UTC+6) &bull; New York EST &bull; London GMT</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Avg Response: &lt; 4 Hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Asynchronous Contact Card */}
            <div className="lg:col-span-5 w-full">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-lg space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#2563EB] dark:text-[#38BDF8] uppercase block mb-1">
                    Direct Studio Inbox
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Prefer to write or send a brief?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-normal leading-relaxed">
                    If your project has NDA requirements, an existing storyboard, or specific asset specifications, email our creative leadership directly.
                  </p>
                </div>

                {/* Email Box with One-Click Copy */}
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:text-[#38BDF8] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Direct Email</span>
                      <a
                        href={`mailto:${email}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] truncate block transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-mono text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Modal Launcher Button (From Cal.com snippet) */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Quick Booking Options:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      data-cal-namespace={calNamespace}
                      data-cal-link={calLink}
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#2563EB] hover:bg-blue-600 text-white shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Open Popup Scheduler</span>
                    </button>

                    <a
                      href={`https://cal.com/${calLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:border-[#2563EB] transition-colors"
                    >
                      <span>Direct Tab</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Social Connect */}
                {socials.length > 0 && (
                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium font-mono text-[11px]">Social channels:</span>
                    <div className="flex items-center gap-3">
                      {socials.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-slate-700 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-white transition-colors"
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

      {/* Main Interactive Cal.com Embedded Scheduler Section */}
      <section id="booking" className="py-16 sm:py-24 bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-t border-black/[0.08] dark:border-white/[0.08] relative overflow-hidden transition-colors duration-200">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] dark:text-[#38BDF8] uppercase mb-3 inline-block">
              LIVE SCHEDULE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-3">
              Book your session online.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
              Select a date and time slot below. You will immediately receive a calendar invitation and Google Meet connection details.
            </p>
          </div>

          {/* Interactive Cal.com Calendar Card */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-white dark:bg-[#0c101d] border border-black/[0.08] dark:border-white/[0.08] shadow-xl min-h-[680px] p-2 sm:p-6 transition-all">
            
            {/* Top Toolbar within Frame */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08] px-2 sm:px-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  Cal.com Live Calendar Active
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-cal-namespace={calNamespace}
                  data-cal-link={calLink}
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/[0.04] hover:bg-black/[0.08] text-slate-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </button>

                <a
                  href={`https://cal.com/${calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-white transition-colors"
                >
                  <span>Open directly</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Cal.com React Embed Component */}
            <div className="w-full min-h-[620px] rounded-2xl overflow-hidden bg-transparent">
              <Cal
                namespace={calNamespace}
                calLink={calLink}
                style={{ width: "100%", height: "100%", minHeight: "620px", overflow: "hidden" }}
                config={{
                  layout: "month_view",
                  useSlotsViewOnSmallScreen: "true",
                  theme: isDark ? "dark" : "light",
                }}
              />
            </div>

            {/* Bottom Fallback / Help Notice */}
            <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-2 sm:px-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>SSL Encrypted &bull; Direct Google Calendar Integration</span>
              </div>
              <div>
                <span>Having trouble loading? </span>
                <a
                  href={`https://cal.com/${calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-0.5"
                >
                  Book directly on Cal.com
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
