import { api } from 'core/services'
import { UpdateProduct } from 'domain/interfaces/products'

export class UpdateProductService implements UpdateProduct {
  async update(id: number, product: UpdateProduct.Params): Promise<void> {
    await api.post(`/product/update/${id}`, product)
  }
}
