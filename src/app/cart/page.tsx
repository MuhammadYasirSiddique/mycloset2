"use client";
import React, { useEffect, useState } from "react";
import EmptyCart from "./components/EmptyCart";
import SmallScreen from "./components/SmallScreen";
import LargeScreen from "./components/LargeScreen";
import { useAppSelector } from "@/redux/store";
import { cart_Product } from "../types/Product";
import Wraper from "@/Wraper/wraper";

const Home = () => {
  const [isSmallSize, setIsSmallSize] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1); // Initialize with null

  useEffect(() => {
    const handleResize = () => {
      setIsSmallSize(window.innerWidth < 1024); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cartItems: Array<cart_Product> = useAppSelector(
    (state) => state.cart.items
  );

  if (cartItems.length == 0) {
    return (
      <Wraper>
        <EmptyCart />
      </Wraper>
    );
  }

  return (
    <div>
      <div>
        {isSmallSize ? (
          <SmallScreen />
        ) : (
          <LargeScreen cartItem={cartItems[0]} />
        )}
      </div>
    </div>
  );
};
export default Home;
