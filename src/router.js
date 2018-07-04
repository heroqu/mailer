const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const cors = require('./cors')
const html2text = require('./html2text')
const assertNotBlank = require('./assertNotBlank')
const assertIsValidEmail = require('./assertIsValidEmail')
const mailer = require('./mailer')

const { TO } = require('./config')

/**
 * Health checker route
 */
router.get('/', function(req, res, next) {
  res
    .status(200)
    .send('The mailer is here, use POST at /send to sumbit a message')
})

/**
 * Message submission route
 */
router.post('/send', cors(), function(req, res, next) {
  // Attibutes we are interested in here
  const attrs = ['name', 'email', 'subject', 'message']

  let params
  try {
    params = attrs.reduce((acc, attr) => {
      // extract these attibutes from req.body,
      // sanitize each value
      acc[attr] = html2text(req.body[attr])

      // assert the attribute is not blank
      assertNotBlank(attr, acc)
      return acc
    }, {})

    // additionally assert the email is valid
    assertIsValidEmail(params.email)
  } catch ({ message }) {
    return next(createError(400, message))
  }

  const { name, email, subject, message } = params

  const fullEmail = `"${name}" &lt;${email}&gt;`

  const sendOpts = {
    to: TO,
    subject: subject,
    from: { name: name, address: email },
    // Unfortunately specifying `from:` attribute here
    // is living in an ideal world. In realtiy it doesn't
    // do much as gmail does always maliciously replace
    // it with the email used in authentication.
    // Needless to say that gmail doesn't respect the
    // innocent `replyTo` attribute either.
    // So we have to resort to embedding the real sender
    // address into the message body.
    html: `Sent by: <a href='mailto:${fullEmail}'>${fullEmail}</a>
<br>
<br>
<pre>
${message}
</pre>`
  }

  try {
    const transporter = mailer.createTransport()
    transporter.sendMail(sendOpts, (err, response) => {
      if (err) {
        res.status(503).send(response)
      }
      res.status(201).send(response)
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
