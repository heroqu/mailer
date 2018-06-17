/**
 * convert HTML to plain text by eradicating each and every html tag
 * if input is falsy (e.g. is undefined) then return empty string
 *
 * @param  {string} html - any text, possibly containing html
 * @return {string}      - sanitized text
 */
const html2text = html =>
  html ? `${html}`.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '') : ''

module.exports = html2text
