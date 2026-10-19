import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCollection, type BlogItem } from "../lib/useSiteData";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";

const excerpt = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const Blog = () => {
  const { items: posts, loading } = useCollection<BlogItem>("blogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean))) as string[]], [posts]);
  const filteredPosts = posts.filter((post) => {
    const searchText = `${post.title} ${post.content}`.toLowerCase();
    return searchText.includes(searchTerm.toLowerCase()) && (activeCategory === "All" || post.category === activeCategory);
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://motionly.media/blog" },
        ],
      },
      {
        "@type": "Blog",
        name: "Motionly Media Blog",
        description: "Actionable insights on high-retention video editing and video marketing.",
        url: "https://motionly.media/blog",
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Motionly Media Blog | Video Marketing & Content Strategy"
        description="Actionable insights on high-retention video editing, YouTube growth frameworks, VSL funnels, and viral short-form strategies from Motionly Media."
        url="https://motionly.media/blog"
        schema={blogSchema}
      />

      <section className="site-page-hero site-page-hero--compact">
        <div className="site-container site-journal-hero">
          <p className="site-kicker">Motionly Media Journal &amp; Insights</p>
          <h1>Motionly Media Blog | Video Marketing &amp; Content Strategy</h1>
          <p className="site-page-hero__lede">
            Actionable guides, creative frameworks, and editorial insights from the video strategists and editors at Motionly Media.
          </p>
        </div>
      </section>

      <section className="site-page-section site-journal-section">
        <div className="site-container">
          <div className="site-journal-toolbar">
            <label className="site-journal-search">
              <span>Search articles</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try a topic or phrase"
              />
            </label>
            <div className="site-journal-filters" aria-label="Filter articles by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading && posts.length === 0 ? (
            <div className="site-loading-state" role="status"><span className="site-spinner" /><span>Loading articles</span></div>
          ) : filteredPosts.length === 0 ? (
            <div className="site-empty-state">
              <h2>No articles found</h2>
              <p>Try another search or choose a different category.</p>
            </div>
          ) : (
            <div className="site-journal-grid">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="site-journal-card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.16) }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="site-journal-card__image">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt="" width="900" height="600" loading="lazy" />
                      ) : (
                        <div className="site-journal-card__placeholder"><span>{post.category || "Motionly Journal"}</span></div>
                      )}
                    </div>
                    <div className="site-journal-card__content">
                      <p className="site-journal-card__meta">{post.category || "Journal"} <span>{post.date}</span></p>
                      <h2>{post.title}</h2>
                      <p className="site-journal-card__excerpt">{excerpt(post.summary || post.content)}</p>
                      <span className="site-journal-card__link">Read article</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
