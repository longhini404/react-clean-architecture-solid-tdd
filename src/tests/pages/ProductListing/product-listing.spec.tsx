import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ProductListing } from 'pages'

const mockReadProducts = {
  read: jest.fn(),
}

const mockDeleteProduct = {
  delete: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderProductListingComponent() {
  return render(
    <Router>
      <ChakraProvider>
        <ProductListing
          readProducts={mockReadProducts}
          deleteProduct={mockDeleteProduct}
          toast={mockToast}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders ProductListing component with products', async () => {
  mockReadProducts.read.mockResolvedValue({
    products: [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Description 2',
      },
    ],
  })

  renderProductListingComponent()

  await waitFor(() => {
    const product1Title = screen.getByText('Product 1')
    const product2Title = screen.getByText('Product 2')

    expect(product1Title).toBeInTheDocument()
    expect(product2Title).toBeInTheDocument()
  })
})

test('renders ProductListing component with no products', async () => {
  mockReadProducts.read.mockResolvedValue({ products: [] })

  renderProductListingComponent()

  await waitFor(() => {
    const noProductsMessage = screen.getByText('Nenhum produto cadastrado.')
    expect(noProductsMessage).toBeInTheDocument()
  })
})

test('deletes a product', async () => {
  mockReadProducts.read.mockResolvedValue({
    products: [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
      },
    ],
  })

  mockDeleteProduct.delete.mockResolvedValue(undefined)

  renderProductListingComponent()

  await waitFor(() => {
    const deleteButton = screen.getByText('Deletar')
    expect(deleteButton).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Deletar'))

  await waitFor(() => {
    expect(mockDeleteProduct.delete).toHaveBeenCalledWith(1)
  })

  await waitFor(() => {
    expect(mockToast.success).toHaveBeenCalledWith({
      message: 'Produto deletado com sucesso',
      duration: 5000,
    })
  })
})
