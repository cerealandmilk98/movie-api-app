import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // SIGN UP
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // 🔥 SAVE USER TO FIRESTORE
    await setDoc(
      doc(db, "users", res.user.uid),
      {
        email: res.user.email,
        createdAt: new Date(),
      },
      { merge: true },
    );

    return res;
  };

  // LOGIN
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // 🔥 ALSO SAVE/UPDATE USER ON LOGIN
    await setDoc(
      doc(db, "users", res.user.uid),
      {
        email: res.user.email,
        lastLogin: new Date(),
      },
      { merge: true },
    );

    return res;
  };

  // LOGOUT
  const logout = () => signOut(auth);

  // TRACK USER STATE
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
