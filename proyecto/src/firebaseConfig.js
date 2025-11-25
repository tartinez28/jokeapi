import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfmMkb8DPXxrK0wKLePgd-MCTyBiF2_7U",
  authDomain: "jokeapi-3ecd4.firebaseapp.com",
  projectId: "jokeapi-3ecd4",
  storageBucket: "jokeapi-3ecd4.firebasestorage.app",
  messagingSenderId: "1035458021422",
  appId: "1:1035458021422:web:a9873443b4339681e8b7bf"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
    
export { auth, db };