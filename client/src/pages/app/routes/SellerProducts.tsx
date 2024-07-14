import Loading from "@/components/Loading";
import { useGetSellerProductsQuery } from "@/services/apiServices";
import SellerProductCard from "../_components/SellerProductCard";
import { useEffect } from "react";
import { setProducts } from "../reducer/sellerReducer";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProducts = () => {
  const { data: products, isLoading, error } = useGetSellerProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(products || []));
  }, [products]);

  if (isLoading) return <Loading />;
  if (error) return <Navigate to={"/seller/dashboard"} />;
  return (
    <div className="grid  grid-cols-3 gap-8 p-2 max-[1070px]:grid-cols-2 max-[600px]:grid-cols-1">
      {products?.map((product) => (
        <>
          <SellerProductCard product={product} key={product._id} />
        </>
      ))}
    </div>
  );
};

export default SellerProducts;
