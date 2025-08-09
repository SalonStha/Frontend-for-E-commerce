import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../reducer/user.reducer'; // Importing the user reducer

export const store = configureStore({
    reducer:{
        user: UserReducer, // This reducer handles user-related state changes
    }
});

export type RootState = ReturnType<typeof store.getState>; // Store state type

export type AppDispatch = typeof store.dispatch; // Dispatch type

