import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database;

