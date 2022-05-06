export const getTotalPay = (numClients, baseRate, bonusRate, minClients, maxClients) => {
  let finalClients = numClients
  if (maxClients) {
    finalClients = Math.min(finalClients, maxClients)
  }
  if (minClients) {
    finalClients = Math.max(finalClients, minClients)
  }
  return  numClients * baseRate + bonusRate * (finalClients - (minClients || 0))
}
