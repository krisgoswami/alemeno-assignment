import { configureStore } from "@reduxjs/toolkit";
import cartReducter from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducter,
        auth: authReducer,
    }
});

export default store;