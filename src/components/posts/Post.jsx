import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";
import classes from "./Posts.module.css";

const Post = ({ profileImg, username, image, caption, id }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamps", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === currentUser?.uid) !== -1
      ),
    [likes]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser.username,
      profileImg: currentUser.userImg,
      timestamps: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser.uid), {
        username: currentUser.username,
      });
    }
  };

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <div className={classes.user}>
          <img src={profileImg} alt="" />

          <p>{username}</p>
        </div>

        <DotsHorizontalIcon className={classes.header_icon} />
      </div>

      <img className={classes.post_img} src={image} alt="" />

      {currentUser && (
        <div className={classes.icons}>
          <div>
            {hasLiked ? (
              <HeartIconSolid
                onClick={likePost}
                className={classes.icon}
                color="red"
              />
            ) : (
              <HeartIcon onClick={likePost} className={classes.icon} />
            )}

            <ChatIcon className={classes.icon} />

            <PaperAirplaneIcon
              className={`${classes.icon} ${classes.icon_rotate}`}
            />
          </div>

          <BookmarkIcon className={classes.icon} />
        </div>
      )}

      {likes.length > 0 && (
        <p className={classes.likes}>
          {likes.length} {likes.length > 1 ? "likes" : "like"}
        </p>
      )}

      <div className={classes.caption}>
        <span>{username}</span>
        <p>{caption}</p>
      </div>

      {comments.length > 0 && (
        <div className={classes.comments}>
          {comments.map((comment) => (
            <div key={comment.id} className={classes.comment}>
              <img src={comment.data().profileImg} alt="" />

              <p>
                <span>{comment.data().username}</span> {comment.data().comment}
              </p>

              <Moment className={classes.time} fromNow>
                {comment.data().timestamps?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {currentUser && (
        <form className={classes.form}>
          <EmojiHappyIcon className={classes.icon} />

          <input
            value={comment}
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={sendComment}
            type="submit"
            disabled={!comment.trim()}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
