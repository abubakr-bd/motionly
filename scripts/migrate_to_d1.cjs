const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('../motionly-media-firebase-adminsdk-fbsvc-04f7622ac7.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrate() {
  console.log("Fetching collections from Firestore...");
  const collections = await db.listCollections();
  
  let sql = `
CREATE TABLE IF NOT EXISTS _collections (
    collection_name TEXT,
    doc_id TEXT,
    data TEXT,
    PRIMARY KEY (collection_name, doc_id)
);
DELETE FROM _collections;
`;

  for (let col of collections) {
    console.log(`Processing collection: ${col.id}...`);
    const snapshot = await col.get();
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // stringify and escape single quotes for SQL
      const dataStr = JSON.stringify(data).replace(/'/g, "''");
      sql += `INSERT INTO _collections (collection_name, doc_id, data) VALUES ('${col.id}', '${doc.id}', '${dataStr}');\n`;
    });
  }

  fs.writeFileSync('motionly_db.sql', sql);
  console.log("Migration SQL generated: motionly_db.sql");
  console.log("Run the following command to push to D1:");
  console.log("npx wrangler d1 execute motionly_db --remote --file=motionly_db.sql");
}

migrate().catch(console.error);
