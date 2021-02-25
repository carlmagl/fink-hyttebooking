import firebase from "firebase";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import { Header } from "./components/Header";
import { SignInButton } from "./components/SignInButton";
import { AuthRoute } from "./utils/AuthRoute";
import { initializeFirebase } from "./utils/initializeFirebase";
import { CalendarView } from "./views/CalendarView";

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
          <AuthRoute
            auth={auth}
            children={
              <>
                <Route exact path="/">
                  <section className="min-h-screen min-w-full flex flex-col justify-center items-center">
                    <SignInButton auth={auth} textColor={""} />
                  </section>
                </Route>
                <Route path="/calendar">
                  <CalendarView auth={auth} firestore={firestore} />
                </Route>
              </>
            }
          ></AuthRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
