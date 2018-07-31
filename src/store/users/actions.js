import User from 'services/user.service'

export const getCurrentUser = async ({ commit, state }, payload) => {
  if (state.currentUser) return state.currentUser
  let user_promise = User.currentUser()
  user_promise
    .then(user => {
      commit('users/setCurrentUser', user.attributes, {
        root: true
      })
    })
}

export const destroyCurrentUser = ({ commit, state }, payload) => {
  commit('users/setCurrentUser', {
    data: null
  }, {
    root: true
  })
}
