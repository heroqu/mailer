/**
 * Throws if obj[attr] doesn't evaluate to a non blank string
 * with toString()
 * @param  {string} attr - name of the attribute
 * @param  {object} obj  - target object
 */
function assertNotBlank(attr, obj) {
  const { [attr]: value } = obj
  if (!value || !`${value}`.trim()) {
    const msg = `${attr} can't be blank`
    throw new Error(msg)
  }
}

module.exports = assertNotBlank
