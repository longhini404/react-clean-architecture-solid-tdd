import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ProductRegistration } from 'pages'

const mockCreateProduct = {
  create: jest.fn(),
}

const mockUpdateProduct = {
  update: jest.fn(),
}

const mockReadProducts = {
  read: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderProductRegistrationComponent(id?: number) {
  return render(
    <Router>
      <ChakraProvider>
        <ProductRegistration
          createProduct={mockCreateProduct}
          readProducts={mockReadProducts}
          updateProduct={mockUpdateProduct}
          toast={mockToast}
          id={id}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders ProductRegistration component with fake data', async () => {
  const { getByTestId } = renderProductRegistrationComponent()

  const fakeTitle = faker.lorem.words(3)
  const fakeDescription = faker.lorem.sentence(10)
  const fakePrice = faker.datatype.number(100)
  const fakeDiscountPercentage = faker.datatype.number(50)
  const fakeRating = faker.datatype.number(5)
  const fakeStock = faker.datatype.number(1000)
  const fakeBrand = faker.company.companyName()
  const fakeCategory = faker.commerce.department()

  const titleInput = getByTestId('title-input')
  const descriptionInput = getByTestId('description-input')
  const priceInput = getByTestId('price-input')
  const discountPercentageInput = getByTestId('discountPercentage-input')
  const ratingInput = getByTestId('rating-input')
  const stockInput = getByTestId('stock-input')
  const brandInput = getByTestId('brand-input')
  const categoryInput = getByTestId('category-input')
  const submitButton = getByTestId('submit-button')

  fireEvent.change(titleInput, { target: { value: fakeTitle } })
  fireEvent.change(descriptionInput, { target: { value: fakeDescription } })
  fireEvent.change(priceInput, { target: { value: fakePrice } })
  fireEvent.change(discountPercentageInput, {
    target: { value: fakeDiscountPercentage },
  })
  fireEvent.change(ratingInput, { target: { value: fakeRating } })
  fireEvent.change(stockInput, { target: { value: fakeStock } })
  fireEvent.change(brandInput, { target: { value: fakeBrand } })
  fireEvent.change(categoryInput, { target: { value: fakeCategory } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockCreateProduct.create).toHaveBeenCalledWith({
      title: fakeTitle,
      description: fakeDescription,
      price: fakePrice,
      discountPercentage: fakeDiscountPercentage,
      rating: fakeRating,
      stock: fakeStock,
      brand: fakeBrand,
      category: fakeCategory,
    })
  })

  expect(mockToast.success).toHaveBeenCalled()
})

test('renders ProductRegistration component with fake data for update', async () => {
  const productId = 1

  const mockProductForUpdate = {
    title: 'Updated Product Title',
    description: 'Updated product description.',
    price: '99.99',
    discountPercentage: '15',
    rating: '4.8',
    stock: '50',
    brand: 'Updated Brand',
    category: 'Updated Category',
  }

  mockReadProducts.read.mockResolvedValue(mockProductForUpdate)

  const { getByTestId } = renderProductRegistrationComponent(productId)

  const titleInput = getByTestId('title-input')
  const descriptionInput = getByTestId('description-input')
  const priceInput = getByTestId('price-input')
  const discountPercentageInput = getByTestId('discountPercentage-input')
  const ratingInput = getByTestId('rating-input')
  const stockInput = getByTestId('stock-input')
  const brandInput = getByTestId('brand-input')
  const categoryInput = getByTestId('category-input')
  const submitButton = getByTestId('submit-button')

  await waitFor(() => {
    expect(titleInput).toHaveValue(mockProductForUpdate.title)
    expect(descriptionInput).toHaveValue(mockProductForUpdate.description)
    expect(priceInput).toHaveValue(mockProductForUpdate.price)
    expect(discountPercentageInput).toHaveValue(
      mockProductForUpdate.discountPercentage
    )
    expect(ratingInput).toHaveValue(mockProductForUpdate.rating)
    expect(stockInput).toHaveValue(mockProductForUpdate.stock)
    expect(brandInput).toHaveValue(mockProductForUpdate.brand)
    expect(categoryInput).toHaveValue(mockProductForUpdate.category)
  })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockUpdateProduct.update).toHaveBeenCalledTimes(1)
  })

  expect(mockToast.success).toHaveBeenCalled()
})
