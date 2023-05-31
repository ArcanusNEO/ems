import tokenUtils from './token.js'
import hash from './hash.js'
import salt from '../config/salt.js'

const verifyEmailCaptcha = async (req, res, captcha) => {
  const jwtPayload = await tokenUtils.get(req, 'ec')
  if (!jwtPayload?.ec) return false
  tokenUtils.remove(res, 'ec')
  return jwtPayload.ec === hash.hashf(captcha + (await salt()))
}

const accountCookie = async (req, res, account) => {
  await tokenUtils.write(res, 'acc', account)
  return account
}

export default { verifyEmailCaptcha, accountCookie }