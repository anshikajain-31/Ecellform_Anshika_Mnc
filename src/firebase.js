import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBG09yH4MmJegbDIjUMcicfwjNIg6xZVSo",
  authDomain: "formecell02.firebaseapp.com",
  projectId: "formecell02",
  storageBucket: "formecell02.appspot.com",
  messagingSenderId: "695802884502",
  appId: "1:695802884502:web:9ae9f1dbee46b1a2e72db7"
};

export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage = getStorage(app);

