import Highlights from "@/components/Highlights";
import Hero from "@/components/Hero";
import Subscription from "@/components/Subscription";
import Promotion from "@/components/promotion";
import React from "react";
import Features from "@/components/Features";

const Home = () => {
  return (
    <div>
      <Hero />
      <Promotion />
      <Features />
      <Highlights />
      <Subscription />
    </div>
  );
};

export default Home;
