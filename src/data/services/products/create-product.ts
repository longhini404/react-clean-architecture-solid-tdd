import { api } from 'core/services'
import { CreateProduct } from 'domain/interfaces/products'

export class CreateProductService implements CreateProduct {
  async create(product: CreateProduct.Params): Promise<void> {
    await api.post(`/products/add`, product)
  }
}
