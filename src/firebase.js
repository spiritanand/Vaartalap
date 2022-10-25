// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASrmu2L5h1ByKzsa6vtA_wY59M3f9Ms7g",
  authDomain: "vaartalapreactchat.firebaseapp.com",
  projectId: "vaartalapreactchat",
  storageBucket: "vaartalapreactchat.appspot.com",
  messagingSenderId: "268515113964",
  appId: "1:268515113964:web:fd2665d073d908effc5ec9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Create a root reference
export const storage = getStorage();
export const db = getFirestore(app);