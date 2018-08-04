const dotenvOptions = {}
if (process.env.NODE_ENV === 'production') {
  // path to a different .env file
  dotenvOptions.path = './.env.production'
}

require('dotenv').config(dotenvOptions)

const PORT = process.env.MAILER_PORT || 3020
const WHITELIST = `${process.env.MAILER_WHITELIST}`.split(',')
const TO = process.env.MAILER_TO

// mailgun OR gmail
const NODEMAILER_TRANSPORT = process.env.MAILER_NODEMAILER_TRANSPORT || 'gmail'

// Mailgun
const MAILGUN_API_KEY = process.env.MAILER_MAILGUN_API_KEY
const MAILGUN_DOMAIN = process.env.MAILER_MAILGUN_DOMAIN

// Gmail
const GMAIL_SENDER = process.env.MAILER_GMAIL_SENDER
const GMAIL_PASS = process.env.MAILER_GMAIL_PASS

module.exports = {
  PORT,
  WHITELIST,
  TO,
  NODEMAILER_TRANSPORT,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  GMAIL_SENDER,
  GMAIL_PASS
}
