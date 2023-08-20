import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Product Category",
      type: "string",
    }),
  ],
});
