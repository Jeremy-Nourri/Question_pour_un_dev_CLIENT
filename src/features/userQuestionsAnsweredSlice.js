import { createSlice } from "@reduxjs/toolkit";

export const userQuestionsAnsweredSlice = createSlice({
  name: "userQuestionsAnswered",
  initialState: [],

  reducers: {
    questionsAnswered: (state, action) => {
      return state.concat(action.payload);
    },
    removeQuestionId: (state, action) => {
      return state.filter((question) => question !== action.payload);
    }
  },
});

export const { questionsAnswered, removeQuestionId } = userQuestionsAnsweredSlice.actions;
