import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./containers/itemsSlice";

export default configureStore({
  reducer: { itemsReducer },
});
