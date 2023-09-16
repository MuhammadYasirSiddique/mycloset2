import { client } from "@/lib/SanityClient";
import Product_Details from "@/app/product/components/product_details";
import { Product } from "@/app/types/Product";
import { auth } from "@clerk/nextjs";
import { product } from "../../../../sanity/product";
import { XCircle } from "lucide-react";

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

const productIdQuery = async () => {
  const res = client.fetch(`*[_type == 'product'] {
  id }`);
  return res;
};

export default async function Home({ params }: { params: { id: string } }) {
  const data: Product[] = await getProductData(params.id);

  const validProductId = await productIdQuery();
  const ProductIds = validProductId.map(
    (product: { id: string }) => product.id
  );

  if (!ProductIds.includes(params.id)) {
    return (
      <div className="text-center mt-10 h-52 text-slate-60">
        <div className=" mb-4">Category: {params.id}</div>
        <div className=" font-bold text-2xl p-4 rounded-md flex items-center justify-center">
          <XCircle className="mr-2" />
          <p>Invalid Category: {params.id}</p>
        </div>
      </div>
    );
  }
  const userName = auth();

  return (
    <>
      <div className="mt-10">
        {data.map((item: Product) => (
          <div key={item.id}>
            <Product_Details
              product={item}
              userId={userName.userId as string}
            />
          </div>
        ))}{" "}
      </div>
    </>
  );
}
