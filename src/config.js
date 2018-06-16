const TO = process.env.GMAILER_TO
const SENDER = process.env.GMAILER_SENDER
const PASS = process.env.GMAILER_PASS
const PORT = process.env.GMAILER_PORT || 3020
const WHITELIST = `${process.env.GMAILER_WHITELIST}`.split(',')

module.exports = { TO, SENDER, PASS, PORT, WHITELIST }
