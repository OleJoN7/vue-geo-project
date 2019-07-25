import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvk7pEdZttrOEcxqkxaPLe2lgTFsA_XMA",
  authDomain: "map-auth-0.firebaseapp.com",
  databaseURL: "https://map-auth-0.firebaseio.com",
  projectId: "map-auth-0",
  storageBucket: "",
  messagingSenderId: "655425012580",
  appId: "1:655425012580:web:8789cc9e077e4abe"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
