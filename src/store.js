import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import categorySlice from './features/categorySlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice
    }
});
