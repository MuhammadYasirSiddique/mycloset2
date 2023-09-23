import { Product, cart_Product } from "@/app/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  items: Array<cart_Product>;
  totalQty: number;
  totalAmt: number;
  isLoading: boolean;
  error: any;
}

const initialState: CartState = {
  items: [],
  totalAmt: 0,
  totalQty: 0,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "cart/fetchdata",
  async (userId: string) => {
    const res = await fetch(`/api/cart/${userId}`);
    if (!res.ok) {
      console.log("Failed to Fetch DATA");
    }
    const data = await res.json();
    return data;
  }
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

    updateQuantity(state, action) {
      const { productId, newQty } = action.payload;
      const cartItem = state.items.find((item) => item._id === productId);

      if (cartItem) {
        // Calculate the new product price based on the unit price and new quantity
    const newProductPrice = cartItem.unitPrice * newQty;  
        // Update the quantity of the cart item
        cartItem.qty = newQty;
        cartItem.productPrice =  newProductPrice
        // Update total quantity and total amount
        state.totalQty = state.items.reduce(
          (total, item) => total + item.qty,
          0
        );
        state.totalAmt = state.items.reduce(
          (total, item) => total + item.qty * item.unitPrice,
          0
        );
      }
    },

    // ... Other actions ...

    removeProduct(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;

      // Use filter to create a new array without the product to remove
      state.items = state.items.filter((item) => item._id !== productId);

      // Calculate totalQty and totalAmt based on the updated state
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

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { cartItems, totalQty, totalPrice } = action.payload;
      state.items = cartItems;
      state.totalQty = totalQty;
      state.totalAmt = totalPrice;
      state.isLoading = false;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const cartAction = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
