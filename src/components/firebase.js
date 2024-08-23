import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence, GoogleAuthProvider, FacebookAuthProvider, setPersistence } from 'firebase/auth';

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
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

setPersistence(auth, browserLocalPersistence);
export { db, auth, googleProvider, facebookProvider };
