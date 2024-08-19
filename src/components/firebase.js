import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBY1l-GdEbB6lp3XLkih_KZ2ZL2aREU1bM",
    authDomain: "fitnesstrack-4bf38.firebaseapp.com",
    projectId: "fitnesstrack-4bf38",
    storageBucket: "fitnesstrack-4bf38.appspot.com",
    messagingSenderId: "26285667384",
    appId: "1:26285667384:web:cd2a649c00c2eb624522cd",
    measurementId: "G-X95HRKKD74"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
