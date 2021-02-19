import firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";

interface SignInButtonProps {
  auth: firebase.auth.Auth;
}

const buttonClass =
  "p-2 my-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2 mr-8";

export const SignInButton: React.FC<SignInButtonProps> = ({ auth }) => {
  const history = useHistory();
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    history.push("/calendar");
  };
  const signOutWithGoogle = async () => {
    await auth.signOut();
    history.push("/");
  };

  if (auth.currentUser) {
    return (
      <button
        className={buttonClass}
        onClick={() => {
          signOutWithGoogle();
        }}
      >
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
