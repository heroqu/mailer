'use strict'

const nodemailer = require('nodemailer')
const { NODEMAILER_TRANSPORT } = require('./config')

const transporterOpts = require(`./transports/${NODEMAILER_TRANSPORT}`)

function createTransport() {
  return nodemailer.createTransport(transporterOpts)
}

module.exports = createTransport
