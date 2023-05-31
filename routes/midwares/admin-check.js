import tokenUtils from '../../utils/token.js'
import statusCode from '../../config/http-status-code.js'

export default async (req, res, next) => {
  try {
    req.jwtAccount = await tokenUtils.get(req, 'acc')
    if (req.jwtAccount?.gid === '0') return next()
  } catch { }
  return res.sendStatus(statusCode.unauthorized)
}
