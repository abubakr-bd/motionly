import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePartners, type PartnerItem } from "../../lib/useSiteData";
import { ExternalLink, X } from "lucide-react";

export const Partners = () => {
  const { partners, settings, loading } = usePartners();
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedPartner && !dialog.open) dialog.showModal();
    if (!selectedPartner && dialog.open) dialog.close();
  }, [selectedPartner]);

  const layerCount = Math.min(3, Math.max(1, Number(settings?.layers) || 2));

  const activePartners = useMemo(() => {
    return (partners || []).filter((p) => p.enabled !== false);
  }, [partners]);

  const rows = useMemo(() => {
    if (!activePartners.length) return [];

    return Array.from({ length: layerCount }).map((_, rowIndex) => {
      const offset = (rowIndex * 2) % activePartners.length;
      const rotated = [...activePartners.slice(offset), ...activePartners.slice(0, offset)];

      let trackItems = [...rotated];
      while (trackItems.length < 16) {
        trackItems = [...trackItems, ...rotated];
      }

      let animationClass = "animate-marquee-clockwise";
      if (rowIndex === 1) {
        animationClass = "animate-marquee-anticlockwise";
      } else if (rowIndex === 2) {
        animationClass = "animate-marquee-clockwise-slow";
      }

      return {
        rowIndex,
        animationClass,
        items: trackItems,
      };
    });
  }, [activePartners, layerCount]);

  if (loading || !activePartners.length) return null;

  const renderCard = (partner: PartnerItem, key: string) => {
    const isImgFailed = failedLogos[partner.id];
    const hasLogo = Boolean(partner.logoUrl && !isImgFailed);

    return (
      <button
        key={key}
        type="button"
        onClick={() => setSelectedPartner(partner)}
        className="group flex items-center justify-center min-w-[170px] sm:min-w-[210px] h-14 sm:h-16 px-6 sm:px-8 bg-slate-50/90 hover:bg-white dark:bg-[#090D1A]/90 dark:hover:bg-[#0E1528] border border-slate-200/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        title={`Click to view ${partner.name}`}
      >
        {hasLogo ? (
          <div className="flex items-center justify-center h-8 sm:h-9 w-full px-1">
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              loading="lazy"
              decoding="async"
              className="max-h-7 sm:max-h-8 w-auto max-w-[130px] sm:max-w-[155px] object-contain dark:brightness-0 dark:invert opacity-85 dark:opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              onError={() => setFailedLogos((prev) => ({ ...prev, [partner.id]: true }))}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              {partner.name}
            </span>
            {partner.category && (
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {partner.category}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <section id="partners" className="py-16 sm:py-24 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white border-y border-slate-100 dark:border-white/10 overflow-hidden relative transition-colors duration-300">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
          Trusted Partners &amp; Brands
        </p>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Powering creators, startups, and ambitious teams worldwide
        </h2>
      </div>

      <div className="relative w-full overflow-hidden partners-carousel-track space-y-4 sm:space-y-6">
        {/* Left & Right Gradient Fade Masks (White in Light Mode, Obsidian in Dark Mode) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#05070F] dark:via-[#05070F]/80 z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#05070F] dark:via-[#05070F]/80 z-10" />

        {rows.map((row) => (
          <div key={`layer-${row.rowIndex}`} className="flex w-full overflow-hidden select-none marquee-row">
            <div className={`${row.animationClass} flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6`}>
              {row.items.map((partner, itemIdx) => renderCard(partner, `t1-${row.rowIndex}-${itemIdx}`))}
            </div>
            <div className={`${row.animationClass} flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6`} aria-hidden="true">
              {row.items.map((partner, itemIdx) => renderCard(partner, `t2-${row.rowIndex}-${itemIdx}`))}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Details Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full mx-auto m-auto border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090D1A] text-slate-900 dark:text-white"
        onCancel={(e) => { e.preventDefault(); setSelectedPartner(null); }}
        onClose={() => setSelectedPartner(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedPartner(null); }}
      >
        {selectedPartner && (
          <div className="relative text-center">
            <button
              type="button"
              className="absolute -top-3 -right-3 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300 dark:hover:text-white rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedPartner(null)}
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedPartner.logoUrl && !failedLogos[selectedPartner.id] ? (
              <img
                src={selectedPartner.logoUrl}
                alt={`${selectedPartner.name} logo`}
                className="max-h-12 w-auto max-w-[200px] object-contain mx-auto mb-4 dark:brightness-0 dark:invert"
              />
            ) : null}

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedPartner.name}</h3>
            {selectedPartner.category && (
              <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-4">
                {selectedPartner.category}
              </span>
            )}

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
              {selectedPartner.description || "Trusted collaboration partner powering high-impact creative output with Motionly Media."}
            </p>

            {selectedPartner.websiteUrl && (
              <a
                href={selectedPartner.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-sm"
              >
                <span>Visit Partner Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
};

export default Partners;
