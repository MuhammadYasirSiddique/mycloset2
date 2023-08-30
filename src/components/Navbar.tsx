"use client";

import { Menu, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { UserButton, auth } from "@clerk/nextjs";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [fix, setFix] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const totalqty = useAppSelector((state) => state.cart.totalQty);

  function setFixed() {
    if (window.scrollY >= 1) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  // Function to update the screen size
  function handleScreenSize() {
    setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
  }

  // Listen for screen size changes
  useEffect(() => {
    handleScreenSize(); // Check initial screen size
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", setFixed);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", setFixed);
      }
    };
  }, []);

  return (
    <div
      className={`
        ${
          fix
            ? "sticky top-0 z-50  text-slate-200 bg-cyan-600 w-full flex flex-wrap  items-center justify-between"
            : "  text-gray-600 bg-slate-100 w-full flex flex-wrap  items-center justify-between"
        }`}
    >
      <div
        className={`text-2xl lg:text-3xl p-2 mx-4 ${
          fix ? "hover:text-white " : " hover:text-black text-2xl lg:text-5xl"
        } `}
      >
        <a href="/" className=" from-stone-600 font-serif ">
          <span className=" font-mono"> My</span>{" "}
          <span>
            {" "}
            <strong>Closet</strong>
          </span>
        </a>
      </div>
      <div className="md:hidden ml-2">
        {" "}
        {open ? (
          <X
            className={`md:hidden block h-6 w-6 cursor-pointer mx-5 ${
              fix ? "hover:text-white" : " hover:text-black"
            } `}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <Menu
            className={`md:hidden block h-6 w-6 cursor-pointer mx-5 ${
              fix ? "hover:text-white" : " hover:text-black"
            } `}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>
      <div
        className={`
                  ${open ? "block" : "hidden"}
                      w-full md:flex md:itmes-center md:w-auto

                  `}
      >
        <ul className="md:flex md:justify-between  text-base text-center items-center">
          <li>
            {" "}
            <a href="/category/Men" className="mx-4">
              {" "}
              Men
            </a>
          </li>
          <li>
            {" "}
            <a href="/category/Women" className="mx-4">
              {" "}
              Women
            </a>
          </li>
          <li>
            {" "}
            <a href="/category/Kids" className="mx-4">
              {" "}
              Kids
            </a>
          </li>
          <li>
            <a href="/category/Home" className="mx-4">
              {" "}
              Home
            </a>
          </li>
          {!isSmallScreen && (
            <form className="py-2 max-w-sm px-1 sm:justify-center                                                                                                                    ml-auto">
              <div className="relative">
                <button type="button" title="search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3 z-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-4 pr-14 text-gray-500 border rounded-full outline-slate-300"
                />
              </div>
            </form>
          )}
          {!auth ? (
            // User is not authenticated, show Sign in link
            <li>
              <a
                href="sign-in"
                className={` md:px-4 block py-2 ${
                  fix ? "hover:text-white" : " hover:text-black"
                }`}
              >
                Sign in
              </a>
            </li>
          ) : (
            // User is authenticated, show UserButton component
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
          )}
        </ul>

        {/* <CartIcon /> */}

        <div
          className={`flex items-center justify-center md:ml-auto ${
            isSmallScreen ? "w-full mt-2 md:mt-0" : ""
          }`}
        >
          <a
            href="/cart"
            className={` text-xl px-4 lg:mx-4 md:px-4 block py-2 ${
              fix ? "hover:text-white" : " hover:text-black"
            }`}
          >
            <div
              className={`${
                fix
                  ? "bg-gray-300 p-2 flex h-8 w-8 rounded-full relative items-center justify-center"
                  : "bg-cyan-500 p-2 flex h-8 w-8 rounded-full relative items-center justify-center "
              }`}
            >
              <ShoppingCart color={`${fix ? "black" : "indigo"}`} size={20} />
              <span className=" top-0 -right-1 absolute rounded-full bg-red-500 h-4 w-4 text-center text-xs text-white">
                {totalqty ? totalqty : 0}
              </span>
            </div>
          </a>
          <Toaster position="top-center" reverseOrder={true} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
