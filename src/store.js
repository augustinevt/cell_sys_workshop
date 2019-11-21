import Vue from 'vue'
import Vuex from 'vuex'

import System, { Agent } from 'basic-system'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clearCanvas: () => {},
    scale: 8,
    columns: 88,
    rules: {
      111: 0,
      110: 1,
      101: 0,
      100: 0,
      '011': 1,
      '010': 0,
      '001': 0,
      '000': 1,
    },
    systemRunValue: false,
    system: null,
  },
  mutations: {
    TOGGLE_SYSTEM_RUN_STATE: (state) => {
      state.systemRunValue = !state.systemRunValue
    },
    TOGGLE_RULE_BUTTON: (state, { id }) => {
      state.rules[id] = state.rules[id] === 0 ? 1 : 0
    },
    SET_SYSTEM: (state, { displayAgent, clearCanvas }) => {
      const sys = new System(state.columns, state.columns)
      const rules = (agent, grid, neighborhood) => {
        const { nw, n, ne } = neighborhood
        const result = `${nw.type}${n.type}${ne.type}`
        agent.type = state.rules[result]
      }

      sys.initGrid()
      sys.setInGrid(Math.floor(state.columns/2), 0, new Agent(1, Math.floor(state.columns/2), 0))
      sys.setAgentDisplay(displayAgent)
      sys.setAgentRules(rules)
      sys.display()
      state.system = sys
      state.clearCanvas = clearCanvas
    },
    RESET_SYSTEM: (state) => {
      state.system.initGrid()
      state.system.setInGrid(
        Math.floor(state.columns / 2),
        0,
        new Agent(1, Math.floor(state.columns / 2), 0),
      )
      state.clearCanvas()
      state.system.display()
    },
  },
  actions: {
    toggleSystemRunState: (context) => {
      context.commit('TOGGLE_SYSTEM_RUN_STATE')
    },
    toggleRuleButton: (context, payload) => {
      context.commit("TOGGLE_RULE_BUTTON", payload)
    },
    setSystem: ((context, payload) => {
      context.commit("SET_SYSTEM", payload)
    }),
    resetSystem: (context) => {
      context.commit("RESET_SYSTEM")
    }
  }
})
