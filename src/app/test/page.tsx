"use client";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [isSmallSize, setIsSmallSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallSize(window.innerWidth < 768); // Adjust the breakpoint as needed
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

  return (
    <div>{isSmallSize ? <div>Small Screen</div> : <div>Large Screen</div>}</div>
  );
};

export default Home;
