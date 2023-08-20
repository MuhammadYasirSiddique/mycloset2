import { type } from "os";
import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "id",
      title: "Product ID",
      type: "string",
    },
    {
      name: "title",
      title: "Product Title",
      type: "string",
    },

    {
      name: "description",
      title: "Product Description",
      type: "string",
    },
    {
      name: "details",
      title: "Product Details",
      type: "string",
    },
    {
      name: "color",
      title: "Product color",
      type: "string",
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
    },
    {
      name: "price",
      title: "Product Price",
      type: "number",
    },
    // {
    //   name: "category",
    //   title: "Product Category",
    //   type: "string",
    // },
    defineField({
      name: "size",
      title: "Size",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              name: "size",
              title: "Size",
              type: "size",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [
        {
          name: "category",
          title: "Category",
          type: "category",
        },
      ],
    }),
    defineField({
      name: "status",
      title: "ProductStauts",
      type: "reference",
      to: [
        {
          name: "status",
          title: "Status",
          type: "status",
        },
      ],
    }),
  ],
});
