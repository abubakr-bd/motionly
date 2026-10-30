import React from "react";
import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "../../lib/useSiteData";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  url, 
  image = "https://motionly.media/og-image-v2.png", 
  type = "website",
  noindex = false,
  schema
}) => {
  const { settings } = useSiteSettings();
  const siteName = settings.global.siteName || "Motionly Media";
  const siteDesc = settings.global.siteDescription || "Premier high-retention video editing, video marketing, and commercial video production agency serving global market leaders.";
  
  const finalTitle = title || siteName;
  const finalDescription = description || siteDesc;
  const fullTitle = finalTitle.includes(siteName) ? finalTitle : `${finalTitle} | ${siteName}`;
  const metaKeywords = keywords || "video editing agency, video marketing agency, video production company, high-retention video editing, video editing agency in Bangladesh, video production BD, SaaS video production, YouTube video editor, VSL production, commercial video agency, Motionly Media";
  
  // Clean canonical URL without search query params or hashes
  const rawUrl = url || (typeof window !== "undefined" ? (window.location.origin + window.location.pathname) : "https://motionly.media/");
  const canonicalUrl = rawUrl.split("?")[0].split("#")[0];

  // Base Schema for Organization & ProfessionalService
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "VideoProductionService"],
    "name": siteName,
    "alternateName": ["Motionly", "Motionly Media BD", "Motionly Video Agency"],
    "url": "https://motionly.media/",
    "logo": settings.global.logoUrl || "https://motionly.media/nav_logo.webp",
    "image": image,
    "description": finalDescription,
    "sameAs": [
      settings.contact.linkedin || "https://www.linkedin.com/company/motionly-media",
      settings.contact.instagram || "https://www.instagram.com/motionlymedia",
      settings.contact.facebook || "https://www.facebook.com/motionlymedia",
      "https://twitter.com/motionlymedia"
    ].filter(Boolean),
    "knowsAbout": [
      "Video Editing",
      "High-Retention Video Editing",
      "Video Marketing",
      "Video Production",
      "SaaS Product Videos",
      "VSL Production",
      "YouTube Video Growth",
      "3D Motion Graphics",
      "Commercial Video Production"
    ],
    "areaServed": [
      "Bangladesh",
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Worldwide"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@motionlymedia" />
      <meta name="twitter:creator" content="@motionlymedia" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Schema Markup */}
      {schema ? (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(baseSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
