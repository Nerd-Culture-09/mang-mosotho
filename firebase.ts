import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu-CdvybCvulK8DlOTzVeACf7Wv57ZWt8",
  authDomain: "mang-mosotho.firebaseapp.com",
  projectId: "mang-mosotho",
  storageBucket: "mang-mosotho.appspot.com",
  messagingSenderId: "768390982650",
  appId: "1:768390982650:web:b21db1d111dbb6080d5243",
  measurementId: "G-4NGSFY75TK",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
