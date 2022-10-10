
let counterIds = 0;

export const addPayment = (payments, payment) => {
  const paymentWithId = {...payment, id: counterIds}
  counterIds++
  payments.push(paymentWithId)
  return payments
}

export const updatePayment = (payments, paymentToUpdate) => {
  const { id } = paymentToUpdate
  const index = payments.find(payment => payment.id === id)
  
  if (!index) return

  payments[index] = paymentToUpdate

  return payments
}

export const updatePaymentField = (payments, id, field, value) => {
  const index = payments.findIndex(payment => payment.id === id)
  if (index == null) return

  payments[index][field] = value
}

export const updateAllPayments = (payments) => {
  return payments
}

export default {
  addPayment,
  updatePayment,
  updatePaymentField,
  updateAllPayments
}

