import { configureStore } from "@reduxjs/toolkit";
import stocksSlice from "./stock-slice";

const store = configureStore({
  reducer: { stocks: stocksSlice.reducer },
});
export default store;
