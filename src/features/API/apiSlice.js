import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),

  endpoints: (builder) => ({

    getQuizzes: builder.query({
      query: () => '/quiz',
      credentials: 'include',
    }),
    getQuizByTopic: builder.query({
      query: (topic) => `/quiz/${topic}`,
      credentials: 'include',
    }),
    getQuestions: builder.query({
      query: ({ quizId, difficultyId }) => `/question/${quizId}/${difficultyId}`,
      credentials: 'include',
    }),
    getTrueAnswers: builder.query({
      query: () => `/answers/true`,
      credentials: 'include',
    }),
    getScores: builder.query({
      query: (userId) => ({
        url: `/score/${userId}`,
        credentials: 'include',
      })
    }),
    postScore: builder.mutation({
      query: (body) => ({
        url: '/score',
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),
    postLogin: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),

    postLogout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),

    postSignup: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}/delete`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    
    uploadImage: builder.mutation({
      query: (body) => ({
        url: '/uploads',
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),
  }),
})

export const { 
  useGetQuizzesQuery, 
  useGetQuizByTopicQuery, 
  useGetQuestionsQuery,
  useGetTrueAnswersQuery,
  useGetScoresQuery,
  usePostScoreMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
  useDeleteUserMutation,
  useUploadImageMutation,
  usePostSignupMutation,
} = apiSlice
