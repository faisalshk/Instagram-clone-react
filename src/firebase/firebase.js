// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVDxr_si03tKsj1lVuc6ehx6XpuxAERiM",
  authDomain: "insta-clone-52b6a.firebaseapp.com",
  projectId: "insta-clone-52b6a",
  storageBucket: "insta-clone-52b6a.appspot.com",
  messagingSenderId: "171658050905",
  appId: "1:171658050905:web:772e423c632ad1150e2048",
  measurementId: "G-968CFQ710B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
