import { configureStore, createSlice } from '@reduxjs/toolkit';

// Modal Slice
const modalSlice = createSlice({
  name: 'modal',
  initialState: { visible: false },
  reducers: {
    openModal: (state) => { state.visible = true; },
    closeModal: (state) => { state.visible = false; }
  }
});

// Navigation Slice (Tracks Current Screen)
const navigationSlice = createSlice({
  name: 'navigation',
  initialState: { currentScreen: 'Home' },
  reducers: {
    navigate: (state, action) => { state.currentScreen = action.payload; },
    goBack: (state) => { state.currentScreen = 'Home'; } // Default to Home on back
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export const { navigate, goBack } = navigationSlice.actions;

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    navigation: navigationSlice.reducer
  }
});

export default store;
