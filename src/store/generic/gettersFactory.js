export const build = (options) => {
  const DEFAULTS = {
    hydrateRelationships: false
  }
  const CONFIG = { ...DEFAULTS, ...options }
  const getters = {}

  getters.hydrateRelationshipAttributes = () => (item) => item
  getters.hydrateRelationships = () => (item) => item

  getters.all = (state, getters, rootState, rootGetters) => {
    return state.collection.map((itemId) => {
      return getters.hydrateRelationshipAttributes(state._collection[itemId])
    }).map(item => {
      return getters.hydrateRelationships(item)
    })
  }

  getters.find = (state, getters, rootState, rootGetters) => (itemId) => {
    return state._collection[itemId]
  }

  if (Array.isArray(CONFIG.hydrateRelationshipAttributes)) {
    getters.hydrateRelationshipAttributes = (state, getters, rootState, rootGetters) => (item) => {
      let mapped = CONFIG.hydrateRelationshipAttributes.reduce((mapped, relationship) => {
        const FOREIGN_GETTER = rootGetters[relationship.foreignGetter]
        const FOREIGN_KEY = relationship.foreignKey
        const FOREIGN_NAME = relationship.foreignName
        const FOREIGN_VALUE = relationship.foreignValue

        const relatedItem = FOREIGN_GETTER(item[FOREIGN_KEY])
        mapped[FOREIGN_NAME] = relatedItem ? relatedItem[FOREIGN_VALUE] : ''
        return mapped
      }, {})
      return { ...mapped, ...item }
    }
  } else if (CONFIG.hydrateRelationshipAttributes) {
    throw new Error('Invalid hydration config, must be an array')
  }

  if (Array.isArray(CONFIG.relationships)) {
    getters.hydrateRelationships = (state, getters, rootState, rootGetters) => (item) => {
      return CONFIG.relationships.reduce((mapped, relationship) => {
        const FOREIGN_GETTER = rootGetters[relationship.foreignGetter]
        const FOREIGN_KEY = relationship.foreignKey
        const FOREIGN_NAME = relationship.name

        const relatedItem = FOREIGN_GETTER(item[FOREIGN_KEY])
        mapped[FOREIGN_NAME] = relatedItem || null
        return mapped
      }, item)
    }
  } else if (CONFIG.relationships) {
    throw new Error('Invalid relationships config, must be an array')
  }

  return getters
}
