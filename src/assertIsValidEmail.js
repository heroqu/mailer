const RE_VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function Throw(e) {
  throw e
}

/**
 * assert email validity. Blank paddings are allowed.
 *  Credits go to https://stackoverflow.com/a/46181
 *
 * @param  {stirng}  email to test
 * @return {Boolean}       true if valid, else throws
 */
function assertIsValidEmail(email) {
  return (
    RE_VALID_EMAIL.test(
      String(email)
        .toLowerCase()
        .trim()
    ) || Throw(new Error(`Not a valid email: ${email}`))
  )
}

module.exports = assertIsValidEmail
