import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const BASE_URL = 'https://motionly.media';

// Static Blogs
const BLOG_DATA = [
  {
    id: "seo-1",
    title: "Mastering High-Retention Video Editing for Maximum Reach",
    category: "Editing",
    date: "2025-05-10",
    description: "In the age of 3-second attention spans, high-retention editing isn't just a luxury—it's a requirement. This guide breaks down the psychological triggers and editing techniques.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seo-2",
    title: "The Strategic Guide to VSLs (Video Sales Letters) in 2025",
    category: "Strategy",
    date: "2025-05-08",
    description: "A great Video Sales Letter (VSL) can be the difference between a failing funnel and a multi-million dollar business. Explore modern direct-response video frameworks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seo-3",
    title: "Why Short-Form Video is the #1 Growth Lever for Brands",
    category: "Short-form",
    date: "2025-05-05",
    description: "TikTok, Reels, and Shorts have fundamentally changed how brands acquire customers. Discover why organic short-form is the best customer acquisition channel.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seo-4",
    title: "Scaling SaaS with Strategic Video Marketing Content",
    category: "SaaS",
    date: "2025-05-02",
    description: "Software companies often struggle to explain complex products quickly. Learn how high-retention product explainers reduce churn and drive monthly recurring revenue.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seo-5",
    title: "The Anatomy of a High-Converting Video Marketing Funnel",
    category: "Strategy",
    date: "2025-04-28",
    description: "Stop treating video as a one-off asset and start treating it as a comprehensive system. A multi-stage video funnel that converts cold prospects into clients.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "short-form-roi",
    title: "Maximizing ROI with Short-Form Content on TikTok and Reels",
    category: "Short-form",
    date: "2025-05-12",
    description: "Organic growth on TikTok, Instagram Reels, and YouTube Shorts is the most cost-effective way to scale brand awareness. Learn platform-specific editing frameworks.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "video-editing-trends-2025",
    title: "Video Editing Trends for 2025: Staying Ahead of the Algorithm",
    category: "Editing",
    date: "2025-05-15",
    description: "Algorithms reward retention, and retention is driven by exceptional editing. Explore cutting-edge pacing, micro-animations, and dynamic sound design trends.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "youtube-growth-secrets",
    title: "YouTube Channel Growth Secrets: From Zero to 100k Subscribers",
    category: "Strategy",
    date: "2025-05-18",
    description: "Discover our proven framework for thumbnail design, A/B testing, CTR optimization, and average view duration (AVD) retention strategies for YouTube channels.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "short-form-fails",
    title: "Why Most Short-Form Content Fails in the First 3 Seconds",
    category: "Strategy",
    date: "2025-05-20",
    description: "The modern consumer swipes in seconds. Discover how to create irresistible visual and auditory hooks that overcome the consideration threshold.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  }
];

// Static Portfolio Case Studies
const PORTFOLIO_DATA = [
  {
    id: "4v95coAmufm3daVAgqKm",
    title: "Apple SaaS Explainer",
    category: "VSL",
    videoId: "KDK1jHJXPrk",
    description: "High-converting SaaS product video sales letter and feature explainer designed with dynamic visual pacing and clean kinetic animations.",
    services: ["High-Retention Video Editing", "SaaS Product Explainer", "Kinetic Motion Graphics"]
  },
  {
    id: "y2coqeZTqk27tzrCe1EI",
    title: "The Afjal Story Reel",
    category: "Short-form",
    videoId: "xygb6y5L9x8",
    description: "Personal brand storytelling reel engineered for rapid Instagram and TikTok retention with micro-cuts, sound FX, and punchy captions.",
    services: ["Short-form Video Editing", "Personal Brand Positioning", "Sound Design & Mastering"]
  },
  {
    id: "mMbBQT6srWSTDPwS7ILB",
    title: "EquiSaaS Brand Short",
    category: "Short-form",
    videoId: "pIEkY7YDIF0",
    description: "Tech startup branding video short combining brand identity elements, motion design, and high-retention audio pacing.",
    services: ["Brand Video Editing", "Motion Graphics", "Audio Mastering"]
  },
  {
    id: "uYMBcFEXcK7EeAqFdQ6B",
    title: "Fellas Finance YouTube Series",
    category: "YouTube",
    videoId: "0NHfOpolrjs",
    description: "Long-form YouTube finance episode with deliberate documentary pacing, B-roll research, audio transitions, and retention hooks.",
    services: ["YouTube Video Editing", "Long-form Narrative Editing", "Channel Strategy & Packaging"]
  },
  {
    id: "1xUEC9RmJgu0GsmCwaWL",
    title: "Webdesert Short-Form",
    category: "Short-form",
    videoId: "-_GCBlnT7R0",
    description: "High-energy mobile short-form video edit featuring rapid visual pacing, SFX layering, and retention pattern interrupts.",
    services: ["Short-form Editing", "Pattern Interrupts", "Sound Design"]
  },
  {
    id: "S2tVmi5VDvhZCOctFiun",
    title: "Original Video Commercial",
    category: "Commercial",
    videoId: "xA_msiryNvQ",
    description: "Cinematic commercial video production featuring color grading, commercial audio mastering, and brand storytelling.",
    services: ["Commercial Video Editing", "Color Grading & Finishing", "Commercial Audio Design"]
  },
  {
    id: "QQg8PGAjeiWK7iyQcl4e",
    title: "Mandela Effect Documentary",
    category: "VSL",
    videoId: "iOthMnht9tM",
    description: "Deep-dive investigative documentary edit with atmospheric soundscapes, archive footage treatment, and narrative pacing.",
    services: ["Documentary Video Editing", "Soundscapes & Foley", "Visual Research"]
  },
  {
    id: "yqD2TSQGtmoQIOis7sNh",
    title: "Fitness High-Energy Short",
    category: "Short-form",
    videoId: "-IZHpWHb3QI",
    description: "Kinetic fitness video edit with rhythmic speed ramps, beat matching, bass drops, and bold typography.",
    services: ["Kinetic Editing", "Beat Matching & Sound Design", "Short-form Retention"]
  },
  {
    id: "dtkEYUcnjoeKeA6rJdD3",
    title: "Creative YouTube Feature",
    category: "YouTube",
    videoId: "Bfce9mHYcDg",
    description: "Engaging creator YouTube feature with structured pacing, visual humor, J-cuts, and retention-focused storytelling.",
    services: ["YouTube Video Editing", "Story Pacing", "Audience Retention Strategy"]
  }
];

const PAGES = [
  {
    path: "/",
    title: "Motionly Media | High-Retention Video Marketing & Editing Agency",
    description: "Scale your brand with high-retention video editing, VSL production, and content marketing systems. Explore Motionly Media's work, client stories, and creative services.",
    keywords: "video marketing agency, high-retention video editing, VSL production, YouTube video editor, content marketing agency, Motionly Media",
    h1: "High-Retention Video Editing & Creative Direction for Ambitious Brands",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Video Editing &amp; Creative Direction Agency</p>
        <h1>High-Retention Video Editing &amp; Creative Direction for Ambitious Brands</h1>
        <p class="site-page-hero__lede">Story-led video editing, motion design, and creative direction for creators, market leaders, and ambitious brands worldwide.</p>
        <div>
          <a href="/contact" class="site-button">Start a project</a>
          <a href="/portfolio" class="site-button">Explore our work</a>
        </div>
      </section>
      <section class="site-services-preview">
        <h2>What We Do</h2>
        <p>Motionly Media engineers high-retention video systems across four core creative pillars:</p>
        <ul>
          <li><strong>Video Editing:</strong> Deliberate pacing, clean sound design, kinetic captions, and story-led visual choices for YouTube, short-form, and commercials.</li>
          <li><strong>Channel Strategy:</strong> Purposeful release calendars, audience research, publishing systems, and YouTube retention optimization.</li>
          <li><strong>Packaging &amp; Discovery:</strong> High-CTR thumbnail concepts, search metadata, and hook-hold frameworks that capture attention.</li>
          <li><strong>Creative Direction:</strong> Consistent brand visual identity, scripting development, and continuous performance refinement.</li>
        </ul>
        <p><a href="/services">View all video services &rarr;</a> | <a href="/portfolio">Browse client portfolio &rarr;</a></p>
      </section>
    `
  },
  {
    path: "/services",
    title: "Video Editing & Content Marketing Services | Motionly Media",
    description: "High-retention video editing, VSL production, channel strategy, and content packaging services built to grow your brand. Explore Motionly Media's services.",
    keywords: "video editing services, VSL production, channel strategy, video packaging, YouTube growth agency, motion graphics, Motionly Media",
    h1: "Video Editing & Content Marketing Services",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Creative Agency Services</p>
        <h1>Video Editing &amp; Content Marketing Services</h1>
        <p class="site-page-hero__lede">From the first idea to the final cut, we bring the creative and practical pieces of your video operation together with deliberate pacing, clean sound, and story-led visual direction.</p>
      </section>
      <section class="site-services-list">
        <article>
          <h2>01. Video Editing</h2>
          <p>Build a stronger viewing experience with deliberate pacing, clean sound, and story-led visual choices. Includes long-form and short-form editing, sound design, color finishing, and motion graphics.</p>
        </article>
        <article>
          <h2>02. Channel Strategy</h2>
          <p>Give each release a clear audience, purpose, and path from idea to publication. Includes format planning, audience research, and review systems.</p>
        </article>
        <article>
          <h2>03. Packaging and Discovery</h2>
          <p>Help the right viewer understand why a video is worth their time before they press play. Titles, descriptions, thumbnail concepts, and search metadata.</p>
        </article>
        <article>
          <h2>04. Creative Direction</h2>
          <p>Bring a consistent visual and editorial language to the content people associate with your brand. Script development, brand identity, and retention feedback.</p>
        </article>
      </section>
      <p><a href="/contact">Book a strategy call &rarr;</a> | <a href="/portfolio">View video portfolio &rarr;</a></p>
    `
  },
  {
    path: "/portfolio",
    title: "Motionly Media Portfolio | Video Editing & Case Studies",
    description: "Explore Motionly Media's portfolio of high-retention video editing, VSL production, YouTube growth, and commercial creative case studies.",
    keywords: "video editing portfolio, video case studies, VSL examples, YouTube editing showcase, Motionly Media portfolio",
    h1: "Motionly Media Video Portfolio & Case Studies",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Selected Work &amp; Case Studies</p>
        <h1>Motionly Media Video Portfolio &amp; Case Studies</h1>
        <p class="site-page-hero__lede">Editing shaped around the story. A curated showcase of high-retention video editing, VSL funnels, and creator campaigns produced by Motionly Media.</p>
      </section>
      <section class="site-portfolio-list">
        <h2>Featured Video Case Studies</h2>
        <ul>
          ${PORTFOLIO_DATA.map(p => `
            <li>
              <h3><a href="/portfolio/${p.id}">${p.title}</a> (${p.category})</h3>
              <p>${p.description}</p>
              <a href="/portfolio/${p.id}">View case study details &rarr;</a>
            </li>
          `).join('')}
        </ul>
      </section>
      <p><a href="/services">Explore our services &rarr;</a> | <a href="/contact">Start a project &rarr;</a></p>
    `
  },
  {
    path: "/about",
    title: "About Motionly Media | Video Marketing Agency",
    description: "Meet Motionly Media—an elite team of video editors, directors, and strategists crafting retention-engineered video systems for market leaders worldwide.",
    keywords: "about Motionly Media, video editing agency team, creative video studio, video directors, Abu Bakar Siddique",
    h1: "About Motionly Media | Creative Video Agency",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">About Motionly Media</p>
        <h1>About Motionly Media | Creative Video Agency</h1>
        <p class="site-page-hero__lede">Good video starts with a clear point of view. We are an independent creative agency and production studio partnering with creators and brands who have something meaningful to say.</p>
      </section>
      <section class="site-about-content">
        <h2>Our Creative Pillars</h2>
        <ol>
          <li><strong>Editorial Judgment:</strong> Every cut serves the story. We shape pacing, sound, and visuals around the audience you need to reach.</li>
          <li><strong>A Dependable Team:</strong> Editors and strategists work as one team, with clear ownership from brief to final delivery.</li>
          <li><strong>Measured Improvement:</strong> We use performance signals and watch-time data to make each release clearer, more relevant, and more effective.</li>
        </ol>
        <p><a href="/services">View our services &rarr;</a> | <a href="/portfolio">Browse our portfolio &rarr;</a> | <a href="/contact">Meet the team &rarr;</a></p>
      </section>
    `
  },
  {
    path: "/blog",
    title: "Motionly Media Blog | Video Marketing & Content Strategy",
    description: "Actionable insights on high-retention video editing, YouTube growth frameworks, VSL funnels, and viral short-form strategies from Motionly Media.",
    keywords: "video marketing blog, video editing tutorials, YouTube retention strategies, VSL guide, content creation tips",
    h1: "Motionly Media Blog | Video Marketing & Content Strategy",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Motionly Media Journal &amp; Insights</p>
        <h1>Motionly Media Blog | Video Marketing &amp; Content Strategy</h1>
        <p class="site-page-hero__lede">Actionable guides, creative frameworks, and editorial insights from the video strategists and editors at Motionly Media.</p>
      </section>
      <section class="site-blog-list">
        <h2>Recent Articles &amp; Guides</h2>
        <ul>
          ${BLOG_DATA.map(b => `
            <li>
              <h3><a href="/blog/${b.id}">${b.title}</a></h3>
              <p>${b.description}</p>
              <a href="/blog/${b.id}">Read full article &rarr;</a>
            </li>
          `).join('')}
        </ul>
      </section>
    `
  },
  {
    path: "/careers",
    title: "Careers at Motionly Media | Video Editing & Creative Roles",
    description: "Join the Motionly Media team. We are hiring passionate video editors, motion graphic designers, and content strategists. Apply in minutes.",
    keywords: "video editing jobs, remote video editor hiring, motion designer careers, Motionly Media jobs",
    h1: "Careers at Motionly Media | Join Our Creative Team",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Careers at Motionly Media</p>
        <h1>Careers at Motionly Media | Join Our Creative Team</h1>
        <p class="site-page-hero__lede">Make thoughtful work with a close-knit team. We are looking for curious editors, motion designers, and strategists who care about the details and the story behind every cut.</p>
        <p><a href="https://app.youform.com/forms/zrg6xump" class="site-button">Apply now</a></p>
      </section>
    `
  },
  {
    path: "/personal-branding",
    title: "Personal Branding Video Systems | Motionly Media",
    description: "Build authority and scale your personal brand with custom high-retention video production, positioning, and content engines by Motionly Media.",
    keywords: "personal branding video, founder personal branding, executive video marketing, creator branding agency",
    h1: "Personal Branding Video Systems for Founders & Creators",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Personal Branding Systems</p>
        <h1>Personal Branding Video Systems for Founders &amp; Creators</h1>
        <p class="site-page-hero__lede">Positioning, production, and distribution built around your point of view. Turn your expertise into an organic client acquisition engine.</p>
        <p><a href="/contact" class="site-button">Start your brand engine</a></p>
      </section>
    `
  },
  {
    path: "/contact",
    title: "Contact Motionly Media | Book a Discovery Call",
    description: "Ready to elevate your video content? Book a discovery call with Motionly Media to discuss video editing, channel strategy, and high-retention production.",
    keywords: "contact Motionly Media, book video strategy call, hire video editor, video agency contact",
    h1: "Contact Motionly Media | Book a Discovery Call",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">Get in Touch with Motionly Media</p>
        <h1>Contact Motionly Media | Book a Discovery Call</h1>
        <p class="site-page-hero__lede">Let's talk about what comes next. Share your goals, the work you are making, and where you want it to go. Email us at <a href="mailto:hello@motionly.media">hello@motionly.media</a>.</p>
      </section>
    `
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Motionly Media",
    description: "Read the Privacy Policy of Motionly Media regarding personal data protection, analytics, and client information.",
    keywords: "privacy policy, Motionly Media privacy",
    h1: "Privacy Policy",
    bodyContent: `<section><h1>Privacy Policy</h1><p>Motionly Media values your privacy. Learn how we handle your data.</p></section>`
  },
  {
    path: "/terms",
    title: "Terms of Service | Motionly Media",
    description: "Terms of Service governing creative video services, client contracts, and deliverables by Motionly Media.",
    keywords: "terms of service, Motionly Media terms",
    h1: "Terms of Service",
    bodyContent: `<section><h1>Terms of Service</h1><p>Terms and agreements for creative partnerships with Motionly Media.</p></section>`
  },
  {
    path: "/refund",
    title: "Refund Policy | Motionly Media",
    description: "Refund and cancellation terms for video production retainers and project milestones with Motionly Media.",
    keywords: "refund policy, Motionly Media refunds",
    h1: "Refund Policy",
    bodyContent: `<section><h1>Refund Policy</h1><p>Our commitment to transparent, milestone-based creative delivery.</p></section>`
  }
];

// Add individual blog post pages
BLOG_DATA.forEach(b => {
  PAGES.push({
    path: `/blog/${b.id}`,
    title: `${b.title} | Motionly Media`,
    description: b.description,
    keywords: `${b.category.toLowerCase()} video editing, video marketing, content strategy, Motionly Media`,
    image: b.image,
    h1: b.title,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://motionly.media/blog" },
            { "@type": "ListItem", position: 3, name: b.title, item: `https://motionly.media/blog/${b.id}` }
          ]
        },
        {
          "@type": "BlogPosting",
          headline: b.title,
          description: b.description,
          image: b.image,
          datePublished: b.date,
          author: { "@type": "Organization", name: "Motionly Media" },
          publisher: {
            "@type": "Organization",
            name: "Motionly Media",
            logo: { "@type": "ImageObject", url: "https://motionly.media/nav_logo.webp" }
          }
        }
      ]
    },
    bodyContent: `
      <article>
        <p><a href="/blog">&larr; Back to all articles</a></p>
        <p class="site-kicker">${b.category} &bull; ${b.date}</p>
        <h1>${b.title}</h1>
        <p class="site-page-hero__lede">${b.description}</p>
        <div>
          <p>Read the complete strategic breakdown on Motionly Media. High-retention video editing and content frameworks built for creators and brands.</p>
          <p><a href="/contact">Discuss your video strategy &rarr;</a> | <a href="/portfolio">View our work &rarr;</a></p>
        </div>
      </article>
    `
  });
});

