import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apikey: "AIzaSyDZTfoxxDIjiAPE_9jfJ42fO3KjZZcP3xk",
    authDomain: "bingo-96708.firebaseapp.com",
    databaseURL: "https://bingo-96708.firebaseio.com",
    projectId: "bingo-96708",
    storageBucket: "bingo-96708.appspot.com",
    messagingSenderId: "293181734963",
};


export default function loadDB() {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    return firebase;
}
