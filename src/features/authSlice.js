import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


const initialState = {
    isAuthenticated: false,
    email: ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;

            // // Save the token to Local Storage
            AsyncStorage.setItem('@jwtToken', action.payload.token);
            // // Set Token to Auth Header
            setAuthToken(action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.email = "";
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;