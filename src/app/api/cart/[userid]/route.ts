import { cart_Product } from "@/app/types/Product";
import { Cart, cartTable, db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { userid } }: { params: { userid: string } }
) => {
  try {
    if (!userid) {
      throw new Error("Invalid user id or password");
    } else {
      const res: Cart[] = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, userid));

      const cartItems = res.map((item) => ({
        _id: item.product_id,
        title: item.product_name,
        unitPrice: item.price,
        qty: item.qty,
        productPrice: item.total_price,
        size: item.size,
        image: item.image,
        user_id: item.user_id,
      }));

      const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.productPrice,
        0
      );

      return NextResponse.json(
        { cartItems, totalQty, totalPrice },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
