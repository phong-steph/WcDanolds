import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./containers/cartSlice";

export default configureStore({
  reducer: { cartReducer },
});
