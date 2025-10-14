// src/app/store/slices/categorySlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types/Category";

// Интерфейс состояния
interface CategoryState {
  value: Category;
}

// Начальное состояние
const initialState: CategoryState = {
  value: null,
};

// Создаём слайс
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.value = action.payload;
    },
    clearCategory: (state) => {
      state.value = null;
    },
  },
});

// Экспортируем действия
export const { setCategory, clearCategory } = categorySlice.actions;

// Селектор для получения текущей категории
export const selectCategory = (state: { category: CategoryState }) =>
  state.category.value;

// Экспорт редьюсера
export default categorySlice.reducer;
