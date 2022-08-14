import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface boardData {
  bgColor: string;
  createdAt: string;
  id: number;
  title: string;
  pos: number;
  updatedAt: string;
  userId: number;
}

let email = createSlice({
  name: "email",
  initialState: "" as string,
  reducers: {
    changeEmail(state, a) {
      return a.payload;
    },
  },
});

let token = createSlice({
  name: "token",
  initialState: "" as string,
  reducers: {
    changeToken(state, a: PayloadAction<string>) {
      return a.payload;
    },
  },
});

let boardData = createSlice({
  name: "boardData",
  initialState: [] as boardData[],
  reducers: {
    changeBoardData(state, a) {
      return a.payload;
    },
  },
});

let cardData = createSlice({
  name: "cardData",
  initialState: [],
  reducers: {
    changeCardData(state, a) {
      return a.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    email: email.reducer,
    token: token.reducer,
    boardData: boardData.reducer,
    cardData: cardData.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export let { changeEmail } = email.actions;
export let { changeToken } = token.actions;
export let { changeBoardData } = boardData.actions;
export let { changeCardData } = cardData.actions;
