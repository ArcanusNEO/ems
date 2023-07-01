import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import sr from 'string-random'
import tokenUtils from '../utils/token.js'
import email from '../utils/email.js'
import hash from '../utils/hash.js'
import salt from '../config/salt.js'

router.post('/', async (req, res) => {
  const emailAddr = req.body.email.toLowerCase()
  if (!/^[0-9a-z_-]+@[0-9a-z_-]+(\.[0-9a-z_-]+)+$/igs.test(emailAddr))
    return res.sendStatus(statusCode.parseErr)
  const captcha = sr(5)
  const ec = hash.hashf(captcha + (await salt()))
  await tokenUtils.write(res, 'ec', { ec: ec })
  const ret = await email(req.body.email, `您的邮箱验证码是：\n${captcha}`, "邮箱验证码")
  if (ret) return res.sendStatus(statusCode.ok)
})

export default router
