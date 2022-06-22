import { configureStore, createSlice } from "@reduxjs/toolkit";

let email = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    changeEmail(state, a) {
      return a.payload;
    },
  },
});

let token = createSlice({
  name: "token",
  initialState: "",
  reducers: {
    changeToken(state, a) {
      return a.payload;
    },
  },
});

export default configureStore({
  reducer: {
    email: email.reducer,
    token: token.reducer,
  },
});

export let { changeEmail } = email.actions;
export let { changeToken } = token.actions;
