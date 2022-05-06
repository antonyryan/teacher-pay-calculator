import { render } from '@testing-library/react'

import CalculationResults from './CalculationResults'

describe('CalculationResults', () => {
  it('renders correctly', () => {
    const { getByText, findByTestId } = render(<CalculationResults clientsNumber={30} totalPay={1570} />)
    const resultsEl = findByTestId('results')
    expect(resultsEl).toBeTruthy()
    expect(getByText('Number of clients: 30')).toBeInTheDocument()
    expect(getByText('Total Pay: $1570')).toBeInTheDocument()
  })
})
