// Import npm
import { configureStore } from '@reduxjs/toolkit'
// Import features
import { userAnswersSlice } from 'src/features/userAnswersSlice'
import { userQuestionsAnsweredSlice } from 'src/features/userQuestionsAnsweredSlice'
import { modalSlice } from 'src/features/modalSlice'
import { loginSlice } from './features/loginSlice'
import { apiSlice } from 'src/features/API/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userAnswers: userAnswersSlice.reducer,
    userQuestionsAnswered: userQuestionsAnsweredSlice.reducer,
    modal: modalSlice.reducer,
    login: loginSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})
