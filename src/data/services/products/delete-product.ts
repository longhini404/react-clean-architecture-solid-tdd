import { api } from 'core/services'
import { DeleteProduct } from 'domain/interfaces/products'

export class DeleteProductService implements DeleteProduct {
  async delete(productId: number): Promise<void> {
    await api.delete(`/product/delete/${productId}`)
  }
}
