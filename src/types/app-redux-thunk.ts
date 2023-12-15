import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TApplicationActions } from '../services/actions';
import { store } from '../services/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, TApplicationActions>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  ThunkDispatch<RootState, never, TApplicationActions>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;