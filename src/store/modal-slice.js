import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    modalOpen: false,
  },
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },

    closeModal(state) {
      state.modalOpen = false;
    },
  },
});

export default ModalSlice;
