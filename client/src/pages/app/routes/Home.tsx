import Loading from "@/components/Loading";
import { useGetProductsQuery } from "@/services/apiServices";
import ProductCard from "../_components/ProductCard";

const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  if (isLoading) return <Loading />;
  if (isError) return <p>Backend is Loading...</p>;
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

export default Home;
