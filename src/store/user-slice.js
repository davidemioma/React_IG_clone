import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },

    logout(state) {
      state.currentUser = null;
    },
  },
});

export default UserSlice;
