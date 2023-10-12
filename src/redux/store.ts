import { CombinedState, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';

import { combinedReducer, InitialRootState } from './rootReducer';

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: CombinedState<InitialRootState> | undefined, action: PayloadAction<InitialRootState>) => {
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, useSelector, useDispatch };
