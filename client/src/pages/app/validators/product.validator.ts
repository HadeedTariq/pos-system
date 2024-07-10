import { z } from "zod";

export const productValidator = z.object({
  name: z.string().min(10, { message: "Name is required" }),
  price: z.preprocess((val) => parseFloat(val as string), z.number()),
  details: z.string().min(10, { message: "Details are required" }),
  extraImages: z.string().array(),
  stock: z.preprocess((val) => parseFloat(val as string), z.number()),
  category: z.string(),
  used: z.string(),
});

export type CreateProductSchema = z.infer<typeof productValidator>;
