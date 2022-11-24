// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVT9aylVqgXOh8MuOUBIEGcfRazAWqXq8",
  authDomain: "thrift-motors.firebaseapp.com",
  projectId: "thrift-motors",
  storageBucket: "thrift-motors.appspot.com",
  messagingSenderId: "844063991186",
  appId: "1:844063991186:web:7cf90cdad5c3d690fe4d4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;