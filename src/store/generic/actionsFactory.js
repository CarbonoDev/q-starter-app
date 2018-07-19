import JSON_ from 'json_'
import { DB } from 'src/app/database/index'

const toSnakeCase = (obj) => {
  return JSON.parse(JSON_.stringify(obj))
}

const toCamelCase = (obj) => {
  return JSON_.parse(JSON.stringify(obj))
}

export const build = (NAMESPACE, options) => {
  const DEFAULT = {
    uniqueKey: 'id',
    dbTable: NAMESPACE
  }
  const CONFIG = { ...DEFAULT,
    ...options
  }
  const COLLECTION = DB[CONFIG['dbTable']]
  const MUTATIONS = {
    ADD: NAMESPACE + '/add',
    UPDATE: NAMESPACE + '/update',
    DELETE: NAMESPACE + '/delete'
  }

  const actions = {}

  actions.store = ({
    commit,
    state
  }, payload) => {
    return new Promise((resolve, reject) => {
      let item = { ...{
        id: null
      },
      ...payload
      }
      if (!item.id) {
        delete item.id
        COLLECTION.add(toSnakeCase(item)).then((itemId) => {
          item.id = itemId
          commit(MUTATIONS.ADD, item, {
            root: true
          })
          resolve(item)
        }, reject)
      } else {
        COLLECTION.put(toSnakeCase(item)).then((itemId) => {
          commit(MUTATIONS.UPDATE, item, {
            root: true
          })
          resolve(item)
        }, reject)
      }
    })
  }

  actions.all = (store) => {
    return new Promise((resolve, reject) => {
      COLLECTION.toArray().then((collection) => {
        collection.map((item) => {
          actions.get(store, item.id).then((storedItemId) => {
            store.commit(MUTATIONS.UPDATE, toCamelCase(item), {
              root: true
            })
          }, (err) => {
            if (err) {
              console.log('Error getting ' + NAMESPACE)
              console.log(err)
            }
            store.commit(MUTATIONS.ADD, toCamelCase(item), {
              root: true
            })
          })
        })
        resolve(collection)
      })
    })
  }

  actions.get = ({
    commit,
    state
  }, itemId) => {
    return new Promise((resolve, reject) => {
      const item = state._collection[itemId]
      if (item) {
        return resolve(item)
      }

      COLLECTION.where({
        id: itemId
      }).first().then((item) => {
        if (item) {
          commit(MUTATIONS.ADD, toCamelCase(item), {
            root: true
          })
          resolve(toCamelCase(item))
        } else {
          reject(item)
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.delete = ({
    commit,
    state
  }, itemId) => {
    return new Promise((resolve, reject) => {
      COLLECTION.where({
        id: itemId
      }).delete().then(() => {
        commit(MUTATIONS.DELETE, itemId, {
          root: true
        })
        resolve(itemId)
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.getByKey = ({
    commit,
    state,
    getters
  }, {
    key,
    value
  }) => {
    return new Promise((resolve, reject) => {
      const item = getters.all.find(item => item[key] === value)
      if (item) {
        return resolve(item)
      }

      COLLECTION.where(toSnakeCase({
        [key]: value
      })).first().then((item) => {
        if (item) {
          commit(MUTATIONS.ADD, toCamelCase(item), {
            root: true
          })
          resolve(toCamelCase(item))
        } else {
          reject(item)
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.getAllByKey = ({
    commit,
    state,
    getters
  }, {
    key,
    value
  }) => {
    return new Promise((resolve, reject) => {
      const items = getters.all.filter(item => item[key] === value)
      if (items && items.length) {
        return resolve(items)
      }
      COLLECTION.where(toSnakeCase({
        [key]: value
      })).toArray().then((items) => {
        if (items) {
          resolve(items.map(item => {
            item = getters.hydrateRelationshipAttributes(toCamelCase(item))
            commit(MUTATIONS.ADD, item, {
              root: true
            })
            debugger
            return item
          }))
        } else {
          reject(items)
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.unique = (store, payload) => {
    let self = actions
    return new Promise((resolve, reject) => {
      self.getByKey(store, {
        key: CONFIG.uniqueKey,
        value: payload
      }).then(storedItem => {
        reject(storedItem)
      }, error => {
        if (error) {
          console.log(error)
          resolve(true)
        }
      })
    })
  }
  return actions
}
