import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1).max(35),
  photoProduct: z.any(),
  price: z.string().min(1),
});

export const createTransactionSchema = z.object({
  productId: z
    .number()
    .min(1, { message: "Product ID harus lebih besar dari 0" }),
  userId: z.number().min(1, { message: "User ID harus lebih besar dari 0" }),
});
