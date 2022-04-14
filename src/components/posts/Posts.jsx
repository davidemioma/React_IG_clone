import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../../firebase";
import Post from "./Post";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamps", "desc")),
        (snapshot) => setPosts(snapshot.docs)
      ),
    [db]
  );

  return (
    <div className={classes.posts}>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          profileImg={post.data().profileImg}
          username={post.data().username}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
