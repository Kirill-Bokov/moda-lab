import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/CategorySlice"; // убедись, что имя файла с большой буквы

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

// Типизация состояния и диспатча
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хуки для использования в компонентах
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
