/**
 * Decorate base cors function with our options injected
 */

const createError = require('http-errors')
const corsBase = require('cors')
const debug = require('debug')('mailer:cors')

let { WHITELIST } = require('./config')

WHITELIST = WHITELIST || []

const corsOptions = {
  origin: function(origin, callback) {
    debug(`CORS: origin: ${origin}`)

    if (
      // allow requests with no origin
      // (like mobile apps or curl requests)
      !origin ||
      // if origin is set, it must match our whitelist
      WHITELIST.indexOf(origin) !== -1
    ) {
      callback(null, true)
      return
    }

    debug(`CORS: origin is not allowed: ${origin}`)
    callback(
      createError(403, `Origin is not allowed by cors policy: ${origin}`)
    )
  }
}

function cors() {
  return corsBase(corsOptions)
}

module.exports = cors
