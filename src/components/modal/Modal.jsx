import React, { useRef, useState } from "react";
import { closeModal } from "../../store/store";
import { CameraIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import classes from "./Modal.module.css";

const Modal = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const modalOpen = useSelector((state) => state.modal.modalOpen);

  const [caption, setCaption] = useState("");

  const filePickerRef = useRef(null);

  const [seletedFile, setSeletedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    const reader = new FileReader();

    const { type } = e.target.files[0];

    if (
      e.target.files[0] ||
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSeletedFile(readerEvent.target.result);
    };
  };

  const upLoadPost = async () => {
    if (caption === "" || seletedFile === null) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: currentUser.username,
      caption: caption,
      profileImg: currentUser.userImg,
      timestamps: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, seletedFile, "data_url").then(
      async (snapshoot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    dispatch(closeModal());

    setLoading(false);

    setSeletedFile(null);
  };

  return (
    <div>
      <div
        className={`${classes.backdrop} ${
          modalOpen ? classes.backdrop_open : classes.backdrop_closed
        }`}
        onClick={() => dispatch(closeModal())}
      ></div>

      <div className={classes.modal_container}>
        <div
          className={`${classes.modal} ${
            modalOpen ? classes.modal_open : classes.modal_closed
          }`}
        >
          {seletedFile ? (
            <img
              className={classes.seleted_img}
              onClick={() => setSeletedFile(null)}
              src={seletedFile}
              alt=""
            />
          ) : (
            <div
              className={classes.icon_container}
              onClick={() => filePickerRef.current.click()}
            >
              <CameraIcon className={classes.icon} />
            </div>
          )}

          <h4>Upload an image</h4>

          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={uploadImage}
          />

          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Please enter a caption..."
          />

          <button onClick={upLoadPost} disabled={loading || !seletedFile}>
            {loading ? "Uploading...." : "Upload Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
