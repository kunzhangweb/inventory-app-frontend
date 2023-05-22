import { createSlice } from "@reduxjs/toolkit";

const username = JSON.parse(localStorage.getItem("username"));
const initialState = {
  isLoggedIn: false,
  username: username ? username : "",
  user: {
    username: "",
    email: "",
    phone: "",
    biography: "",
    photo: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
      state.isLoggedIn = action.payload;
    },

    SET_NAME(state, action) {
      localStorage.setItem("username", JSON.stringify(action.payload));
      state.username = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.username = profile.username;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.biography = profile.biography;
      state.user.photo = profile.photo;
    },
  },
}); // end slice

export const { SET_LOGIN, SET_NAME, SET_USER } = AuthSlice.actions;

export const selectedIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectedUsername = (state) => state.auth.username;
export const selectedUser = (state) => state.auth.user;

export default AuthSlice.reducer;
