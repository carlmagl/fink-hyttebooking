import firebase from "firebase";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "tailwindcss/tailwind.css";

export interface AuthRouteProps {
  auth: firebase.auth.Auth;
  children: React.ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ auth, children }) => {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  console.log("From tried Redirect", auth.currentUser);
  if (user && history.location.pathname !== "/calendar") {
    history.push("/calendar");
  }
  return <>{children}</>;
};
