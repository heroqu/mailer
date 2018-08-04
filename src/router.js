const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const debug = require('debug')
const debugError = debug('mailer:error')
const debugSend = debug('mailer:send')

const html2text = require('./html2text')
const assertNotBlank = require('./assertNotBlank')
const assertIsValidEmail = require('./assertIsValidEmail')

const makeMessage = require('./makeMessage')
const createTransport = require('./createTransport')

/**
 * Health checker route
 */
router.get('/', function(req, res, next) {
  res
    .status(200)
    .send('The mailer is here, use POST at /send to sumbit a message')
})

/**
 * Message submission route
 */
router.post('/send', function(req, res, next) {
  /**
   * Extract, sanitize and validate parameters required
   * to compose a email message object:
   *    'name', 'email', 'subject', 'message'
   */

  const attrs = ['name', 'email', 'subject', 'message']

  let params
  try {
    params = attrs.reduce((acc, attr) => {
      // extract these attibutes from req.body,
      // sanitize each value
      acc[attr] = html2text(req.body[attr])

      // assert the attribute is not blank
      assertNotBlank(attr, acc)
      return acc
    }, {})

    // additionally assert the email is valid
    assertIsValidEmail(params.email)
  } catch ({ message }) {
    debugError(`Error preparing/validating email params:\n`, message)
    return next(createError(400, message))
  }

  /**
   * Create mail object and try to send it with Nopdemailer
   * using one of the transports
   */

  try {
    debugSend('params', params)

    const sendOptions = makeMessage(params)

    const transporter = createTransport()
    transporter.sendMail(sendOptions, (err, response) => {
      if (err) {
        debugError(`Error: transporter.sendMail:`, err)
        res.status(503).send(response)
        return
      }
      debugSend(`Success: transporter.sendMail: response:`, response)
      res.status(201).send(response)
    })
  } catch (err) {
    debugError(err)
    return next(err)
  }
})

module.exports = router
