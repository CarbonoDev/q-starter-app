import OAuth from '@app/oauth'
let oAuth = new OAuth()

export function checkAuthorization (config) {
  // We make sure Authorization header is sent in every request
  config.headers['Authorization'] = oAuth.getAuthHeader()
}
