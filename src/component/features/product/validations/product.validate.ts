import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1).max(80),
  photoProduct: z.any(),
  price: z.string().min(1),
  discount: z.string().min(0).max(100),
  description: z.string().min(1).max(300),
  stock: z.string().min(1),
});
