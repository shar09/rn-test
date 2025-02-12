import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for modal state
const modalSlice = createSlice({
  name: 'modal',
  initialState: { visible: false },
  reducers: {
    openModal: (state) => { state.visible = true; },
    closeModal: (state) => { state.visible = false; },
  },
});

// Export actions
export const { openModal, closeModal } = modalSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
});

export default store;