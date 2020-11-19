import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyClAgF4Gc9nFn6iSfeQ4ImJOARFKpO9saU",
  authDomain: "anon-d57de.firebaseapp.com",
  databaseURL: "https://anon-d57de.firebaseio.com",
  projectId: "anon-d57de",
  storageBucket: "anon-d57de.appspot.com",
  messagingSenderId: "80993916295",
  appId: "1:80993916295:web:43cb3419c0b0f8e043af22",
  measurementId: "G-YEMJEZS8CT"
};

firebase.initializeApp(firebaseConfig);

export default firebase;