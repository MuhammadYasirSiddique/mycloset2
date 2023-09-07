import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
        <p>Your order has been successfully placed.</p>
        <p>Shipping will be made as per your selected plan:</p>
        <p className="font-semibold text-blue-500">Express Shipping</p>
        <p>We will keep you updated on the status of your order.</p>
        <p className="text-blue-500 text-xl">Thank you for choosing us!</p>
      </div>
    </div>
  );
};

export default Page;
