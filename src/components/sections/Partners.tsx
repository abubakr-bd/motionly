import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePartners, type PartnerItem } from "../../lib/useSiteData";
import { ExternalLink } from "lucide-react";

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

  // Determine how many layers/rows to render (1, 2, or 3)
  const layerCount = Math.min(3, Math.max(1, Number(settings?.layers) || 2));

  // Filter to active partners
  const activePartners = useMemo(() => {
    return (partners || []).filter((p) => p.enabled !== false);
  }, [partners]);

  // Build a dense sequence of items for each row (dual-track infinite marquee)
  const rows = useMemo(() => {
    if (!activePartners.length) return [];

    return Array.from({ length: layerCount }).map((_, rowIndex) => {
      // Stagger initial items so each layer starts with different partners
      const offset = (rowIndex * 2) % activePartners.length;
      const rotated = [...activePartners.slice(offset), ...activePartners.slice(0, offset)];

      // Repeat items so each track is >= 16 items (~3,200px+), guaranteed wider than 4K displays
      let trackItems = [...rotated];
      while (trackItems.length < 16) {
        trackItems = [...trackItems, ...rotated];
      }

      // Determine animation direction:
      // Row 0 (Layer 1): Clockwise (moves left)
      // Row 1 (Layer 2): Anticlockwise (moves right)
      // Row 2 (Layer 3): Clockwise slow (moves left)
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
        className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-slate-300 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        title={`Click to view ${partner.name}`}
      >
        {hasLogo ? (
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            loading="lazy"
            decoding="async"
            className="max-h-8 sm:max-h-9 w-auto max-w-[130px] sm:max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
            onError={() => setFailedLogos((prev) => ({ ...prev, [partner.id]: true }))}
          />
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
              {partner.name}
            </span>
            {partner.category && (
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {partner.category}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <section id="partners" className="py-16 md:py-24 bg-white border-t border-slate-100 overflow-hidden relative">
      <div className="container max-w-6xl mx-auto px-6 text-center mb-10 md:mb-14">
        <p className="site-kicker mb-3">
          Trusted Partners &amp; Brands
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Powering creators, startups, and ambitious teams worldwide
        </h2>
      </div>

      {/* Infinite Marquee Carousel Container */}
      <div className="relative w-full overflow-hidden partners-carousel-track space-y-4 sm:space-y-6">
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {rows.map((row) => (
          <div key={`layer-${row.rowIndex}`} className="flex w-full overflow-hidden select-none marquee-row">
            {/* Track 1: First continuous conveyor belt */}
            <div className={`${row.animationClass} flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6`}>
              {row.items.map((partner, itemIdx) => renderCard(partner, `t1-${row.rowIndex}-${itemIdx}`))}
            </div>
            {/* Track 2: Sibling clone for a seamless 100% infinite loop without gaps or jumps */}
            <div className={`${row.animationClass} flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6`} aria-hidden="true">
              {row.items.map((partner, itemIdx) => renderCard(partner, `t2-${row.rowIndex}-${itemIdx}`))}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Details Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-slate-900/60 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full mx-auto m-auto border-0"
        onCancel={(e) => { e.preventDefault(); setSelectedPartner(null); }}
        onClose={() => setSelectedPartner(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedPartner(null); }}
      >
        {selectedPartner && (
          <div className="relative text-center">
            <button
              type="button"
              className="absolute -top-3 -right-3 w-9 h-9 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedPartner(null)}
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedPartner.logoUrl && !failedLogos[`dialog-${selectedPartner.id}`] ? (
              <img
                className="max-h-14 mx-auto mb-5 object-contain"
                src={selectedPartner.logoUrl}
                alt={selectedPartner.name}
                onError={() => setFailedLogos((p) => ({ ...p, [`dialog-${selectedPartner.id}`]: true }))}
              />
            ) : null}

            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedPartner.name}</h3>
              {selectedPartner.category && (
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase">
                  {selectedPartner.category}
                </span>
              )}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedPartner.description || "A trusted partner and brand working with Motionly Media."}
            </p>

            {selectedPartner.websiteUrl && (
              <a
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                href={selectedPartner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Partner Website <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
};

export default Partners;
