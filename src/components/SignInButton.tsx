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
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const id_token = localStorage.getItem("FB_ACCESSTOKEN");
    if (id_token) {
      var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          const credential = result.credential as firebase.auth.OAuthCredential;
          const token = credential.idToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          localStorage.setItem("FB_ACCESSTOKEN", token ? token : "");
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
