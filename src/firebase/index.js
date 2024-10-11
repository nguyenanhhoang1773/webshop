// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqkA8CGSFzC4EkPmlgt-agSw16ifZDC2g",
  authDomain: "tttt-61db2.firebaseapp.com",
  projectId: "tttt-61db2",
  storageBucket: "tttt-61db2.appspot.com",
  messagingSenderId: "256976509399",
  appId: "1:256976509399:web:d98c23454830b5c7d61392",
  measurementId: "G-J487TG9SR1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
