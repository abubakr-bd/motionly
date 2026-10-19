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
  const contentHtml = /<\/?[a-z][\s\S]*>/i.test(post.content)
    ? DOMPurify.sanitize(post.content)
    : DOMPurify.sanitize(post.content
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</p>`)
      .join(""));
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
