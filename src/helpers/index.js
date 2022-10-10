export const round = (numb) => {
  return Math.round((numb) * 10) / 10;
}

export const getNearestPaymentIndex = (payments, paymentPosition) => {
  if (paymentPosition === 0) return 1

  if (payments[paymentPosition - 1].status === 'paid') return paymentPosition + 1

  return paymentPosition - 1
}

export const getPaymentIndexById = (payments, id) => {
  return payments.findIndex(payment => payment.id === id)
}