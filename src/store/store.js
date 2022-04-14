import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user-slice";
import ModalSlice from "./modal-slice";

const store = configureStore({
  reducer: { user: UserSlice.reducer, modal: ModalSlice.reducer },
});

export const { login, logout, subscribe } = UserSlice.actions;

export const { openModal, closeModal } = ModalSlice.actions;

export default store;
