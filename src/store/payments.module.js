import { round, getNearestPaymentIndex, getPaymentIndexById } from '@/helpers'
import api from '@/helpers/api'

let counterId = 0

export default {
  state: () => ({
    payments: [],
    total: 0,
    startingTotal: 0,
    currency: null
  }),
  mutations: {
    addPayment(state, payload) {
      const { payment, position } = payload
      state.payments.splice(position, 0, payment)
    },
    editPayment(state, payload) {
      const { payment, position } = payload
      state.payments.splice(position, 1, payment)
    },
    setCurrency(state, currency) {
      state.currency = currency;
    },
    setTotal(state, total) {
      state.total = total;
    },
    setStartingTotal(state, startingTotal) {
      state.startingTotal = startingTotal;
    },
    setPaymentField(state, payload) {
      const { id, field, value } = payload
      const paymentIndex = getPaymentIndexById(state.payments, id)

      if (paymentIndex == null) return

      state.payments[paymentIndex][field] = value
    },
    setMaxValues(state) {
      state.payments.forEach((payment, i) => {
        const nearestPayment = state.payments[getNearestPaymentIndex(state.payments, i)]
        payment.max = payment.amount + nearestPayment.amount
      });
    },
    setPayments(state, payments) {
      state.payments = payments
    },
    removePayment(state, id) {
      const paymentIndex = getPaymentIndexById(state.payments, id)

      if (paymentIndex == null) return

      state.payments.splice(paymentIndex, 1)
    }
  },
  actions: {
    init({ commit, state }, payload) {
      commit('setCurrency', payload.currency)
      commit('setTotal', payload.total)
      commit('setStartingTotal', payload.total)
      
      const payment = {
        name: 'Anticipo',
        percent: 100,
        amount: payload.total,
        max: state.total,
        creationDate: new Date(),
        paymentDate: null,
        status: 'pending',
        id: counterId
      }

      counterId++
      // @todo: api request post para agregar un nuevo pago
      const payments = api.addPayment(state.payments, payment)
      commit('setPayments', payments)
    },
    addPayment({ commit, state }, payload) {

      const previousPayment = state.payments[payload.previousPaymentIndex]

      const payment = {
        name: 'Nombre',
        amount: round(previousPayment.amount / 2),
        percent: round((previousPayment.amount / 2) * 100 / state.total),
        creationDate: new Date(),
        max: 0,
        status: 'pending',
        paymentDate: null,
        id: counterId
      }

      counterId++

      const previousPaymentEdited = {...previousPayment}
      previousPaymentEdited.amount = payment.amount
      previousPaymentEdited.percent = payment.percent

      commit('editPayment', {
        payment: previousPaymentEdited,
        position: payload.previousPaymentIndex
      })
      
      commit('addPayment', {
        payment,
        position: payload.position
      })
      
      commit('setMaxValues')

    },
    editPayment({ commit, state }, payload) {

      const { id, difference } = payload
      
      const currentPaymentIndex = getPaymentIndexById(state.payments, id)
      
      const nearestPaymentIndex = getNearestPaymentIndex(state.payments, currentPaymentIndex)

      const nearestPayment = {...state.payments[nearestPaymentIndex]}
      const currentPayment = {...state.payments[currentPaymentIndex]}

      // Actualizar currentPayment
      currentPayment.amount = round(currentPayment.amount + difference.amount)
      currentPayment.percent = round(currentPayment.percent + difference.percent)
      
      // Actualizar nearestPayment
      nearestPayment.amount = round(nearestPayment.amount - difference.amount)
      nearestPayment.percent = round(nearestPayment.percent - difference.percent)
            
      if (nearestPayment.amount <= 0 || nearestPayment.percent <= 0) return

      commit('editPayment', {
        payment: currentPayment,
        position: currentPaymentIndex
      })
      
      commit('editPayment', {
        payment: nearestPayment,
        position: nearestPaymentIndex
      })
            
      commit('setMaxValues')
    },
    editPaymentName({ commit }, payload) {
      const { id, name } = payload
      commit('setPaymentField', {
        id,
        field: 'name',
        value: name
      })
    },
    editPaymentCreationDate({ commit }, payload) {
      const { id, date } = payload
      commit('setPaymentField', {
        id,
        field: 'creationDate',
        value: date
      })
    },
    editPaymentDate({ commit }, payload) {
      const { id, date } = payload
      commit('setPaymentField', {
        id,
        field: 'paymentDate',
        value: date
      })
    },
    editPaymentStatus({ commit }, payload) {
      const { id, status } = payload
      commit('setPaymentField', {
        id,
        field: 'status',
        value: status
      })
    },
    updateAllPayments({ commit, state }) {
      // @todo: api request post para actualizar todos los pagos
      const payments = api.updateAllPayments(state.payments)
      commit('setPayments', payments)
    },
    removePayment({ commit, dispatch }, id) {
      commit('removePayment', id)
      dispatch('updateAllPayments')
    },
    calculateTotal({ commit, state }) {
      const installmentsPaid = state.payments.filter(payment => payment.status === 'paid')
      
      let totalPaid = 0
      installmentsPaid.forEach(payment => totalPaid += payment.amount)

      commit('setTotal', round(state.startingTotal - totalPaid))
    },
    calculatePercents({ commit, state }) {
      const pendingPayments = state.payments.filter(payment => payment.status === 'pending');
      const total = state.total

      pendingPayments.forEach(payment => {
        const newPercent = round(payment.amount * 100 / total)
        commit('setPaymentField', {
          id: payment.id,
          field: 'percent',
          value: newPercent
        })
      })
    }
  }
}