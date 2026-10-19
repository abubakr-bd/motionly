const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./motionly-media-firebase-adminsdk-fbsvc-04f7622ac7.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function analyze() {
  try {
    const collections = await db.listCollections();
    console.log(`Found ${collections.length} collections.`);
    for (let col of collections) {
      console.log(`\n--- Collection: ${col.id} ---`);
      const snapshot = await col.limit(1).get();
      if (snapshot.empty) {
        console.log('  (Empty collection)');
      } else {
        snapshot.forEach(doc => {
          console.log(`  Sample Document ID: ${doc.id}`);
          console.log(`  Data Structure:`, JSON.stringify(doc.data(), null, 2));
        });
      }
    }
  } catch (error) {
    console.error("Error connecting to Firebase:", error);
  }
}

analyze();
