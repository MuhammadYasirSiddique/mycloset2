// import React from "react";

// const SmallScreen = () => {
//   return <div>SmallScreen</div>;
// };

// export default SmallScreen;

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

type Props = {
  cartItem: cart_Product;
};

const CartPage = ({ cartItem }: any) => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);
  const dispatch = useAppDispatch();

  // const dispatchCart = useDisptach();

  const cartItems: Array<cart_Product> = useAppSelector(
    (state) => state.cart.items
  );
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

  const handleCartQty = async (newQty: number) => {
    const newPrice = cartItem.unitPrice * newQty;

    try {
      if (newQty) {
        const res = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            product_id: cartItem._id,
            qty: newQty,
            price: newPrice,
            size: cartItem.size,
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

  const increment = () => {
    toast.promise(handleCartQty(qty + 1), {
      pending: "Updating Quantity",
      success: "Quantity Updated in Cart",
      error: "Failed to update quantity",
    });
    setQty(qty + 1);
    dispatch(
      cartAction.addToCart({
        cart_product: cartItem,
        quantity: 1,
        size: cartItem.size,
      })
    );
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

        <div className="flex flex-wrap ">
          <div className="lg:w-3/4 w-full max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg overflow-x-auto border">
            <div className="border">
              {cartItems.map((item) => {
                try {
                  return (
                    <div key={item._id}>
                      <div>
                        <div className="">
                          <div className=" px-2 text-center items-center justify-center">
                            {/* <span className="col-span-1">{item._id}</span> */}
                            <div className="col-span-1">
                              <Image
                                className="py-2"
                                src={item.image}
                                alt={item.title}
                                width={500}
                                height={500}
                              />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center justify-center">
                                <h2 className="text-left font-bold text-2xl">
                                  {item.title}
                                </h2>
                                <div className="mx-2 flex items-center justify-center ml-auto">
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
                                          error:
                                            "Failed to remove item from Cart",
                                        }
                                      );
                                    }}
                                    // disabled={loading}
                                  />
                                </div>{" "}
                              </div>
                              <div className="flex flex-wrap">
                                <div className="grid grid-cols-2 ">
                                  <div className="grid col-span-1 text-left">
                                    <p>Size: </p>
                                    <p>Qty: </p>
                                    <p>Total: </p>
                                  </div>
                                  <div className="grid col-span-1 text-right mx-2">
                                    <p>{item.size} </p>
                                    <p>{item.qty}</p>
                                    <p>{item.productPrice}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center mb-2 ml-auto">
                                  {/* Edit button */}
                                  <Button>Edit</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-300 h-0.5 mt-2"></div>
                    </div>
                  );
                } catch (error) {
                  console.error("Error rendering cart item:", error);
                  return null;
                }
              })}{" "}
            </div>
            <ToastContainer />
          </div>
          <div className="md:mx-2 mt-5   rounded-lg bg-slate-100 w-full md:w-1/4 shadow-lg border h-fit">
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
