import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAEXnNB14nJVevIoKRgsy_BZipfluXsSw4",
    authDomain: "collection-demo-e5abb.firebaseapp.com",
    projectId: "collection-demo-e5abb",
    storageBucket: "collection-demo-e5abb.appspot.com",
    messagingSenderId: "807240551195",
    appId: "1:807240551195:web:dc8d06590a61462010e1be"
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);

