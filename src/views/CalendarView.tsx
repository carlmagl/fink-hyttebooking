import firebase from "firebase";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import "tailwindcss/tailwind.css";

import { convertArray } from "../utils/convertArray";

export interface EventsViewProps {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}
moment.locale("no", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);

export const CalendarView: React.FC<EventsViewProps> = ({
  auth,
  firestore,
}) => {
  const history = useHistory();

  const eventsRef = firestore.collection("events");
  const query = eventsRef.orderBy("createdAt").limit(25);
  const [events, eventsLoading, eventsError] = useCollectionData(query, {
    idField: "id",
  });
  console.log(events);

  if (eventsLoading) {
    return (
      <section className="min-h-screen min-w-full flex flex-col justify-center items-center">
        <p className="">Loading data...</p>
      </section>
    );
  }
  if (eventsError) {
    console.log(eventsError.message);
  }
  if (!auth.currentUser && !events) {
    history.push("/");
  }

  return (
    <div>
      <section>
        {auth.currentUser ? (
          <>
            {events && (
              <Calendar
                events={convertArray(events)}
                showMultiDayTimes={true}
                startAccessor="start"
                endAccessor="end"
                views={["month"]}
                defaultDate={moment().toDate()}
                localizer={localizer}
                className="h-screen"
                eventPropGetter={(event) => {
                  const backgroundColor =
                    auth.currentUser?.uid === event.uid ? "#f0885d" : "#454d60";
                  return {
                    style: { backgroundColor },
                  };
                }}
                selectable
                onSelectEvent={(event) => {
                  deleteEvent(
                    event.id as any,
                    event.uid as any,
                    auth.currentUser?.uid as any
                  );
                }}
                onSelectSlot={(event) => {
                  console.log(event);
                  sendEvent(event.start, event.end, auth, firestore);
                }}
              />
            )}
          </>
        ) : (
          <p>You have to log in to see the content</p>
        )}
      </section>
    </div>
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

const sendEvent = async (
  start: any,
  end: any,
  auth: any,
  firestore: firebase.firestore.Firestore
) => {
  const { uid, photoURL, displayName } = auth.currentUser!;
  await firestore.collection("events").add({
    title: displayName,
    uid,
    creator: displayName,
    start: start,
    end: moment(end).endOf("day").toDate(),
    photoURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
