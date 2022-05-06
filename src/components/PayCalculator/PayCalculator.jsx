import { useCallback, useState } from 'react'

import CalculatorForm from "../CalculatorForm"
import CalculationResults from "../CalculationResults"
import { getTotalPay } from "../../utils/helpers"

const PayCalculator = () => {
	const [totalPay, setTotalPay] = useState(0)
	const [resultsVisible, setResultsVisible] = useState(false)
	const [clientsNumber, setClientsNumber] = useState(0)

	const handleSubmit = useCallback((data) => {
		const {baseRate, bonusRate, minClients, maxClients} = data
    const numClients = Math.floor(Math.random() * 101)
		setClientsNumber(numClients)
    const totalPay = getTotalPay(numClients, baseRate, bonusRate, minClients, maxClients)
    setTotalPay(totalPay)
		setResultsVisible(true)
	}, [setTotalPay, setResultsVisible, setClientsNumber])
	return (
		<>
			<CalculatorForm onSubmit={handleSubmit} />
			{resultsVisible && (<CalculationResults clientsNumber={clientsNumber} totalPay={totalPay} />)}
		</>
	)
}

export default PayCalculator
