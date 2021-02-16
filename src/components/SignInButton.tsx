import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface SignInButtonProps {
  auth: firebase.auth.Auth;
}

const buttonClass =
  "p-2 my-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2 mr-8";

export const SignInButton: React.FC<SignInButtonProps> = ({ auth }) => {
  const [user] = useAuthState(auth);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  if (user) {
    return (
      <button className={buttonClass} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    );
  }

  return (
    <button className={buttonClass} onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};
