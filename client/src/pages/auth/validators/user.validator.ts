import { z } from "zod";

export const registerValidator = z.object({
  name: z.string().min(6, { message: "Must be 6 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long"),
});

export const loginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long"),
});

export type RegisterSchema = z.infer<typeof registerValidator>;
export type LoginSchema = z.infer<typeof loginValidator>;
