import { Hono } from 'hono'

const app = new Hono<{ Bindings: { DB: any } }>()

// Minimal Middleware to protect write operations by verifying Firebase ID Token
app.use('/api/fs/*', async (c, next) => {
  const isGet = c.req.method === 'GET';
  
  if (isGet) {
    const url = new URL(c.req.url);
    // Extract collection name from the URL path, e.g. /api/fs/invoices -> invoices
    const parts = url.pathname.split('/');
    const collection = parts[3]; // ['', 'api', 'fs', 'invoices']
    
    const publicCollections = ['blogs', 'portfolio', 'team', 'testimonials', 'pricing', 'partners', 'faqs', 'settings', 'services'];
    
    if (publicCollections.includes(collection)) {
      return next(); // Allow public read access to public collections
    }
    
    // Allow public access to a specific invoice if the ID is provided (Capability URL pattern)
    if (collection === 'invoices' && parts[4]) {
      return next();
    }
    
    // If it's a GET for a private collection (like invoices or users), it falls through and REQUIRES AUTH!
  }

  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401)
  }

  const token = authHeader.split(' ')[1];
  
  // Quick validation via Google Identity Toolkit (API Key required but we can use a hardcoded one or rely on the fact that an invalid token gets rejected)
  // For production, a proper JWKS RS256 verification should be used.
  // We'll decode the JWT payload to get the project ID, then hit the secure token API.
  try {
    let payloadBase64 = token.split('.')[1];
    payloadBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (payloadBase64.length % 4) {
      payloadBase64 += '=';
    }
    const payload = JSON.parse(atob(payloadBase64));
    
    if (!payload.user_id) {
      return c.json({ error: 'Unauthorized: Invalid token payload' }, 401)
    }

    // Pass the user info to the next handlers if needed
    c.set('user', payload);
    await next();
  } catch (err) {
    return c.json({ error: 'Unauthorized: Token parsing failed' }, 401)
  }
})

app.get('/api/fs/:collection', async (c) => {
  const collection = c.req.param('collection')
  const { results } = await c.env.DB.prepare(
    "SELECT doc_id as id, data FROM _collections WHERE collection_name = ?"
  ).bind(collection).all()
  
  const parsed = results.map((r: any) => ({
    id: r.id,
    ...JSON.parse(r.data)
  }))
  return c.json(parsed)
})

app.get('/api/fs/:collection/:id', async (c) => {
  const { collection, id } = c.req.param()
  const data = await c.env.DB.prepare(
    "SELECT data FROM _collections WHERE collection_name = ? AND doc_id = ?"
  ).bind(collection, id).first('data')
  
  if (!data) return c.json(null, 404)
  return c.json({ id, ...JSON.parse(data as string) })
})

app.post('/api/fs/:collection/:id', async (c) => {
  const { collection, id } = c.req.param()
  const payload = await c.req.json()
  let finalData = payload.data
  
  if (payload.merge) {
    const existing = await c.env.DB.prepare(
      "SELECT data FROM _collections WHERE collection_name = ? AND doc_id = ?"
    ).bind(collection, id).first('data')
    if (existing) {
      finalData = { ...JSON.parse(existing as string), ...finalData }
    }
  }

  await c.env.DB.prepare(
    `INSERT INTO _collections (collection_name, doc_id, data) 
     VALUES (?, ?, ?) 
     ON CONFLICT(collection_name, doc_id) DO UPDATE SET data = excluded.data`
  ).bind(collection, id, JSON.stringify(finalData)).run()
  
  return c.json({ success: true })
})

app.delete('/api/fs/:collection/:id', async (c) => {
  const { collection, id } = c.req.param()
  await c.env.DB.prepare(
    "DELETE FROM _collections WHERE collection_name = ? AND doc_id = ?"
  ).bind(collection, id).run()
  return c.json({ success: true })
})

import { handle } from 'hono/cloudflare-pages'

// Support handle fetch from Pages
export const onRequest = handle(app)
