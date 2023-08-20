import { client } from "@/lib/SanityClient";
import Product_Details from "@/app/product/components/product_details";
import { Product } from "@/app/types/Product";

const getProductData = async (id: string) => {
  const res = await client.fetch(
    `*[_type == 'product' && id == $id] {
      id,
      title,
      description,
      details,
      color,
      'size': size[]->size,
      price,
      image,
      'category' : category->category,
    }`,
    {
      id: id,
    }
  );
  return res;
};

export default async function Home({ params }: { params: { id: string } }) {
  const data: Product[] = await getProductData(params.id);

  return (
    <>
      <div className="mt-10">
        {data.map((item: Product) => (
          <div key={item.id}>
            <Product_Details item={item} />
          </div>
        ))}{" "}
      </div>
    </>
  );
}

// import React from "react";

// import Image from "next/image";
// import products from "@/app/products";

// export default function Home({ params }: { params: { id: string } }) {
//   const pid = parseInt(params.id);

//   const product = products.find((p) => p.id === pid);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <Image src={product.src} height={400} width={400} alt={product.alt} />
//       <h1 className="text-3xl mt-2">{product.alt}</h1>
//       <p className="text-gray-700">{product.price}</p>
//       {/* <p className="mt-4">{product.description}</p> */}
//     </div>
//   );
// }
