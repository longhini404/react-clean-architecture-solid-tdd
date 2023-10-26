import { Product } from 'domain/models'

export interface CreateProduct {
  create: (params: CreateProduct.Params) => Promise<void>
}

export namespace CreateProduct {
  export type Params = Product
}
