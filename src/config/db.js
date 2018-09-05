import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyDRtq4SXWHhDPaUI_6RynnCvqTjxwVgj6Q",
    authDomain: "rentokar-58839.firebaseapp.com",
    databaseURL: "https://rentokar-58839.firebaseio.com",
    projectId: "rentokar-58839",
    storageBucket: "rentokar-58839.appspot.com",
    messagingSenderId: "487726989792"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();