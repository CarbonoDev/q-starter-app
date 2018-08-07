import Service from 'easy-requests'
import { Config } from 'helpers'

class User extends Service {
  constructor () {
    super()
    // this.config.origin = Env('BASE_URL')
    this.config.origin = Config('api.api_url')
    this.config.endpoint = '/users/'
  }

  static currentUser () {
    let UserService = new User()
    return UserService.http.get(Config('api.current_user_url'))
      .then(httpResponse => httpResponse.data)
      .then(responseBody => responseBody.data)
  }
}

export default User
