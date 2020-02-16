const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = require('../config')

const transporterOptions = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
}

module.exports = transporterOptions
