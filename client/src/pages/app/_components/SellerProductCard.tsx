import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Product } from "../reducer/sellerReducer";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { useDeleteProductMutation } from "@/services/apiServices";
import { EditProductDialog } from "./EditProductDialog";
import { useNavigate } from "react-router-dom";

const SellerProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const productImages: string[] = product.extraImages;
  const [currentImage, setCurrentImage] = useState({
    src: product.image,
  });

  const imageSetter = (img: string) => {
    setCurrentImage({
      src: img,
    });
  };

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <div
      key={product._id}
      className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 max-[600px]:mx-auto ring-opacity-40 max-w-sm h-fit">
      <div className="relative">
        <LazyLoadImage
          placeholderSrc={"defaultPlaceholder.jpg"}
          alt={"prodImage"}
          height={200}
          src={currentImage.src}
          effect="blur"
          width={"100%"}
          wrapperProps={{
            style: { transitionDelay: "1s" },
          }}
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
          SALE
        </div>
      </div>
      <div className="flex items-center justify-center py-1 gap-3 w-full">
        {productImages?.map((img, index) => (
          <img
            key={index}
            className="w-[90px] h-[70px] object-cover cursor-pointer hover:opacity-75 transition duration-500"
            src={currentImage.src === img ? product.image : img}
            onClick={() =>
              imageSetter(currentImage.src === img ? product.image : img)
            }
            alt="Product Image"
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        <p className="dark:text-gray-300 text-sm mb-4">{product.details}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price}</span>
        </div>
        <div className="flex gap-2">
          <EditProductDialog productId={product._id} />
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteProduct(product._id);
            }}
            disabled={isLoading}>
            Delete Product
          </Button>
        </div>
        <Button
          variant={"gradient"}
          className="w-full mt-2"
          onClick={() => navigate(`details?productId=${product._id}`)}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default SellerProductCard;
