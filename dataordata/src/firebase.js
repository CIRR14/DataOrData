import firebase from 'firebase';


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDSIL3vyxKFKLwdT8S8Rd3cPeLhvpAmTlw",
    authDomain: "sstproject-e3d89.firebaseapp.com",
    databaseURL: "https://sstproject-e3d89.firebaseio.com",
    projectId: "sstproject-e3d89",
    storageBucket: "",
    messagingSenderId: "134816283086"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;

