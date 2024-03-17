import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        totalRecords: 0
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        setTotalRecords: (state, action) => {
            state.totalRecords = action.payload;
        },
    }
});

export const { setCategories, setTotalRecords } = categorySlice.actions;
export default categorySlice.reducer;
