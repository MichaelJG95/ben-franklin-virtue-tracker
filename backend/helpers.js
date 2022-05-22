const yup = require('yup')
const jwt = require('jsonwebtoken')

const thisShouldBeSecret = 'shh'

let id, getId

const reset = () => {
  id = 0
  getId = () => ++id
  articles = []
}
reset()

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('username is required')
    .min(3, 'username must be at least 3 characters long')
    .max(20, 'username must be at most 20 characters long'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long')
    .max(20, 'password must be at most 20 characters long'),
})


async function login(user) {
  try {
    const { username } = await userSchema.validate(user)
    const claims = {
      username
    }
    const token = jwt.sign(claims, thisShouldBeSecret, { expiresIn: '1h' })
    const payload = { message: `Welcome back, ${username}!`, token }
    return [200, payload]
  } catch (err) {
    return [422, { message: `Ouch: ${err.message}` }]
  }
}

async function checkToken(token) {
  return jwt.verify(token, thisShouldBeSecret)
}

module.exports = {
  login,
  reset,
}
