import { auth } from "@clerk/nextjs";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isTemplateExpression } from "typescript";

const key = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  const body = await req.json();

  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
    },
  });
  console.log(body);

  try {
    if (body.length > 0 && userId) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1NnOwgGqLZlLvJ2tpZrB3kNr",
          },
          {
            shipping_rate: "shr_1NnOz4GqLZlLvJ2tGlzV1t0D",
          },
        ],
        invoice_creation: {
          enabled: true,
        },

        line_items: body.map((item: any) => {
          return {
            price_data: {
              unit_amount: item.unitPrice * 100,
              currency: "USD",
              product_data: {
                name: item.title,
                images: [item.image],
              },
              // unit_amount: item.price * 100,
            },
            quantity: item.qty,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        customer: customer.id,
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${req.headers.get("origin")}/success`,
        cancel_url: `${req.headers.get("origin")}/cart`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({
        message: "Product data is missin or no user logged in",
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message);
  }
};
