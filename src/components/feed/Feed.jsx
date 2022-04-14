import React from "react";
import { useSelector } from "react-redux";
import Stories from "../stories/Stories";
import Posts from "../posts/Posts";
import MiniProfile from "../mini-profile/MiniProfile";
import Suggestions from "../suggestions/Suggestions";
import classes from "./Feed.module.css";

const Feed = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <main className={classes.container}>
      <div
        className={`container ${currentUser ? classes.feed : classes.no_user} 
        `}
      >
        <section className={classes.section_lg}>
          <Stories />

          <Posts />
        </section>

        {currentUser && (
          <section className={classes.section_sm}>
            <MiniProfile />

            <Suggestions />
          </section>
        )}
      </div>
    </main>
  );
};

export default Feed;
