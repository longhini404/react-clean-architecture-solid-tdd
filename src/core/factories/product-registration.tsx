import React from 'react'
import { useLocation } from 'react-router-dom'
import { ProductRegistration } from 'pages'
import { ToastService } from 'data/services/toast'
import {
  CreateProductService,
  ReadProductsService,
  UpdateProductService,
} from 'data/services/products'

export const MakeProductRegistrationFactory = () => {
  const createProductService = new CreateProductService()
  const readProductsService = new ReadProductsService()
  const updateProductService = new UpdateProductService()
  const toastService = new ToastService()

  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  return (
    <ProductRegistration
      createProduct={createProductService}
      readProducts={readProductsService}
      updateProduct={updateProductService}
      toast={toastService}
      id={id ? Number(id) : undefined}
    />
  )
}
