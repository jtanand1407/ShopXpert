import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAI1iPs5gceqNLuViPPNqKdbtEJZduwu_U",
    authDomain: "clone-954ae.firebaseapp.com",
    projectId: "clone-954ae",
    storageBucket: "clone-954ae.appspot.com",
    messagingSenderId: "809199786734",
    appId: "1:809199786734:web:add4020cebbbf308c3b1ff",
    measurementId: "G-VPBLGHDT1W"
  };

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db ,auth};