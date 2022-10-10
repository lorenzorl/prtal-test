
export default {
  state: () => ({
    isOpen: false,
    paymentData: null
  }),
  mutations: {
    open(state) {
      state.isOpen = true
    },
    close(state) {
      state.isOpen = false
    },
    setPaymentData(state, payment) {
      state.paymentData = payment
    }
  },
  actions: {
    open({ commit }, payment) {
      commit('setPaymentData', payment)
      commit('open')
    },
    close({ commit }) {
      commit('close')
      commit('setPaymentData', null)
    },
  }
}