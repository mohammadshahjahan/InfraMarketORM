import { configureStore } from '@reduxjs/toolkit';
import topDealsReducer from '../features/TopDealsSlice';
import CementReducer from '../features/CementsSlice';
import CartReducer from '../features/CartSlice';

export const store = configureStore({
    reducer:{
        topDealsReducer,
        CementReducer,
        CartReducer,
    },
});

export type storeState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

