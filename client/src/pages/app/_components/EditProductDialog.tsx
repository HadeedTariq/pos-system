import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import {
  CreateProductSchema,
  productValidator,
} from "../validators/product.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useEditProductMutation } from "@/services/apiServices";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSeller } from "../hooks/useSeller";
import { Navigate } from "react-router-dom";
import { ErrorResponse } from "@/types/general";

export function EditProductDialog({ productId }: { productId: string }) {
  const { products } = useSeller();
  const product = products.find((prod) => prod._id === productId);
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(productValidator),
    values: {
      category: product?.category || "",
      details: product?.details || "",
      name: product?.name || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      used: product?.used ? "true" : "false",
    },
  });

  const [extraImages, setExtraImages] = useState<string[]>(
    JSON.parse(JSON.stringify(product ? product.extraImages : "")) || []
  );
  const [editProduct, { isLoading }] = useEditProductMutation();

  const createExtraImages = (_: number, image: string) => {
    if (image === "") return;

    setExtraImages((prev) => [...prev, image]);
  };

  const onSubmit = async (product: CreateProductSchema) => {
    const productData = {
      ...product,
      extraImages: extraImages,
      productId,
      outOfStock: product.stock > 0 ? "false" : "true",
    };

    try {
      await editProduct(productData);
      toast({
        title: "Product Edited Successfully",
        variant: "default",
      });
    } catch (err) {
      const error = err as ErrorResponse;
      console.log(error);
      toast({
        title: error.response.data.message || "Somwthing went wrong",
        variant: "destructive",
      });
    }
  };
  if (!product) return <Navigate to={"/seller/dashboard"} />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="mx-1 h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
            <div className="flex items-center  gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="productName" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="productPrice"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="productDetails" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center  gap-2 w-[100%]">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="productStock"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="productCategory"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="used"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="w-full mr-2">
                        <SelectValue placeholder="Product Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="false">New</SelectItem>
                      <SelectItem value="true">Used</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="productImage"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <img src={product?.image} alt="productImage" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="extraImages"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Extra Images</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="extraImages"
                      type="url"
                      value={extraImages[0] ? extraImages[0] : ""}
                      onChange={(e) => {
                        const isImageAlreadyExist = extraImages.find(
                          (img) => img === e.target.value
                        );
                        if (isImageAlreadyExist) {
                          toast({
                            title: "Image Already exist",
                          });
                          return;
                        }
                        createExtraImages(0, e.target.value);
                      }}
                      readOnly={extraImages.length === 3}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="extraImages"
                      type="url"
                      value={extraImages[1] ? extraImages[1] : ""}
                      onChange={(e) => {
                        const isImageAlreadyExist = extraImages.find(
                          (img) => img === e.target.value
                        );
                        if (isImageAlreadyExist) {
                          toast({
                            title: "Image Already exist",
                          });
                          return;
                        }
                        createExtraImages(1, e.target.value);
                      }}
                      readOnly={extraImages.length === 3}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="extraImages"
                      type="url"
                      value={extraImages[2] ? extraImages[2] : ""}
                      onChange={(e) => {
                        const isImageAlreadyExist = extraImages.find(
                          (img) => img === e.target.value
                        );
                        if (isImageAlreadyExist) {
                          toast({
                            title: "Image Already exist",
                          });
                          return;
                        }
                        createExtraImages(2, e.target.value);
                      }}
                      readOnly={extraImages.length === 3}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant={"gradient"} type="submit" disabled={isLoading}>
              Edit Product
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
