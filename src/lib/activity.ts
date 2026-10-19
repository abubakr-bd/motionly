import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDb } from "./firebaseLazy";

export type ActivityAction = "created" | "updated" | "deleted" | "published" | "archived" | "restored" | string;
export type ActivityModule = "blog" | "portfolio" | "testimonial" | "team" | "pricing" | "settings" | "auth" | "finance" | "access" | string;

export interface ActivityLog {
  id?: string;
  userId?: string;
  userEmail: string;
  userName?: string;
  action: ActivityAction;
  module: ActivityModule;
  targetId?: string;
  targetName: string;
  details?: string;
  timestamp: Timestamp | string;
}

export const logActivity = async (
  user: { uid?: string; email: string | null; displayName?: string | null } | null,
  action: ActivityAction,
  module: ActivityModule,
  targetName: string,
  targetId?: string,
  details?: string
) => {
  if (!user || !user.email) return;

  try {
    const db = await getDb();
    await addDoc(collection(db, "activity_logs"), {
      userId: user.uid || null,
      userEmail: user.email,
      userName: user.displayName || user.email.split("@")[0],
      action,
      module,
      targetId: targetId || null,
      targetName,
      details: details || `${action} ${module} "${targetName}"`,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Failed to log activity", error);
  }
};

/**
 * Automatically purges activity logs older than 15 days
 */
export const purgeOldActivities = async (): Promise<number> => {
  try {
    const db = await getDb();
    const { collection, getDocs, deleteDoc, doc } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "activity_logs"));
    const fifteenDaysAgo = Date.now() - (15 * 24 * 60 * 60 * 1000);

    const deletePromises: Promise<void>[] = [];
    snap.docs.forEach(d => {
      const data = d.data();
      let logTime = 0;
      if (data.timestamp?.toDate) {
        logTime = data.timestamp.toDate().getTime();
      } else if (typeof data.timestamp === "string") {
        logTime = new Date(data.timestamp).getTime();
      } else if (typeof data.timestamp === "number") {
        logTime = data.timestamp;
      }
      
      if (logTime > 0 && logTime < fifteenDaysAgo) {
        deletePromises.push(deleteDoc(doc(db, "activity_logs", d.id)));
      }
    });

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
    }
    return deletePromises.length;
  } catch (error) {
    console.error("Failed to purge old activities:", error);
    return 0;
  }
};
