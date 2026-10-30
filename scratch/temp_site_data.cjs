var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/useSiteData.ts
var useSiteData_exports = {};
__export(useSiteData_exports, {
  DEFAULT_BLOGS: () => DEFAULT_BLOGS,
  DEFAULT_CONTACT: () => DEFAULT_CONTACT,
  DEFAULT_DIFFERENCE: () => DEFAULT_DIFFERENCE,
  DEFAULT_FAQS: () => DEFAULT_FAQS,
  DEFAULT_GLOBAL: () => DEFAULT_GLOBAL,
  DEFAULT_HERO: () => DEFAULT_HERO,
  DEFAULT_LAYOUT: () => DEFAULT_LAYOUT,
  DEFAULT_PAIN_POINTS: () => DEFAULT_PAIN_POINTS,
  DEFAULT_PARTNERS: () => DEFAULT_PARTNERS,
  DEFAULT_PARTNERS_SETTINGS: () => DEFAULT_PARTNERS_SETTINGS,
  DEFAULT_PORTFOLIO: () => DEFAULT_PORTFOLIO,
  DEFAULT_PRICING_PLANS: () => DEFAULT_PRICING_PLANS,
  DEFAULT_PROCESS: () => DEFAULT_PROCESS,
  DEFAULT_SEO: () => DEFAULT_SEO,
  DEFAULT_TEAM: () => DEFAULT_TEAM,
  DEFAULT_TESTIMONIALS: () => DEFAULT_TESTIMONIALS,
  useCollection: () => useCollection,
  useHeroSettings: () => useHeroSettings,
  usePartners: () => usePartners,
  useSiteSettings: () => useSiteSettings,
  useTeam: () => useTeam
});
module.exports = __toCommonJS(useSiteData_exports);
var import_react = require("react");
var import_firebaseLazy = require("./firebaseLazy");

