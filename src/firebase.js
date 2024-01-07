// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDANDodKuhmVwCB8VpbwXkgup5aHxhd5-M",
  authDomain: "dyslexaihackathom.firebaseapp.com",
  projectId: "dyslexaihackathom",
  storageBucket: "dyslexaihackathom.appspot.com",
  messagingSenderId: "247610224546",
  appId: "1:247610224546:web:5f53787006e66206db0cfb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
