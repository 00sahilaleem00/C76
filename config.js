import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB8_2kiznUYmtegAcqoG8TKGYbxH16adi8",
  authDomain: "c76-book-santa.firebaseapp.com",
  projectId: "c76-book-santa",
  storageBucket: "c76-book-santa.appspot.com",
  messagingSenderId: "799797211460",
  appId: "1:799797211460:web:adda638a9d22f9edf02711",
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
