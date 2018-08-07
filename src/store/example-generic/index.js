import { build as actionsFactory } from '../generic/actionsFactory'
import { build as gettersFactory } from '../generic/gettersFactory'
import { build as mutationsFactory } from '../generic/mutationsFactory'
import { build as stateFactory } from '../generic/stateFactory'

const getters = { ...gettersFactory(), ...{} }
const state = { ...stateFactory(), ...{} }
const mutations = {
  ...mutationsFactory(), ...{}
}
const actions = {
  ...actionsFactory('resourceNamespace', {
    // dbTable: 'users', // DBUndex table to store data localy
  }),
  ...{}
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
