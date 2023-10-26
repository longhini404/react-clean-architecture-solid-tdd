export interface DeleteProduct {
  delete: (productId: number) => Promise<void>
}
