import React from 'react'
import { ProductListing } from 'pages'
import { ToastService } from 'data/services/toast'
import {
  DeleteProductService,
  ReadProductsService,
} from 'data/services/products'

export const MakeProductListingFactory = () => {
  const deleteProductService = new DeleteProductService()
  const readProductsService = new ReadProductsService()
  const toastService = new ToastService()
  return (
    <ProductListing
      deleteProduct={deleteProductService}
      readProducts={readProductsService}
      toast={toastService}
    />
  )
}
