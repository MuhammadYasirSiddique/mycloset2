import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CheckOut from "./CheckOut";

const EmptyCart = () => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full lg:w-3/4 max-w-screen-lg rounded-lg h-fit bg-slate-100 shadow-lg  border">
          <div className="flex flex-wrap justify-center items-center ">
            <div className="">
              <Image src={"/emptycart.svg"} height={200} width={200} alt={""} />
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

        <div className="md:mx-2 mt-5 rounded-lg bg-slate-100 w-full md:w-1/4 shadow-lg border h-fit">
          <h1 className="text-center pt-2 font-semibold"> Cart Summary</h1>
          <div className="bg-slate-200 w-full h-0.5 mt-2"></div>
          <div className="my-5 mx-4 flex justify-between items-center">
            <span className="text-left">Total Items</span>
            <span className="text-right">0</span>
          </div>
          <div className="my-5 mx-4 flex justify-between items-center">
            <span className="text-left">Total Amount</span>
            <span className="text-right">0</span>
          </div>
          <div className="flex items-center justify-center">
            <CheckOut products={[]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
