import Wraper from "@/Wraper/wraper";
import { SetStateAction, useState } from "react";
import StarRating from "../supplierRating/Rating";

const Info = () => {
  const [activeTab, setActiveTab] = useState("productInfo");

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <Wraper>
      <div>
        <div className="">
          <button
            className={`px-4 py-2  ${
              activeTab === "productInfo"
                ? "bg-cyan-600 text-white rounded-t-md"
                : "bg-gray-300 text-gray-600 rounded-t-md"
            }`}
            onClick={() => handleTabClick("productInfo")}
          >
            Product Info
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "supplierInfo"
                ? "bg-cyan-600 text-white rounded-t-md"
                : "bg-gray-300 text-gray-600 rounded-t-md"
            }`}
            onClick={() => handleTabClick("supplierInfo")}
          >
            Supplier Info
          </button>
        </div>
        <div className="bg-slate-600 h-0.5 mb-4"></div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === "productInfo" && (
            <>
              <div>
                <h2 className="text-lg font-semibold  text-slate-500 mb-5">
                  PRODUCT DETAILS
                </h2>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg  text-slate-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </h2>
              </div>
              <div>
                <h2 className="text-lg font-semibold  text-slate-500 mb-5">
                  PRODUCT CARE
                </h2>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-slate-800">
                  <ul className="list-disc pl-6">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>consectetur adipiscing elit</li>
                    {/* Add more bullet points as needed */}
                  </ul>
                </h2>
              </div>
            </>
          )}

          {activeTab === "supplierInfo" && (
            <>
              <div>
                <h2 className="text-lg font-semibold  text-slate-500 mb-5">
                  Supplier Info
                </h2>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg  text-slate-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </h2>
              </div>
              <div>
                <h2 className="text-lg font-semibold  text-slate-500 mb-5">
                  SUPPLIER RATING
                </h2>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-slate-800">
                  <StarRating rating={4} />
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </Wraper>
  );
};

export default Info;
