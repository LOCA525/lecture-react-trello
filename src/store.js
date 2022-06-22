import { configureStore, createSlice } from "@reduxjs/toolkit";

let email = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    changeEmail(state, a) {
      return "";
    },
  },
});
console.log(email.initialState);
let token = createSlice({
  name: "token",
  initialState: "",
});

export default configureStore({
  reducer: {
    email: email.reducer,
  },
});

export let { changeEmail } = email.actions;
