"use client";
import React, { Key, ReactNode } from "react";
import { FC } from "react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import { Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";

const Product_Details: FC<{ item: Product }> = ({ item }) => {
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
              {/* <p> {item.id} </p> */}
              <p>Product Name: {item.title}</p>
              <p>Descruption: {item.description} </p>
              <p>Color: {item.color}</p>
              <div className="flex items-center">
                <p>Size: </p>
                {item.size.map((s: string, index: number) => (
                  <>
                    <div className="mx-3" key={s}>
                      {/* <SizeView s={s} /> */}
                      {/* <button
                      className="mx-5 bg-slate-200 rounded-full w-8 h-8 text-center"
                      key={index}
                    >
                      {s}
                    </button> */}
                    </div>
                  </>
                ))}
              </div>
              <div></div>
              <p> Price:- Rs.{item.price}</p>
              <br />
              <div>{/* <CounterView /> */}</div>
              <br />
            </div>
            <div>
              <Button
                name="add to cart"
                className="text-lg"
                type="button"
                // onClick=""
              >
                Add to Cart
                {/* <MdOutlineAddShoppingCart /> */}
              </Button>
              {/* <Toaster position="top-right" reverseOrder={true} /> */}
              <Toaster position="top-right" reverseOrder={true} />
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
