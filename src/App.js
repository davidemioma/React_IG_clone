import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { login, logout } from "./store/store";
import { auth } from "./firebase";
import Home from "./pages/Home";
import SignIn from "./pages/signin/SignIn";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            username: user.displayName.split(" ").join("").toLowerCase(),
            userImg: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
