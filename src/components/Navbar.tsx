"use client";
import React, { useEffect, useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
import { Menu, X } from "lucide-react";
import { Link, Search } from "lucide-react";
import CartIcon from "./Carticon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [fix, setFix] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

      {open ? (
        <X
          className={`md:hidden block h-6 w-6 cursor-pointer mx-auto ${
            fix ? "hover:text-white" : " hover:text-black"
          } `}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <Menu
          className={`md:hidden block h-6 w-6 cursor-pointer mx-auto ${
            fix ? "hover:text-white" : " hover:text-black"
          } `}
          onClick={() => setOpen(!open)}
        />
      )}

      <nav
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
          <li>
            <a
              href="#education "
              className={` md:px-4 block py-2 ${
                fix ? "hover:text-white" : " hover:text-black"
              }`}
            >
              Sign in
            </a>
          </li>
          <CartIcon />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
