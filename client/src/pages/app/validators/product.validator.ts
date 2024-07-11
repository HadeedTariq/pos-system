import { z } from "zod";

export const productValidator = z.object({
  name: z.string().min(10, { message: "Name must be 10 characters long" }),
  price: z.preprocess((val) => parseFloat(val as string), z.number()),
  details: z
    .string()
    .min(30, { message: "Details must be 30 characters long" }),
  stock: z.preprocess((val) => parseFloat(val as string), z.number()),
  category: z.string(),
  used: z.string(),
});

export type CreateProductSchema = z.infer<typeof productValidator>;
