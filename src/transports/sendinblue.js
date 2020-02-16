const { SENDINBLUE_API_KEY } = require('../config')

const sendinblueTransport = require('nodemailer-sendinblue-transport')

const options = {
  apiKey: SENDINBLUE_API_KEY,
}

module.exports = sendinblueTransport(options)
