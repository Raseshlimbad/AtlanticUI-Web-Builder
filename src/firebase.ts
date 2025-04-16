// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfMyZumzIA2f6AHoJZrmWM_Pab9KNW2AU",
  authDomain: "atlanticwebbuilder.firebaseapp.com",
  projectId: "atlanticwebbuilder",
  storageBucket: "atlanticwebbuilder.firebasestorage.app",
  messagingSenderId: "162701254272",
  appId: "1:162701254272:web:c1b2dc91e898b3824c1065",
  measurementId: "G-Y4G2KTW9S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };