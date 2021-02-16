import React, { useRef, useState } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";

import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SignInButton } from "./components/SignInButton";

import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";

// Initialize firebase app
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
const localizer = momentLocalizer(moment);

// const MyCalendar = (props) => (
//   <div>
//     <Calendar
//       localizer={localizer}
//       events={myEventsList}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   </div>
// );

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  console.log(auth.currentUser);
  var avatarURL = undefined;
  if (user) {
    const { photoURL } = auth.currentUser!;
    avatarURL = photoURL!;
  }
  const bookingsRef = firestore.collection("bookings");
  const query = bookingsRef.orderBy("createdAt").limit(25);
  const [bookings] = useCollectionData(query, { idField: "id" });
  return (
    <div className="bg-green-300 flex flex-row justify-center items-center h-screen ...">
      <header className="bg-blue-300 flex flex-row absolute w-full justify-center items-center top-0 h-16 ...">
        <h1 className="">Hyttebooking for Fink!</h1>
        <div className="absolute right-0 flex flex-row items-center">
          {user && (
            <img
              className="h-8 mr-8"
              src={
                avatarURL ||
                "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
              }
              alt="Google avatar"
            ></img>
          )}
          <SignInButton auth={auth} />
        </div>
      </header>
      <section>
        {user ? (
          <>
            <ChatRoom />
            {/* <Calendar props={bookings} /> */}
          </>
        ) : (
          "You have to log in to see the content"
        )}
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const bookingsRef = firestore.collection("bookings");
  const query = bookingsRef.orderBy("createdAt").limit(25);
  const [bookings] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  console.log(bookings);
  const sendMessage = async (e: any) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser!;
    await bookingsRef.add({
      title: formValue,
      uid,
      creator: displayName,
      startDate: new Date(),
      endDate: new Date(),
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {bookings &&
          bookings.map((msg: any) => (
            <div key={msg.id}>
              <h3>{msg.title}</h3>
              <p>{msg.creator}</p>
              <p>{moment(msg.startDate.seconds).toString()}</p>
              <p>{moment(msg.endDate.seconds).toString()}</p>
            </div>
          ))}
        {/* <span ref={dummy}></span> */}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            console.log("E target value", e.target.value);
            console.log("Formvalue", formValue);
            setFormValue(e.target.value);
          }}
          placeholder="say something nice"
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

export default App;
