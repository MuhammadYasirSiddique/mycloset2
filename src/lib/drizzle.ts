// import { InferModel } from "drizzle-orm";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import { pgTable, varchar, integer, serial, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const cartTable = pgTable("cart_order", {
  id: serial("id").primaryKey().notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  product_name: varchar("product_name", { length: 255 }).notNull(),
  size: varchar("size", { length: 255 }).notNull(),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  qty: integer("qty").notNull(),
  total_price: integer("total_price").notNull(),
});


export const salesTable = pgTable("sales", {
  id: serial("id").primaryKey().notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  product_name: varchar("product_name", { length: 255 }).notNull(),
  size: varchar("size", { length: 255 }).notNull(),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  qty: integer("qty").notNull(),
  total_price: integer("total_price").notNull(),
  // payment_id: varchar("paymnt_id", { length: 255 }).notNull(),
});


export type Cart = InferSelectModel<typeof cartTable>;
export type addToCart = InferInsertModel<typeof cartTable>;

export type Sales = InferSelectModel<typeof salesTable>;
export type AddToSales = InferInsertModel<typeof salesTable>;

export const db = drizzle(sql);

