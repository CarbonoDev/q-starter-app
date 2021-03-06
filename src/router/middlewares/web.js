import OAuth from 'src/app/oauth'
import Store from 'src/store'
const auth = new OAuth()
export default async function (to, from, next) {
  if (auth.isAuthenticated()) {
    return auth.currentUser()
      .then(user => {
        return Store.commit('users/setCurrentUser', user, {
          root: true
        })
      }).then(result => {
        return next()
      })
  }
  return next()
}
