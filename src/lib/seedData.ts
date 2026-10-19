import { doc, setDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { STATIC_BLOGS } from "./staticBlogs";

export const seedDatabase = async (notify: any, refresh: any) => {
  notify("Seeding blogs... Please wait.", "ok");
  try {
    // Only seed blogs, do NOT overwrite settings or portfolio!
    const blogsSnap = await getDocs(collection(db, "blogs"));
    const existingIds = new Set(blogsSnap.docs.map(d => d.id));

    let addedCount = 0;
    for (const b of STATIC_BLOGS) {
      if (!existingIds.has(b.id)) {
        const { id, ...blogData } = b;
        await setDoc(doc(db, "blogs", id), { ...blogData, status: "published", createdAt: Timestamp.now() });
        addedCount++;
      }
    }

    notify(`Seeded ${addedCount} missing blogs successfully!`, "ok");
    if (addedCount > 0) refresh();
  } catch (error) {
    console.error("Seeding error:", error);
    notify("Failed to seed blogs. Check console.", "err");
  }
};
