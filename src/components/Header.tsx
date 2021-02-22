import firebase from "firebase";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import { SignInButton } from "./SignInButton";
import { useAuthState } from "react-firebase-hooks/auth";

export interface HeaderProps {
  auth: firebase.auth.Auth;
}

export const Header: React.FC<HeaderProps> = ({ auth }) => {
  const [user, loading, error] = useAuthState(auth);
  if (error) {
    console.log(error.message);
  }
  return (
    <header className="bg-blue flex flex-row  w-full justify-center items-center top-0 h-16 ...">
      <h1 className="absolute left-0 text-primary ml-8">
        Hyttebooking for Fink!
      </h1>
      <div className="absolute right-0 flex flex-row items-center">
        {user && !loading && (
          <>
            <p className="text-primary mr-8 ">{user.email}</p>
            <img
              className="h-8 mr-8 rounded-full"
              src={
                user.photoURL ||
                "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
              }
              alt="Google avatar"
            ></img>
          </>
        )}
        <SignInButton auth={auth} textColor={"text-primary"} />
      </div>
    </header>
  );
};
