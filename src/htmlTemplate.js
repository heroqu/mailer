function htmlTemplate({ name, email, body }) {
  const fullEmail = `"${name}" &lt;${email}&gt;`

  return `Sent by: <a href='mailto:${fullEmail}'>${fullEmail}</a>
<br>
<br>
<pre>
${body}
</pre>`
}

module.exports = htmlTemplate
