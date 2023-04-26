import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },

  reducers: {
    openModal: (state, _action) => {
      state.isOpen = true;
    },
    closeModal: (state, _action) => {
      state.isOpen = false;
    },

  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectIsOpen = (state) => state.modal.isOpen;
