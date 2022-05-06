import { getTotalPay } from './helpers'

describe('getTotalPay', () => {
  const randomClientsNumber1 = 15
  const randomClientsNumber2 = 30
  const randomClientsNumber3 = 50
  const basePayRate = 30
  const bonusPayRate = 2
  const minClients = 20
  const maxClients = 40

  it('calculates the total pay when the randomly generated number is smaller than minimum clients number', () => {
    const totalPay = getTotalPay(randomClientsNumber1, basePayRate, bonusPayRate, minClients, maxClients)
    expect(totalPay).toEqual(450)
  })

  it('calculates the total pay when the randomly generated number is between minimum clients number and maximum clients number', () => {
    const totalPay = getTotalPay(randomClientsNumber2, basePayRate, bonusPayRate, minClients, maxClients)
    expect(totalPay).toEqual(920)
  })

  it('calculates the total pay when the randomly generated number is bigger than maximum clients number', () => {
    const totalPay = getTotalPay(randomClientsNumber3, basePayRate, bonusPayRate, minClients, maxClients)
    expect(totalPay).toEqual(1540)
  })

  it('calculates the total pay without min clients number and max clients number', () => {
    const totalPay1 = getTotalPay(randomClientsNumber3, basePayRate, bonusPayRate, null, maxClients)
    expect(totalPay1).toEqual(1580)
    const totalPay2 = getTotalPay(randomClientsNumber3, basePayRate, bonusPayRate, minClients, null)
    expect(totalPay2).toEqual(1560)
    const totalPay3 = getTotalPay(randomClientsNumber3, basePayRate, bonusPayRate, null, null)
    expect(totalPay3).toEqual(1600)
  })
})
