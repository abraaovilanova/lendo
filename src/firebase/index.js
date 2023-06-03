import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRe_Su4dMkEjPjpohWhhnGmITJx9rEFj4",
    authDomain: "lendo-ebfca.firebaseapp.com",
    projectId: "lendo-ebfca",
    storageBucket: "lendo-ebfca.appspot.com",
    messagingSenderId: "185762716827",
    appId: "1:185762716827:web:3f67aac70aca399aa97a3e",
    measurementId: "G-5ZEDQC0PW7"
  };

  export const app = initializeApp(firebaseConfig);

  export const analytics = getAnalytics(app);

  export const db = getFirestore(app)
