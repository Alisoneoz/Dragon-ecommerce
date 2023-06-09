import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [],
  amount:0,
  total:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIncart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemIncart) {
        itemIncart.amount++;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
      // Toastify pop up notification
      toast.success(`New item added to cart: ${action.payload.title} 🛒`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      item.amount++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item.amount === 1) {
        const removeTheItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = removeTheItem;
      } else {
        item.amount--;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      const removeTheItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeTheItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    calculateTotals: (state) => {
      let amount= 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount* item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  calculateTotals,
  clearCart,
} = cartSlice.actions;
