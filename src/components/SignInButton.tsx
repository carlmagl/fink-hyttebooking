import firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";

interface SignInButtonProps {
  auth: firebase.auth.Auth;
  textColor: string;
  margin?: string;
}

const buttonClass =
  "p-2 my-2 bg-orange rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2 mr-8 ";

export const SignInButton: React.FC<SignInButtonProps> = ({
  auth,
  textColor,
  margin = "mr-8",
}) => {
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
        className={buttonClass + textColor}
        onClick={() => {
          signOutWithGoogle();
        }}
      >
        Logg ut
      </button>
    );
  }

  return (
    <button className={buttonClass} onClick={signInWithGoogle}>
      Logg inn
    </button>
  );
};
