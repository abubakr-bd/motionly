import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const email = settings.contact.email || "hello@motionly.media";
  const whatsapp = settings.contact.phone || "+880 1605049299";

  return (
    <footer className="bg-white dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-t border-black/[0.08] dark:border-white/[0.08] pt-16 sm:pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-black/[0.08] dark:border-white/[0.08]">
          
          {/* Col 1: Studio Brand (4 cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block text-xl font-bold tracking-tight text-[#111827] dark:text-white mb-3">
              MOTIONLY
            </Link>
            <p className="text-sm text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed max-w-sm mb-6 font-normal">
              Independent creative video &amp; content studio. We help SaaS companies, founders, and ambitious brands turn ideas into compelling visual experiences.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
              <div>Email: <a href={`mailto:${email}`} className="text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium transition-colors">{email}</a></div>
              <div>WhatsApp: <a href="https://wa.me/8801605049299" target="_blank" rel="noreferrer" className="text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium transition-colors">{whatsapp}</a></div>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#374151] dark:text-[#cbd5e1]">
              <li>
                <Link to="/portfolio" className="hover:text-[#315EFA] transition-colors">Selected Work</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#315EFA] transition-colors">Services &amp; Retainers</Link>
              </li>
              <li>
                <Link to="/personal-branding" className="hover:text-[#315EFA] transition-colors">Personal Branding</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#315EFA] transition-colors">About Studio</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#315EFA] transition-colors">Journal &amp; Insights</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#315EFA] transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Capabilities (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-[#374151] dark:text-[#cbd5e1]">
              <li>
                <Link to="/services" className="hover:text-[#315EFA] transition-colors">Video Production &amp; Editing</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#315EFA] transition-colors">Motion Graphics &amp; Animation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#315EFA] transition-colors">Video Marketing &amp; Strategy</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#315EFA] transition-colors">SaaS Product Walkthroughs</Link>
              </li>
              <li>
                <Link to="/personal-branding" className="hover:text-[#315EFA] transition-colors">Founder Authority Content</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b7487] dark:text-[#7a8296] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-[#374151] dark:text-[#cbd5e1]">
              <li>
                <a
                  href="https://www.linkedin.com/company/motionlymedia/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#315EFA] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/motionlymedia/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#315EFA] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/motionlymedia"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#315EFA] transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801605049299"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal, Credits & Copyright Row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-[#6b7487] dark:text-[#7a8296]">
          <div>
            <p>&copy; {currentYear} MOTIONLY MEDIA. ALL RIGHTS RESERVED.</p>
            <p className="mt-1 text-[11px] font-sans text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
              Designed &amp; Developed by{" "}
              <a
                href="https://wa.me/8801948303128"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium"
              >
                Abu Bakr Siddique
              </a>{" "}
              &amp;{" "}
              <a
                href="https://kholipha-ahmmad-al-amin.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium"
              >
                Kholipha Ahmmad Al-Amin
              </a>{" "}
              in partnership with{" "}
              <a
                href="https://agency.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium"
              >
                EquiSaaS Agency
              </a>
              , an{" "}
              <a
                href="https://equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#111827] dark:text-[#eef0f5] hover:text-[#315EFA] font-medium"
              >
                EquiSaaS BD
              </a>{" "}
              company.
            </p>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-wider shrink-0 font-mono text-xs">
            <Link to="/terms" className="hover:text-[#111827] dark:hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-[#111827] dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-[#111827] dark:hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
