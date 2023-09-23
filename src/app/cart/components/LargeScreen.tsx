"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product, cart_Product } from "@/app/types/Product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Provider } from "react-redux";
import { cartAction } from "@/redux/features/cartSlice";
import { removeProduct } from "@/redux/features/cartSlice";
import CheckOut from "./CheckOut";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCart from "./EditCartItem/EditCart";
import { client } from "@/lib/SanityClient";

// Create a loader component
const Loader = () => {
  return <div>Loading...</div>; // Design your loader here
};


type Props = {
  cartItem: cart_Product;
  // onItemClick: (index: number) => void;
};

const CartPage = ({ cartItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(cartItem ? cartItem.qty : 0);
  const [unitPrice, setUnitprice] = useState(cartItem ? cartItem.unitPrice : 0);
  const dispatch = useAppDispatch();
  

  const cartItems: Array<cart_Product> = useAppSelector(
    (state) => state.cart.items
  );
  // console.log(cartItems);

  // const dispatchCart = useDisptach();
  // console.log(typeof cartItems);

  const totalItems = useAppSelector((state) => state.cart.totalQty);
  const totalAmount = useAppSelector((state) => state.cart.totalAmt);

  const handleRemoveFromCart = async (productId: string) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/cart?product_id=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Item removed successfully, you can update your cart state or UI here
        dispatch(removeProduct(productId));
        console.log("Item removed from cart");
      } else {
        console.log("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }

    setLoading(false);
  };

  const handleCartQty = async (newQty: number, itemId: string, unitPrice: number) => {
    let newPrice = 0;
    newPrice = unitPrice * newQty;
    console.log(newQty);
console.log(unitPrice)
    try {
      if (newQty) {
        const res = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            product_id: itemId,
            qty: newQty,
            price: newPrice,
            // size: cartItem.size,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to Update Qty in cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increment = (itemId: string, itemQty: number, UnitPrice: number) => {
    if (cartItem) {
      // console.log(itemQty);
      let newQty = itemQty + 1;
      let unitPrice = 0
      unitPrice = UnitPrice
      // console.log(unitPrice);
      setUnitprice(unitPrice)
      setQty(newQty);
      // console.log(newQty);
      toast.promise(handleCartQty(newQty, itemId, unitPrice), {
        pending: "Updating Quantity",
        success: "Quantity Updated in Cart",
        error: "Failed to update quantity",
      });

      dispatch(
        cartAction.updateQuantity({
          productId: itemId,

          newQty,
        })
      );
    }
  };

  const decrement = (itemId: string, itemQty: number, UnitPrice: number) => {
    if (cartItem && itemQty > 1) {
      // console.log(itemQty);
      // console.log(itemId);
      const newQty = itemQty - 1;
      let unitPrice = 0
      unitPrice = UnitPrice
      // console.log(unitPrice);
      setQty(newQty);
      // console.log(newQty);

      toast.promise(handleCartQty(newQty, itemId, unitPrice), {
        pending: "Updating Quantity",
        success: "Quantity Updated in Cart",
        error: "Failed to update quantity",
      });

      dispatch(
        cartAction.updateQuantity({
          productId: itemId,
          newQty,
        })
      );
    }
  };

  const totalOrderAmount = cartItems.reduce(
    (total, item) => total + item.productPrice,
    0
  );
  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <div className="p-6 bg">
        <h1 className="text-2xl font-semibold mb-4">Shoping Cart</h1>

        <div className="flex lg:flex-nowrap">
          <div className="lg:w-3/4 w-full max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg overflow-x-auto border">
            <div className="grid grid-cols-8 text-center font-semibold py-2 border ">
              <span className="col-span-1">Code</span>
              <span className="col-span-1">Image</span>
              <span className="col-span-1">Item Title</span>
              <span className="col-span-1">Size</span>
              <span className="col-span-1">Quantity</span>
              <span className="col-span-1">Price</span>
              <span className="col-span-1">Amount</span>
              <span className="col-span-1">Delete</span>
              {/* <span className="col-span-1">Edit</span> */}
            </div>
            <div className="border">
              {cartItems.map((item, index) => {
                try {
                  return (
                    <div key={item._id}>
                      <div>
                        <div>
                          <div className="grid grid-cols-8 gap-2 px-2 text-center items-center justify-center">
                            <span className="col-span-1">{item._id}</span>
                            <span className="col-span-1 ">
                              <Image
                                className="py-2"
                                src={item.image}
                                alt={item.title}
                                width={200}
                                height={200}
                              />
                            </span>
                            <span className="col-span-1">{item.title}</span>
                            <span className="col-span-1">{item.size}</span>
                            <div className="flex items-center justify-center">
                              <button
                                className="bg-cyan-600 text-white rounded-l-lg  w-6 h-6"
                                onClick={() => decrement(item._id, item.qty, item.unitPrice)}
                              >
                                -
                              </button>
                              <span className="col-span-1  border-t-1 border-cyan-700 px-2">
                                {item.qty}
                              </span>{" "}
                              <button
                                className="bg-cyan-600 text-white rounded-r-lg  w-6 h-6"
                                onClick={() => increment(item._id, item.qty, item.unitPrice)}
                              >
                                +
                              </button>
                            </div>
                            <span className="col-span-1">{item.unitPrice}</span>
                            <span className="col-span-1">
                              {item.productPrice}
                            </span>
                            <span className="col-span-1 flex items-center justify-center">
                              {/* Remove button */}
                              <Trash2
                                name="Remove"
                                type="button"
                                className="cursor-pointer"
                                onClick={() => {
                                  toast.promise(
                                    handleRemoveFromCart(item._id),
                                    {
                                      pending: "Removing Item from Cart",
                                      success: "Item removed from Cart",
                                      error: "Failed to remove item from Cart",
                                    }
                                  );
                                }}
                                // disabled={loading}
                              />
                            </span>{" "}
                            <ToastContainer />
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-300 h-0.5"></div>
                    </div>
                  );
                } catch (error) {
                  console.error("Error rendering cart item:", error);
                  return null;
                }
              })}{" "}
              <div className="grid grid-cols-8 text-center text-lg font-sans font-bold border">
                <p className="col-span-5 py-2">TOAL ORDER AMOUNT</p>
                <span>{totalOrderAmount}</span>
              </div>
            </div>
          </div>
          <div className="md:mx-2 mb-5   rounded-lg bg-slate-100 w-full md:w-1/4 shadow-lg border h-fit">
            <h1 className="text-center pt-2 font-semibold"> Cart Summary</h1>
            <div className="bg-slate-200 w-full h-0.5 mt-2"></div>
            <div className="my-5 mx-4 flex justify-between items-center">
              <span className="text-left">Total Items</span>
              <span className="text-right">{totalCartItems}</span>
            </div>
            <div className="my-5 mx-4 flex justify-between items-center">
              <span className="text-left">Total Amount</span>
              <span className="text-right">{totalOrderAmount}</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckOut products={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
