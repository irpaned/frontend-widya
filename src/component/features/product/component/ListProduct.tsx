import { useProduct } from "../hooks/useProduct";
import { ProductCard } from "./ProductCard";

function ListProduct() {
  const { products } = useProduct();

  const isEmpty = Array.isArray(products) && products.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className="w-[500px] flex justify-center items-center bg-white w-[100%]  mt-10 ">
          <h1 className="text-2xl">No product yet</h1>
        </div>
      ) : (
        <div className="bg-white w-[100%] flex flex-col gap-5 p-10">
          <p className="text-2xl font-bold">Recommendation</p>

          <div className="flex grid grid-cols-6 gap-3  ">
            {Array.isArray(products) &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ListProduct;
