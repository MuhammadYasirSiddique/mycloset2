import Stripe from "stripe";
import { db, cartTable, salesTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: any, res: any) {
  // console.log(endpointSecret + "End Point Secret");

  const headerslist = headers();

  try {
    const rawBody = await req.text();
    const sig = headerslist.get("stripe-signature");

    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
      {
        apiVersion: "2023-08-16",
      }
    );

    // console.log(process.env.STRIPE_SECRET_KEY + "stripe secret key");

    let event;

    try {
      if (!sig || !endpointSecret) {
        return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
          status: 400,
        });
      }

      event = stripe.webhooks.constructEvent(
        rawBody.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook sig`);
      return new Response("webhooks signature / endpoint secret missing", {
        status: 400,
      });
    }

    if ("checkout.session.completed" === event.type) {
      const session = event.data.object;
      // @ts-ignore
      const customerData = await stripe.customers.retrieve(session.customer);
      // @ts-ignore
      const userId = customerData.metadata.userId;


      // Fetch cart items for the user
      const cartItems = await db.select().from(cartTable).where(eq(cartTable.user_id, userId));

      // Insert cart items into Sales table
      for (const cartItem of cartItems) {
        await db.insert(salesTable).values(cartItem).execute()
      }


      await db.delete(cartTable).where(eq(cartTable.user_id, userId));

      console.log("Payment success and cart items transferred to Sales table");

      // console.log("payment success-----------------------");
      //   , session);
      //   const line_Items = await stripe.checkout.sessions.listLineItems(
      //     // @ts-ignore
      //     event.data.object!._id
      //   );


      return new Response("Payment Confirmation Router Reciept", {
        status: 200,
      });
    } else {
      res.setHeader("Allow", "POST");
      // res.status(405).end("Method Not Allowed");
    }
  } catch (err: any) {
    console.log("Error in webhook----------", err);
    // res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
}
