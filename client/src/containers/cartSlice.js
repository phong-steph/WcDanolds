import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id } = action.payload;
      const foundItem = state.items.find((item) => item.id === id);
      if (foundItem) {
        foundItem.nbItems += 1;
      } else {
        state.items.push({ ...action.payload, nbItems: 1 });
      }
      state.total += action.payload.price;
    },
    removeItem(state, action) {
      const foundItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const itemAmount =
        state.items[foundItemIndex].price * state.items[foundItemIndex].nbItems;

      state = {
        items: state.items.splice(foundItemIndex, 1),
        total: (state.total -= itemAmount),
      };
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
