const express = require('express')
const cors = require('cors')
const path = require('path')

const help = require('./helpers')
const delay = 1000

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(cors())

server.post('/api/login', async (req, res, next) => {
  try {
    const [status, payload] = await help.login(req.body)
    setTimeout(() => {
      res.status(status).json(payload)
    }, delay)
  } catch (err) {
    next(err)
  }
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    error: 'The app crashed for some reason, see message & stack',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
