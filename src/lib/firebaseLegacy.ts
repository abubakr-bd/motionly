/**
 * firebaseLegacy.ts - Synchronous firebase init kept for Admin page only.
 * All public-facing components should use firebaseLazy.ts (async getDb etc.)
 * NOTE: getAuth() is intentionally NOT called here to prevent Firebase from
 * loading auth/iframe.js on initial page load (saves ~90KB + 2,183ms).
 * Admin.tsx is lazy-loaded so auth only initialises when needed.
 */
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoui6O3ikB7nGQj54sZ6t-i30XK6QeFPo",
  authDomain: "motionly-media.firebaseapp.com",
  projectId: "motionly-media",
  storageBucket: "motionly-media.firebasestorage.app",
  messagingSenderId: "587741429989",
  appId: "1:587741429989:web:cf91754705e429833c540c",
  measurementId: "G-9QWZDJDLJ9",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth is NOT initialised here - call getAuth(app) lazily from Admin only
export const db = getFirestore(app);
export const storage = getStorage(app);

// Lazy auth getter - Admin.tsx should use this instead of importing auth directly
export async function getLegacyAuth() {
  const { getAuth, GoogleAuthProvider } = await import("firebase/auth");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  return { auth, googleProvider };
}

export default { db, storage };
