import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import database from './firebase';
//import { initializeApp } from "firebase/app";

const config = {
    apiKey: "AIzaSyDG9UAcd8r6MrgejzWqDF4cTeVXJ_xWljE",
    authDomain: "react-blog-demo-1.firebaseapp.com",
    databaseURL: "https://react-blog-demo-1-default-rtdb.firebaseio.com",
    projectId: "react-blog-demo-1",
    storageBucket: "react-blog-demo-1.appspot.com",
    messagingSenderId: "702257424356",
    appId: "1:702257424356:web:0e3d95f0654cace51089f1"
};

firebase.initializeApp(config);
//var database = firebase.database();
export default firebase;
