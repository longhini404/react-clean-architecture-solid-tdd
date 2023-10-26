import { Product } from 'domain/models'

export interface UpdateProduct {
  update: (id: number, params: UpdateProduct.Params) => Promise<void>
}

export namespace UpdateProduct {
  export type Params = Partial<Product>
}
