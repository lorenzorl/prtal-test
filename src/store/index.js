import Vue from 'vue'
import Vuex from 'vuex'
import payments from './payments.module.js'
import modal from './modal.module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    algo: 0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    prueba({commit}){
      commit('setalgo', 9)
    }
  },
  modules: {
    payments,
    modal
  }
})
