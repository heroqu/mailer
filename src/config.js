'use strict'

const dotenvOptions = {}

if (process.env.NODE_ENV === 'production') {
  // path to a different .env file
  dotenvOptions.path = './.env.production'
}

require('dotenv').config(dotenvOptions)

const PORT = process.env.MAILER_PORT || 3020
const WHITELIST = `${process.env.MAILER_WHITELIST}`.split(',')
const TO = process.env.MAILER_TO

// Transport selector
const NODEMAILER_TRANSPORT = process.env.MAILER_NODEMAILER_TRANSPORT || 'gmail'

// Mailgun
const MAILGUN_API_KEY = process.env.MAILER_MAILGUN_API_KEY
const MAILGUN_DOMAIN = process.env.MAILER_MAILGUN_DOMAIN

// Sendinblue
const SENDINBLUE_API_KEY = process.env.MAILER_SENDINBLUE_API_KEY

// Gmail
const GMAIL_SENDER = process.env.MAILER_GMAIL_SENDER
const GMAIL_PASS = process.env.MAILER_GMAIL_PASS

// SMTP
const SMTP_HOST = process.env.MAILER_SMTP_HOST
const SMTP_PORT = process.env.MAILER_SMTP_PORT
const SMTP_USER = process.env.MAILER_SMTP_USER
const SMTP_PASS = process.env.MAILER_SMTP_PASS

module.exports = {
  PORT,
  WHITELIST,
  TO,
  NODEMAILER_TRANSPORT,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  SENDINBLUE_API_KEY,
  GMAIL_SENDER,
  GMAIL_PASS,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
}
