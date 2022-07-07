// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt_AsJb_uVlMuaSk9ShRin5UasB9AJ2TE",
  authDomain: "rulo-ecommerce.firebaseapp.com",
  projectId: "rulo-ecommerce",
  storageBucket: "rulo-ecommerce.appspot.com",
  messagingSenderId: "909107061614",
  appId: "1:909107061614:web:fea5e3e4b8247324a0177f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;