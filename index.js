// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEQ7NOSg31qqzRI8mEpBMykTbOyCGVaUw",
  authDomain: "spacelaunchsc.firebaseapp.com",
  projectId: "spacelaunchsc",
  storageBucket: "spacelaunchsc.appspot.com",
  messagingSenderId: "245678652349",
  appId: "1:245678652349:web:1a541dfc3e2db4f26d70d4",
  measurementId: "G-2NKH937T6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);