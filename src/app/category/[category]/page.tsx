import { client } from "@/lib/SanityClient";
import { XCircle } from "lucide-react";
import Product_Card from "@/app/category/components/product_card";
import { Product } from "@/app/types/Product";
import { Button } from "@/components/ui/button";

const categoryQuery = async () => {
  const res = client.fetch(`*[_type == 'category'] {
  category }`);
  return res;
};

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
  // const router = useRouter();

  const validCategories = await categoryQuery();
  const categoryNames = validCategories.map(
    (category: { category: string }) => category.category
  );

  if (!categoryNames.includes(params.category)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl font-extrabold text-red-500">404</div>
        <div className="text-2xl font-semibold mt-4">Page Not Found</div>
        <p className="text-gray-600 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button>Go back to the home page</Button>
      </div>
    );
  }
  const data: Product[] = await getProductData(params.category);

  if (data.length === 0) {
    return (
      <div className="text-center mt-10 h-52 text-slate-60">
        <div className=" mb-4 text-slate-600">Category: {params.category}</div>
        <div className=" font-bold text-2xl p-4 rounded-md flex items-center justify-center">
          <XCircle className="mr-2" />
          <p>Currently No Products Available in this category. </p> <br />
          <p> Please Check Back Later. </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-slate-500 px-10">Category: {params.category}</div>
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
