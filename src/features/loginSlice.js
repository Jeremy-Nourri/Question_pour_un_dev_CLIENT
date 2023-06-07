import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: false,
    user: {
      id: '',
      nickname: '',
      avatar: '',
    },
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        state.isLogged = true;
      }
    },

    logout: (state) => {
      state.isLogged = false;
      state.user = {};
    },

    modifyAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

export const { login, logout, modifyAvatar } = loginSlice.actions;

export const selectCurrentUser = (state) => state.login.user;
export const selectIsLogged = (state) => state.login.isLogged;
