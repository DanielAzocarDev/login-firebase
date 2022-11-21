// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwhJITVzppJB-ybjJc8-fJ_BQoMzsQnW4",
  authDomain: "la-tiendita-ea0ab.firebaseapp.com",
  projectId: "la-tiendita-ea0ab",
  storageBucket: "la-tiendita-ea0ab.appspot.com",
  messagingSenderId: "707294483946",
  appId: "1:707294483946:web:ea535399613f4505c30e93",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
