import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Dashboard } from 'pages'

test('renders Dashboard component', () => {
  const { getByText } = render(<Dashboard />)
  const dashboardText = getByText('Dashboard')
  expect(dashboardText).toBeInTheDocument()
})
