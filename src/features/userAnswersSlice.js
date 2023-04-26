import { createSlice } from "@reduxjs/toolkit";

export const userAnswersSlice = createSlice({
  name: "userAnswers",
  initialState: [],

  reducers: {
    answers: (state, action) => {
      return state.concat(action.payload);
    },
    removeAnswerId: (state, action) => {
      return state.filter((answer) => answer !== action.payload);
    }
  }
});


export const { answers, removeAnswerId } = userAnswersSlice.actions
