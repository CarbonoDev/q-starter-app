export const build = (options) => {
  const DEFAULTS = {
    hydrateRelationships: false
  }
  const CONFIG = { ...DEFAULTS, ...options }
  const getters = {}
  getters.all = (state, getters, rootState, rootGetters) => {
    return state.collection.map((itemId) => {
      return getters.hydrateRelationships(state._collection[itemId])
    })
  }

  getters.find = (state, getters, rootState, rootGetters) => (itemId) => {
    return state._collection[itemId]
  }

  if (CONFIG.hydrateRelationships) {
    getters.hydrateRelationships = (state, getters, rootState, rootGetters) => (item) => {
      const FOREIGN_GETTER = rootGetters[CONFIG.hydrateRelationships.foreignGetter]
      const FOREIGN_KEY = CONFIG.hydrateRelationships.foreignKey
      const FOREIGN_NAME = CONFIG.hydrateRelationships.foreignName
      const FOREIGN_VALUE = CONFIG.hydrateRelationships.foreignValue

      const relatedItem = FOREIGN_GETTER(item[FOREIGN_KEY])
      let mapped = {}
      mapped[FOREIGN_NAME] = relatedItem ? relatedItem[FOREIGN_VALUE] : ''
      return { ...mapped, ...item }
    }
  } else {
    getters.hydrateRelationships = () => (item) => item
  }

  return getters
}
