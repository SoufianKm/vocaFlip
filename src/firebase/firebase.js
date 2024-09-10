// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcg1H8GmsTIsCPzFtv8suIaoBVBeIkGoo",
  authDomain: "vocaflip-d84bc.firebaseapp.com",
  projectId: "vocaflip-d84bc",
  storageBucket: "vocaflip-d84bc.appspot.com",
  messagingSenderId: "164437465438",
  appId: "1:164437465438:web:6e7b01b408360024dbd7cf",
  measurementId: "G-7YE889G2XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
