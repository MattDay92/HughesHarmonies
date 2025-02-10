import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA5mVo7FKNQ8oErs10IAJfZRAluryL5034",
  authDomain: "hughesharmonies.firebaseapp.com",
  projectId: "hughesharmonies",
  storageBucket: "hughesharmonies.firebasestorage.app",
  messagingSenderId: "80457043323",
  appId: "1:80457043323:web:09a77fc94630ef77b301de",
  measurementId: "G-9N84LX6KSC"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export const db = getFirestore(app);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App storage={storage} />
  </StrictMode>,
)
