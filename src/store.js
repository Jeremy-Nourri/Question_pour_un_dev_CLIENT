// Import npm
import { configureStore } from '@reduxjs/toolkit';
// Import features
import { userAnswersSlice } from 'src/features/userAnswersSlice';
import { userQuestionsAnsweredSlice } from 'src/features/userQuestionsAnsweredSlice';
import { modalSlice } from 'src/features/modalSlice';
import { apiSlice } from 'src/features/API/apiSlice';
import { loginSlice } from './features/loginSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userAnswers: userAnswersSlice.reducer,
    userQuestionsAnswered: userQuestionsAnsweredSlice.reducer,
    modal: modalSlice.reducer,
    login: loginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
