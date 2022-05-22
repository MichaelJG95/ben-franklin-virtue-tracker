const { setupServer } = require('msw/node')
const { rest } = require('msw')

const help = require('./helpers')

async function login(req, res, ctx) {
  const [status, payload] = await help.login(req.body)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}

function catchAll(req, res, ctx) {
  const message = `Endpoint [${req.method}] /${req.params['0']} does not exist`
  return res(
    ctx.status(404),
    ctx.json({ message }),
  )
}

const getHandlers = () => {
  help.reset()
  return [
    rest.post('http://localhost:9000/api/login', login),
    rest.all('http://localhost:9000/*', catchAll),
  ]
}

module.exports = {
  setupServer,
  getHandlers,
}
