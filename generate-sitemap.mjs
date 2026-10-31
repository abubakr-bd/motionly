import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://motionly.media';

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/personal-branding', priority: '0.8', changefreq: 'monthly' },
  { url: '/careers', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/refund', priority: '0.3', changefreq: 'yearly' },
];

const STATIC_BLOGS = [
  { id: 'saas-launch-video-guide', date: '2025-05-24' },
  { id: 'yc-demo-pitch-videos', date: '2025-05-22' },
  { id: 'vsl-vs-product-demo', date: '2025-05-19' },
  { id: 'science-of-the-first-3-seconds', date: '2025-05-16' },
  { id: '3d-motion-graphics-software-demos', date: '2025-05-13' },
  { id: 'repurpose-long-form-to-viral-shorts', date: '2025-05-10' },
  { id: 'sound-design-video-retention', date: '2025-05-07' },
  { id: 'kinetic-typography-best-practices', date: '2025-05-04' },
  { id: 'founder-led-video-growth', date: '2025-04-29' },
  { id: 'b2b-video-marketing-roi-metrics', date: '2025-04-25' }
];

const STATIC_PORTFOLIO = [
  { id: '4v95coAmufm3daVAgqKm', date: '2025-05-30' },
  { id: 'y2coqeZTqk27tzrCe1EI', date: '2025-09-22' },
  { id: 'mMbBQT6srWSTDPwS7ILB', date: '2025-09-22' },
  { id: 'uYMBcFEXcK7EeAqFdQ6B', date: '2025-09-22' },
  { id: '1xUEC9RmJgu0GsmCwaWL', date: '2025-09-22' },
  { id: 'S2tVmi5VDvhZCOctFiun', date: '2025-07-22' },
  { id: 'QQg8PGAjeiWK7iyQcl4e', date: '2025-06-04' },
  { id: 'yqD2TSQGtmoQIOis7sNh', date: '2025-06-04' },
  { id: 'dtkEYUcnjoeKeA6rJdD3', date: '2025-06-04' }
];

async function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  let dynamicBlogs = [];
  try {
    const response = await fetch('https://firestore.googleapis.com/v1/projects/motionly-media/databases/(default)/documents/blogs');
    if (response.ok) {
      const data = await response.json();
      if (data.documents) {
        dynamicBlogs = data.documents
          .filter(doc => {
            const id = doc.name.split('/').pop();
            const title = doc.fields?.title?.stringValue || '';
            const content = doc.fields?.content?.stringValue || '';
            // Strictly exclude empty junk test posts (e.g. "fx" or empty content)
            return id !== 'Ct26jhtmvhEdLLCTk1fg' && title.trim().toLowerCase() !== 'fx' && title.trim().length > 3 && content.length > 50;
          })
          .map(doc => {
            const id = doc.name.split('/').pop();
            const updatedAt = doc.updateTime ? doc.updateTime.split('T')[0] : new Date().toISOString().split('T')[0];
            return { id, date: updatedAt };
          });
      }
    }
  } catch (error) {
    console.warn('Using static blogs fallback for sitemap:', error.message);
  }

  let dynamicPortfolio = [];
  try {
    const response = await fetch('https://firestore.googleapis.com/v1/projects/motionly-media/databases/(default)/documents/portfolio');
    if (response.ok) {
      const data = await response.json();
      if (data.documents) {
        dynamicPortfolio = data.documents.map(doc => {
          const id = doc.name.split('/').pop();
          const updatedAt = doc.updateTime ? doc.updateTime.split('T')[0] : new Date().toISOString().split('T')[0];
          return { id, date: updatedAt };
        });
      }
    }
  } catch (error) {
    console.warn('Using static portfolio fallback for sitemap:', error.message);
  }

  // Merge static and dynamic blogs
  const allBlogsMap = new Map();
  STATIC_BLOGS.forEach(b => allBlogsMap.set(b.id, { url: `/blog/${b.id}`, priority: '0.7', changefreq: 'monthly', lastmod: b.date }));
  dynamicBlogs.forEach(b => allBlogsMap.set(b.id, { url: `/blog/${b.id}`, priority: '0.7', changefreq: 'monthly', lastmod: b.date }));

  // Merge static and dynamic portfolio
  const allPortfolioMap = new Map();
  STATIC_PORTFOLIO.forEach(p => allPortfolioMap.set(p.id, { url: `/portfolio/${p.id}`, priority: '0.8', changefreq: 'monthly', lastmod: p.date }));
  dynamicPortfolio.forEach(p => allPortfolioMap.set(p.id, { url: `/portfolio/${p.id}`, priority: '0.8', changefreq: 'monthly', lastmod: p.date }));

  const blogRoutes = Array.from(allBlogsMap.values());
  const portfolioRoutes = Array.from(allPortfolioMap.values());
  const allRoutes = [...staticRoutes, ...portfolioRoutes, ...blogRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log(`Successfully generated sitemap.xml with ${allRoutes.length} routes.`);
}

generateSitemap();
