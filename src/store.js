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

let boardData = createSlice({
  name: "boardData",
  initialState: [],
  reducers: {
    changeBoardData(state, a) {
      return a.payload;
    },
  },
});

export default configureStore({
  reducer: {
    email: email.reducer,
    token: token.reducer,
    boardData: boardData.reducer,
  },
});

export let { changeEmail } = email.actions;
export let { changeToken } = token.actions;
export let { changeBoardData } = boardData.actions;
