import { defineType, defineField } from "sanity";

export const ProductStatus = defineType({
  name: "status",
  title: "Status",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
    }),
  ],
});