// src/lib/staticBlogs.ts
var STATIC_BLOGS = [
  {
    id: "saas-launch-video-guide",
    title: "The Anatomy of a High-Retention SaaS Product Launch Video",
    category: "SaaS",
    date: "May 24, 2025",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    summary: "Discover the exact 60-second launch video blueprint used by top Product Hunt #1 products and high-growth SaaS startups to turn casual viewers into paying users.",
    seoTitle: "High-Retention SaaS Launch Video Blueprint | Motionly Media",
    seoDescription: "Step-by-step breakdown of high-retention SaaS product launch videos: kinetic 3D cameras, UI highlights, pacing benchmarks, and script frameworks.",
    content: `When launching a SaaS product, founders often make the critical mistake of treating a launch video like a software tutorial. They open a screen recorder, speak monotonically over standard click-throughs, and wonder why 70% of viewers abandon the video before the 10-second mark.

A launch video is not documentation; it is an emotional and commercial weapon. Its sole job is to transfer the urgency, power, and elegance of your software into the viewer's brain before their attention drifts.

Here is the exact structural blueprint Motionly Media uses to engineer high-retention SaaS launch videos that drive Product Hunt #1 finishes and multi-million dollar ARR expansions.

### 1. The Friction Hook (0:00 - 0:08)
Never start with your company logo spinning on screen. The viewer does not care who you are yet; they care about their immediate pain.

Open directly inside the painful reality of your customer's status quo:
- **Visual:** Chaotic, messy workflows\u2014endless spreadsheets, fragmented browser tabs, or confusing dashboard errors.
- **Audio:** Fast, tense ambient sound design with subtle dissonance.
- **Script:** A piercing statement that calls out the unspoken frustration. E.g., *"Modern sales teams spend 64% of their week updating CRM fields nobody ever looks at."*

### 2. The Paradigm Shift (0:08 - 0:18)
Introduce your core concept not as another incremental feature, but as a technological leap forward.
- **Camera Work:** Transition from flat, messy screen captures into an elevated 3D canvas.
- **Lighting & Contrast:** Shift the palette from dull grays to your signature brand glow.
- **Key Takeaway:** The viewer must instantly understand the new way to work.

### 3. Kinetic Feature Velocity (0:18 - 0:42)
Demonstrate your 3 most powerful features with kinetic motion graphics rather than raw UI clicks.
- **Zoom & Depth of Field:** Blur background navigation to guide the viewer's eyes directly to the cursor action.
- **Spatial UI Accents:** Lift buttons and cards into isometric layers to give digital software tangible physical presence.
- **Sound Design Sync:** Match every interaction\u2014switches, chart generations, exports\u2014with tactile foley (soft mechanical clicks, satisfying swooshes, resonant sub-drops).

### 4. Measurable Proof & Transformation (0:42 - 0:52)
Back up visual elegance with indisputable metric proof:
- Showcase live metric dials accelerating: *"3.4x faster turnaround"*, *"Zero manual input"*, *"50+ enterprise integrations"*.
- Highlight customer validation badges, G2 ribbons, or trusted founder avatars.

### 5. Frictionless Call-to-Action (0:52 - 1:00)
End with clarity. Provide a clear visual cue of the URL, free trial offer, or demo booking link alongside a decisive brand sonic identity.

Great launch videos don't just explain software\u2014they make using your product feel inevitable.`
  },
  {
    id: "yc-demo-pitch-videos",
    title: "How YC Startups Use 60-Second Videos to Close Multi-Million Dollar Seed Rounds",
    category: "Strategy",
    date: "May 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    summary: "Venture capitalists review hundreds of decks a week. Here is how Y Combinator founders use 60-second demo videos to cut through the noise and pack their investor calendars.",
    seoTitle: "YC Demo Video Strategy for Seed & Series A Funding | Motionly",
    seoDescription: "How top venture-backed startups structure 60-second pitch videos to convince Tier-1 investors, ignite FOMO, and secure oversubscribed investment rounds.",
    content: `Venture capitalists review hundreds of slide decks each week. A static 15-slide PDF rarely evokes the momentum required to spark an instant partner meeting. 

The secret weapon of modern Y Combinator, Techstars, and seed-stage founders is the **60-Second Video Pitch**: a condensed, cinematic artifact that delivers the vision, technical moat, and customer love in under one minute.

### The Psychology of the Investor Video
Investors are evaluating three core signals in the first 30 seconds:
1. **Founder Velocity:** Can this team articulate complex technological value simply and crisply?
2. **Product Realness:** Is this a working, beautiful product that solves an urgent bottleneck today?
3. **Market Inevitability:** Does this feel like the category-defining software of the next decade?

### The 4-Part Structure of an Investor Video

#### Phase 1: The Urgent Macro Tailwinds (12 Seconds)
Anchor your solution in an undeniable industry shift.
- Don't say: *"We built an AI tool for customer service."*
- Do say: *"Support tickets grew 400% this year, while headcount budgets were cut in half. Companies are bleeding $40B annually on human triage that should happen in milliseconds."*

#### Phase 2: The Working Engine (24 Seconds)
This is where 90% of pitch videos stumble. Avoid high-level conceptual sketches. Show real software executing complex tasks seamlessly.
- Use dynamic pan-and-zooms across real API outputs.
- Display end-to-end workflows in fast-forward motion, accented with kinetic typographic annotations highlighting patent-pending algorithms.

#### Phase 3: Unfair Traction & Retention (14 Seconds)
Numbers speak louder than adjectives. Use animated counters to showcase:
- MoM revenue growth percentages.
- Logo walls of iconic early design partners.
- Daily active usage retention curves outperforming industry benchmarks.

#### Phase 4: The Bold Horizon (10 Seconds)
Finish with the multi-billion-dollar future state. Invite the investor into the journey with confidence:
- *"We are building the autonomous backbone for global logistics. Join our seed round today."*

When an investor finishes your 60-second video, their immediate reaction should be opening WhatsApp to text their partner: *"Have you seen this team yet?"*`
  },
  {
    id: "vsl-vs-product-demo",
    title: "VSL vs. Product Demo: Which Video Format Converts Highest for B2B Software?",
    category: "Strategy",
    date: "May 19, 2025",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    summary: "Confused between producing a direct-response Video Sales Letter (VSL) or a kinetic Product Demo? Learn when to deploy each format for maximum pipeline conversion.",
    seoTitle: "VSL vs Product Demo: Best Video Format for B2B Conversion",
    seoDescription: "Compare VSLs and B2B product demos: conversion rates, audience intent, funnel placement, sales velocity, and production frameworks.",
    content: `A frequent dilemma facing B2B growth leaders is determining which video format will produce the highest pipeline return:
- Should you invest in an authoritative **Video Sales Letter (VSL)** focused on customer psychology, proof, and sales framing?
- Or should you produce a sleek, kinetic **Product Demo** showcasing the user interface in high-definition glory?

The short answer: **They serve fundamentally different parts of the buyer's journey.** Deploying the wrong format at the wrong funnel stage will quietly kill your conversion rate.

### What is a High-Ticket B2B VSL?
A Video Sales Letter is a structured direct-response asset designed to dismantle buyer skepticism, establish authority, and compel a high-value action (such as scheduling an enterprise consultation or applying for a private tier).

**Best Suited For:**
- High Annual Contract Value (ACV) solutions ($10,000 - $100,000+).
- Cold paid acquisition (LinkedIn Ads, YouTube Discovery, Meta B2B campaigns).
- Complex consultative services, agency retainers, and enterprise software.
- Overcoming ingrained inertia and fear of switching vendors.

**The Key Strength:** A VSL articulates the financial and strategic cost of inaction. It doesn't just show *how* a tool functions; it proves *why* failing to adopt it threatens the buyer's market share.

---

### What is a Kinetic Product Demo?
A Kinetic Product Demo is a motion-designed walkthrough that showcases the speed, user interface, and delight of using your software. Rather than a static screen capture, it leverages 3D cameras, custom sound foley, and kinetic typography.

**Best Suited For:**
- Product-Led Growth (PLG) and self-serve freemium tools ($20 - $500/month).
- Mid-funnel website visitors, homepage heroes, and pricing page embeds.
- Retargeting prospects who have already viewed feature comparisons.
- Accelerating time-to-value for trial onboarding.

**The Key Strength:** Reducing cognitive load. Buyers can immediately envision themselves inside the tool enjoying frictionless workflows.

---

### The Hybrid "Motionly Approach"
At Motionly Media, we frequently engineer a **Hybrid VSL-Demo**:
1. **0:00 - 0:45 (VSL Framing):** Hook the executive pain point, cite market inefficiencies, and position the strategic advantage.
2. **0:45 - 2:00 (Kinetic Demo):** Prove the claim with rapid, gorgeous UI feature demonstrations.
3. **2:00 - 2:45 (Social Proof & Close):** Display enterprise case studies, security badges, and clear booking instructions.

This hybrid format captures both the CFO who cares about bottom-line ROI and the VP of Product who demands superior user experience.`
  },
  {
    id: "science-of-the-first-3-seconds",
    title: "The Science of the First 3 Seconds: Cold Hooks That Stop the Scroll",
    category: "Editing",
    date: "May 16, 2025",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    summary: "Analyze the neuroscience of viewer attention: how micro-framing, sensory mismatches, and visual pattern interrupts prevent viewers from swiping past your videos.",
    seoTitle: "The Science of 3-Second Video Hooks | High-Retention Editing",
    seoDescription: "Master the psychology of scroll-stopping video hooks: pattern interrupts, auditory cues, cognitive dissonance, and frame pacing.",
    content: `Attention spans have not declined; rather, the human brain's **consideration filter** has evolved to become ruthless.

When an individual scrolls through LinkedIn, TikTok, YouTube Shorts, or X, their visual cortex evaluates whether a video warrants cognitive investment in approximately **180 milliseconds**.

If your video opens with a slow fade from black, a generic introductory greeting (*"Hey everyone, welcome back to my channel..."*), or a boring static slide, the thumb executes an involuntary swipe before your value proposition is even spoken.

Here is the cognitive science behind hooks that retain over 80% of viewers past the critical 3-second drop-off curve.

### 1. The Dopaminergic Visual Mismatch
The human brain is an anticipation engine. It constantly predicts what comes next based on familiar patterns. When what appears on screen matches expectations, dopamine levels remain flat and the brain disengages.

To trigger an attention spike, create an immediate visual contrast:
- **Spatial Subversion:** Start zoomed into an intriguing micro-detail before pulling back rapidly with a motion blur snap.
- **Physical vs. Digital Collisions:** Blend physical props (like tearing a paper invoice) with digital UI animations.
- **Unexpected Environments:** Deliver high-level B2B engineering commentary against an unexpected, visually compelling cinematic backdrop.

### 2. The Auditory Pattern Interrupt
Sound travels to the brain faster than light. A viewer often registers an auditory change before their eyes fully focus on the frame.
- **The Pre-Frame Breath:** Eliminate the 300ms of dead silence before speech starts. Cut directly into the first syllable.
- **Foley Punctuation:** Pair your opening word with a sharp, crisp mechanical cue (a typewriter clack, a clean whoosh, or a subtle record scratch).
- **Sub-Bass Riser:** An undetectable 40Hz sub-bass frequency rising in the background creates subconscious urgency.

### 3. The Negative Knowledge Gap
Phrasing questions that highlight hidden risks converts at almost 2x the rate of positive promises:
- *Positive (Weak):* "Here is how you can improve your team's code reviews."
- *Negative (Strong):* "94% of engineering teams are making this silent deployment mistake every Friday afternoon."

By establishing an unresolved knowledge deficit in the first sentence, the brain feels cognitive tension that can only be resolved by continuing to watch.

At Motionly, we test dozens of hook variations on every hero production. Master the first 3 seconds, and the rest of your video can do its job.`
  },
  {
    id: "3d-motion-graphics-software-demos",
    title: "3D Motion Graphics vs Screen Capture: How to Showcase Complex Software Visually",
    category: "Production",
    date: "May 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    summary: "Flat screen recordings make sophisticated software look clunky. Learn how 3D motion graphics, camera depth of field, and kinetic lighting elevate enterprise tools.",
    seoTitle: "3D Motion Graphics vs Screen Capture for SaaS Demos | Motionly",
    seoDescription: "Why leading technology brands use 3D motion design over screen recordings to showcase developer tools, cloud infrastructure, and fintech software.",
    content: `If you have ever attempted to explain a complex developer tool, multi-cloud infrastructure platform, or data pipeline using standard QuickTime screen recordings, you are intimately familiar with the pain:
- Dense tables of text become illegible on mobile devices.
- Tiny mouse pointers wandering across the screen fail to direct attention.
- The product feels static, clinical, and difficult to comprehend.

Top technology companies\u2014from Stripe and Linear to Figma and Retool\u2014have pioneered a different approach: **Kinetic 3D Motion Graphics**.

### Why Screen Capture Fails Modern Software

1. **Information Density Overload:** Modern software has dozens of navigation bars, status indicators, and side panels. In a raw screen recording, the viewer's eyes don't know where to look.
2. **Resolution & Scaling Issues:** 4K desktop monitors shrunk into a 1080p video or vertical 9:16 mobile frame produce tiny, blurry UI elements that frustrate viewers.
3. **Lack of Perceived Value:** Anyone can record a screen in five minutes. When enterprise buyers are evaluating six-figure contracts, high production value acts as an implicit proxy for engineering excellence.

---

### The 3D Motion Enhancement Framework

#### 1. Isometric UI Layering
Instead of presenting a flat 2D webpage, our animators break the user interface into distinct dimensional planes:
- The background canvas recedes.
- The active modal or card floats into the foreground with custom drop-shadows and real-time reflections.
- A virtual camera sweeps across the layer at a 45-degree angle, giving enterprise software the tactile feel of an Apple hardware release.

#### 2. Dynamic Depth of Field (DoF)
By setting a shallow focal plane on the exact metric card or code snippet being discussed, peripheral distractions are smoothly blurred out. The viewer's attention is magnetically pulled to what matters.

#### 3. Kinetic Abstraction
Sometimes, showing actual production data is overwhelming. We abstract messy database rows into clean, glowing nodes, pulsing lines, and satisfying data packets that illustrate the conceptual architecture instantly.

The result is software marketing that doesn't just explain your product\u2014it makes your product feel revolutionary.`
  },
  {
    id: "repurpose-long-form-to-viral-shorts",
    title: "How to Repurpose 1 Long-Form YouTube Video into 15 High-Performing Shorts",
    category: "Growth",
    date: "May 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    summary: "Stop burning out creating content from scratch. Discover the multi-platform repurposing engine that turns 45-minute webinars and podcasts into viral shorts.",
    seoTitle: "Content Repurposing Framework: YouTube to Viral Shorts | Motionly",
    seoDescription: "Step-by-step strategy to extract 15 high-retention micro-videos from one long-form episode, optimizing for TikTok, Instagram Reels, and YouTube Shorts.",
    content: `Producing high-quality long-form video content\u2014such as podcast interviews, keynote speeches, product webinars, or YouTube breakdowns\u2014demands massive intellectual energy.

Yet, most marketing teams publish the long-form episode once, share a link on social media, and watch it accumulate a modest few hundred views before fading into obscurity.

That is an immense waste of intellectual property. With a systematic **Content Extraction Engine**, a single 45-minute recording can be transformed into **15 high-performing vertical shorts** that generate millions of organic impressions across YouTube Shorts, Instagram Reels, TikTok, and LinkedIn.

### The 4-Tier Extraction Taxonomy

#### Category A: The Counter-Intuitive Hot Take (4 Clips)
Scan the transcript for moments where the speaker challenges common industry orthodoxy. 
- *Example:* "Why 90% of SaaS onboarding tours actually hurt user activation."
- *Editing Style:* Snappy cuts, immediate statement hook, bold kinetic text highlighting contrasting keywords.

#### Category B: The Tactical Framework (4 Clips)
Extract self-contained, 45-second educational lessons that deliver immediate value without requiring context from the rest of the interview.
- *Editing Style:* Step-by-step numbered visual cards (Step 1, Step 2, Step 3) with screen graphics demonstrating each point.

#### Category C: The Vulnerable Failure Story (4 Clips)
Audiences crave authentic founder struggles over sanitized corporate success. Moments where the speaker recounts an outage, fundraising rejection, or painful lesson perform exceptionally well.
- *Editing Style:* Slower camera zoom-in, warm background acoustic score, minimal flashy B-roll to preserve emotional intimacy.

#### Category D: The Provocative Question & Cliffhanger (3 Clips)
Pose a burning industry question, deliver two-thirds of the strategic solution, and direct viewers to the full-length YouTube video for the complete implementation.

### The Technical Polish Checklist
- **Vertical Re-framing:** Never post a horizontal letterbox video with black bars. Pan and scan the speaker into center frame, or use stacked multi-cam layouts.
- **Zero-Lag Subtitles:** Animate subtitles using dynamic color highlights (e.g. vibrant blue or neon green on active keywords) to sustain silent viewing comprehension.
- **Sound Redesign:** Layer subtle sound effects beneath every key point to reset the viewer's attention every 4 seconds.

Repurposing is not about spamming low-effort clips; it is about distilling pure signal from existing wisdom.`
  },
  {
    id: "sound-design-video-retention",
    title: "Audio Branding in Video Marketing: Why Sound Design Accounts for 50% of Retention",
    category: "Production",
    date: "May 07, 2025",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    summary: "Visuals get all the credit, but sound drives subconscious retention. Explore the psychoacoustics of cinematic sound design, foley, and spatial audio in modern video.",
    seoTitle: "The Power of Sound Design in Video Retention | Motionly Media",
    seoDescription: "Why audio is 50% of the video experience: explore psychoacoustics, spatial audio, sub-bass impacts, UI foley, and brand soundmarks.",
    content: `George Lucas famously said, *"The sound and music are 50% of the entertainment in a movie."* In direct-response video marketing and high-retention video editing, sound design accounts for even more than 50% of the psychological engagement.

Viewers can forgive slightly soft focus or modest camera lighting. But the moment audio sounds hollow, distorted, unbalanced, or devoid of tactile acoustic presence, the brain instantly flags the content as amateurish and checks out.

Here is how Motionly engineers proprietary soundscapes that keep audiences mesmerized.

### 1. Psychoacoustics & Sensory Anchoring
When a visual element transitions on screen\u2014such as a button clicking, a card sliding into view, or a metric graph updating\u2014the visual cortex processes the event. 

However, when that visual movement is simultaneously paired with a tailored acoustic impulse (a crisp wooden click, a glass tap, or a clean whoosh), both the auditory and visual cortices fire in unison. This phenomenon, known as **multisensory integration**, increases perceptual clarity and brand recall by over 300%.

### 2. The 4 Audio Layers of Every Motionly Video

#### Layer 1: Pristine Vocal Mastery
- Dynamic multi-band compression to ensure every syllable is crystal clear at any playback volume.
- Surgical de-essing and resonance removal to prevent harsh frequencies from fatiguing earbud wearers.
- Subtle warmth saturation that gives founders an authoritative, radio-grade vocal presence.

#### Layer 2: Tactile Interface Foley
- Realistic, bespoke UI sounds: soft tactile thuds for button presses, gentle paper rustles for downloads, and subtle electronic hums for AI generations.

#### Layer 3: Narrative Atmosphere & Risers
- Tension-building white noise sweeps, reverse cymbals, and vinyl crackles that subtly signal an impending insight or topic transition.

#### Layer 4: Harmonic Music Bed
- High-fidelity royalty-cleared tracks mixed dynamically via automated side-chain ducking. The music effortlessly dips when the speaker talks and swells to punctuate emotional crescendos.

### 3. Creating Your Brand's Sonic Signature
Think of Netflix's iconic *"Ta-Dum"* or Intel's 5-note chime. Having a distinct 2-second audio sonic watermark at the conclusion of every video cements instant subconscious brand equity.

Don't let your video production treat audio as an afterthought. Sound is the invisible thread that holds attention.`
  },
  {
    id: "kinetic-typography-best-practices",
    title: "Kinetic Typography Best Practices: Designing Captions People Actually Read",
    category: "Editing",
    date: "May 04, 2025",
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80",
    summary: "Over 75% of mobile videos are watched on mute. Master kinetic typography rules: word-by-word sync, contrast ratios, font psychology, and eye-tracking motion paths.",
    seoTitle: "Kinetic Typography & Dynamic Captions Guide | Motionly Media",
    seoDescription: "Master kinetic typography: typography hierarchy, word-level keyframing, color theory for text overlays, and mobile accessibility standards.",
    content: `Over 75% of mobile video consumption across LinkedIn, Instagram, and X occurs with the sound muted. If your video relies solely on spoken dialogue without exceptional on-screen typography, you are forfeiting three-quarters of your prospective audience.

Yet, bad captions can be just as destructive as no captions at all. Clunky, static subtitles that block half the frame or auto-generated text riddled with typos will degrade your brand's reputation.

Here are the industry rules for kinetic typography that maximizes reading comprehension and viewer retention.

### Rule #1: The Word-by-Word Synchronous Rhythm
Static sentence blocks force the viewer to read ahead, ruining the timing of the speaker's punchlines and insights.

Instead, utilize **dynamic word-by-word reveals**:
- Display 2 to 4 words per line maximum.
- Use an instantaneous scale or color highlight (such as electric blue or radiant yellow) as each syllable is voiced.
- Match text appearance with millisecond precision to the vocal onset.

### Rule #2: Typographic Hierarchy & Font Psychology
Not all typefaces communicate the same energy:
- **Bold Geometric Sans-Serifs** (e.g. Outfit, Montserrat, Archivo Black) communicate modern, high-velocity tech authority.
- **Clean Editorial Monospace** (e.g. JetBrains Mono, Fira Code) triggers associations with software engineering, technical precision, and data integrity.
- **Never use more than two typeface families** in a single video. Maintain consistent weights across headers and body captions.

### Rule #3: The Safe Zone & Contrast Guardrails
Mobile interfaces are cluttered with UI elements: like buttons, comment fields, account handles, and audio credits.
- Keep kinetic captions within the **Vertical Safe Zone** (between 25% from the top and 25% from the bottom of the screen).
- Never place white text directly against light backgrounds without a subtle text drop-shadow or a 15% dark translucent backdrop pill.
- Ensure minimum contrast ratios of 4.5:1 for accessibility across all mobile displays.

### Rule #4: Purposeful Motion, Not Distracting Chaos
Every animation should serve a narrative function. Text should:
- Snap in with a gentle elastic overshoot when emphasizing an exclamation.
- Drift subtly upward when describing growth, scalability, or progress.
- Never shake, rotate wildly, or spin without narrative justification.

Great typography turns written words into a rhythmic, visual dance that viewers can't stop reading.`
  },
  {
    id: "founder-led-video-growth",
    title: "The Founder-Led Video Strategy: Building a Personal Brand That Drives Pipeline",
    category: "Growth",
    date: "April 29, 2025",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    summary: "People buy from people, not faceless corporations. Learn how SaaS founders leverage authentic, high-retention video content to drive millions in pipeline.",
    seoTitle: "Founder-Led Video Strategy for B2B Pipeline Growth | Motionly",
    seoDescription: "How tech founders and CEOs use personal brand video marketing on LinkedIn, YouTube, and X to attract enterprise buyers and top-tier talent.",
    content: `In an era saturated with generic corporate press releases and AI-generated text blurbs, B2B buyers have become immune to faceless company accounts.

Buyers don't sign contracts with logos; they sign contracts with leaders they trust.

Founders who build a **Founder-Led Video Engine** unlock an unfair organic distribution channel that compounds over time. Whether raising capital, hiring senior engineers, or closing six-figure enterprise contracts, a strong video presence changes the entire trajectory of the business.

### Why Founder-Led Video Dominates B2B Sales

1. **Radical Transparency Trumps Corporate Polish:** Buyers want to see the mind behind the software. Hearing a founder speak openly about architecture decisions, industry challenges, and product philosophies builds deep emotional alignment.
2. **Algorithm Favoritism:** LinkedIn and X algorithms heavily prioritize personal member profiles over corporate brand pages. A post from a founder routinely receives 10x to 50x the organic reach of the company's official account.
3. **Shortened Sales Cycles:** Prospects who consume multiple founder videos before booking a sales call arrive pre-sold. They already understand your differentiation, agree with your philosophy, and view you as the authority in the space.

---

### The 3-Hour Monthly Founder Recording Routine
Most founders believe they don't have the time to produce video content. The reality is that an effective system requires only **3 hours of founder time per month**.

- **Week 1 (Ideation & Hook Mapping):** The agency identifies the 4 most pressing industry topics, customer objections, and technical debates based on your sales call recordings.
- **Week 2 (The 90-Minute Recording Sprint):** The founder sits down for a single 90-minute structured conversation with a creative director, answering targeted questions on camera.
- **Weeks 3-4 (Agency Turnaround):** The agency handles transcript trimming, high-retention editing, kinetic typography, b-roll integration, and multi-format exports.

By outsourcing the heavy lifting of post-production and editing to Motionly, the founder focuses entirely on sharing raw insight, while our studio delivers polished, high-converting digital assets.`
  },
  {
    id: "b2b-video-marketing-roi-metrics",
    title: "Video Marketing ROI: The Exact Metrics Every High-Growth SaaS Should Track",
    category: "Strategy",
    date: "April 25, 2025",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    summary: "Stop measuring vanity view counts. Learn the 5 commercial metrics that prove video marketing ROI: Average View Duration, pipeline velocity, and conversion lift.",
    seoTitle: "B2B Video Marketing ROI: Key Metrics to Track | Motionly Media",
    seoDescription: "Move beyond vanity metrics: calculate the true ROI of B2B video marketing with view retention curves, pipeline velocity, CAC reduction, and demo conversion.",
    content: `When marketing teams pitch video production budgets to executive leadership, the conversation often stalls on the same question: *"What is the concrete return on investment?"*

Too many agencies report vanity metrics: total impressions, superficial video views (which count after just 3 seconds of passive playback), and social media likes. These numbers look pleasing on slide decks, but they tell the CFO virtually nothing about bottom-line revenue.

To measure the true commercial impact of high-retention video production, high-growth SaaS teams must track these five core metrics.

### 1. Retention Rate & Average View Duration (AVD)
Total views mean nothing if 90% of the audience leaves in the first 5 seconds.
- **Benchmark:** Aim for at least **65% retention through the 50% mark** of your video, and **40%+ retention to the final call-to-action**.
- **Actionable Insight:** Examine your drop-off timestamps. If a steep cliff occurs at 0:14, your transition was slow or your script lost momentum. High-retention editing systematically smooths these drop-off cliffs.

### 2. Website & Landing Page Conversion Lift
Place your hero explainer video on a key product landing page and run an A/B split test against a page variant with static screenshots and copy only.
- **Target Lift:** High-retention SaaS videos consistently produce a **20% to 45% increase in trial signups or demo bookings**.
- **Calculation:** (Conversion Rate with Video - Conversion Rate without Video) / Conversion Rate without Video * 100

### 3. Pipeline Velocity & Sales Cycle Reduction
Track the average number of days it takes for an enterprise lead to move from initial discovery call to closed-won.
- Prospects who view an interactive product demo or founder VSL prior to their sales call typically close **25% faster** because the educational heavy lifting was performed asynchronously before the call began.

### 4. Customer Acquisition Cost (CAC) Reduction
By deploying high-retention video ads across LinkedIn and Meta, click-through rates (CTR) increase while cost-per-click (CPC) decreases due to higher ad relevance scores. Calculate your blended CAC across organic and paid channels before and after video deployment.

### 5. Sales Enablement Content Attribution
Equip your account executives with video snippets answering frequent technical objections (security compliance, API integration, data privacy). Track CRM metrics for deal progression when these video assets are included in follow-up email sequences.

When you track video performance through commercial metrics rather than vanity views, video shifts from being viewed as a discretionary expense to an indispensable growth engine.`
  }
];

