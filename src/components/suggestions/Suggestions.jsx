import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import classes from "./Suggestions.module.css";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(
      [...Array(5)].map((_, i) => ({
        ...faker.helpers.contextualCard(),
        id: i,
      }))
    );
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>Suggestions for you</p>

        <button>See All</button>
      </div>

      <div className={classes.suggestions}>
        {suggestions.map((profile) => (
          <div key={profile.id} className={classes.profile}>
            <img src={profile.avatar} alt="" />

            <div>
              <h3>{profile.username}</h3>

              <p>Works at {profile.company.name}</p>
            </div>

            <button>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
