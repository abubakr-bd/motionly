import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";

const NotFound = () => (
  <Layout>
    <SEO title="Page Not Found | Motionly Media" />
    <section className="site-not-found">
      <div className="site-container">
        <p className="site-kicker">Error 404</p>
        <h1>This page isn't here.</h1>
        <p>The address may have changed, or the page may no longer exist.</p>
        <div className="site-not-found__actions">
          <Link to="/" className="site-button">Go to the homepage</Link>
          <button type="button" className="site-button-secondary" onClick={() => window.history.back()}>Go back</button>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFound;
