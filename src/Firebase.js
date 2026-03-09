import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA749IZw-WXKv3tf9MQHghEYN-DiR0NrRc",
  authDomain: "projectnine-57d79.firebaseapp.com",
  projectId: "projectnine-57d79",
  storageBucket: "projectnine-57d79.firebasestorage.app",
  messagingSenderId: "10397724793",
  appId: "1:10397724793:web:d472a1b0d46fc9b410e4a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

