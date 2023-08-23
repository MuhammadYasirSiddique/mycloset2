import { Product, cart_Product } from "@/app/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  items: Array<cart_Product>;
  totalQty: number;
  totalAmt: number;
}

const initialState: CartState = {
  items: [],
  totalAmt: 0,
  totalQty: 0,
};

export const fetchData = createAsyncThunk(
  "cart/fetchdata",
  async (userId: string) => {}
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state: CartState,
      action: PayloadAction<{
        cart_product: cart_Product;
        quantity: number;
        size: string;
      }>
    ) {
      const newItem = action.payload.cart_product;

      const existingItem = state.items.find((item) => item._id === newItem._id);

      state.totalQty = state.totalQty + action.payload.quantity;

      state.totalAmt =
        state.totalAmt +
        action.payload.quantity * action.payload.cart_product.unitPrice;

      if (!existingItem) {
        const productPrice = newItem.unitPrice * action.payload.quantity;

        state.items.push({
          ...newItem,
          qty: action.payload.quantity,
          productPrice,
        });
      } else {
        const productPrice =
          existingItem.productPrice +
          existingItem.unitPrice * action.payload.quantity;

        existingItem.qty += action.payload.quantity;

        existingItem.productPrice = productPrice;
      }
    },

    removeProduct(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;

      state.items = state.items.filter((item) => item._id !== productId);

      state.totalQty = state.items.reduce((total, item) => total + item.qty, 0);

      state.totalAmt = state.items.reduce(
        (total, item) => total + item.productPrice,
        0
      );
    },

    decrementCartProduct(state: CartState, action: PayloadAction<string>) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product);

      state.totalQty--;

      state.totalAmt = state.totalAmt - existingItem?.unitPrice!;

      if (existingItem?.qty === 1) {
        state.items = state.items.filter((item) => item._id !== product);
      } else {
        existingItem!.qty--;
        existingItem!.productPrice =
          existingItem!.productPrice - existingItem?.unitPrice!;
      }
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
