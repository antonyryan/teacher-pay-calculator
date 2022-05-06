import PropTypes from 'prop-types'

const CalculationResults = ({ clientsNumber, totalPay }) => (
  <div data-testid='results'>
    <h4 className="mt-5">
      Number of clients: {clientsNumber}
    </h4>
    <h4>
      Total Pay: ${totalPay || 0}
    </h4>
  </div>
)

CalculationResults.propTypes = {
  clientsNumber: PropTypes.number.isRequired,
  totalPay: PropTypes.number.isRequired,
}

export default CalculationResults
