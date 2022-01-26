import { createStore } from 'vuex'

export const store = createStore({
  state: {
    startTime: 0,
    endTime: 0
  },
  mutations: {
    setStartTime(state, payload) {
      state.startTime = payload
    },
    setEndTime(state, payload) {
      state.endTime = payload
    }
  },
  actions: {
    setStartTime({ commit }, payload) {
      commit('setStartTime', payload)
    },
    setEndTime({ commit }, payload) {
      commit('setEndTime', payload)
    }
  }
})
