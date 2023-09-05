"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product, cart_Product } from "@/app/types/Product";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Provider } from "react-redux";
import { cartAction } from "@/redux/features/cartSlice";
// import { useDisptach } from "react-redux";
import { removeProduct } from "@/redux/features/cartSlice";

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
      loading: "Updating Quantity",
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
    <div className="p-6 bg">
      <h1 className="text-2xl font-semibold mb-4">Shoping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-wrap-reverse md:flex-nowrap">
          <div className="lg:w-3/4 w-full max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg overflow-x-auto border">
            <div className="grid grid-cols-8 text-center font-semibold py-2 border ">
              {/* <span className="col-span-1">Code</span> */}
              <span className="col-span-1">Image</span>
              <span className="col-span-1">Item Title</span>
              <span className="col-span-1">Size</span>
              <span className="col-span-1">Quantity</span>
              <span className="col-span-1">Price</span>
              <span className="col-span-1">Amount</span>
              <span className="col-span-1">Action</span>
              <span className="col-span-1">Edit</span>
            </div>
            <div className="border">
              {cartItems.map((item) => {
                try {
                  return (
                    <div key={item._id}>
                      <div>
                        <div>
                          <div className="grid grid-cols-8 gap-2 px-2 text-center items-center justify-center">
                            {/* <span className="col-span-1">{item._id}</span> */}
                            <span className="col-span-1">
                              <Image
                                className="py-2"
                                src={item.image}
                                alt={item.title}
                                width={50}
                                height={50}
                              />
                            </span>
                            <span className="col-span-1">{item.title}</span>
                            <span className="col-span-1">{item.size}</span>
                            <div className="flex items-center justify-center">
                              {/* <button
                                className="bg-cyan-600 text-white rounded-l-lg  w-8 h-8 mx-2 border"
                                // onClick={() =>()}
                              >
                                -
                              </button> */}
                              <span className="col-span-1">{item.qty}</span>{" "}
                              {/* <button
                                className="bg-cyan-600 text-white rounded-r-lg  w-8 h-8 mx-2 border"
                                // onClick={() =>()}
                              >
                                +
                              </button> */}
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
                                      loading: "Removing Item from Cart",
                                      success: "Item removed from Cart",
                                      error: "Failed to remove item from Cart",
                                    }
                                  );
                                }}
                                // disabled={loading}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
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
            <div className="text-center my-10">
              <Button>Check Out</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full lg:w-3/4 max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg  border">
            <div className="flex flex-wrap justify-center items-center ">
              <div className="">
                <Image
                  src={"/emptycart.svg"}
                  height={200}
                  width={200}
                  alt={""}
                />
              </div>
            </div>
            <div className=" my-10 text-center text-4xl font-sans text-red-600 font-semibold">
              Your cart is empty.
            </div>
            <div className="flex justify-center items-center mb-10">
              <Link href="/">
                <Button>Shop Now</Button>
              </Link>
            </div>
          </div>

          <div className="md:mx-2 mb-5 rounded-lg bg-slate-100 w-full md:w-1/4 shadow-lg border h-fit">
            <h1 className="text-center pt-2 font-semibold"> Cart Summary</h1>
            <div className="bg-slate-200 w-full h-0.5 mt-2"></div>
            <div className="my-5 mx-4 flex justify-between items-center">
              <span className="text-left">Total Items</span>
              <span className="text-right">{totalItems}</span>
            </div>
            <div className="my-5 mx-4 flex justify-between items-center">
              <span className="text-left">Total Amount</span>
              <span className="text-right">{totalAmount}</span>
            </div>
            <div className="text-center my-10">
              <Button>Check Out</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
