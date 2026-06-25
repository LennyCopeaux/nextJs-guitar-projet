export type CartSummary = {
  totalQuantity: number;
  totalPrice: number;
};

export const EMPTY_CART_SUMMARY: CartSummary = {
  totalQuantity: 0,
  totalPrice: 0,
};
