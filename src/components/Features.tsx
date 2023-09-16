import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Wrapper from "@/Wraper/wraper";

const Features = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-2 gap-5 mt-20 min-h-screen">
        <div className="col-span-2 col-start-1 h-full w-full  xl:col-start-2">
          <h3 className="text-[2.5rem] sm:text-[2.75rem] tracking-[0.03em] leading-[3rem] font-bold">
            Unique and Authentic Vintage Designer Jewellery
          </h3>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-5">
          <div className="relative col-span-2 h-full w-full  xl:col-span-1">
            <div className="grid grid-cols-2 gap-10 mr-20">
              <div className=" ">
                <h4 className="text-2xl font-bold">
                  Using Good Quality Materials
                </h4>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className=" ">
                <h4 className="text-2xl font-bold">100% Handmade Products</h4>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className=" ">
                <h4 className="text-2xl font-bold">Lorem, ipsum dolor.</h4>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className=" ">
                <h4 className="text-2xl font-bold">Lorem, ipsum dolor.</h4>
                <p className="mt-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden text-[5rem] sm:text-8xl  font-bold tracking-widest text-gray-200/70 -z-[10]">
              Different From Others
            </div>
          </div>
          <div className="col-span-2   xl:col-span-1">
            <div className="flex flex-col h-full w-full items-center justify-center gap-5 sm:flex-row">
              <div className="basis-1/2  w-full flex justify-center ">
                <Image
                  src="/F-p1.webp"
                  alt=""
                  width={250}
                  height={250}
                  className="shadow-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-5  basis-1/2 ">
                <p className="tracking-wider leading-6">
                  This piece is ethically crafted in our small family-owned
                  workshop in Peru with unmatched attention to detail and care.
                  The Natural color is the actual natural color of the fiber,
                  undyed and 100% traceable.
                </p>
                <Button>See All Products</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Features;
