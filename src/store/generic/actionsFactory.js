import { DB } from 'src/app/database/index'
export const build = (NAMESPACE, options) => {
  const DEFAULT = {
    uniqueKey: 'id',
    dbTable: NAMESPACE
  }
  const CONFIG = { ...DEFAULT, ...options }
  const COLLECTION = DB[CONFIG['dbTable']]
  const MUTATIONS = {
    ADD: NAMESPACE + '/add',
    UPDATE: NAMESPACE + '/update',
    DELETE: NAMESPACE + '/erase'
  }

  const actions = {}

  actions.store = ({ commit, state }, payload) => {
    return new Promise((resolve, reject) => {
      let item = { ...{ id: null }, ...payload }
      if (!item.id) {
        delete item.id
        COLLECTION.add(item).then((itemId) => {
          item.id = itemId
          commit(MUTATIONS.ADD, item, { root: true })
          resolve(item)
        }, reject)
      } else {
        COLLECTION.put(item).then((itemId) => {
          commit(MUTATIONS.UPDATE, item, { root: true })
          resolve(item)
        }, reject)
      }
    })
  }

  actions.all = ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      COLLECTION.toArray().then((item) => {
        item.map((item) => {
          actions.get({ commit, state }, item.id).then((storedItemId) => {
            commit(MUTATIONS.UPDATE, item, { root: true })
          }, (err) => {
            if (err) {
              console.log('Error getting ' + NAMESPACE)
              console.log(err)
            }
            commit(MUTATIONS.ADD, item, { root: true })
          })
        })
        resolve(item)
      })
    })
  }

  actions.get = ({ commit, state }, itemId) => {
    return new Promise((resolve, reject) => {
      const item = state._collection[itemId]
      if (item) {
        return resolve(item)
      }

      COLLECTION.where({ id: itemId }).first().then((item) => {
        if (item) {
          commit(MUTATIONS.ADD, item, { root: true })
          resolve(item)
        } else {
          reject(item)
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.delete = ({ commit, state }, itemId) => {
    return new Promise((resolve, reject) => {
      COLLECTION.where({ id: itemId }).delete().then(() => {
        commit(MUTATIONS.DELETE, itemId, { root: true })
        resolve(itemId)
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.getByKey = ({ commit, state, getters }, { key, value }) => {
    return new Promise((resolve, reject) => {
      const item = getters.all().find(item => item[key] === value)
      if (item) {
        return resolve(item)
      }

      COLLECTION.where({ key: value }).first().then((item) => {
        if (item) {
          commit(MUTATIONS.ADD, item, { root: true })
          resolve(item)
        } else {
          reject(item)
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  actions.unique = (store, payload) => {
    let self = actions
    return new Promise((resolve, reject) => {
      self.getByKey(store, { key: CONFIG.uniqueKey, value: payload }).then(storedItem => {
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
