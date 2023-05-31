import jwt from 'jsonwebtoken'
import salt from '../config/salt.js'
import cookieOpts from '../config/cookie.js'

const options = {
  expiresIn: '9999d'
}

const sign = async (content) => {
  return jwt.sign(content, await salt(), options)
}

// verify a token symmetric
const verify = async (token) => {
  return jwt.verify(token, await salt())
}

// Returns the decoded payload without verifying if the signature is valid
const decode = (token) => {
  return jwt.decode(token)
}

const write = async (res, property, content) => {
  try {
    const token = await sign(content)
    res.cookie(property, token, cookieOpts)
    return true
  } catch { }
  return false
}

const remove = (res, property) => {
  try {
    res.clearCookie(property)
    return true
  } catch { }
  return false
}

const get = async (req, property) => {
  try {
    const token = req.cookies[property]
    return await verify(token)
  } catch { }
  return null
}

export default { write, remove, get }
