import OAuth from 'src/app/oauth'
const auth = new OAuth()
export default async function (to, from, next) {
  const user = await auth.currentUser()
  if (user) {
    next()
  } else {
    next('/login')
  }
}
