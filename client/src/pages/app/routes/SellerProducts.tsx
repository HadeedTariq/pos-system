import Loading from "@/components/Loading";
import { useGetSellerProductsQuery } from "@/services/apiServices";

const SellerProducts = () => {
  const { data: products, isLoading } = useGetSellerProductsQuery({});

  if (isLoading) return <Loading />;
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">Card Title</div>
        <div className="card-para">
          This is some description text inside the card.
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
