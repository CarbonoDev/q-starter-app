import OAuth from 'src/app/oauth'
const auth = new OAuth()
export default async function (to, from, next) {
  if (auth.isAuthenticated()) {
    return next()
  }
  return next('/login')
}
