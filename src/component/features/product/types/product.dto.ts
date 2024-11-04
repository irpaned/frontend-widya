// import { z } from "zod";
// import { createTransactionSchema } from "../validations/product.validate";

export type ProductDto = {
  id: number;
  productName: string;
  photoProduct: string;
  price: string;
};

export type TransactionResponseDto = {
  redirect_url: string;
  token: string;
};

// export type TransactionDto = z.infer<typeof createTransactionSchema>;

export type TransactionDto = {
  productId: number;
  // userId: number;
};
