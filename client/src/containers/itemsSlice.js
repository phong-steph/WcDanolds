import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemAdded(state, action) {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.nbItems += 1;
      } else {
        state.push({ ...action.payload, nbItems: 1 });
      }
    },
  },
});

export const { itemAdded } = itemsSlice.actions;

export default itemsSlice.reducer;
