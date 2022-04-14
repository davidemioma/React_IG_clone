import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import classes from "./MiniProfile.module.css";

const MiniProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      {
        <div className={classes.profile}>
          <img className={classes.avatar} src={currentUser?.userImg} alt="" />

          <div>
            <h3>{currentUser?.username}</h3>
            <p>Welcome to instagram</p>
          </div>

          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      }
    </>
  );
};

export default MiniProfile;
