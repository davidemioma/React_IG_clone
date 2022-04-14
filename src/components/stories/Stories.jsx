import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import classes from "./Stories.module.css";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setSuggestions(
      [...Array(20)].map((_, i) => ({
        ...faker.helpers.contextualCard(),
        id: i,
      }))
    );
  }, []);

  return (
    <div className={classes.stories}>
      {currentUser && (
        <div key={currentUser.uid} className={classes.profile}>
          <img src={currentUser.userImg} alt="" />
          <p>{currentUser.username}</p>
        </div>
      )}

      {suggestions.map((profile) => (
        <div key={profile.id} className={classes.profile}>
          <img src={profile.avatar} alt="" />
          <p>{profile.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
