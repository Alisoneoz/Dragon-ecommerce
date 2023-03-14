import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//Redux importations
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { productsApi } from "./features/productsApi";
import { cartReducer } from "./features/cartSlice";
import { authReducer } from "./features/authSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
