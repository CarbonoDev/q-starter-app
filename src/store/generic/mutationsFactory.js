export const build = (NAMESPACE, options) => {
  const mutations = {}
  mutations.add = (state, payload) => {
    if (state.collection.findIndex(itemId => itemId === payload.id) === -1) {
      state._collection[payload.id] = payload
      state.collection.push(payload.id)
    }
  }
  mutations.update = (state, payload) => {
    state._collection = { ...state._collection, [payload.id]: payload }
  }
  mutations.delete = (state, payload) => {
    delete state._collection[payload]
    let index = state.collection.indexOf(payload)
    state.collection.splice(index, 1)
  }
  return mutations
}
