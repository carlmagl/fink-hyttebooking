import firebase from "firebase";
export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: "fink-hyttebook.firebaseapp.com",
      databaseURL:
        "https://fink-hyttebook-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "fink-hyttebook",
      storageBucket: "fink-hyttebook.appspot.com",
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: "G-YJXHDBXRC1",
    });
  } else {
    firebase.app();
  }
};
