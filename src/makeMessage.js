const { TO } = require('./config')
const htmlTemplate = require('./htmlTemplate')

function makeMessage({ name, email, subject, message }) {
  const fullEmail = `"${name}" &lt;${email}&gt;`

  const sendOpts = {
    to: TO,
    subject: subject,
    from: { name: name, address: email },
    html: htmlTemplate({ name, email, body: message }),
  }

  return sendOpts
}

module.exports = makeMessage
