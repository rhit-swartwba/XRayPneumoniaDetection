// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB2-lTlTMqkDCmbq5oXHo7wcS5FooeM_g",
  authDomain: "xraypneumoniadetection.firebaseapp.com",
  projectId: "xraypneumoniadetection",
  storageBucket: "xraypneumoniadetection.appspot.com",
  messagingSenderId: "264302956589",
  appId: "1:264302956589:web:8b7524432b79e7e25368a4",
  measurementId: "G-PM90EEEC7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;