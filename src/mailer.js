'use strict'

const nodemailer = require('nodemailer')
const { SENDER, PASS } = require('./config')

const transporterOpts = {
  service: 'gmail',
  auth: {
    user: SENDER,
    pass: PASS
  }
}

function createTransport() {
  return nodemailer.createTransport(transporterOpts)
}

module.exports = { createTransport }
