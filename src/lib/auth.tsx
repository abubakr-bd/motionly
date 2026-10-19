import React, { createContext, useContext, useEffect, useState } from "react";
import { type User } from "firebase/auth";

export type AdminRole = "Founder" | "Admin" | "HR" | "Editor" | "Sales" | "Viewer" | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: AdminRole;
  isAdmin: boolean;
  hasPermission: (requiredRoles: AdminRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  role: null,
  isAdmin: false,
  hasPermission: () => false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AdminRole>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      const { getAuth, onAuthStateChanged } = await import("firebase/auth");
      const { getFirestore, doc, getDoc } = await import("firebase/firestore");
      const { initializeApp, getApps } = await import("firebase/app");

      const firebaseConfig = {
        apiKey: "AIzaSyAoui6O3ikB7nGQj54sZ6t-i30XK6QeFPo",
        authDomain: "motionly-media.firebaseapp.com",
        projectId: "motionly-media",
        storageBucket: "motionly-media.firebasestorage.app",
        messagingSenderId: "587741429989",
        appId: "1:587741429989:web:cf91754705e429833c540c",
      };

      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        
        if (currentUser && currentUser.email) {
          try {
            const { setFirebaseAuthToken } = await import("firebase/firestore") as any;
            if (setFirebaseAuthToken) {
              const token = await currentUser.getIdToken();
              setFirebaseAuthToken(token);
            }
          } catch (err) {
            console.error("Shim auth injection failed", err);
          }

          const cleanEmail = currentUser.email.trim().toLowerCase();
          const superAdminEmails = ["motionlymedia.help@gmail.com"];
          
          try {
            const userDocId = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
            const userDoc = await getDoc(doc(db, "users", userDocId));
            
            if (userDoc.exists()) {
              const uData = userDoc.data();
              if (uData.active === false) {
                setRole(null); // Disabled user
              } else {
                setRole(uData.role as AdminRole);
              }
            } else if (superAdminEmails.includes(cleanEmail)) {
              setRole("Founder");
            } else {
              setRole(null); // Do NOT allow random emails access
            }

            // Record access log in background if they got access
            if (superAdminEmails.includes(cleanEmail) || (userDoc.exists() && userDoc.data().active !== false)) {
              const { AccessService } = await import("./services/accessService");
              AccessService.recordAccessLog(
                cleanEmail,
                currentUser.displayName || cleanEmail,
                superAdminEmails.includes(cleanEmail) ? "Founder" : (userDoc.data()?.role || "Admin"),
                "Accessed Motionly Admin Panel"
              ).catch(console.error);
            }

          } catch (e) {
            console.error("Failed to fetch user role", e);
            if (superAdminEmails.includes(cleanEmail)) setRole("Founder");
            else setRole(null);
          }
        } else {
          setRole(null);
        }
        
        setLoading(false);
      });
    };

    initAuth();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const isAdmin = role === "Founder" || role === "Admin";

  const hasPermission = (requiredRoles: AdminRole[]) => {
    if (role === "Founder") return true; 
    return requiredRoles.includes(role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, isAdmin, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
