import Wraper from "@/Wraper/wraper";
import Image from "next/image";
import React from "react";

const Promotion = () => {
  return (
    <Wraper>
      <p className="text-center text-lg">Promotions</p>
      <h3 className="my-4  first:mt-0 text-center text-cyan-950 text-3xl font-bold">
        Our Promotions Event
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full">
        <div className="sm:col-span-2 space-y-5">
          <div className=" bg-[#d6d6d8]  flex justify-center items-center px-5 shadow-xl">
            <div>
              <h4 className="text-3xl">
                GET UP TO <span className="text-4xl">60%</span>
              </h4>
              <p>For the summer season</p>
            </div>
            <Image src={"/event1.webp"} alt="" width={226} height={226} />
          </div>
          <div className="flex flex-col items-center justify-center  bg-[#212121] h-48 py-5 text-center text-white shadow-xl">
            <h3 className="text-3xl">GET 30% Off</h3>
            <p className="text-xs pb-2">USE PROMO CODE</p>
            <button className="bg-[#474747] px-8 py-3 tracking-widest text-white text-xs mt-1 shadow-xl glow-effect-dark">
              CLEARANCESALE
            </button>
          </div>
        </div>
        <div className=" bg-[#efe1c7] shadow-xl">
          <div className="p-5">
            <p className="text-3xl">Flex Sweatshirt</p>
            <p className="text-base">
              <span className="line-through text-sm mr-1">$100.00</span> $75.00
            </p>
          </div>
          <Image
            alt=""
            src={"/event2.webp"}
            width={220}
            height={220}
            className="mx-auto"
          />
        </div>
        <div className=" bg-[#d7d7d9] shadow-xl">
          <div className="p-5">
            <p className="text-3xl">Flex Push button bombar</p>
            <p className="text-base">
              <span className="text-sm line-through mr-1">$225.00</span>$190.00
            </p>
          </div>
          <Image
            alt=""
            src={"/event3.webp"}
            width={220}
            height={220}
            className="mx-auto"
          />
        </div>
      </div>
    </Wraper>
  );
};
export default Promotion;
