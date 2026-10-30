import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDb } from "../lib/firebaseLazy";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";
import { STATIC_BLOGS } from "../lib/staticBlogs";
import DOMPurify from "dompurify";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  category?: string;
  date: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [popularPosts, setPopularPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  if (loading) {
    return (
      <Layout>
        <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading article</span></div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SEO title="Article Not Found | Motionly Media" />
        <section className="site-not-found">
          <div className="site-container">
            <p className="site-kicker">Journal</p>
            <h1>We could not find that article.</h1>
            <p>It may have been moved or removed.</p>
            <Link to="/blog" className="site-button">Browse the journal</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const plainText = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  
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
          htmlLines.push("<ul>");
          inList = true;
        }
        const itemContent = trimmed.substring(2);
        const formatted = itemContent
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        htmlLines.push(`<li>${formatted}</li>`);
        continue;
      } else if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }

      if (!trimmed) continue;

      if (trimmed.startsWith("#### ")) {
        htmlLines.push(`<h4>${trimmed.substring(5)}</h4>`);
      } else if (trimmed.startsWith("### ")) {
        htmlLines.push(`<h3>${trimmed.substring(4)}</h3>`);
      } else if (trimmed.startsWith("## ")) {
        htmlLines.push(`<h2>${trimmed.substring(3)}</h2>`);
      } else if (trimmed === "---") {
        htmlLines.push("<hr />");
      } else {
        const formatted = trimmed
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        htmlLines.push(`<p>${formatted}</p>`);
      }
    }
    if (inList) {
      htmlLines.push("</ul>");
    }

    return DOMPurify.sanitize(htmlLines.join("\n"));
  };

  const contentHtml = formatMarkdown(post.content);
  const postSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://motionly.media/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://motionly.media/blog/${id}` }
        ]
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        image: post.imageUrl,
        author: { "@type": "Organization", name: "Motionly Media" },
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

  return (
    <Layout>
      <SEO
        title={post.title}
        description={plainText.slice(0, 155)}
        url={`https://motionly.media/blog/${id}`}
        image={post.imageUrl}
        type="article"
        schema={postSchema}
      />
      <header className="site-article-header">
        <div className="site-container site-article-header__inner">
          <Link to="/blog" className="site-text-link">Back to the journal</Link>
          <p className="site-kicker">{post.category || "Motionly Journal"}</p>
          <h1>{post.title}</h1>
          <div className="site-article-meta"><span>{post.date}</span><span>Motionly Editorial</span></div>
        </div>
      </header>

      <main className="site-article-main">
        <article className="site-article">
          {post.imageUrl && (
            <img
              className="site-article__image"
              src={post.imageUrl}
              alt={`${post.title} cover image`}
              width="1200"
              height="630"
              decoding="async"
            />
          )}
          <div className="site-article__body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <div className="site-article__share">
            <button type="button" className="site-button-secondary" onClick={handleShare}>{copied ? "Link copied" : "Copy article link"}</button>
            <Link to="/contact" className="site-text-link">Talk with our team</Link>
          </div>
        </article>

        <aside className="site-article-aside">
          <div className="site-article-aside__callout">
            <p className="site-kicker">For your next project</p>
            <h2>Need a thoughtful editing partner?</h2>
            <Link to="/contact" className="site-text-link">Start a conversation</Link>
          </div>
          {popularPosts.length > 0 && (
            <div className="site-article-aside__related">
              <h2>More from the journal</h2>
              {popularPosts.map((item) => (
                <Link key={item.id} to={`/blog/${item.id}`}>
                  <span>{item.category || "Journal"}</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </main>
    </Layout>
  );
};

export default BlogPost;
