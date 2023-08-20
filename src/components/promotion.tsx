import Image from "next/image";
import React from "react";

const Promotion = () => {
  return (
    <>
      <p className="text-sm font-bold text-center">PROMOTIONS</p>
      <h1 className="text-3xl font-bold text-center  text-blue-950">
        Our Promotions Events
      </h1>
      <div className="flex justify-evenly flex-wrap lg:flex-nowrap">
        <div>
          <div className="m-6 flex items-center text-center bg-slate-300 h-[220px] w-screen md:w-[500px] shadow-lg ">
            <div className="ml-6">
              {" "}
              <h1 className="text-3xl font-serif font-bold">GET U P TO 60%</h1>
              <p className="text-lg"> For the summer season</p>
            </div>
            <div className="mx-auto">
              <Image
                src="/event1.webp"
                width={200}
                height={200}
                alt="jeans pant sky blue"
              ></Image>
            </div>
          </div>
          <div className="text-center">
            <div className="m-6 p-10 text-lg bg-black text-white h-1500  ">
              <div className="">
                <h1 className=" text-2xl">GET 30% Off</h1>
                <p>USE PROMO CODE</p>
                <p className="text-lg  bg-gray-500 text-white py-2 rounded-lg">
                  {" "}
                  CLEARANCESALE
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="m-6 object-bottom pt-6 text-left bg-slate-400 w-[250px] ">
            <h1 className="text-xl mx-3">Flex Sweatshirt</h1>
            <div className="flex">
              <p className="text-lg mx-3">
                <span>
                  <s> $100.00</s>
                </span>
                <span className="font-extrabold text-xl">$75.00</span>
              </p>
            </div>
            <br />
            <Image
              src="/event2.webp"
              width={200}
              height={200}
              alt="jeans pant sky blue"
              className=""
            ></Image>
          </div>
          <div className="m-6 p-6 object-bottom items-center text-center bg-slate-400 ">
            {" "}
            <h1 className="text-2xl">GET UP TO 60%</h1>
            <p className="text-lg "> For the summer season</p>
            <Image
              src="/event3.webp"
              width={200}
              height={200}
              alt="jeans pant sky blue"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};
export default Promotion;
