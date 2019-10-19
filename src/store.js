import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rules: {
      '111': 0,'110': 1,'101': 0,'100': 1,'011': 1,'010': 0,'001': 1,'000': 0
    },
    systemRunValue: false,

  },
  mutations: {
    TOGGLE_SYSTEM_RUN_STATE: (state) => {
      state.systemRunValue = !state.systemRunValue
    },
    TOGGLE_RULE_BUTTON: (state, {id}) => {
      state.rules[id] = state.rules[id] === 0 ? 1 : 0
    }
  },
  actions: {
    toggleSystemRunState: (context) => {
      context.commit("TOGGLE_SYSTEM_RUN_STATE")
    },
    toggleRuleButton: (context, payload) => {
      context.commit("TOGGLE_RULE_BUTTON", payload)
    }
  }
})
