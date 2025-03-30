// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7_bntcSZBAxu5CRyCRAsjS3S0WJz5iQM",
  authDomain: "bynatablet-in-6db78.firebaseapp.com",
  projectId: "bynatablet-in-6db78",
  storageBucket: "bynatablet-in-6db78.firebasestorage.app",
  messagingSenderId: "662058488438",
  appId: "1:662058488438:web:90ef4a24a71bbfbb628557",
  // measurementId: "G-CMKSRTSM2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {app};