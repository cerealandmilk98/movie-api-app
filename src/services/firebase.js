import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALYbcxKmfEr5bGJGYndmMQe7VrO8bcEVI",
  authDomain: "movie-api-app-610a6.firebaseapp.com",
  projectId: "movie-api-app-610a6",
  storageBucket: "movie-api-app-610a6.appspot.com",
  messagingSenderId: "1034438397407",
  appId: "1:1034438397407:web:792f59a17d5953e393086a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
