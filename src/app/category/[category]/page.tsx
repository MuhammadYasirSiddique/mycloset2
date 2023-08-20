import { client } from "@/lib/SanityClient";

import Product_Card from "@/app/category/components/product_card";
import { Product } from "@/app/types/Product";

const getProductData = async (category: string) => {
  const res = await client.fetch(
    `*[_type == 'product'   && category->category == $category]{
      id,
      title,
      description,
      details,
      color,
      'size': size[]->size,
      price,
      image,
      'category' : category->category,
      'status' : status->status,
    }`,
    {
      category: category,
    }
  );
  return res;
};

export default async function Home({
  params,
}: {
  params: { category: string };
}) {
  const data: Product[] = await getProductData(params.category);
  // console.log(data);
  return (
    <>
      <div>Category: {params.category}</div>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 justify-center">
        {data.map((item: Product) => (
          <div key={item.id}>
            <Product_Card item={item} />
          </div>
        ))}{" "}
      </div>
    </>
  );
}
