"use client";
import React, { Key, ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "@/redux/store";
import { cartAction } from "@/redux/features/cartSlice";
import { Product, cart_Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { redirectToSignIn } from "@clerk/nextjs";
import Info from "./Informaition/info";

type IProps = {
  product: Product;
  userId: string;
};

const Product_Details = (item: IProps) => {
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

  // handle request data
  const GetDataFromDB = async () => {
    const res = await fetch(`/api/cart/${item.userId}`);

    if (!res.ok) {
      throw new Error("Failed to Fetch Data");
    }

    const data = await res.json();
    return data;
  };

  const AddToCart = async () => {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        user_id: item.userId,
        product_id: item.product.id,
        product_name: item.product.title,
        qty: quantity,
        image: urlForImage(item.product.image).url(),
        size: selectedSize,
        price: item.product.price,
        total_price: item.product.price * quantity,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to add Data");
    }
  };

  const handleCart = async () => {
    try {
      const cartData = await GetDataFromDB();

      const existingItem = cartData.cartItems.find(
        (cartItem: cart_Product) => cartItem._id === item.product.id
      );

      if (existingItem) {
        const newQty = existingItem.qty + quantity;
        const newTotalPrice = existingItem.unitPrice * newQty;

        const res = await fetch(`/api/cart`, {
          method: "PUT",
          body: JSON.stringify({
            product_id: item.product.id,
            qty: newQty,
            price: newTotalPrice,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to update DATA");
        }
        console.log(`Existing Price ${existingItem.unitPrice}`);
        console.log(`New Qty ${newTotalPrice}`);
      } else {
        await AddToCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (item.userId) {
      if (!selectedSize) {
        toast.error("Please select a size before adding to cart", {
          duration: 2500,
        });
        return;
      }

      const cartProduct = {
        _id: item.product.id,
        title: item.product.title,
        unitPrice: item.product.price,
        qty: quantity,
        productPrice: item.product.price * quantity,
        image: item.product.image,
        size: selectedSize,
        user_id: item.product.user_id,
      };

      toast.promise(handleCart(), {
        loading: `Adding ${item.product.title} to Cart DB`,
        success: `Added  ${quantity} ${item.product.title} of "${selectedSize}" to the cart`,
        error: "Failed to Add to Cart DB",
      });

      dispatch(
        cartAction.addToCart({
          cart_product: cartProduct,
          quantity: quantity,
          size: selectedSize,
        })
      );
    }
  };
  return (
    <main>
      <div className="">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-x-6">
          <div className="" key={item.product.id}>
            <Image
              className=""
              src={urlForImage(item.product.image).url()}
              alt={item.product.title}
              width={300}
              height={500}
            />
          </div>
          <div>
            <div>
              <p className="text-slate-500">Code: {item.product.id} </p>
              <p className="text-cyan-950 py-2 font-bold text-2xl">
                {item.product.title}
              </p>
              <p className="text-blue-800 py-2 ">{item.product.description} </p>
              <p className=" py-2">
                Color(s):{" "}
                <span className=" font-bold ">{item.product.color}</span>
              </p>
              <div className="flex items-center py-2">
                <p className="text-slate-800">Size(s) : </p>
                {item.product.size.map((s: string, index: number) => (
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

              <div className="py-2">
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
              <p className="font-bold"> Price:- Rs.{item.product.price}</p>
            </div>
            <div>
              <Button
                name="add to cart"
                className="text-lg"
                type="button"
                onClick={() => addToCart()}
              >
                <ShoppingCart />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <p>{item.product.category.category}</p>

        {/* <div className="justify-center items-center mx-2 lg:mx-32">
          <p>Product Details:</p>
          <p>Product Details: {item.product.details}</p>
        </div> */}
      </div>
      <Info />
    </main>
  );
};

export default Product_Details;
