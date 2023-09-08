import { cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

const endPointSecretKey = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: any, res: any) {
  const headerList = headers();

  try {
    const rawBody = await req.text();
    const sign = headerList.get("stripe-signature");
    const stripe = new Stripe(process.env.STRIPE_SIGNING_SECRET as string, {
      apiVersion: "2023-08-16",
    });

    // console.log(process.env.STRIPE_WEBHOOK_SECRET + " stripe webhook key");
    let event;

    try {
      if (!sign || endPointSecretKey) {
        return (
          new Response("Webhook Signature or Endpoint secret is missing"),
          { status: 400 }
        );
      }
      event = stripe.webhooks.constructEvent(
        rawBody.tostring(),
        sign,
        endPointSecretKey
      );
    } catch (error: any) {
      console.log(`⚠️  Webhook signature verification failed`);
      return new Response(
        "Webhook Signature or Endpoint Secret Verification Failed",
        { status: 400 }
      );
    }

    if ("checkout.session.completed" === event.type) {
      const session = event.data.object;
      //@ts-ignore
      const customerData = await stripe.customers.retrieve(session.customer);
      //@ts-ignore
      const userId = customerData.metadata.userId;

      await db.delete(cartTable).where(eq(cartTable.user_id, userId));

      console.log(`payment success----`, session);

      const line_items = await stripe.checkout.sessions.listLineItems(
        //@ts-ignore
        event.data.object!._id
      );

      return new Response("Payment Confiration Router Receipt");
    } else {
      res.setHeaders("Allow", "POST");
    }
  } catch (error) {
    console.log("Error in Webhook .... ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
