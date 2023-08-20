"use client";
import React, { Key, ReactNode } from "react";
import { FC } from "react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Product_Card: FC<{ item: Product }> = ({ item }) => {
  const imageURL = urlForImage(item.image).url();
  console.log(imageURL);
  return (
    <>
      <div className="my-5">
        <Link href={`/product/${item.id}`}>
          <h1 className="text-md font-bold" key={item.id}>
            <Image
              className=" "
              src={urlForImage(item.image).url()}
              alt={item.title}
              width={300}
              height={500}
            />
          </h1>
        </Link>
        <p>Item Code: {item.id}</p>
        <p>{item.title}</p>

        <p>
          <strong>Price Rs.</strong>
          {item.price}
        </p>
        <div>
          <Button size="sm">
            <ShoppingBag />
            Add to Cart
          </Button>
        </div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </>
  );
};

export default Product_Card;
