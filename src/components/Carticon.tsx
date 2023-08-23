import React from "react";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { Toaster } from "react-hot-toast";

const CartIcon = () => {
  const totalqty = useAppSelector((state) => state.cart.totalQty);

  const [fix, setFix] = useState(false);
  function setFixed() {
    if (window.scrollY >= 1) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", setFixed);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", setFixed);
      }
    };
  }, []);

  return (
    <div>
      <a
        href="/cart"
        className={` text-xl px-4 ml-auto lg:mx-4 md:px-4 block py-2 ${
          fix ? "hover:text-white" : " hover:text-black"
        }`}
      >
        <div
          className={`${
            fix
              ? "bg-gray-300 p-2 flex h-8 w-8 rounded-full relative items-center justify-center"
              : "bg-cyan-500 p-2 flex h-8 w-8 rounded-full relative items-center justify-center "
          }`}
        >
          <ShoppingCart color={`${fix ? "black" : "indigo"}`} size={20} />
          <span className=" top-0 -right-1 absolute rounded-full bg-red-500 h-4 w-4 text-center text-xs text-white">
            {totalqty ? totalqty : 0}
          </span>
        </div>
      </a>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default CartIcon;
