import { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // 🔥 LOAD FAVORITES LIVE FROM FIRESTORE
  useEffect(() => {
    if (!user) {
      setFavorites([]); // 🔥 clear UI instantly on logout
      return;
    }

    const ref = collection(db, "users", user.uid, "favorites");

    const unsub = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setFavorites(data);
    });

    return () => unsub();
  }, [user]);

  // ❤️ ADD FAVORITE
  const addFavorite = async (movie) => {
    if (!user) return;

    await setDoc(doc(db, "users", user.uid, "favorites", movie.imdbID), {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      Year: movie.Year,
    });
  };

  // ❌ REMOVE FAVORITE
  const removeFavorite = async (movieId) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "favorites", movieId));
  };

  // 🔍 CHECK IF FAVORITE
  const isFavorite = (movieId) => {
    return favorites.some((m) => m.imdbID === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
