import { NextRequest, NextResponse } from "next/server";
import { db, cartTable, addToCart, Cart } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { cart_Product } from "@/app/types/Product";

export const POST = async (request: NextRequest) => {
  const req: addToCart = await request.json();

  try {
    if (req) {
      const res = await db
        .insert(cartTable)
        .values({
          user_id: req.user_id,
          product_id: req.product_id,
          product_name: req.product_name,
          qty: req.qty,
          image: req.image,
          size: req.size,
          price: req.price,
          total_price: req.total_price,
        })
        .returning();

      return NextResponse.json(
        { message: "Item(s) Added to DB" },
        { status: 200 }
      );
    } else {
      throw new Error("Error Adding data to DB");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};

export const PUT = async (request: NextRequest) => {
  const user_id = "abc123";

  const data: addToCart = await request.json();

  try {
    if (data) {
      await db
        .update(cartTable)
        .set({
          qty: data.qty,
          total_price: data.qty * data.price,
        })
        .where(
          and(
            eq(cartTable.user_id, user_id),
            eq(cartTable.product_id, data.product_id)
          )
        )
        .returning();
      return NextResponse.json(
        { message: "Item in Cart updated" },
        { status: 200 }
      );
    } else {
      throw new Error("Failed to update Item in Cart");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// import { v4 as uuid } from "uuid";
// import { cookies } from "next/headers";
// import { urlForImage } from "../../../../sanity/lib/image";
// import { error } from "console";

// export const GET = async (req: NextRequest) => {
//   try {
//     const res: Cart[] = await db
//       .select()
//       .from(cartTable)
//       .where(eq(cartTable.user_id, "abc123"));

//     const cartItems = res.map((item) => ({
//       _id: item.product_id,
//       title: item.product_name,
//       unitPrice: item.price,
//       qty: item.qty,
//       productPrice: item.total_price,
//       size: item.size,
//       image: item.image,
//       user_id: item.user_id,
//     }));

//     return NextResponse.json({ cartItems });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: error }, { status: 500 });
//   }
// };
