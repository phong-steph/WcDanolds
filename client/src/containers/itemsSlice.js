import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id } = action.payload;
      const foundItem = state.find((item) => item.id === id);
      if (foundItem) {
        foundItem.nbItems += 1;
      } else {
        state.push({ ...action.payload, nbItems: 1 });
      }
    },
    removeItem(state, action) {
      const foundItemIndex = state.findIndex(
        (item) => item.id === action.payload
      );
      state = state.splice(foundItemIndex, 1);
    },
  },
});

export const { addItem, removeItem } = itemsSlice.actions;

export default itemsSlice.reducer;
