import { getDb } from "../firebaseLazy";

export type AdminRole = "Founder" | "Admin" | "HR" | "Editor" | "Sales" | "Viewer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  addedBy?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminAccessLog {
  id: string;
  userId?: string;
  email: string;
  displayName?: string;
  role?: string;
  action: string;
  path?: string;
  timestamp: string;
  userAgent?: string;
}

const DEFAULT_SUPER_ADMINS: Omit<AdminUser, "id">[] = [
  {
    email: "motionlymedia.help@gmail.com",
    name: "Motionly Founder Help",
    role: "Founder",
    active: true,
    addedBy: "System",
    createdAt: new Date().toISOString()
  }
];

export class AccessService {
  /**
   * Fetches all authorized admin users from Firestore
   */
  public static async getAdminUsers(): Promise<AdminUser[]> {
    try {
      const db = await getDb();
      const { collection, getDocs } = await import("firebase/firestore");
      const snap = await getDocs(collection(db, "users"));
      
      let users = snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminUser));

      // Seed default founders if not present
      if (users.length === 0) {
        users = await this.seedDefaultAdmins();
      } else {
        // Ensure motionlymedia.help@gmail.com is present
        const hasMain = users.some(u => u.email.toLowerCase() === "motionlymedia.help@gmail.com");
        if (!hasMain) {
          const mainAdmin = await this.addAdminUser({
            email: "motionlymedia.help@gmail.com",
            name: "Motionly Founder Help",
            role: "Founder",
            active: true,
            addedBy: "System Setup"
          });
          users.unshift(mainAdmin);
        }
      }

      return users;
    } catch (err) {
      console.error("Error fetching admin users:", err);
      return [];
    }
  }

  private static async seedDefaultAdmins(): Promise<AdminUser[]> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const seeded: AdminUser[] = [];

    for (const admin of DEFAULT_SUPER_ADMINS) {
      const id = `usr_${admin.email.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;
      const user: AdminUser = { id, ...admin };
      await setDoc(doc(db, "users", id), user);
      seeded.push(user);
    }
    return seeded;
  }

  /**
   * Adds a new authorized admin user
   */
  public static async addAdminUser(
    userData: Omit<AdminUser, "id" | "createdAt">
  ): Promise<AdminUser> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const cleanEmail = userData.email.trim().toLowerCase();
    const id = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;

    const newUser: AdminUser = {
      ...userData,
      email: cleanEmail,
      id,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "users", id), newUser);

    // Write to central activity_logs
    try {
      const logId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await setDoc(doc(db, "activity_logs", logId), {
        id: logId,
        userEmail: userData.addedBy || "Admin",
        userName: (userData.addedBy || "Admin").split("@")[0],
        action: "granted_access",
        module: "access",
        targetName: `Granted ${userData.role} access to ${cleanEmail}`,
        details: `Granted ${userData.role} access to ${cleanEmail}`,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Activity log write failed:", e);
    }

    return newUser;
  }

  /**
   * Updates an existing admin user's role or status
   */
  public static async updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc, setDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "users", id), {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    try {
      const logId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await setDoc(doc(db, "activity_logs", logId), {
        id: logId,
        userEmail: "Admin",
        userName: "Admin",
        action: "updated_access",
        module: "access",
        targetName: `Updated user permissions for ${id}`,
        details: `Updated permissions for user ${id}`,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Activity log write failed:", e);
    }
  }

  /**
   * Revokes access / deletes an admin user
   */
  public static async deleteAdminUser(id: string): Promise<void> {
    const db = await getDb();
    const { doc, deleteDoc, setDoc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "users", id));

    try {
      const logId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await setDoc(doc(db, "activity_logs", logId), {
        id: logId,
        userEmail: "Admin",
        userName: "Admin",
        action: "revoked_access",
        module: "access",
        targetName: `Revoked access for user ${id}`,
        details: `Revoked access for user ${id}`,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Activity log write failed:", e);
    }
  }

  /**
   * Records an audit log entry for admin panel access
   */
  public static async recordAccessLog(
    email: string,
    displayName?: string,
    role?: string,
    action: string = "Logged into Admin Panel",
    path: string = "/admin"
  ): Promise<void> {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import("firebase/firestore");
      const id = `access_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      const logEntry: AdminAccessLog = {
        id,
        email: email.toLowerCase(),
        displayName: displayName || email,
        role: role || "Admin",
        action,
        path,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown"
      };

      await setDoc(doc(db, "admin_access_logs", id), logEntry);

      // Also mirror to central activity_logs
      const actId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await setDoc(doc(db, "activity_logs", actId), {
        id: actId,
        userEmail: email.toLowerCase(),
        userName: displayName || email.split("@")[0],
        action: "logged_in",
        module: "auth",
        targetName: `Accessed admin panel (${path})`,
        details: `${displayName || email} logged into admin console`,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Failed to record access log:", err);
    }
  }

  /**
   * Fetches audit history logs of who accessed the admin panel
   */
  public static async getAccessLogs(): Promise<AdminAccessLog[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");
      const q = query(collection(db, "admin_access_logs"), orderBy("timestamp", "desc"), limit(150));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminAccessLog));
    } catch (err) {
      console.error("Error fetching access logs:", err);
      return [];
    }
  }
}
