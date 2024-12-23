export type ProductDto = {
  id: number;
  photoProduct: string;
  price: number;
  productName: string;
  stock: number;
  discount: number;
  priceAfterDiscount: number;
  description: string;
};

export type TransactionResponseDto = {
  redirect_url: string;
  token: string;
};

export type TransactionDto = {
  productId: number;
};
