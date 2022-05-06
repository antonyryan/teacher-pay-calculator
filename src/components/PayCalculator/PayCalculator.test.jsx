import { render, screen, fireEvent } from '@testing-library/react';

import PayCalculator from './PayCalculator'

describe('CalculationForm', () => {
  it('renders only CalculatorForm initially', () => {
    const { getByRole, findByTestId } = render(<PayCalculator />)
    const formEl = getByRole('form')
    const resultsEl = findByTestId('results')
    expect(formEl).toBeTruthy()
    expect(resultsEl).not.toHaveProperty('results')
  })

  it('renders calculation results after `calculate` button is clicked', async () => {
    const { container, findAllByTestId, getByRole, getByLabelText, getByTestId } = render(<PayCalculator />)
    const payRateNameEl = screen.getByLabelText('Pay Rate Name')
    fireEvent.input(payRateNameEl, { target: { value: 'Sample Name' } })
    const payRateEl = getByLabelText('Base Pay Rate per Client')
    fireEvent.input(payRateEl, { target: { value: 30 } })
    const bonusRateEl = getByTestId('bonusRate')
    fireEvent.input(bonusRateEl, { target: { value: 5 } })
    const minClientsEl = getByTestId('minClients')
    fireEvent.input(minClientsEl, { target: { value: 20 } })
    const maxClientsEl = getByTestId('maxClients')
    fireEvent.input(maxClientsEl, { target: { value: 50 } })
    fireEvent.submit(getByRole('button'))
    const resultsEl = await findAllByTestId('results')
    expect(resultsEl).toHaveLength(1)
  })
})
