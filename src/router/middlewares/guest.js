import OAuth from 'src/app/oauth'
const auth = new OAuth()
export default async function (to, from, next) {
  if (auth.isAuthenticated()) {
    return next(false)
  }
  // TODO: Here we might want to check for current user in the state or session to clean up
  return next()
}
