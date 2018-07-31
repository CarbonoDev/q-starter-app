import Service from 'easy-requests'
import { Config } from 'helpers'

class Registration extends Service {
  constructor () {
    super()
    this.config.origin = Config('api.api_url')
    this.config.endpoint = '/registrations/'
  }
}

export default Registration
