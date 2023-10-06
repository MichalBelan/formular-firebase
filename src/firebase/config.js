import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB2fXVtp874jIuruCZiAxrGdXGOueUOel0",
    authDomain: "movies-71fa0.firebaseapp.com",
    projectId: "movies-71fa0",
    storageBucket: "movies-71fa0.appspot.com",
    messagingSenderId: "248633450885",
    appId: "1:248633450885:web:0256f4131a91c521ae64ec"
  };

//pociatocne nastavenie firebase (init)
  firebase.initializeApp(firebaseConfig)

//pociatocne nastavenie sluzieb
const projectFirestore=firebase.firestore()

export {projectFirestore}