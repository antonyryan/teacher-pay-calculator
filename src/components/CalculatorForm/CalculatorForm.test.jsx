import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'

import CalculatorForm from './CalculatorForm'

const noop = () => {}

describe('CalculatorForm', () => {
  it('returns values inputed as an object when clicks calculate button', async () => {
    const onSubmit = jest.fn()
    const data = {
      rateName: 'Sample Name',
      baseRate: 30,
      bonusRate: 5,
      minClients: 20,
      maxClients: 50
    }
    const { container, getByRole, getByLabelText, getByTestId } = render(<CalculatorForm onSubmit={onSubmit} />)
    const payRateNameEl = screen.getByLabelText('Pay Rate Name')
    fireEvent.input(payRateNameEl, { target: { value: data.rateName } })
    const payRateEl = getByLabelText('Base Pay Rate per Client')
    fireEvent.input(payRateEl, { target: { value: data.baseRate } })
    const bonusRateEl = getByTestId('bonusRate')
    fireEvent.input(bonusRateEl, { target: { value: data.bonusRate } })
    const minClientsEl = getByTestId('minClients')
    fireEvent.input(minClientsEl, { target: { value: data.minClients } })
    const maxClientsEl = getByTestId('maxClients')
    fireEvent.input(maxClientsEl, { target: { value: data.maxClients } })
    fireEvent.submit(getByRole('button'))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(data))
  })

  describe('payRateName field validations', () => {
    it('renders error message when field value is empty', async () => {
      const { getByRole, getByText } = render(<CalculatorForm onSubmit={noop} />)
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('This field must contain at least 3 characters')).toBeInTheDocument())
    })

    it('renders error message when field value contains less than 3 characters', async () => {
      const { getByRole, getByText } = render(<CalculatorForm onSubmit={noop} />)
      const payRateNameEl = screen.getByLabelText('Pay Rate Name')
      fireEvent.input(payRateNameEl, { target: { value: 'AB' } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('This field must contain at least 3 characters')).toBeInTheDocument())
    })

    it('does not render error message when field value contains at least 3 characters', async () => {
      const { getByRole, getByText, queryByText } = render(<CalculatorForm onSubmit={noop} />)
      const payRateNameEl = screen.getByLabelText('Pay Rate Name')
      fireEvent.input(payRateNameEl, { target: { value: 'ABC' } })
      fireEvent.submit(getByRole('button'))
      await act(async () => {
        await waitFor(() => expect(queryByText('This field must contain at least 3 characters')).toBeNull())
      })
    })
  })

  describe('basePayRate field validations', () => {
    it('renders error message when field value is empty', async () => {
      const { getByRole, getByText } = render(<CalculatorForm onSubmit={noop} />)
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('This field must be a positive number')).toBeInTheDocument())
    })

    it('renders error message when field value contains less than 3 characters', async () => {
      const { getByRole, getByText } = render(<CalculatorForm onSubmit={noop} />)
      const baseRateEl = screen.getByLabelText('Base Pay Rate per Client')
      fireEvent.input(baseRateEl, { target: { value: '0' } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('This field must be a positive number')).toBeInTheDocument())
    })

    it('does not render error message when field value contains at least 3 characters', async () => {
      const { getByRole, getByText, queryByText } = render(<CalculatorForm onSubmit={noop} />)
      const baseRateEl = screen.getByLabelText('Base Pay Rate per Client')
      fireEvent.input(baseRateEl, { target: { value: '40' } })
      fireEvent.submit(getByRole('button'))
      await act(async () => {
        await waitFor(() => expect(queryByText('This field must be positive number')).toBeNull())
      })
    })
  })

  describe('bonusRate field validations', () => {
    it('renders error message when field value is filled with a negative number', async () => {
      const { getByRole, getByText, getByTestId } = render(<CalculatorForm onSubmit={noop} />)
      const bonusRateEl = getByTestId('bonusRate')
      fireEvent.input(bonusRateEl, { target: { value: -5 } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('This field must be a positive number')).toBeInTheDocument())
    })

    it('does not render error message when field is empty', async () => {
      const { getByRole, queryByText } = render(<CalculatorForm onSubmit={noop} />)
      fireEvent.submit(getByRole('button'))
      await act(async () => {
        await waitFor(() => expect(queryByText('This field must be a positive number')).toBeNull())
      })
    })
  })

  describe('minClients field validations', () => {
    it('renders error message when field value is filled with a negative number', async () => {
      const { getByRole, getByText, getByTestId } = render(<CalculatorForm onSubmit={noop} />)
      const minClientsEl = getByTestId('minClients')
      fireEvent.input(minClientsEl, { target: { value: -5 } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('Min clients must be a positive number')).toBeInTheDocument())
    })

    it('does not render error message when field is empty', async () => {
      const { getByRole, queryByText } = render(<CalculatorForm onSubmit={noop} />)
      fireEvent.submit(getByRole('button'))
      await act(async () => {
        await waitFor(() => expect(queryByText('Min clients must be a positive number')).toBeNull())
      })
    })
  })

  describe('maxClients field validations', () => {
    it('renders error message when field value is filled with a negative number', async () => {
      const { getByRole, getByText, getByTestId } = render(<CalculatorForm onSubmit={noop} />)
      const maxClientsEl = getByTestId('maxClients')
      fireEvent.input(maxClientsEl, { target: { value: -5 } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('Max clients must be a positive number')).toBeInTheDocument())
    })

    it('renders error message when field value is smaller than minimum clients number', async () => {
      const { getByRole, getByText, getByTestId } = render(<CalculatorForm onSubmit={noop} />)
      const maxClientsEl = getByTestId('maxClients')
      fireEvent.input(maxClientsEl, { target: { value: 20 } })
      const minClientsEl = getByTestId('minClients')
      fireEvent.input(minClientsEl, { target: { value: 30 } })
      fireEvent.submit(getByRole('button'))
      await waitFor(() => expect(getByText('Max clients must be greater than min clients')).toBeInTheDocument())
    })

    it('does not render error message when field is empty', async () => {
      const { getByRole, queryByText } = render(<CalculatorForm onSubmit={noop} />)
      fireEvent.submit(getByRole('button'))
      await act(async () => {
        await waitFor(() => expect(queryByText('Max clients must be a positive number')).toBeNull())
      })
    })
  })
})
