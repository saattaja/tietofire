import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDBIh77RfflAyE7848M_6lTSIpAN5S1YLE",
    authDomain: "messages-eb789.firebaseapp.com",
    projectId: "messages-eb789",
    storageBucket: "messages-eb789.appspot.com",
    messagingSenderId: "375635070650",
    appId: "1:375635070650:web:0564e48dfa6344b966fc83"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export{
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};