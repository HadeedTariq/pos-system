import { useState } from "react";
import { Product } from "../reducer/sellerReducer";
import { DiamondMinus, DiamondPlus, IndentDecrease } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useOrderProductMutation } from "@/services/apiServices";
import { useApp } from "../hooks/useApp";

const StockHandler = ({ product }: { product: Product }) => {
  const [productPrice, setProductPrice] = useState(product.price);
  const [productQuantity, setProductQuantity] = useState(1);
  const { currentUser } = useApp();
  const quantityHandler = (type: "INREMENT" | "DECREMENT") => {
    if (type === "INREMENT") {
      if (product.stock === productQuantity) {
        toast({
          title: `Only ${product.stock} products stock availaible `,
        });
        return;
      }
      setProductQuantity((quantity) => quantity + 1);
      setProductPrice((productQuantity + 1) * product.price);
    } else if (type === "DECREMENT") {
      if (productQuantity < 2) {
        toast({
          title: "Product Quantity Must Be Greater Than 1",
        });
        return;
      }
      setProductQuantity((quantity) => quantity - 1);
      setProductPrice((productQuantity - 1) * product.price);
    }
  };
  const [orderProduct, { isLoading }] = useOrderProductMutation();

  const productOrder = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
      });
      return;
    }
    const { data, error } = await orderProduct({
      productId: product._id,
      productQuantity,
    });
    if (data) {
      toast({
        title: data.message || "Order successfully",
      });
    }
    if (error) {
      toast({
        title: error.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-2">
      <p>Product Price</p>
      <div className="flex mb-4">
        <div className="mr-4 gap-3">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Price:
          </span>
          <span className="text-red-600 font-ptSans dark:text-red-400 ml-1 ">
            ${productPrice}
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
      <p className="font-roboto text-lg mb-2">Product Quantity :</p>
      <div className="mb-2 flex gap-2 items-center">
        <DiamondMinus
          color="orange"
          cursor={"pointer"}
          onClick={() => {
            quantityHandler("DECREMENT");
          }}
        />
        <p className="font-nunito text-xl">{productQuantity}</p>
        <DiamondPlus
          color="orange"
          cursor={"pointer"}
          onClick={() => {
            quantityHandler("INREMENT");
          }}
        />
      </div>
      <Button
        className="w-full font-merriweather font-semibold text-lg"
        variant={"success"}
        disabled={isLoading}
        onClick={productOrder}>
        Order Product
      </Button>
    </div>
  );
};

export default StockHandler;
