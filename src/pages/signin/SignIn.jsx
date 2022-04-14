import React from "react";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../../firebase";
import Header from "../../components/header/Header";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();

  const onSignInHandler = () => {
    signInWithGoogle()
      .then((user) => navigate("/", { replace: true }))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Header />

      <div className={classes.signIn}>
        <img src="https://links.papareact.com/ocw" alt="" />

        <p>This is not a real app, it's just for educational purposes</p>

        <button onClick={onSignInHandler}>Sign in with google</button>
      </div>
    </>
  );
};

export default SignIn;
