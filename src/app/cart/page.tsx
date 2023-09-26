"use client";
import React, { useEffect, useState } from "react";
import EmptyCart from "./components/EmptyCart";
import SmallScreen from "./components/SmallScreen";
import LargeScreen from "./components/LargeScreen";
import { useAppSelector } from "@/redux/store";
import { cart_Product } from "../types/Product";
import Wraper from "@/Wraper/wraper";
import Loading from "../category/components/Loading";

const Home = () => {
  let isLoading = true
  const [isSmallSize, setIsSmallSize] = useState(false);
  const cartItems: Array<cart_Product> = useAppSelector(
    (state) => state.cart.items
  );

   isLoading = useAppSelector((state) => state.cart.isLoading);

console.log(isLoading)

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



  
  


  // Display loader while loading is true
  if (isLoading) {
    return <Loading />;
  }


  
  if (cartItems.length == 0 ) {
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
          <SmallScreen  />
        ) : (
          <LargeScreen  />
        )}
      </div>
    </div>
  );
};
export default Home;
