import { rootReducer } from './reducers/index';
import { configureStore } from '@reduxjs/toolkit';
import { defaultMiddleware } from './middleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: defaultMiddleware
});



