// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAtmakkfQ5x_JtYwpC5z8Vbh0B9AoB_KvI",
    authDomain: "ballsballers.firebaseapp.com",
    projectId: "ballsballers",
    storageBucket: "ballsballers.appspot.com",
    messagingSenderId: "28196685049",
    appId: "1:28196685049:web:c7f62d7cd01aa758420e28"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
 
