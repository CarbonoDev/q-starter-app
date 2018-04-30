import Route from 'vue-routisan'
import { guest, web, auth } from 'src/router/middlewares'
// shorthand
Route.setViewResolver((component) => require('src/pages/' + component).default)

Route.view('/', 'layouts/default')
  .guard(web)
  .children(() => {
    Route.view('', 'index').name('app.home').guard(auth)
    Route.view('info', 'info').name('app.info').guard(auth)
  })

Route.view('/', 'layouts/default')
  .guard(web)
  .children(() => {
    Route.view('/login', 'Login').name('app.login').guard(guest)
  })
Route.view('*', '404').name('app.404')

export default Route.all()
