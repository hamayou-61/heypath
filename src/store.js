import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    resultPath: {
      windowsPath: '',
      macPath: ''
    },
    inputStatus: {
      inputed: false,
      error: false,
    },
  },

  getters: {
    getResultPath(state) {
      return state.resultPath
    },
    getInputStatus(state) {
      return state.inputStatus
    },
  },

  mutations: {
    mutateResultPath(state,payload){
      state.resultPath = payload
    },
    mutateInputStatus(state,payload){
      state.inputStatus = payload
    },
  },

  actions: {
  }
})

export default store