import firebase from "firebase";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import { Header } from "./components/Header";
import { initializeFirebase } from "./utils/initializeFirebase";
import { CalendarView } from "./views/CalendarView";

export interface Event {
  title: string;
  id: number;
  uid: String;
  creator: String;
  start: any;
  end: any;
  photoURL: String;
  createdAt: any;
}

// Initialize firebase app

initializeFirebase();
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <Router>
      <div className="min-h-screen ...">
        <Header auth={auth} />
        <Switch>
          <Route exact path="/">
            <div>Log inn</div>
          </Route>
          <Route path="/calendar">
            <CalendarView auth={auth} firestore={firestore} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
