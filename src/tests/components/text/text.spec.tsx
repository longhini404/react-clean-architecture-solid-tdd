import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Text } from 'components/text'

test('renders Text component', () => {
  const { getByText } = render(<Text>Sample Text</Text>)
  const textElement = getByText('Sample Text')
  expect(textElement).toBeInTheDocument()
})