// src/lib/useSiteData.ts
var DEFAULT_HERO = {
  badge: "Served 30+ Startups & Businesses",
  headline1: "Product videos",
  headline2: "that just work",
  subheadline: "Story-led video editing, 3D motion design, and high-retention launch videos for high-growth brands.",
  cta1: "GET YOUR PRODUCT VIDEO",
  cta1Link: "/contact",
  cta2: "View Showcase",
  cta2Link: "#work",
  socialProofText: "Founder Reviews",
  socialProofCount: "50+",
  showreelVideoId: "_1VaQCNUdnU"
};
var DEFAULT_TEAM = [
  { id: "1", name: "Abu Bakar Siddique", role: "Founder and CEO", img: "/employes/abu bakar.png", order: 1 },
  { id: "2", name: "Nazmul Hossen Shuvo", role: "COO and Head of Growth", img: "/employes/Nazmul Hossen Shuvo.jpg", order: 2 },
  { id: "3", name: "Raiyan", role: "Social Media Manager and Presenter", img: "/employes/Raiyan.jpg", order: 3 },
  { id: "4", name: "Mohammad Wasif Rahman", role: "Video Editor", img: "/employes/Wasif.png", order: 4 },
  { id: "5", name: "Abir Ratul", role: "Video Editor", img: "/employes/abir.png", order: 5 },
  { id: "6", name: "Barno", role: "Strategy Specialist", img: "/employes/barno.png", order: 6 }
];
var DEFAULT_SEO = {
  title: "Motionly Media | High-Retention Video Marketing & Editing Agency",
  description: "Scale your brand with high-retention video editing, VSL production, and content marketing systems. Explore Motionly Media's work and creative services.",
  image: "https://motionly.media/og-image-v2.png"
};
var DEFAULT_CONTACT = {
  calendlyUrl: "https://calendly.com/motionlymedia-help/30min",
  email: "hello@motionly.media",
  phone: "",
  facebook: "https://www.facebook.com/motionlymedia",
  instagram: "https://www.instagram.com/motionlymedia/",
  linkedin: "https://www.linkedin.com/company/motionlymedia/"
};
var DEFAULT_PROCESS = {
  title: "The Motionly Framework.",
  subtitle: "A simple 3 step framework we follow in every video.",
  description: "We handle the entire creative pipeline so you can focus on scale and growth.",
  steps: [
    {
      id: "step-1",
      label: "01",
      title: "Strategy",
      description: "Before we open the edit, we figure out what the video needs to do, who it needs to convince, and what action you want your buyer to take by the end.",
      icon: "Search",
      tags: ["Audience Context", "Hook Architecture", "Conversion Goal"],
      previews: []
    },
    {
      id: "step-2",
      label: "02",
      title: "Build",
      description: "Precision video editing, custom 3D/2D motion design, kinetic type, and cinematic sound engineering executed in rapid sprint cycles.",
      icon: "Wand2",
      tags: ["Kinetic Motion", "3D Animation", "Spatial Audio"],
      previews: []
    },
    {
      id: "step-3",
      label: "03",
      title: "Launch",
      description: "You get the final cut in two weeks, ready to go live across your website, paid ads, and outbound the moment it lands in your inbox.",
      icon: "Rocket",
      tags: ["Multi-Format Export", "Ad Testing", "Organic Virality"],
      previews: []
    }
  ]
};
var DEFAULT_DIFFERENCE = {
  title: "The Motionly approach",
  subtitle: "How we work",
  description: "Editing, creative direction, and a dependable production process in one place.",
  statusQuoTitle: "A fragmented workflow",
  statusQuoPoints: [
    "Creative direction changes between contributors",
    "Feedback and files are spread across tools",
    "The edit starts before the story is clear",
    "Publishing depends on one-off effort"
  ],
  motionlyTitle: "Motionly Media",
  motionlyPoints: [
    "A clear owner from brief to delivery",
    "Story-led editing and audience context",
    "A consistent review and delivery process",
    "Custom motion, sound, and finishing"
  ]
};
var DEFAULT_PAIN_POINTS = {
  title: "Make room for the work only you can do",
  subtitle: "A clearer production rhythm",
  description: "A dependable creative partner gives your team more time to plan, film, and build the next idea.",
  points: [
    "Editing takes time away from filming and planning",
    "Every new editor needs to learn your visual language",
    "Review cycles become difficult to keep consistent",
    "Publishing slows when the process lives in one person's head"
  ]
};
var DEFAULT_GLOBAL = {
  siteName: "Motionly Media",
  siteDescription: "Story-led video editing, motion design, and creative direction for creators and ambitious brands.",
  logoUrl: "/nav_logo.webp",
  faviconUrl: "/favicon.ico",
  maintenanceMode: false,
  maintenanceMessage: "We are currently updating our systems to serve you better. The site remains fully functional.",
  pageToggles: {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true
  }
};
var DEFAULT_LAYOUT = {
  homepageSections: [
    "hero",
    "testimonials",
    "difference",
    "portfolio",
    "process",
    "pricing",
    "team",
    "blog",
    "faqs",
    "contact"
  ]
};
function useHeroSettings() {
  const [hero, setHero] = (0, import_react.useState)(DEFAULT_HERO);
  (0, import_react.useEffect)(() => {
    let unsub;
    (0, import_firebaseLazy.getDb)().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists() && snap.data().hero) {
          setHero({ ...DEFAULT_HERO, ...snap.data().hero });
        }
      });
    });
    return () => unsub?.();
  }, []);
  return hero;
}
function useTeam() {
  const [team, setTeam] = (0, import_react.useState)(DEFAULT_TEAM);
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    let unsub;
    (0, import_firebaseLazy.getDb)().then(async (db) => {
      const { collection, query, orderBy, onSnapshot } = await import("firebase/firestore");
      const q = query(collection(db, "team"), orderBy("order", "asc"));
      unsub = onSnapshot(q, (snap) => {
        if (snap.empty) {
          setTeam(DEFAULT_TEAM);
        } else {
          const members = snap.docs.map((d) => {
            const data = d.data();
            return { ...data, id: d.id, img: data.img || "" };
          });
          setTeam(members);
        }
        setLoading(false);
      }, () => {
        setTeam(DEFAULT_TEAM);
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, []);
  return { team, loading };
}
function useSiteSettings() {
  const [settings, setSettings] = (0, import_react.useState)({
    hero: DEFAULT_HERO,
    seo: DEFAULT_SEO,
    contact: DEFAULT_CONTACT,
    process: DEFAULT_PROCESS,
    difference: DEFAULT_DIFFERENCE,
    painPoints: DEFAULT_PAIN_POINTS,
    global: DEFAULT_GLOBAL,
    layout: DEFAULT_LAYOUT
  });
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    let unsub;
    (0, import_firebaseLazy.getDb)().then(async (db) => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSettings({
            hero: { ...DEFAULT_HERO, ...data.hero || {} },
            seo: { ...DEFAULT_SEO, ...data.seo || {} },
            contact: { ...DEFAULT_CONTACT, ...data.contact || {} },
            process: { ...DEFAULT_PROCESS, ...data.process || {} },
            difference: { ...DEFAULT_DIFFERENCE, ...data.difference || {} },
            painPoints: { ...DEFAULT_PAIN_POINTS, ...data.painPoints || {} },
            global: { ...DEFAULT_GLOBAL, ...data.global || {} },
            layout: { ...DEFAULT_LAYOUT, ...data.layout || {} }
          });
        }
        setLoading(false);
      }, () => setLoading(false));
    });
    return () => unsub?.();
  }, []);
  return { settings, loading };
}
var DEFAULT_PORTFOLIO = [
  {
    id: "port-1",
    title: "Bolto",
    videoId: "KDK1jHJXPrk",
    category: "In-Person Demo",
    labels: ["In-Person Demo", "AI Platform", "Series A"],
    description: "YC-backed AI-native platform that unifies recruiting, payroll, and HR into one system.",
    order: 1
  },
  {
    id: "port-2",
    title: "ClickUp",
    videoId: "pIEkY7YDIF0",
    category: "Product Release",
    labels: ["Product Release", "Super Agents", "Productivity"],
    description: "The world's #1 work platform that replaces every productivity tool teams use.",
    order: 2
  },
  {
    id: "port-3",
    title: "Atria",
    videoId: "xygb6y5L9x8",
    category: "Launch Video",
    labels: ["Launch Video", "AI Platform", "TikTok Ads"],
    description: "AI platform that builds high-performing Meta and TikTok ads.",
    order: 3
  },
  {
    id: "port-4",
    title: "Relixir",
    videoId: "0NHfOpolrjs",
    category: "In-Person Demo",
    labels: ["In-Person Demo", "Dev Tools", "Founder Story"],
    description: "Introducing next-generation developer tooling with a high-energy founder walkthrough.",
    order: 4
  },
  {
    id: "port-5",
    title: "Apple SaaS Explainer",
    videoId: "xA_msiryNvQ",
    category: "Product Release",
    labels: ["Product Release", "Minimalist SaaS", "Product Explainer"],
    description: "Minimalist Apple-inspired SaaS product explainer with fluid UI transitions.",
    order: 5
  },
  {
    id: "port-6",
    title: "Original Commercial",
    videoId: "-_GCBlnT7R0",
    category: "Others",
    labels: ["Commercial", "Brand Video", "Paid Ads"],
    description: "Kinetic brand commercial engineered for paid acquisition and organic virality.",
    order: 6
  }
];
var DEFAULT_BLOGS = STATIC_BLOGS.map((item, index) => ({
  id: item.id,
  title: item.title,
  content: item.content,
  imageUrl: item.imageUrl,
  summary: item.summary,
  category: item.category,
  date: item.date,
  order: index + 1
}));
var DEFAULT_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Sean Dorje",
    role: "Founder",
    company: "Na\xEFve",
    content: "Felt like we hired in-house, not an agency. Big difference.",
    rating: 5,
    order: 1,
    featured: true
  },
  {
    id: "test-2",
    name: "Nikhil Reddy",
    role: "Founder",
    company: "Datoric",
    content: "Top-tier work, delivered faster than anyone else we've tried.",
    rating: 5,
    order: 2,
    featured: true
  },
  {
    id: "test-3",
    name: "Chris Cunningham",
    role: "Head of Content",
    company: "ClickUp",
    content: "Honestly the first video team that didn't make me chase them for updates.",
    rating: 5,
    order: 3,
    featured: true
  }
];
var DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "What is your turnaround time for video edits?",
    answer: "For short-form content (Reels, TikToks, Shorts), turnaround is typically 24\u201348 hours. For long-form YouTube episodes, brand documentaries, or podcast series, standard turnaround is 3\u20135 business days.",
    order: 1
  },
  {
    id: "faq-2",
    question: "How does your revision and feedback process work?",
    answer: "We provide structured, frame-accurate revision rounds via Frame.io. You can pause at any second, leave timestamped notes, and our editors refine the cut until it meets your exact standard.",
    order: 2
  },
  {
    id: "faq-3",
    question: "How do we transfer raw footage and project assets?",
    answer: "You can upload raw files via Google Drive, Dropbox, Frame.io, or Massive. For ongoing clients, we set up a dedicated cloud folder for seamless asset ingestion.",
    order: 3
  },
  {
    id: "faq-4",
    question: "Do your edits include motion graphics, sound design, and color grading?",
    answer: "Yes! Every single edit includes custom kinetic typography, 2D/3D motion graphics, cinematic sound design (SFX & music licensing), audio mastering, and professional color grading matched to your brand.",
    order: 4
  },
  {
    id: "faq-5",
    question: "What video styles and formats do you specialize in?",
    answer: "We specialize in high-retention YouTube long-form, talking-head authority content, commercial advertisements, course videos, podcast highlights, and viral short-form hooks.",
    order: 5
  },
  {
    id: "faq-6",
    question: "Can you match our existing brand identity and editing style?",
    answer: "Absolutely. During onboarding, we analyze your previous videos, font packs, color palette, pacing, and inspiration references to create a bespoke style profile for your project.",
    order: 6
  },
  {
    id: "faq-7",
    question: "How do monthly retainers and billing work?",
    answer: "We offer transparent flat-rate monthly retainers with guaranteed turnaround and fixed scope, as well as milestone-based per-project quotes. No surprise hourly charges.",
    order: 7
  },
  {
    id: "faq-8",
    question: "Who owns the final video assets and project files?",
    answer: "You own 100% of the commercial rights to all delivered videos and final renders. Project source files (Premiere Pro, After Effects) can also be packaged upon request.",
    order: 8
  }
];
var DEFAULT_PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter Sprint",
    price: "2,500",
    period: "month",
    description: "Establish your high-retention baseline and launch core product video assets.",
    features: [
      "4x High-Retention Short-form Videos / Reels",
      "Dynamic Hook & Script Architecture",
      "Custom 2D Motion Graphics & Typography",
      "Frame-accurate revisions via Frame.io",
      "Standard 48-hour sprint turnaround"
    ],
    recommended: false,
    popular: false,
    cta: "Start Starter Plan",
    order: 1
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: "5,000",
    period: "month",
    description: "Complete video production system for high-velocity software launches and creators.",
    features: [
      "2x Premium Long-form / VSL Product Launches",
      "12x Repurposed Multi-Platform Shorts",
      "Custom 3D Product & UI Motion Graphics",
      "Cinematic Sound Design & Spatial Audio",
      "Dedicated Slack Channel & Senior Art Director",
      "Priority 24-48h turnaround"
    ],
    recommended: true,
    popular: true,
    cta: "Claim Growth Slot",
    order: 2
  },
  {
    id: "authority",
    name: "Authority Accelerator",
    price: "9,500",
    period: "month",
    description: "End-to-end creative direction, omnichannel dominance, and continuous authority scaling.",
    features: [
      "4x High-Impact Product Videos & Mini-Docs",
      "25x Viral Shorts, Paid Ad Variations & Hooks",
      "Full 3D CGI Animation & Photoreal Product Renders",
      "Bi-weekly Creative Strategy Sprints",
      "A/B Hook Testing & Paid Ad Variations",
      "Dedicated Creative Director & Video Editor"
    ],
    recommended: false,
    popular: false,
    cta: "Partner With Us",
    order: 3
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    price: "Custom",
    period: "custom scope",
    description: "Bespoke production teams, studio film shoots, and white-glove agency integration.",
    features: [
      "On-site film crew & studio production",
      "Full IP ownership & source project files",
      "Custom 3D CGI & VFX pipelines",
      "Enterprise SLA & dedicated round-the-clock team",
      "Dedicated Slack Connect & custom billing terms"
    ],
    recommended: false,
    popular: false,
    cta: "Request Enterprise Quote",
    order: 4
  }
];
var DEFAULT_PARTNERS = [
  {
    id: "equisaas-bd",
    name: "Equissas BD",
    logoUrl: "https://i.ibb.co.com/mVYQq7n2/Equi-Saa-S-BD-Logo.png",
    websiteUrl: "https://equisaas-bd.com/",
    description: "EquiSaaS BD is an open technology cooperative building SaaS and AI products.",
    category: "LEARN",
    enabled: true,
    order: 1
  },
  {
    id: "samner-bd",
    name: "Samner BD",
    logoUrl: "https://i.ibb.co.com/ynYk793S/710755252-1028503563467218-7739241794522456468-n-Photoroom.png",
    websiteUrl: "https://samnerbd.lovable.app/",
    description: "Modern SaaS platform empowering scalable digital businesses.",
    category: "SAAS",
    enabled: true,
    order: 2
  },
  {
    id: "graduation-gate",
    name: "Graduation Gate",
    logoUrl: "https://i.ibb.co.com/CpSJCjWc/graduation-gate-logo.png",
    websiteUrl: "https://graduation-gate.equisaas-bd.com/",
    description: "EdTech gateway supporting global students and institutions.",
    category: "TECH",
    enabled: true,
    order: 3
  },
  {
    id: "varnox",
    name: "Varnox",
    logoUrl: "https://i.ibb.co.com/qYJFjcpn/Screenshot-2026-08-26-005952-Photoroom.png",
    websiteUrl: "https://varnox.netlify.app/",
    description: "Signature luxury fragrance brand crafting bespoke perfumes.",
    category: "PERFUME SHOP",
    enabled: true,
    order: 4
  }
];
var DEFAULT_PARTNERS_SETTINGS = {
  layers: 2
};
function usePartners() {
  const [partners, setPartners] = (0, import_react.useState)(DEFAULT_PARTNERS);
  const [settings, setSettings] = (0, import_react.useState)(() => {
    try {
      const cached = localStorage.getItem("motionly_partners_layers");
      if (cached) {
        const num = Number(cached);
        if (num >= 1 && num <= 3) return { layers: num };
      }
    } catch {
    }
    return DEFAULT_PARTNERS_SETTINGS;
  });
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    let unsubPartners;
    let unsubSettings;
    let unsubSiteSettings;
    let isMounted = true;
    const syncFromStorage = () => {
      try {
        const cached = localStorage.getItem("motionly_partners_layers");
        if (cached) {
          const num = Number(cached);
          if (num >= 1 && num <= 3) {
            setSettings((prev) => ({ ...prev, layers: num }));
          }
        }
      } catch {
      }
    };
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("motionly_partners_layers_changed", syncFromStorage);
    const safetyTimeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1500);
    (0, import_firebaseLazy.getDb)().then(async (db) => {
      const { collection, doc, onSnapshot } = await import("firebase/firestore");
      unsubPartners = onSnapshot(collection(db, "partners"), (snap) => {
        if (!isMounted) return;
        if (snap.empty) {
          setPartners(DEFAULT_PARTNERS);
        } else {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((item) => item.enabled !== false);
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setPartners(list.length > 0 ? list : DEFAULT_PARTNERS);
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching partners:", err);
        if (isMounted) {
          setPartners(DEFAULT_PARTNERS);
          setLoading(false);
        }
      });
      unsubSettings = onSnapshot(doc(db, "settings", "partners"), (snap) => {
        if (!isMounted) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data.layers !== void 0) {
            const count = Math.min(3, Math.max(1, Number(data.layers) || 2));
            setSettings((prev) => ({ ...prev, layers: count }));
            try {
              localStorage.setItem("motionly_partners_layers", String(count));
            } catch {
            }
          }
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching partners settings:", err);
        if (isMounted) setLoading(false);
      });
      unsubSiteSettings = onSnapshot(doc(db, "settings", "site"), (snap) => {
        if (!isMounted) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data?.partners?.layers !== void 0) {
            const count = Math.min(3, Math.max(1, Number(data.partners.layers) || 2));
            setSettings((prev) => ({ ...prev, layers: count }));
            try {
              localStorage.setItem("motionly_partners_layers", String(count));
            } catch {
            }
          }
        }
      }, () => {
      });
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("motionly_partners_layers_changed", syncFromStorage);
      unsubPartners?.();
      unsubSettings?.();
      unsubSiteSettings?.();
    };
  }, []);
  return { partners, settings, loading };
}
function useCollection(colName, orderField = null, dir = "asc") {
  const [items, setItems] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    let unsub;
    (0, import_firebaseLazy.getDb)().then(async (db) => {
      const { collection, onSnapshot } = await import("firebase/firestore");
      const rankingCollections = ["portfolio", "pricing", "faqs", "testimonials", "team"];
      const effectiveOrderField = orderField || (rankingCollections.includes(colName) ? "order" : "createdAt");
      const effectiveDir = orderField ? dir : effectiveOrderField === "order" ? "asc" : "desc";
      unsub = onSnapshot(collection(db, colName), (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((d) => !d.status || d.status === "published");
        docs.sort((a, b) => {
          const valA = a[effectiveOrderField] ?? (effectiveDir === "asc" ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
          const valB = b[effectiveOrderField] ?? (effectiveDir === "asc" ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
          if (valA < valB) return effectiveDir === "asc" ? -1 : 1;
          if (valA > valB) return effectiveDir === "asc" ? 1 : -1;
          return 0;
        });
        if (colName === "portfolio" && docs.length === 0) {
          setItems(DEFAULT_PORTFOLIO);
        } else if (colName === "testimonials" && docs.length === 0) {
          setItems(DEFAULT_TESTIMONIALS);
        } else if (colName === "pricing" && docs.length === 0) {
          setItems(DEFAULT_PRICING_PLANS);
        } else if (colName === "blogs" && docs.length === 0) {
          setItems(DEFAULT_BLOGS);
        } else {
          setItems(docs);
        }
        setLoading(false);
      }, (err) => {
        console.error(`Error fetching collection ${colName}:`, err);
        if (colName === "portfolio") {
          setItems(DEFAULT_PORTFOLIO);
        } else if (colName === "testimonials") {
          setItems(DEFAULT_TESTIMONIALS);
        } else if (colName === "pricing") {
          setItems(DEFAULT_PRICING_PLANS);
        } else if (colName === "blogs") {
          setItems(DEFAULT_BLOGS);
        }
        setLoading(false);
      });
    });
    return () => unsub?.();
  }, [colName, orderField, dir]);
  return { items, loading };
}
