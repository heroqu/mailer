const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const cors = require('./cors')
const assertNotBlank = require('./assertNotBlank')
const mailer = require('./mailer')

const { TO } = require('./config')

router.get('/', function(req, res, next) {
  res.send(200, 'The mailer is here, POST your message to /send')
  next(null)
})

router.post('/send', cors(), function(req, res, next) {
  console.log(`ROUTER: start sending...`)

  const { name, email, subject, message } = req.body
  const params = { name, email, subject, message }

  console.log(params)

  try {
    assertNotBlank('name', params)
    assertNotBlank('email', params)
    assertNotBlank('message', params)
    assertNotBlank('subject', params)
  } catch ({ message }) {
    console.error(message)
    return next(createError(400, message))
  }

  const fullEmail = `"${name}" &lt;${email}&gt;`

  const sendOpts = {
    from: {name: name, address: email},
    // Unfortunately using `from:` doesn't help here -
    // gmail does always maliciously replace it with
    // the email used in authentication.
    // So we have to resort to embedding the real sender
    // address into the body (see html attr below)
    to: TO,
    subject: subject,
    html: `Sent by: <a href='mailto:${fullEmail}'>${fullEmail}</a>
<br>
<br>
${message}`
  }

  try {
    const transporter = mailer.createTransport()
    transporter.sendMail(sendOpts, (err, response) => {
      if (err) {
        return next(err)
      }
      res.status(201).send(response)
      res.end()
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
