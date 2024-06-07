import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLvcYYrBJwVfZNWE2KPL1L-RQE0zI5uHM",
  authDomain: "formecell-78144.firebaseapp.com",
  projectId: "formecell-78144",
  storageBucket: "formecell-78144.appspot.com",
  messagingSenderId: "431241730233",
  appId: "1:431241730233:web:e8988916096c9af0062368"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };