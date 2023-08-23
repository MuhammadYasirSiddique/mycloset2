import { client } from "@/lib/SanityClient";
import { XCircle } from "lucide-react";

import Product_Card from "@/app/category/components/product_card";
import { Product } from "@/app/types/Product";
import toast from "react-hot-toast";

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

  if (data.length === 0) {
    return (
      <div className="text-center mt-10 h-52 text-slate-60">
        <div className=" mb-4">Category: {params.category}</div>
        <div className=" font-bold text-2xl p-4 rounded-md flex items-center justify-center">
          <XCircle className="mr-2" />
          <p>Currently No Products Available in this category. </p>
          <p> Please Check Back Later. </p>
        </div>
      </div>
    );
  }

  // console.log(data);
  return (
    <>
      <div>Category: {params.category}</div>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-10 justify-center">
        {data.map((item: Product) => (
          <div key={item.id}>
            <Product_Card item={item} />
          </div>
        ))}{" "}
      </div>
    </>
  );
}
