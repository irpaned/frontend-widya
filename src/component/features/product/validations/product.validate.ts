import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1).max(35),
  photoProduct: z.any(),
  price: z.string().min(1),
});
