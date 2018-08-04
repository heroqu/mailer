const { GMAIL_SENDER, GMAIL_PASS } = require('../config')

const transporterOpts = {
  service: 'gmail',
  auth: {
    user: GMAIL_SENDER,
    pass: GMAIL_PASS
  }
}

module.exports = transporterOpts
