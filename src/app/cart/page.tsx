"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { cart_Product } from "@/app/types/Product";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const cartItems: Array<cart_Product> = useAppSelector(
    (state) => state.cart.items
  );

  const totalOrderAmount = cartItems.reduce(
    (total, item) => total + item.productPrice,
    0
  );
  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="p-6 bg">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-wrap-reverse md:flex-nowrap">
          <div className="lg:w-3/4 w-full max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg overflow-x-auto border">
            <div className="grid grid-cols-8 text-center font-semibold py-2 border ">
              <span className="col-span-1">Code</span>
              <span className="col-span-1">Image</span>
              <span className="col-span-2">Item Title</span>
              <span className="col-span-1">Size</span>
              <span className="col-span-1">Quantity</span>
              <span className="col-span-1">Price</span>
              <span className="col-span-1">Amount</span>
            </div>
            <div className="border">
              {cartItems.map((item) => {
                try {
                  return (
                    <div key={item._id}>
                      <div>
                        <div>
                          <div className="grid grid-cols-8 gap-2 px-2 text-center items-center justify-center">
                            <span className="col-span-1">{item._id}</span>
                            <span className="col-span-1">
                              <Image
                                className="py-2"
                                src={urlForImage(item.image).url()}
                                alt={item.title}
                                width={50}
                                height={50}
                              />
                            </span>
                            <span className="col-span-2">{item.title}</span>
                            <span className="col-span-1">{item.size}</span>
                            <span className="col-span-1">{item.qty}</span>
                            <span className="col-span-1">{item.unitPrice}</span>
                            <span className="col-span-1">
                              {item.productPrice}
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
                <p className="col-span-7 py-2">TOAL ORDER AMOUNT</p>
                <span>{totalOrderAmount}</span>
              </div>
            </div>
          </div>
          <div className="md:mx-2 mb-5 rounded-lg bg-slate-100 w-full md:w-1/4 shadow-lg border h-fit">
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
        <div className="w-3/4">
          <div className="grid grid-cols-8 text-center font-semibold py-2 border">
            <span className="col-span-1">Code</span>
            <span className="col-span-1">Image</span>
            <span className="col-span-2">Item Title</span>
            <span className="col-span-1">Quantity</span>
            <span className="col-span-1">Price</span>
            <span className="col-span-1">Amount</span>
          </div>
          <div className="grid grid-cols-8 text-center text-4xl font-sans text-red-600 font-semibold py-2">
            <p className="col-span-7 py-10">Your cart is empty.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
