import { Products, Product } from 'domain/models'

export interface ReadProducts {
  read: (id?: number) => Promise<ReadProducts.Result>
}

export namespace ReadProducts {
  export type Result = Products | Product
}
