import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyByVt7YWZjUyQkRg6p4mkcFDxGPFh-9MCU",
  authDomain: "pokemon-app-87f30.firebaseapp.com",
  databaseURL: "https://pokemon-app-87f30.firebaseio.com",
  projectId: "pokemon-app-87f30",
  storageBucket: "pokemon-app-87f30.appspot.com",
  messagingSenderId: "858984257526"
};
firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default}
