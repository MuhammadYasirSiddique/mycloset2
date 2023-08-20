import { type SchemaTypeDefinition } from "sanity";

import { product } from "./product";
import { size } from "./size";
import { category } from "./category";
import { ProductStatus } from "./ProductStatus";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, size, category, ProductStatus],
};
