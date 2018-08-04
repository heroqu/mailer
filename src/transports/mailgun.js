const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = require('../config')

const mailgunTransport = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  }
}

module.exports = mailgunTransport(auth)
