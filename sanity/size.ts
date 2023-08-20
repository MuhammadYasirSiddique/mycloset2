import { defineType, defineField } from "sanity";

export const size = defineType({
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    defineField({
      name: "size",
      title: "Size",
      type: "string",
    }),
  ],
});
