import { build as stateFactory } from '../generic/stateFactory'
import { build as gettersFactory } from '../generic/gettersFactory'
import { build as mutationsFactory } from '../generic/mutationsFactory'
import { build as actionsFactory } from '../generic/actionsFactory'

const actions = actionsFactory('example-generic')

const getters = gettersFactory()

const state = stateFactory()

const mutations = mutationsFactory()

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
