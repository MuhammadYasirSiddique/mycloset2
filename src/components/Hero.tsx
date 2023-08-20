import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Mail, ShoppingBag } from "lucide-react";
// import { FiShoppingBag } from "react-icons/fi";

const Hero = () => {
  return (
    <div className=" py-4 bg-gradient-to-b from-gray-50 to-gray-100 ">
      <div className="flex mx-6 items-center flex-wrap-reverse lg:flex-nowrap">
        <div className="container mx-auto items-center justify-center text-left">
          <div>
            <Badge className="my-2 mx-4">Sales 70%</Badge>
            <h2 className="text-black my-2">
              {" "}
              <p className="text-[40px] lg:text-[80px] text-rose-600 font-serif leading-tight lg:leading-[70px]">
                Unleash Your Shopping Fantasies! 🛍️{" "}
              </p>
              <p className="text-[20px] lg:text-[80px] text-rose-600 font-serif leading-tight lg:leading-[40px]">
                {" "}
              </p>{" "}
            </h2>
          </div>
          <div>
            <p className="text-[20px] lg:text-[40px] leading-tight">
              Discover a World of Discounts at Our Exhilarating Emporium!
            </p>
          </div>
          <div className="my-6">
            <Button size="lg">
              <ShoppingBag className="mr-2 h-6 w-6" /> Shop Now
            </Button>
          </div>
        </div>
        <div className="z-0">
          <Image
            className="max-h-[700px] object-cover object-top object-scale-up z-5"
            src="/young.png"
            width={1000}
            height={400}
            alt="jeans pant sky blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