// Add individual portfolio case study pages
PORTFOLIO_DATA.forEach(p => {
  const thumbUrl = `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`;
  PAGES.push({
    path: `/portfolio/${p.id}`,
    title: `${p.title} | Video Case Study | Motionly Media`,
    description: `Explore the ${p.title} video case study by Motionly Media. Produced with ${p.category} storytelling, sound design, and retention-focused cuts.`,
    keywords: `${p.title.toLowerCase()}, ${p.category.toLowerCase()} video editing, video case study, Motionly Media`,
    image: thumbUrl,
    h1: `${p.title}`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://motionly.media/portfolio" },
            { "@type": "ListItem", position: 3, name: p.title, item: `https://motionly.media/portfolio/${p.id}` }
          ]
        },
        {
          "@type": "VideoObject",
          name: `${p.title} - Video Case Study by Motionly Media`,
          description: p.description,
          thumbnailUrl: thumbUrl,
          embedUrl: `https://www.youtube-nocookie.com/embed/${p.videoId}`,
          uploadDate: "2025-01-01T00:00:00Z",
          publisher: {
            "@type": "Organization",
            name: "Motionly Media",
            logo: { "@type": "ImageObject", url: "https://motionly.media/nav_logo.webp" }
          }
        }
      ]
    },
    bodyContent: `
      <article>
        <p><a href="/portfolio">&larr; Back to all case studies</a> &bull; <span>${p.category}</span></p>
        <h1>${p.title}</h1>
        <p class="site-page-hero__lede">${p.description}</p>
        <section>
          <h2>Project Overview</h2>
          <p>For this ${p.category.toLowerCase()} release, our focus was maintaining viewer attention through deliberate pacing, crisp sound design, and narrative clarity.</p>
          <h3>Services Utilized:</h3>
          <ul>
            ${p.services.map(s => `<li><a href="/services">${s}</a></li>`).join('')}
          </ul>
        </section>
        <p><a href="/contact">Start a video project with Motionly Media &rarr;</a> | <a href="/portfolio">View all portfolio case studies &rarr;</a></p>
      </article>
    `
  });
});

