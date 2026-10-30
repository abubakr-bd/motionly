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
    id: "saas-launch-video-guide",
    title: "The Anatomy of a High-Retention SaaS Product Launch Video",
    category: "SaaS",
    date: "2025-05-24",
    description: "Discover the exact 60-second launch video blueprint used by top Product Hunt #1 products and high-growth SaaS startups to turn viewers into paying users.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "yc-demo-pitch-videos",
    title: "How YC Startups Use 60-Second Videos to Close Multi-Million Dollar Seed Rounds",
    category: "Strategy",
    date: "2025-05-22",
    description: "How top venture-backed startups structure 60-second pitch videos to convince Tier-1 investors, ignite FOMO, and secure oversubscribed investment rounds.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "vsl-vs-product-demo",
    title: "VSL vs. Product Demo: Which Video Format Converts Highest for B2B Software?",
    category: "Strategy",
    date: "2025-05-19",
    description: "Compare VSLs and B2B product demos: conversion rates, audience intent, funnel placement, sales velocity, and production frameworks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "science-of-the-first-3-seconds",
    title: "The Science of the First 3 Seconds: Cold Hooks That Stop the Scroll",
    category: "Editing",
    date: "2025-05-16",
    description: "Master the psychology of scroll-stopping video hooks: pattern interrupts, auditory cues, cognitive dissonance, and frame pacing.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3d-motion-graphics-software-demos",
    title: "3D Motion Graphics vs Screen Capture: How to Showcase Complex Software Visually",
    category: "Production",
    date: "2025-05-13",
    description: "Why leading technology brands use 3D motion design over screen recordings to showcase developer tools, cloud infrastructure, and fintech software.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "repurpose-long-form-to-viral-shorts",
    title: "How to Repurpose 1 Long-Form YouTube Video into 15 High-Performing Shorts",
    category: "Growth",
    date: "2025-05-10",
    description: "Step-by-step strategy to extract 15 high-retention micro-videos from one long-form episode, optimizing for TikTok, Instagram Reels, and YouTube Shorts.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sound-design-video-retention",
    title: "Audio Branding in Video Marketing: Why Sound Design Accounts for 50% of Retention",
    category: "Production",
    date: "2025-05-07",
    description: "Why audio is 50% of the video experience: explore psychoacoustics, spatial audio, sub-bass impacts, UI foley, and brand soundmarks.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "kinetic-typography-best-practices",
    title: "Kinetic Typography Best Practices: Designing Captions People Actually Read",
    category: "Editing",
    date: "2025-05-04",
    description: "Master kinetic typography: typography hierarchy, word-level keyframing, color theory for text overlays, and mobile accessibility standards.",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "founder-led-video-growth",
    title: "The Founder-Led Video Strategy: Building a Personal Brand That Drives Pipeline",
    category: "Growth",
    date: "2025-04-29",
    description: "How tech founders and CEOs use personal brand video marketing on LinkedIn, YouTube, and X to attract enterprise buyers and top-tier talent.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "b2b-video-marketing-roi-metrics",
    title: "Video Marketing ROI: The Exact Metrics Every High-Growth SaaS Should Track",
    category: "Strategy",
    date: "2025-04-25",
    description: "Move beyond vanity metrics: calculate the true ROI of B2B video marketing with view retention curves, pipeline velocity, CAC reduction, and demo conversion.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
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
    title: "Motionly Media | Premier Video Editing, Video Marketing & Production Agency",
    description: "Motionly Media is the premier high-retention video editing, video marketing, and commercial video production agency. Serving market leaders across the US, UK, Canada, Australia, and worldwide. Scale your brand with VSLs, SaaS product videos, and founder-led content.",
    keywords: "video editing agency, video marketing agency, video production company, high-retention video editing, video editing agency in Bangladesh, video production BD, SaaS video production, YouTube video editor, VSL production, commercial video agency, Motionly Media",
    h1: "Global High-Retention Video Editing, Video Marketing & Video Production Agency",
    bodyContent: `
      <header class="crit-nav" aria-label="Main Navigation">
        <a href="/" aria-label="Motionly Media Home">
          <picture>
            <source srcset="/nav_logo.webp" type="image/webp" />
            <img src="/nav_logo.webp" alt="Motionly Media" width="120" height="28" fetchpriority="high" />
          </picture>
        </a>
        <a href="/contact" class="talk-btn">LET'S TALK! &nearr;</a>
      </header>

      <section class="crit-hero">
        <div class="site-container">
          <div class="crit-badge">
            <span class="crit-badge-dot"></span>
            <span>High-Retention Video Agency &bull; Global Reach</span>
            <span style="color:#3b82f6">&rsaquo;</span>
          </div>
          <h1 class="crit-h1">
            Product videos <span class="crit-gradient-text">that just work</span>
          </h1>
          <p class="crit-lede">
            Story-led video editing, B2B SaaS video marketing, and high-retention commercial video production for market leaders worldwide.
          </p>
          <div>
            <a href="/contact" class="crit-cta-btn">GET YOUR PRODUCT VIDEO</a>
          </div>
          <div class="crit-video-card">
            <img src="https://img.youtube.com/vi/q7hCvbfvRPU/maxresdefault.jpg" alt="Motionly Media showreel video thumbnail" width="1280" height="720" style="width:100%;height:100%;object-fit:cover" fetchpriority="high" decoding="async" />
            <div class="crit-play-btn">
              <div class="crit-play-circle">
                <div class="crit-play-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="site-services-overview">
        <h2>Core Creative &amp; Production Pillars</h2>
        <p>Motionly Media bridges strategic video marketing with Hollywood-caliber post-production. Our core systems are designed to maximize viewer hold rate, watch time, and conversion velocity:</p>
        
        <article>
          <h3>01. High-Retention Video Editing</h3>
          <p>Deliberate pacing, psychoacoustic sound design, kinetic typography, and story-led visual choices. Built specifically for YouTube long-form, viral short-form (Reels, TikTok, Shorts), and commercial advertisements. Every cut is engineered using audience psychology to eliminate drop-off points in the first 3 seconds and maintain viewer attention until the final frame.</p>
          <ul>
            <li>Frame-accurate pacing and pattern interrupts</li>
            <li>Custom 2D/3D kinetic typography and captions</li>
            <li>Multi-layer Foley, sub-bass impacts, and cinematic sound design</li>
            <li>Commercial color grading calibrated for OLED and mobile screens</li>
          </ul>
        </article>

        <article>
          <h3>02. Full-Cycle Video Marketing &amp; VSL Production</h3>
          <p>Video built to drive measurable revenue, sales pipeline, and brand authority. We develop high-converting Video Sales Letters (VSLs), product launch videos, software feature explainers, and founder-led video marketing engines that turn cold traffic into paying customers.</p>
          <ul>
            <li>High-converting B2B SaaS Product Launch Videos</li>
            <li>Video Sales Letters (VSLs) engineered for high checkout conversion</li>
            <li>YouTube Channel Growth and Content Distribution Systems</li>
            <li>Founder-Led Personal Brand Video Systems on LinkedIn and YouTube</li>
          </ul>
        </article>

        <article>
          <h3>03. Commercial Video Production &amp; 3D Motion Graphics</h3>
          <p>From scriptwriting and creative direction to 3D software walk-throughs and visual effects, we bring complex digital products to life. We specialize in transforming abstract SaaS platforms, fintech solutions, and developer tools into visually arresting, easy-to-understand motion narratives.</p>
          <ul>
            <li>3D Product Renders and UI Motion Design</li>
            <li>Broadcast-quality Commercial Video Finishing</li>
            <li>Scriptwriting, Storyboarding, and Narrative Direction</li>
            <li>Venture Pitch Videos and Demo Day Presentations</li>
          </ul>
        </article>
      </section>

      <section class="site-geographic-authority">
        <h2>Global Reach &amp; High-Retention Video Production</h2>
        <p>Motionly Media operates as a global creative engine with its primary production hub headquartered in Dhaka, Bangladesh (BD), serving enterprise brands and venture-backed startups across Tier-1 markets worldwide.</p>
        
        <article>
          <h3>Premier Video Editing &amp; Video Production Agency in Bangladesh (BD)</h3>
          <p>Motionly Media pairs elite homegrown directorial, editorial, and motion design talent with Silicon Valley production standards. Our team provides global enterprises, fast-growing startups, and local innovators with global-standard video assets that compete on the world stage.</p>
        </article>

        <article>
          <h3>Dedicated International Hubs: US, UK, Canada, Australia &amp; Europe</h3>
          <p>Our remote-first infrastructure is calibrated for seamless global delivery. We work directly with marketing teams, founders, and creators across New York, San Francisco, London, Toronto, Sydney, and Berlin. With 24/7 asynchronous workflows, guaranteed 24-48 hour sprint turnaround times, and frame-accurate review systems via Frame.io, collaborating with Motionly feels like having an in-house studio right down the hall.</p>
        </article>
      </section>

      <section class="site-comparison-matrix">
        <h2>The Motionly Difference: Comparison Matrix</h2>
        <p>Why market leaders choose Motionly Media over traditional agencies or freelance marketplaces:</p>
        <table>
          <thead>
            <tr>
              <th>Feature &amp; Standard</th>
              <th>Motionly Media</th>
              <th>Freelance Video Editors</th>
              <th>Traditional Legacy Agencies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Creative Direction</strong></td>
              <td>Dedicated Creative Director &amp; Story Strategist on every project</td>
              <td>Rarely offered; execution only without narrative strategy</td>
              <td>Assigned to junior account managers with heavy overhead</td>
            </tr>
            <tr>
              <td><strong>Retention Engineering</strong></td>
              <td>Audience psychology, cold hooks, and pattern interrupts built-in</td>
              <td>Basic jump-cuts without retention data analysis</td>
              <td>Slow broadcast pacing unsuited for digital platforms</td>
            </tr>
            <tr>
              <td><strong>Turnaround Speed</strong></td>
              <td>Guaranteed 24-48 hours for short-form; 3-5 days for long-form</td>
              <td>Unpredictable delays and frequent ghosting</td>
              <td>Weeks to months of bureaucratic revision cycles</td>
            </tr>
            <tr>
              <td><strong>Sound &amp; Motion Polish</strong></td>
              <td>Multi-track SFX Foley, licensed score, 3D motion graphics included</td>
              <td>Stock music with minimal or generic sound effects</td>
              <td>Billed as expensive add-on line items</td>
            </tr>
            <tr>
              <td><strong>Pricing Structure</strong></td>
              <td>Transparent flat-rate monthly retainers or fixed project sprints</td>
              <td>Variable hourly billing with uncertain totals</td>
              <td>Inflated five-figure minimum retainers and hidden fees</td>
            </tr>
            <tr>
              <td><strong>Revision Workflow</strong></td>
              <td>Frame-accurate feedback via Frame.io with rapid turnaround</td>
              <td>Messy email chains and mismatched timestamps</td>
              <td>Protracted meetings and committee sign-offs</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="site-faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <dl>
          <dt><strong>What makes Motionly Media the premier video editing and video marketing agency?</strong></dt>
          <dd>Motionly Media combines audience psychology, high-retention editing frameworks, custom 3D motion design, and cinematic sound engineering. Rather than simply trimming footage, Motionly engineers videos to maximize viewer hold rate, watch time, and conversion velocity for YouTube creators, B2B SaaS brands, and venture-backed startups.</dd>

          <dt><strong>How does Motionly Media maintain global production standards?</strong></dt>
          <dd>Motionly Media pairs elite homegrown creative direction and technical talent with global Silicon Valley production standards. Operating from Bangladesh with an international reach, Motionly produces world-class work for clients across the United States, United Kingdom, Canada, Australia, and Europe with 24/7 dedicated workflows.</dd>

          <dt><strong>Which countries and timezones does Motionly Media support?</strong></dt>
          <dd>Motionly Media serves clients worldwide, with dedicated client bases across the United States (EST, CST, PST), United Kingdom (GMT), Canada, Australia (AEST), Germany, and Bangladesh (BST). Our streamlined asynchronous communication ensures seamless turnaround regardless of your local timezone.</dd>

          <dt><strong>What video formats and deliverables do you produce?</strong></dt>
          <dd>We specialize in YouTube long-form documentary and talking-head videos, high-converting VSLs (Video Sales Letters), B2B SaaS product launch videos, viral short-form clips (TikTok, Instagram Reels, YouTube Shorts), 3D software explainer animations, and founder-led personal branding content.</dd>

          <dt><strong>What is the typical turnaround time for video projects?</strong></dt>
          <dd>For short-form videos and micro-content, our standard turnaround is 24 to 48 hours. For complex long-form YouTube episodes, VSLs, and product walk-throughs, turnaround is typically 3 to 5 business days, with sprint options available.</dd>

          <dt><strong>How does high-retention video editing increase revenue and ROI?</strong></dt>
          <dd>High-retention editing directly increases average view duration (AVD) and engagement signals, which triggers search and social algorithms to distribute your content to larger audiences. For B2B software and commercial products, retention-engineered VSLs and explainer videos keep prospects engaged until the call-to-action, significantly lowering customer acquisition costs (CAC) and increasing sales conversion rates.</dd>
        </dl>
      </section>

      <section class="site-cta-banner">
        <h2>Ready to Scale Your Brand with High-Retention Video?</h2>
        <p>Book a discovery strategy call with our creative directors or explore our client case studies today.</p>
        <p><a href="/contact">Book a discovery call &rarr;</a> | <a href="/portfolio">Browse video case studies &rarr;</a> | <a href="/services">Explore creative services &rarr;</a></p>
      </section>
    `
  },
  {
    path: "/services",
    title: "Video Editing, Video Marketing & Production Services | Motionly Media",
    description: "High-retention video editing, B2B SaaS video marketing, commercial video production, and VSL creation. Serving the US, UK, Canada, Australia, and ambitious brands worldwide.",
    keywords: "video editing services, video marketing agency, commercial video production, VSL production, YouTube video editor, 3D motion graphics, SaaS explainer video, Motionly Media",
    h1: "Full-Cycle Video Editing, Video Marketing & Commercial Video Production Services",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">End-to-End Video Production &amp; Marketing Solutions</p>
        <h1>Full-Cycle Video Editing, Video Marketing &amp; Commercial Video Production Services</h1>
        <p class="site-page-hero__lede">From the first idea to the final master render, Motionly Media unifies strategic video marketing with Hollywood-level post-production. Serving ambitious brands in the United States, United Kingdom, Canada, Australia, and market leaders worldwide.</p>
        <div>
          <a href="/contact" class="site-button">Discuss a video project</a>
          <a href="/portfolio" class="site-button">View video case studies</a>
        </div>
      </section>

      <section class="site-services-list">
        <article>
          <h2>01. High-Retention Video Editing (YouTube &amp; Viral Short-Form)</h2>
          <p>We craft high-retention video edits engineered specifically for YouTube long-form, podcasts, talking-head authority channels, Instagram Reels, TikTok, and YouTube Shorts. Our editors apply cognitive retention hooks, pattern interrupts, and psychoacoustic audio mastery to ensure maximum view duration.</p>
          <ul>
            <li>Long-form YouTube video editing and documentary pacing</li>
            <li>Viral short-form micro-content editing (Reels, TikTok, Shorts)</li>
            <li>Custom 2D/3D kinetic typography and subtitle styling</li>
            <li>Cinematic color grading and OLED mobile optimization</li>
          </ul>
        </article>

        <article>
          <h2>02. B2B SaaS Video Marketing &amp; High-Converting VSLs</h2>
          <p>We engineer Video Sales Letters (VSLs) and software product videos that solve customer objections and accelerate sales pipeline. Perfect for Product Hunt launches, demo pages, and venture pitch decks.</p>
          <ul>
            <li>High-converting SaaS product walkthroughs and feature demos</li>
            <li>Direct-response Video Sales Letters (VSLs) for customer acquisition</li>
            <li>Product launch teasers and social campaign cutdowns</li>
            <li>Conversion-optimized scripting and storytelling frameworks</li>
          </ul>
        </article>

        <article>
          <h2>03. Commercial Video Production &amp; 3D Motion Graphics</h2>
          <p>For brands needing broadcast-quality visual identity and sophisticated motion design. We create 3D product animations, UI mockups, and commercial video advertisements that command respect.</p>
          <ul>
            <li>3D product modeling, rendering, and visual effects</li>
            <li>Kinetic UI/UX interface mockups for web and mobile software</li>
            <li>Commercial audio design, Foley, and licensed music licensing</li>
            <li>Broadcast-standard finishing and delivery formats</li>
          </ul>
        </article>

        <article>
          <h2>04. Founder-Led Personal Branding Systems</h2>
          <p>We build turnkey video creation engines for CEOs, founders, and industry leaders. We help you establish undeniable authority on LinkedIn and YouTube without spending hours editing or scripting.</p>
          <ul>
            <li>Podcast and interview repurposing into high-performing video clips</li>
            <li>Executive content calendar, hook drafting, and editorial direction</li>
            <li>Multi-platform distribution packaging (YouTube, LinkedIn, X, TikTok)</li>
            <li>Audience retention analysis and ongoing format optimization</li>
          </ul>
        </article>
      </section>

      <section class="site-service-locations">
        <h2>Global Availability &amp; Regional Hubs</h2>
        <p>Motionly Media provides full-cycle video editing and marketing services to clients worldwide, including:</p>
        <ul>
          <li><strong>North America:</strong> United States (New York, San Francisco, Austin, Los Angeles) &amp; Canada (Toronto, Vancouver).</li>
          <li><strong>Europe &amp; UK:</strong> United Kingdom (London, Manchester), Germany (Berlin, Munich), and across the EU.</li>
          <li><strong>Asia-Pacific &amp; Australia:</strong> Australia (Sydney, Melbourne) and global tech ecosystems.</li>
          <li><strong>Bangladesh (Dhaka Headquarters):</strong> Creative operations hub delivering Silicon Valley quality standards locally and internationally.</li>
        </ul>
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
    title: "About Motionly Media | Global Video Marketing & Production Studio",
    description: "Meet Motionly Media—an elite team of video editors, directors, and strategists. Operating from Bangladesh with global Silicon Valley standards for clients in the US, UK, Canada, Australia, and Europe.",
    keywords: "about Motionly Media, video editing agency in Bangladesh, top video production BD, video editors Dhaka, global video marketing agency, Motionly Media team, Abu Bakar Siddique",
    h1: "About Motionly Media | Global Video Marketing & Production Studio",
    bodyContent: `
      <section class="site-page-hero">
        <p class="site-kicker">About Motionly Media &bull; Elite Global Video Studio</p>
        <h1>About Motionly Media | Global Video Marketing &amp; Production Studio</h1>
        <p class="site-page-hero__lede">Motionly Media is an independent creative agency and production studio partnering with creators, tech leaders, and growing brands worldwide. Born with an international ambition, we operate from Dhaka, Bangladesh with Silicon Valley production standards, serving market leaders across the United States, United Kingdom, Canada, Australia, and Europe.</p>
        <div>
          <a href="/contact" class="site-button">Connect with our team</a>
          <a href="/portfolio" class="site-button">Explore our work</a>
        </div>
      </section>

      <section class="site-about-content">
        <h2>Why Motionly Media Exists</h2>
        <p>Publishing more videos is not a strategy on its own. The concept, the hook, the psychological pacing, and the visual execution dictate whether a viewer keeps watching and remembers the brand behind it. Motionly brings those pieces together into one seamless, high-velocity creative operation.</p>

        <h2>Our Core Pillars</h2>
        <ol>
          <li><strong>Editorial Judgment:</strong> Every cut serves the narrative. We shape pacing, psychoacoustic audio, and visual dynamics around the specific audience you need to convert.</li>
          <li><strong>A Dependable, High-Velocity Team:</strong> Editors, motion designers, and strategists work as one unified team, with clear ownership from initial brief to final master delivery.</li>
          <li><strong>Measured Improvement:</strong> We study retention curves and watch-time drop-offs to make every subsequent release sharper, more engaging, and more profitable.</li>
          <li><strong>Global Standards, Homegrown Excellence:</strong> Proudly based in Bangladesh, we prove that world-class creative production, technical innovation, and customer experience can originate from BD to serve Tier-1 global markets.</li>
        </ol>

        <h2>Worldwide Collaboration</h2>
        <p>Whether you are a SaaS founder in San Francisco, an e-commerce brand in London, or an enterprise in Dhaka, our asynchronous Frame.io review loops and 24-48 hour sprint timelines make working together frictionless.</p>

        <p><a href="/services">View our services &rarr;</a> | <a href="/portfolio">Browse our portfolio &rarr;</a> | <a href="/contact">Book a strategy call &rarr;</a></p>
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
        <h1>Contact Motionly Media | Book a Video Strategy Call</h1>
        <p class="site-page-hero__lede">Schedule a 30-minute high-retention video strategy call with Motionly Media or write directly to <a href="mailto:hello@motionly.media">hello@motionly.media</a>.</p>
        <p><a href="https://cal.com/motionly-media-rdgfxc/30min" class="site-button">Book Strategy Session on Cal.com &rarr;</a></p>
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

  // Inlined Critical CSS for instant FCP and zero layout shift
  const criticalCss = `
  :root { --paper: #ffffff; --ink: #0f172a; --brand: #2563eb; --body: #334155; --muted: #475569; }
  html.dark, body.dark { --paper: #05070f; --ink: #ffffff; --brand: #38bdf8; --body: #cbd5e1; --muted: #94a3b8; }
  html { scroll-behavior: smooth; font-family: 'Outfit', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
  body { margin: 0; padding: 0; background-color: var(--paper); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  * { box-sizing: border-box; }
  a { color: inherit; text-decoration: none; }
  .site-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  @media (min-width: 640px) { .site-container { padding: 0 1.5rem; } }
  .crit-nav { position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); width: calc(100% - 2rem); max-width: 1120px; height: 64px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(226, 232, 240, 0.9); border-radius: 9999px; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; z-index: 50; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04); }
  html.dark .crit-nav { background: rgba(10, 14, 26, 0.85); border-color: rgba(255, 255, 255, 0.1); }
  .crit-nav img { height: 28px; width: auto; display: block; }
  .crit-nav .talk-btn { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.5rem 1.25rem; background: #2563eb; color: #ffffff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; border-radius: 9999px; text-transform: uppercase; }
  .crit-hero { position: relative; padding-top: 6.5rem; padding-bottom: 3.5rem; text-align: center; }
  @media (min-width: 640px) { .crit-hero { padding-top: 8.5rem; padding-bottom: 5rem; } }
  .crit-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 1rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.025em; color: #1e3a8a; background: rgba(239, 246, 255, 0.9); border: 1px solid rgba(191, 219, 254, 0.9); border-radius: 9999px; margin-bottom: 1.5rem; }
  html.dark .crit-badge { color: #93c5fd; background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.1); }
  .crit-badge-dot { width: 6px; height: 6px; border-radius: 9999px; background: #2563eb; }
  html.dark .crit-badge-dot { background: #38bdf8; }
  .crit-h1 { font-size: 2.25rem; line-height: 1.08; font-weight: 900; letter-spacing: -0.03em; margin: 0 auto 1.25rem auto; max-width: 56rem; color: #020617; }
  html.dark .crit-h1 { color: #ffffff; }
  .crit-gradient-text { display: inline-block; background: linear-gradient(to right, #1d4ed8, #2563eb, #4f46e5); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #2563eb; }
  html.dark .crit-gradient-text { background: linear-gradient(to right, #ffffff, #bfdbfe, #38bdf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #38bdf8; }
  .crit-lede { font-size: 1rem; line-height: 1.6; color: #334155; max-width: 42rem; margin: 0 auto 2rem auto; font-weight: 500; }
  html.dark .crit-lede { color: #cbd5e1; }
  @media (min-width: 640px) { .crit-lede { font-size: 1.15rem; margin-bottom: 2.5rem; } }
  .crit-cta-btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.875rem 2.25rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; background: #2563eb; color: #ffffff; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.35); }
  .crit-video-card { position: relative; width: 100%; max-width: 64rem; margin: 2.5rem auto 0 auto; aspect-ratio: 16 / 9; border-radius: 1rem; overflow: hidden; background: #0f172a; border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 20px 50px rgba(37, 99, 235, 0.12); }
  @media (min-width: 640px) { .crit-video-card { border-radius: 1.5rem; } }
  .crit-video-card picture, .crit-video-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .crit-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.2); }
  .crit-play-circle { width: 4rem; height: 4rem; border-radius: 9999px; background: rgba(255, 255, 255, 0.95); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
  @media (min-width: 640px) { .crit-play-circle { width: 5rem; height: 5rem; } }
  .crit-play-icon { width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 16px solid #2563eb; margin-left: 4px; }
  `;

  // Apply critical CSS and convert render-blocking stylesheet to async preload
  let optimizedBaseHtml = baseHtml
    .replace('</head>', `<style id="motionly-critical-css">${criticalCss}</style>\n  </head>`)
    .replace(
      /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/i,
      '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
    );

  for (const page of PAGES) {
    const canonicalUrl = `${BASE_URL}${page.path === '/' ? '/' : page.path}`;
    const pageImage = page.image || 'https://motionly.media/og-image-v2.png';

    let html = optimizedBaseHtml;

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
            <header class="ssr-nav sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">
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
