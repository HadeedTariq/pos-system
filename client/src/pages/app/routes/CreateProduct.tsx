import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  CreateProductSchema,
  productValidator,
} from "../validators/product.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCreateProductMutation } from "@/services/apiServices";
import { ErrorResponse } from "@/types/general";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(productValidator),
    values: {
      category: "",
      details: "",
      name: "",
      price: 0,
      stock: 0,
      used: "",
    },
  });

  const [image, setImage] = useState<string | File>("");
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const createExtraImages = (_: number, image: string) => {
    if (image === "") return;

    setExtraImages((prev) => [...prev, image]);
  };

  const onSubmit = async (product: CreateProductSchema) => {
    if (!image) {
      toast({
        title: "Product image rerquired",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    const productData = { ...product };
    const productKeys = Object.keys(
      productData
    ) as (keyof CreateProductSchema)[];
    productKeys.forEach((key) => {
      formData.append(key, productData[key] as string);
    });
    formData.append("extraImages", JSON.stringify(extraImages));
    try {
      await createProduct(formData);
      toast({
        title: "Product created successfully",
        variant: "default",
      });
      navigate("/seller/dashboard/products");
    } catch (err) {
      const error = err as ErrorResponse;
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
        <div className="flex items-center  gap-2 w-[100%]">
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
                  <Input placeholder="productPrice" type="number" {...field} />
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
                  <Input placeholder="productStock" type="number" {...field} />
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
                  <Input placeholder="productCategory" type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center  gap-2 w-[100%]">
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
            name="file"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setImage(e.target.files[0]);
                    }}
                    placeholder="productImage"
                    type="file"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          Create Product
        </Button>
      </form>
    </Form>
  );
};

export default CreateProduct;
