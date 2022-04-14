import React from "react";
import { useSelector } from "react-redux";
import Feed from "../components/feed/Feed";
import Header from "../components/header/Header";
import Modal from "../components/modal/Modal";

const Home = () => {
  const modalOpen = useSelector((state) => state.modal.modalOpen);

  return (
    <div>
      {modalOpen && <Modal />}

      <Header />

      <Feed />
    </div>
  );
};

export default Home;
