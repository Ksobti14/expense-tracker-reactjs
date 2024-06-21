// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider}  from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxbYFc-QY0EDoD7SHxiUJROnk5ZSn8vj8",
  authDomain: "expense-tracker-354cd.firebaseapp.com",
  projectId: "expense-tracker-354cd",
  storageBucket: "expense-tracker-354cd.appspot.com",
  messagingSenderId: "435510671223",
  appId: "1:435510671223:web:076830b130bad69db99372",
  measurementId: "G-M8R6MLH18R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app);
//firebase login
//firebase init
//firebase deploy