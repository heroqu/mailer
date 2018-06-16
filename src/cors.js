/**
 * Here we decorate base cors function from cors package
 * with our options
 */

const createError = require('http-errors')
const corsBase = require('cors')

let { WHITELIST } = require('./config')

WHITELIST = WHITELIST || []

const corsOptions = {
  origin: function(origin, callback) {
    if (WHITELIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(
        createError(403, `Origin is not allowed by cors policy: ${origin}`)
      )
    }
  }
}

function cors() {
  return corsBase(corsOptions)
}

module.exports = cors