import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDCQmQ-N1mVdfnyN8aq5L7Cx3xOsihIW9c",
    authDomain: "lista-de-tareas-87e7d.firebaseapp.com",
    projectId: "lista-de-tareas-87e7d",
    storageBucket: "lista-de-tareas-87e7d.appspot.com",
    messagingSenderId: "931496401514",
    appId: "1:931496401514:web:26e9131169dbe3dd4a4813"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

  export {firebase}