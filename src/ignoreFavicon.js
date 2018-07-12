/**
 * idea from https://stackoverflow.com/a/50141617/5437379
 */
function ignoreFavicon(req, res, next) {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    return res.sendStatus(204)
  }
  next()
}

module.exports = ignoreFavicon
