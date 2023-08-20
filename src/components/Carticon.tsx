// import { useCartContext } from "../components/CartContext";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const CartIcon = () => {
  //   const { getTotalQuantity } = useCartContext();

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
        // onClick={}
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
            {0}
          </span>
        </div>
      </a>
    </div>
  );
};

export default CartIcon;
