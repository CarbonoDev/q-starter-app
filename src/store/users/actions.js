import User from 'services/user.service'

export const getCurrentUser = async ({ commit, state, getters }, payload) => {
  if (state.currentUser) return state.currentUser

  return User.currentUser()
    .then(user => {
      commit('users/setCurrentUser', user, {
        root: true
      })
      return getters['currentUser']
    })
}

export const setCurrentUser = (vuex, user) => {
  const { commit } = vuex
  commit('users/setCurrentUser', user, {
    root: true
  })
}

export const destroyCurrentUser = ({ commit, state }, payload) => {
  commit('users/setCurrentUser', null, {
    root: true
  })
}
