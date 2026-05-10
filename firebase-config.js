import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMdP3EOsvX3TR69mo3RXAdrob9jF3oo-Q",
  authDomain: "braintech-92479.firebaseapp.com",
  projectId: "braintech-92479",
  storageBucket: "braintech-92479.appspot.com",
  messagingSenderId: "74501814413",
  appId: "1:74501814413:web:711ab2044c7649c71d0ac4",
  measurementId: "G-712HFB0W98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
