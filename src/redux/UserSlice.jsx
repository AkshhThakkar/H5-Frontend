import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = UserSlice.actions;
export const selectuser = (state) => state.user.user;
export default UsersSlice.reducer;
