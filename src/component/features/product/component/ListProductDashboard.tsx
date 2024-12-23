import { useProduct } from "../hooks/useProduct";
import { ProductCardDashboard } from "./ProductCardDashboard";

function ListProductDashboard() {
  const { products } = useProduct();

  const isEmpty = Array.isArray(products) && products.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className="w-[500px] flex justify-center items-center bg-white w-[100%]  mt-10 ">
          <h1 className="text-2xl">No product yet</h1>
        </div>
      ) : (
        <div className="flex grid grid-rows gap-5 bg-gray-100 rounded-[10px] w-[100%] p-10">
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCardDashboard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
}

export default ListProductDashboard;
