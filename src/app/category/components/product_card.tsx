"use client";
import React, { Key, ReactNode, useState } from "react";
import { FC } from "react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Loading from "./Loading";

const Product_Card: FC<{ item: Product }> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (isLoading) {
    // Show a loading indicator here, for example, a spinner or a loading image
    return <Loading />;
  }
  return (
    <>
      <div className="my-5 transform transition-transform hover:scale-105">
        <h1 className="text-md font-bold" key={item.id}>
          <Image
            className=" "
            src={urlForImage(item.image).url()}
            alt={item.title}
            width={300}
            height={500}
          />
        </h1>

        <p className="text-slate-500 ">Item Code: {item.id}</p>
        <p className="text-cyan-950 py-2 font-bold text-2xl">{item.title}</p>

        <p className="text-slate-500 ">
          <strong>Price Rs.</strong>
          {item.price}
        </p>
        <div>
          <Link href={`/product/${item.id}`}>
            <Button size="sm">
              <ShoppingBag />
              Click for Details
            </Button>
          </Link>
        </div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </>
  );
};

export default Product_Card;
