import Service from 'easy-requests'
import { Fire, Config } from 'helpers'

class User extends Service {
  constructor () {
    super()
    // this.config.origin = Env('BASE_URL')
    this.config.origin = Config('api.api_url')
    this.config.endpoint = '/users/'
  }

  static async currentUser () {
    let UserService = new User()
    try {
      let response = await UserService.http.get(Config('api.current_user_url'))
      Fire('user:fetched', response.data)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default User
