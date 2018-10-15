const DotEnv = require('dotenv')
const DotEnvBase = require('dotenv')
const parsedEnv = DotEnv.config().parsed
const baseEnv = DotEnvBase.config({path: '.env.example'}).parsed

module.exports = function () {
  const appEnv = {}
  // Let's stringify our variables
  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      appEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }

  for (key in baseEnv) {
    if (typeof process.env[key] === 'string') {
      appEnv[key] = JSON.stringify(process.env[key])
    }
  }
  return appEnv
}
