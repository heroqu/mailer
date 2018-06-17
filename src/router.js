const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const cors = require('./cors')
const assertNotBlank = require('./assertNotBlank')
const html2text = require('./html2text')
const mailer = require('./mailer')

const { TO } = require('./config')

router.get('/', function(req, res, next) {
  res.send(200, 'The mailer is here, POST your message to /send')
  next(null)
})

router.post('/send', cors(), function(req, res, next) {
  // Attibutes we are interested in here
  const attrs = ['name', 'email', 'subject', 'message']

  // extract these attibutes from req.body,
  // sanitize each value
  // and finally assert it's not blank
  let params
  try {
    params = attrs.reduce((acc, attr) => {
      acc[attr] = html2text(req.body[attr])
      assertNotBlank(attr, acc)
      return acc
    }, {})
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
