import { Navigate, useSearchParams } from "react-router-dom";
import { useSeller } from "../hooks/useSeller";
import { useState } from "react";

const SellerProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { products } = useSeller();
  const product = products.find((prod) => prod._id === productId);
  if (!productId || productId.length !== 24 || !product)
    return <Navigate to={"/"} />;
  const [currentImage, setCurrentImage] = useState({
    src: product.image,
  });

  const imageSetter = (img: string) => {
    setCurrentImage({
      src: img,
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-contain"
                src={currentImage.src}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.details}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  ${product.price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.outOfStock ? "Out of stock" : "In Stock"}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold  text-gray-700 dark:text-gray-300">
                Select Images:
              </span>
              <div className="flex gap-3 items-center mt-2">
                {product.extraImages?.map((img, index) => (
                  <img
                    key={index}
                    className="w-[90px] h-[70px] object-cover cursor-pointer hover:opacity-75 transition duration-500"
                    src={currentImage.src === img ? product.image : img}
                    onClick={() =>
                      imageSetter(
                        currentImage.src === img ? product.image : img
                      )
                    }
                    alt="Product Image"
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetails;
