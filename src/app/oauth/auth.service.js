import Http from 'axios'
import { Config } from 'helpers'
export default {
  async attemptLogin (credentials) {
    try {
      let response = await Http.post(Config('api.token_url'), credentials)
      return new Promise(resolve => resolve(response))
    } catch (error) {
      return new Promise((resolve, reject) => reject(error))
    }
  },
  currentUser () {
    return Http.get(Config('api.current_user_url'))
      .then(httpResponse => httpResponse.data)
      .then(responseBody => responseBody.data)
  }
}
