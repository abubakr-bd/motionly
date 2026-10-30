const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { execSync } = require('child_process');

// 1. Compile defaults from source
const rawBlogs = fs.readFileSync(path.resolve(__dirname, '../src/lib/staticBlogs.ts'), 'utf8').replace(/^import\s+.*$/gm, '//');
const rawSite = fs.readFileSync(path.resolve(__dirname, '../src/lib/useSiteData.ts'), 'utf8').replace(/^import\s+.*$/gm, '//');

const combined = rawBlogs + '\n' + rawSite;
const res = esbuild.transformSync(combined, { loader: 'ts', format: 'cjs' });
const tempFile = path.resolve(__dirname, 'temp_bundle.cjs');
fs.writeFileSync(tempFile, res.code, 'utf8');

const {
  DEFAULT_HERO,
  DEFAULT_PROCESS,
  DEFAULT_DIFFERENCE,
  DEFAULT_PAIN_POINTS,
  DEFAULT_SEO,
  DEFAULT_CONTACT,
  DEFAULT_GLOBAL,
  DEFAULT_LAYOUT,
  DEFAULT_PORTFOLIO,
  DEFAULT_TESTIMONIALS,
  DEFAULT_PRICING_PLANS,
  DEFAULT_FAQS,
  DEFAULT_PARTNERS,
  STATIC_BLOGS
} = require(tempFile);

fs.unlinkSync(tempFile);

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

function makeInsert(col, id, dataObj) {
  const jsonStr = JSON.stringify(dataObj);
  return `INSERT INTO _collections (collection_name, doc_id, data) VALUES ('${col}', '${escapeSql(id)}', '${escapeSql(jsonStr)}');`;
}

const sqlStatements = [];

// 1. PORTFOLIO: Delete existing, insert only the 6 default portfolio projects
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'portfolio';");
for (const item of DEFAULT_PORTFOLIO) {
  sqlStatements.push(makeInsert('portfolio', item.id, {
    ...item,
    status: 'published',
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 2. PRICING: Delete existing, insert only the 4 default pricing plans
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'pricing';");
for (const plan of DEFAULT_PRICING_PLANS) {
  sqlStatements.push(makeInsert('pricing', plan.id, {
    ...plan,
    status: 'published',
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 3. TESTIMONIALS / REVIEWS: Delete existing, insert the 3 default testimonials
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'testimonials';");
for (const test of DEFAULT_TESTIMONIALS) {
  sqlStatements.push(makeInsert('testimonials', test.id, {
    ...test,
    status: 'published',
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 4. FAQS: Delete existing, insert the 8 default FAQs
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'faqs';");
for (const faq of DEFAULT_FAQS) {
  sqlStatements.push(makeInsert('faqs', faq.id, {
    ...faq,
    status: 'published',
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 5. BLOGS: Delete existing, insert only the 10 real SEO articles
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'blogs';");
for (const blog of STATIC_BLOGS) {
  sqlStatements.push(makeInsert('blogs', blog.id, {
    ...blog,
    status: 'published',
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 6. PARTNERS: Delete existing, insert the 4 default partners
sqlStatements.push("DELETE FROM _collections WHERE collection_name = 'partners';");
for (const p of DEFAULT_PARTNERS) {
  sqlStatements.push(makeInsert('partners', p.id, {
    ...p,
    enabled: true,
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) }
  }));
}

// 7. SETTINGS / SITE: Clean site document with all standard sections
const fullSiteSettings = {
  hero: DEFAULT_HERO,
  process: DEFAULT_PROCESS,
  difference: DEFAULT_DIFFERENCE,
  painPoints: DEFAULT_PAIN_POINTS,
  seo: DEFAULT_SEO,
  contact: DEFAULT_CONTACT,
  global: DEFAULT_GLOBAL,
  layout: DEFAULT_LAYOUT,
  partners: { layers: 1 },
  updatedAt: { seconds: Math.floor(Date.now() / 1000) }
};

sqlStatements.push(
  `INSERT INTO _collections (collection_name, doc_id, data) ` +
  `VALUES ('settings', 'site', '${escapeSql(JSON.stringify(fullSiteSettings))}') ` +
  `ON CONFLICT(collection_name, doc_id) DO UPDATE SET data = excluded.data;`
);

// NOTE: The 'team' collection is INTENTIONALLY NOT TOUCHED to preserve all team member records.

const fullSql = sqlStatements.join('\n');
const sqlFile = path.resolve(__dirname, 'reset_remote.sql');
fs.writeFileSync(sqlFile, fullSql, 'utf8');

console.log(`Generated reset SQL with ${sqlStatements.length} statements.`);
console.log(`Executing against Cloudflare D1 database 'motionly_db' (remote)...`);

try {
  const result = execSync(`npx.cmd wrangler d1 execute motionly_db --remote --file="${sqlFile}"`, {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log("Success! Output:\n", result);
} catch (err) {
  console.error("Error executing D1 SQL:");
  if (err.stdout) console.error("STDOUT:", err.stdout);
  if (err.stderr) console.error("STDERR:", err.stderr);
  console.error("MESSAGE:", err.message);
  process.exit(1);
} finally {
  if (fs.existsSync(sqlFile)) {
    fs.unlinkSync(sqlFile);
  }
}
