/**
 * firebase.ts - Lazy async factory
 * -----------------------------------------------------------------------------
 * We export async getters instead of eagerly-initialised singletons so that
 * the Firebase SDK is NOT in the critical render path. The first call to
 * getDb() / getAuth() etc. will initialise Firebase on demand (typically after
 * the page has already painted and Suspense/loading states are visible).
 */

const firebaseConfig = {
  apiKey: "AIzaSyAoui6O3ikB7nGQj54sZ6t-i30XK6QeFPo",
  authDomain: "motionly-media.firebaseapp.com",
  projectId: "motionly-media",
  storageBucket: "motionly-media.firebasestorage.app",
  messagingSenderId: "587741429989",
  appId: "1:587741429989:web:cf91754705e429833c540c",
  measurementId: "G-9QWZDJDLJ9",
};

// Cached promises so we only initialise once
let _appPromise: Promise<import("firebase/app").FirebaseApp> | null = null;
let _dbPromise: Promise<import("firebase/firestore").Firestore> | null = null;
let _authPromise: Promise<import("firebase/auth").Auth> | null = null;
let _storagePromise: Promise<import("firebase/storage").FirebaseStorage> | null = null;

async function getApp() {
  if (!_appPromise) {
    _appPromise = import("firebase/app").then(({ initializeApp, getApps }) => {
      return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    });
  }
  return _appPromise;
}

export async function getDb() {
  if (!_dbPromise) {
    _dbPromise = import("firebase/firestore").then(({ getFirestore }) => getFirestore(null as any));
  }
  return _dbPromise;
}

export async function getAuth() {
  if (!_authPromise) {
    _authPromise = Promise.all([
      getApp(),
      import("firebase/auth"),
    ]).then(([app, { getAuth: _getAuth }]) => _getAuth(app));
  }
  return _authPromise;
}

export async function getStorage() {
  if (!_storagePromise) {
    _storagePromise = Promise.all([
      getApp(),
      import("firebase/storage"),
    ]).then(([app, { getStorage: _getStorage }]) => _getStorage(app));
  }
  return _storagePromise;
}

export async function getGoogleProvider() {
  const { GoogleAuthProvider } = await import("firebase/auth");
  return new GoogleAuthProvider();
}

// --- Legacy sync exports for Admin page (it's lazy-loaded and it's fine) -----
// Admin.tsx imports auth/db/storage directly; we keep a sync path for it
// by importing from firebaseLegacy directly in Admin.tsx.
// Everything else should use the async getDb() above.
