import firebase from "firebase";
import moment from "moment";
import React, { useRef, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "tailwindcss/tailwind.css";

export interface EventsViewProps {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

export const EventsView: React.FC<EventsViewProps> = ({ auth, firestore }) => {
  const dummy = useRef();
  const eventsRef = firestore.collection("events");
  const query = eventsRef.orderBy("createdAt").limit(25);
  const [events] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  console.log("events", events);
  const { uid, photoURL, displayName } = auth.currentUser!;
  const sendEvent = async (e: any) => {
    e.preventDefault();

    await eventsRef.add({
      title: displayName,
      uid,
      creator: displayName,
      start: moment(
        `2021-02-${Math.floor(Math.random() * Math.floor(25))}`
      ).toDate(),
      end: moment("2021-02-28").toDate(),
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <form onSubmit={sendEvent}>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          placeholder="Tittel"
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
      <main className="flex flex-row overflow-scroll	">
        {events &&
          events.map((msg: any) => (
            <div
              key={msg.id}
              className="mt-4"
              onClick={() => {
                deleteEvent(msg.id, msg.uid, uid);
              }}
            >
              <h3>{msg.title}</h3>
              <p>{msg.creator}</p>
              <p>{moment.unix(msg.start.seconds).toString()}</p>
              <p>{moment.unix(msg.end.seconds).toString()}</p>
            </div>
          ))}
        {/* <span ref={dummy}></span> */}
      </main>
    </>
  );
};

async function deleteEvent(id: string, uid: string, userAuthId: string) {
  if (uid !== userAuthId) {
    return;
  }
  firebase
    .firestore()
    .collection("events")
    .doc(id)
    .delete()
    .catch((error: firebase.FirebaseError) => {
      console.log("error", error.message);
    });
}
