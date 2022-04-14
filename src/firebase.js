import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = !getApps().length
  ? initializeApp({
      apiKey: "AIzaSyBjSoQ992ONSjT9HbCBNHjonKr0eledfNk",
      authDomain: "ig-clone-44fb4.firebaseapp.com",
      projectId: "ig-clone-44fb4",
      storageBucket: "ig-clone-44fb4.appspot.com",
      messagingSenderId: "979908286473",
      appId: "1:979908286473:web:77bcbf25846000d81b00d8",
    })
  : getApp();

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const storage = getStorage();

export default app;
