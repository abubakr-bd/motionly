/**
 * firebase.ts - Re-exports legacy sync exports for backward compatibility.
 * Public pages should prefer the async helpers in firebaseLazy.ts.
 * Admin.tsx imports { db, storage } from this file.
 * NOTE: auth is NOT exported here - it's lazy-loaded via auth.tsx and firebaseLazy.ts.
 */
export { db, storage, getLegacyAuth } from "./firebaseLegacy";