async function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`Error: ${indexHtmlPath} not found. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  console.log(`Starting pre-rendering for ${PAGES.length} routes...`);

  for (const page of PAGES) {
    const canonicalUrl = `${BASE_URL}${page.path === '/' ? '/' : page.path}`;
    const pageImage = page.image || 'https://motionly.media/og-image-v2.png';

    let html = baseHtml;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${page.title}" />`);

    // 2. Replace Meta Description
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${page.description}" />`);

    // 3. Replace Meta Keywords
    if (page.keywords) {
      html = html.replace(/<meta name="keywords" content=".*?" \/>/i, `<meta name="keywords" content="${page.keywords}" />`);
    }

    // 4. Replace Canonical Link
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

    // 5. Replace Open Graph Tags
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${page.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${page.description}" />`);
    html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${pageImage}" />`);

    // 6. Replace Twitter Tags
    html = html.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${page.title}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${page.description}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${pageImage}" />`);

    // 7. Inject Page-specific Structured Data Schema if present
    if (page.schema) {
      const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(page.schema, null, 2)}\n    </script>`;
      html = html.replace('</head>', `${schemaScript}\n  </head>`);
    }

    // 8. Inject Server-Side Rendered Semantic Fallback HTML into #root
    if (page.bodyContent) {
      const semanticRoot = `
        <div id="root">
          <!-- SSR Pre-rendered Content for Search Engines & Accessibility -->
          <div class="ssr-pre-rendered" style="display:contents">
            <header class="ssr-nav" style="display:none">
              <nav aria-label="Main Navigation">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/portfolio">Portfolio</a>
                <a href="/about">About</a>
                <a href="/blog">Blog</a>
                <a href="/careers">Careers</a>
                <a href="/contact">Contact</a>
              </nav>
            </header>
            <main>
              ${page.bodyContent}
            </main>
          </div>
        </div>
      `;
      html = html.replace('<div id="root"></div>', semanticRoot.trim());
    }

    // Determine target file path
    let targetDir;
    let targetFile;

    if (page.path === '/') {
      targetDir = DIST_DIR;
      targetFile = path.join(DIST_DIR, 'index.html');
    } else {
      targetDir = path.join(DIST_DIR, page.path.replace(/^\//, ''));
      targetFile = path.join(targetDir, 'index.html');
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, html, 'utf-8');

    // Create .gz and .br pre-compressed files
    const gzipped = zlib.gzipSync(Buffer.from(html, 'utf-8'));
    fs.writeFileSync(`${targetFile}.gz`, gzipped);

    try {
      const brotlied = zlib.brotliCompressSync(Buffer.from(html, 'utf-8'));
      fs.writeFileSync(`${targetFile}.br`, brotlied);
    } catch {}
  }

  console.log(`Pre-rendered ${PAGES.length} routes with custom metadata, schemas, and semantic HTML.`);
}

prerender();
