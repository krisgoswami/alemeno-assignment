import { configureStore } from "@reduxjs/toolkit";
import cartReducter from './cartSlice';
import authReducer from './authSlice';

const reduxStore = configureStore({
    reducer: {
        cart: cartReducter,
        auth: authReducer,
    }
});

export default reduxStore;