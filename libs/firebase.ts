// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLgbt7taVq8m5bQzP8F27AUYDqkI5iqq0",
  authDomain: "e-shop-vid-c86a4.firebaseapp.com",
  projectId: "e-shop-vid-c86a4",
  storageBucket: "e-shop-vid-c86a4.appspot.com",
  messagingSenderId: "664771191106",
  appId: "1:664771191106:web:481eb8a037321157f8a8db"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp