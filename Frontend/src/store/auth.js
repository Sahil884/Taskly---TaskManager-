import { createSlice } from "@reduxjs/toolkit";

const initialAuthenticationState = { user: null, isAuthenticated: false };

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    updateProfile(state, action) {
      if (state.user) {
        const { email, fullName } = action.payload;
        if (email) state.user.email = email;
        if (fullName) state.user.fullName = fullName;
      }
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
