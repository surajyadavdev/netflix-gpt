// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS7B5W17Gdu3slp3z84GgNDmBhdcwljUI",
  authDomain: "netflixgpt-33f91.firebaseapp.com",
  projectId: "netflixgpt-33f91",
  storageBucket: "netflixgpt-33f91.appspot.com",
  messagingSenderId: "356820395344",
  appId: "1:356820395344:web:f2edbebc7966a73ddb7855",
  measurementId: "G-BP2CE1F77B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
