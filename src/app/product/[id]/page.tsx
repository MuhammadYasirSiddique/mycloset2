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
            <Product_Details product={item} />
          </div>
        ))}{" "}
      </div>
    </>
  );
}
