import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';

import { WebSocketMiddleware } from './middleware/websocket-mw';
import { configureStore } from '@reduxjs/toolkit';
import { feedConfig } from './middleware/feed-ws';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, WebSocketMiddleware(feedConfig)]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: ()=> AppDispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;