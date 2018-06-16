const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')

const router = require('./router')

const app = express()

app.use(logger('dev'))
app.use(express.json())

// app.use('/', router)
app.use(router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // return error to client
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
