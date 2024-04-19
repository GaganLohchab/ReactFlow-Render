import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "../features/node/nodeSlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
});
