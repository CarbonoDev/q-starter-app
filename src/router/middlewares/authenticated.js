import OAuth from 'src/app/oauth'
const oAuth = new OAuth()

export function Authenticated ({ to, from, next }) {
  if (to.name === 'app.login' && oAuth.isAuthenticated()) {
    return next({ path: '/' })
  }
  // If you are visiting '/' and you are a guest then, you must be redirected to login
  if (to.meta.requiresAuth && oAuth.guest()) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }
  return next()
}
