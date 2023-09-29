import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Button } from 'components/button'

test('renders Button component', () => {
  const { getByText } = render(<Button>Click Me</Button>)
  const buttonElement = getByText('Click Me')
  expect(buttonElement).toBeInTheDocument()
})
