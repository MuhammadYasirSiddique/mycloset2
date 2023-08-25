"use client";
import React, { Key, ReactNode, useState, useEffect } from "react";
import { FC } from "react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { cartAction } from "@/redux/features/cartSlice";

import { Product, cart_Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { json } from "stream/consumers";

const Product_Details: FC<{ item: Product }> = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const getDataFromDb = async () => {
  //   const res = await fetch(`api/cart/${item.user_id}`);

  //   if (!res) {
  //     throw new Error("Failed to Fetch Data");
  //   }
  // };

  const addToCartDb = async () => {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        user_id: "abc123",
        product_id: item.id,
        product_name: item.title,
        qty: quantity,
        image: urlForImage(item.image).url(),
        size: selectedSize,
        price: item.price,
        total_price: item.price * quantity,
      }),
    });
  };

  // const handleCart = async () => {
  //   try {
  //     const cartData = await getDataFromDb();

  //     const existingItem = cartData.cartItems.find(
  //       (item: cart_Product) => item._id === item._id
  //     );

  //     if (existingItem) {
  //       const newQty = existingItem.qty + item.qty;
  //       const newTotalPrice = item.price * newQty;

  //       const res = await fetch(`/api/cart`, {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           product_id: item.id,
  //           qty: newQty,
  //           price: newTotalPrice,
  //         }),
  //       });
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } else {
  //       await addToCartDb();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart", {
        duration: 2500,
      });
      return;
    }

    const cartProduct = {
      _id: item.id,
      title: item.title,
      unitPrice: item.price,
      qty: quantity,
      productPrice: item.price * quantity,
      image: item.image,
      size: selectedSize,
      user_id: item.user_id,
    };

    toast.promise(addToCartDb(), {
      loading: `Adding ${item.title} to Cart DB`,
      success: `Added  ${quantity} ${item.title} of "${selectedSize}" to the cart`,
      error: "Failed to Add to Cart DB",
    });

    dispatch(
      cartAction.addToCart({
        cart_product: cartProduct,
        quantity: quantity,
        size: selectedSize,
      })
    );
  };

  return (
    <main>
      <div className="">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-x-6">
          <div className="" key={item.id}>
            <Image
              className=""
              src={urlForImage(item.image).url()}
              alt={item.title}
              width={300}
              height={500}
            />
          </div>
          <div>
            <div>
              <p>Product Code: {item.id} </p>
              <p>Product Name: {item.title}</p>
              <p>Descruption: {item.description} </p>
              <p>Color: {item.color}</p>
              <div className="flex items-center">
                <p>Size: </p>
                {item.size.map((s: string, index: number) => (
                  <>
                    <div className="mx-2" key={s}>
                      <button
                        className={`bg-slate-200 rounded-full w-8 h-8 text-center ${
                          selectedSize === s ? "bg-slate-900 text-white" : ""
                        }`}
                        onClick={() => handleSizeSelection(s)}
                      >
                        {s}
                      </button>
                    </div>
                  </>
                ))}
              </div>
              <div></div>
              <p> Price:- Rs.{item.price}</p>
              <br />
              <div>
                {/* Counter  */}
                <div className="flex items-center ">
                  <p>Quantity: </p>

                  <button
                    className="bg-gray-200 rounded-l-lg w-8 h-8 mx-2 border"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className="bg-gray-200 rounded-r-lg  w-8 h-8 mx-2 border"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <br />
            </div>
            <div>
              <Button
                name="add to cart"
                className="text-lg"
                type="button"
                onClick={() => handleAddToCart()}
              >
                <ShoppingCart />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <p>{item.category.category}</p>

        <div className="justify-center items-center mx-2 lg:mx-32">
          <p>Product Details:</p>
          <p>Product Details: {item.details}</p>
        </div>
      </div>
    </main>
  );
};

export default Product_Details;
