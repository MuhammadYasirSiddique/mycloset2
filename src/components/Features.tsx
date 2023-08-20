import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Features = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 h-screen my-10 mx-20">
        <div className="relative flex justify-center items-center">
          <div className="absolute top-0 left-0 right-0 bottom-0 text-gray-100 text-9xl flex justify-center items-center pointer-events-none">
            Different from Others
          </div>
          <div className=" relative grid grid-cols-2 ">
            <div className="p-4">
              <h1 className="text-2xl">Using Good Quality Materials</h1> <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-4">
              <h1 className="text-2xl">100% Handmade Products</h1> <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-4">
              <h1 className="text-2xl">Modern Fashion Design</h1> <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-4">
              <h1 className="text-2xl">Discount for Bulk Orders</h1> <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center relative">
          <div className="p-4">
            <div className="rounded-full bg-slate-200 w-80 h-80 absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            <Image
              src="/event3.webp"
              width="2000"
              height="2000"
              alt="product"
              className="relative z-10"
            ></Image>
          </div>
          <div className="p-4 text-justify">
            <p>
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <br /> <br />
            <Button className="mx-4 whitespace-nowrap">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
