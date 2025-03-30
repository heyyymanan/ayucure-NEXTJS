// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDvhu4qEXE4fS74XdCYvP4Ktx3o-YVN2g",
  authDomain: "bynatablet-in.firebaseapp.com",
  projectId: "bynatablet-in",
  storageBucket: "bynatablet-in.firebasestorage.app",
  messagingSenderId: "1059784443046",
  appId: "1:1059784443046:web:c73177ae690f29c41be067",
  measurementId: "G-CMKSRTSM2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app};