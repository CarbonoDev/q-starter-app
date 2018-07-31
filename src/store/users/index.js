import { build as actionsFactory } from '../generic/actionsFactory'
import { build as gettersFactory } from '../generic/gettersFactory'
import { build as mutationsFactory } from '../generic/mutationsFactory'
import { build as stateFactory } from '../generic/stateFactory'
import * as userActions from './actions'
import * as userGetters from './getters'
import * as userMutations from './mutations'
import userState from './state'

const getters = { ...gettersFactory(), ...userGetters }
const state = { ...stateFactory(), ...userState }
const mutations = {
  ...mutationsFactory(), ...userMutations
}
const actions = {
  ...actionsFactory('users', {
    dbTable: 'users',
    uniqueKey: 'email'
  }),
  ...userActions
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
