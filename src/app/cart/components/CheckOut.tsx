"use client";
import { Product, cart_Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";
import { getStripePromise } from "@/lib/stripe";
import React from "react";

interface IProps {
  products: cart_Product[];
}

const CheckOut = (props: IProps) => {
  const handleCheckOut = async () => {
    const stripe = await getStripePromise();
    const res = await fetch(`/api/stripeSession`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(props.products),
    });

    const data = await res.json();

    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <div className=" py-10">
      <Button
        className="text-center py-3 px-3 rounded-md"
        onClick={handleCheckOut}
      >
        CheckOut
      </Button>
    </div>
  );
};

export default CheckOut;
