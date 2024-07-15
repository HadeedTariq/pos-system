import Loading from "@/components/Loading";
import { useGetSellerProductsQuery } from "@/services/apiServices";
import { useEffect } from "react";
import { setProducts } from "../reducer/sellerReducer";
import { useDispatch } from "react-redux";
import ProductCard from "../_components/ProductCard";

const SellerProducts = () => {
  const { data: products, isLoading } = useGetSellerProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(products || []));
  }, [products]);

  if (isLoading)
    return (
      <div className="h-[90vh]">
        <Loading />;
      </div>
    );
  return (
    <div className="grid  grid-cols-3 gap-8 p-2 max-[1070px]:grid-cols-2 max-[600px]:grid-cols-1">
      {products?.map((product) => (
        <>
          <ProductCard product={product} key={product._id} />
        </>
      ))}
    </div>
  );
};

export default SellerProducts;
