import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { getDb } from "../lib/firebaseLazy";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { STATIC_BLOGS } from "../lib/staticBlogs";
import DOMPurify from "dompurify";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Share2,
  Check,
  Copy,
  Sparkles,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  category?: string;
  date: string;
  readTime?: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [popularPosts, setPopularPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Reading progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let active = true;
    const fetchPost = async () => {
      if (!id) {
        setPost(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const db = await getDb();
        const { doc, getDoc, collection, getDocs, query, limit } = await import("firebase/firestore");
        const docSnap = await getDoc(doc(db, "blogs", id));
        if (docSnap.exists()) {
          const current = { id: docSnap.id, ...docSnap.data() } as BlogPostData;
          const snapshot = await getDocs(query(collection(db, "blogs"), limit(4)));
          const related = snapshot.docs
            .map((item) => ({ id: item.id, ...item.data() } as BlogPostData))
            .filter((item) => item.id !== id)
            .slice(0, 3);
          if (active) {
            setPost(current);
            setPopularPosts(related);
          }
        } else {
          const localPost = STATIC_BLOGS.find((item) => item.id === id) as BlogPostData | undefined;
          if (active) {
            setPost(localPost || null);
            setPopularPosts(STATIC_BLOGS.filter((item) => item.id !== id).slice(0, 3) as BlogPostData[]);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        const localPost = STATIC_BLOGS.find((item) => item.id === id) as BlogPostData | undefined;
        if (active) {
          setPost(localPost || null);
          setPopularPosts(STATIC_BLOGS.filter((item) => item.id !== id).slice(0, 3) as BlogPostData[]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchPost();
    return () => { active = false; };
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Could not copy article link:", error);
    }
  };

  const plainText = post ? post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const computedReadTime = Math.max(2, Math.ceil(wordCount / 200)) + " min read";

  const formatMarkdown = (text: string) => {
    if (!text) return "";
    if (/<\/?[a-z][\s\S]*>/i.test(text)) {
      return DOMPurify.sanitize(text);
    }
    const lines = text.split("\n");
    const htmlLines: string[] = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          htmlLines.push('<ul class="my-5 pl-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">');
          inList = true;
        }
        const itemContent = trimmed.substring(2);
        const formatted = itemContent
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        htmlLines.push(`<li class="leading-relaxed">${formatted}</li>`);
        continue;
      } else if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }

      if (!trimmed) continue;

      if (trimmed.startsWith("#### ")) {
        htmlLines.push(`<h4 class="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3 tracking-tight">${trimmed.substring(5)}</h4>`);
      } else if (trimmed.startsWith("### ")) {
        htmlLines.push(`<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 tracking-tight">${trimmed.substring(4)}</h3>`);
      } else if (trimmed.startsWith("## ")) {
        htmlLines.push(`<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-12 mb-5 tracking-tight border-b border-black/[0.06] dark:border-white/[0.08] pb-3">${trimmed.substring(3)}</h2>`);
      } else if (trimmed === "---") {
        htmlLines.push('<hr class="my-10 border-black/[0.06] dark:border-white/[0.08]" />');
      } else if (trimmed.startsWith("> ")) {
        const quoteContent = trimmed.substring(2)
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        htmlLines.push(`<blockquote class="my-6 pl-5 border-l-2 border-[#2563EB] dark:border-[#38BDF8] italic text-slate-800 dark:text-slate-200 text-lg leading-relaxed">${quoteContent}</blockquote>`);
      } else {
        const formatted = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        htmlLines.push(`<p class="my-5 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-normal">${formatted}</p>`);
      }
    }
    if (inList) {
      htmlLines.push("</ul>");
    }

    return DOMPurify.sanitize(htmlLines.join("\n"));
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#07080d] flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] dark:border-[#38BDF8] border-t-transparent animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Loading article from studio journal...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SEO title="Article Not Found | Motionly Journal" />
        <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] flex items-center justify-center px-4 py-24">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#38BDF8] mb-6">
              <span>Error 404 &bull; Missing Entry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Article Not Found
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              This article may have been archived, renamed, or moved to another section of the studio journal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white dark:bg-white dark:text-[#07080d] font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Journal</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/[0.1] dark:border-white/[0.1] font-semibold text-sm hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
              >
                <span>Studio Home</span>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const contentHtml = formatMarkdown(post.content);

  const postSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Journal", item: "https://motionly.media/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://motionly.media/blog/${id}` }
        ]
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        image: post.imageUrl,
        author: { "@type": "Organization", name: "Motionly Editorial Squad" },
        publisher: {
          "@type": "Organization",
          name: "Motionly Media",
          logo: { "@type": "ImageObject", url: "https://motionly.media/nav_logo.webp" },
        },
        datePublished: post.date,
        description: plainText.slice(0, 160),
      }
    ]
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <Layout>
      <SEO
        title={`${post.title} | Motionly Journal`}
        description={plainText.slice(0, 155)}
        url={`https://motionly.media/blog/${id}`}
        image={post.imageUrl}
        type="article"
        schema={postSchema}
      />

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#38bdf8] origin-left z-50 pointer-events-none"
      />

      <article className="min-h-screen bg-[#070b14] text-[#eef0f5] transition-colors duration-200 pt-6 sm:pt-12 pb-24 relative overflow-hidden">
        {/* GPU-Accelerated Subtle Ambient Glow Lighting */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none transform-gpu will-change-transform absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#315EFA]/15 rounded-full blur-[140px] -z-10" 
        />

        {/* Article Header Container */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-[#38bdf8] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Studio Journal</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#38bdf8] text-xs font-mono font-semibold uppercase tracking-wider">
              {post.category || "Video Strategy"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Subheading / Summary */}
          {post.summary && (
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
              {post.summary}
            </p>
          )}

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/[0.08] text-xs sm:text-sm text-slate-400">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#315EFA]/30 border border-[#38bdf8]/40 text-[#38bdf8] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  M
                </div>
                <span className="font-semibold text-white">Motionly Studio</span>
              </div>

              <span className="hidden sm:inline text-slate-600">&bull;</span>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{post.date}</span>
              </div>

              <span className="hidden sm:inline text-slate-600">&bull;</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{computedReadTime}</span>
              </div>
            </div>

            {/* Quick Share Action */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl aspect-[16/9] max-h-[580px]">
              <img
                src={post.imageUrl}
                alt={`${post.title} cover`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        )}

        {/* Main Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Social Share & Interaction Footer */}
          <div className="mt-14 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Share:</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied" : "Copy Link"}</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-semibold transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-semibold transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#38bdf8] transition-colors"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Author & Studio Info Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#315EFA] to-[#38bdf8] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              M
            </div>
            <div className="flex-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                Written by Motionly Editorial
              </span>
              <h3 className="text-base font-bold text-white mb-1">
                Motionly Media &bull; Video &amp; Creative Studio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                We design high-retention video pipelines, SaaS explainers, 2D/3D motion graphics, and personal branding systems for ambitious companies worldwide.
              </p>
            </div>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#315EFA] hover:bg-[#254edb] text-white font-semibold text-xs tracking-wider uppercase text-center active:scale-[0.98] transition-all shrink-0"
            >
              Work With Us
            </Link>
          </div>
        </div>

        {/* More Articles from the Journal */}
        {popularPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 pt-16 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] block mb-2">
                  Continue Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  More From the Journal
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#38bdf8] transition-colors"
              >
                <span>View all entries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularPosts.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group flex flex-col p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                >
                  {item.imageUrl && (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="text-[#38bdf8] uppercase font-semibold">
                      {item.category || "Strategy"}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  )}
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-[#38bdf8]">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
