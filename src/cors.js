'use strict'

/**
 * Decorate base cors function with our options injected
 */

const parse = require('url-parse')
const createError = require('http-errors')
const corsBase = require('cors')
const debug = require('debug')('mailer:cors')

let { WHITELIST } = require('./config')

const TO_LOWERCASE = s => `${s}`.toLowerCase()

const ALLOWED_HOSTNAMES = new Set(
  (WHITELIST || [])
    .filter(Boolean)
    .map(TO_LOWERCASE)
    .map(url => parse(url).hostname),
)

const isAllowed = origin =>
  ALLOWED_HOSTNAMES.has(TO_LOWERCASE(parse(origin).hostname))

const corsOptions = {
  origin: function(origin, callback) {
    debug(`CORS: origin: ${origin}`)

    console.log(`CORS: origin: ${origin}`)

    if (
      // allow requests with no origin
      // (like mobile apps or curl requests)
      !origin ||
      // if origin is set, it must be the whitelist
      isAllowed(origin)
    ) {
      // All is good
      callback(null, true)
      return
    }

    debug(`CORS: origin is not allowed: ${origin}`)
    callback(
      createError(403, `Origin is not allowed by cors policy: ${origin}`),
    )
  },
}

function cors() {
  return corsBase(corsOptions)
}

module.exports = cors
