import React from "react";
import { Button } from "./ui/button";

const Subscription = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center text-center">
      <div
        className="
        absolute top-0 left-0 right-0 bottom-0 text-gray-200 text-9xl flex 
      justify-center items-center pointer-events-none"
      >
        News Letter
      </div>
      <div className=" relative">
        <h2 className="text-5xl font-semibold mb-4">
          Subscribe Our Newsletter
        </h2>

        <div className="block text-gray-700 font-medium mb-2">
          Get the latest information and promo offers directly
        </div>
        <form>
          <div className="mb-4 flex gap-2">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            <Button className="px-5 whitespace-nowrap">Get Started</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscription;
