import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import db from '../utils/database.js'
import hash from '../utils/hash.js'
import loginChk from './midwares/login-check.js'
import helper from '../utils/helper.js'

router.patch('/password', async (req, res) => {
  if (!(await helper.verifyEmailCaptcha(req, res, req.body.emailCaptcha)))
    return res.sendStatus(statusCode.captchaErr)

  const { username, password } = req.body
  const pwd = crypto.decrypt(password)
  if (!pwd) return res.sendStatus(statusCode.parseErr)

  const queryUser = 'SELECT "uid", "gid", "nickname" FROM "user" WHERE "email" = $1 AND "status" = 0 LIMIT 1'
  const user = (await db.query(queryUser, [username])).rows[0]
  if (!user) return res.sendStatus(statusCode.resNotFound)
  const { uid, gid, nickname } = user

  const hpwd = hash.hashf(pwd + uid)
  const queryPassword = 'UPDATE "user" SET "password" = $1 WHERE "uid" = $2'
  await db.query(queryPassword, [hpwd, uid])

  return res.status(statusCode.ok).json(await helper.accountCookie(req, res, { uid, gid, username, nickname }))
})

router.patch('/nickname', loginChk, async (req, res) => {
  const { nickname } = req.body
  const { uid, username, gid } = req.jwtAccount

  const query = 'UPDATE "user" SET "nickname" = $1 WHERE "uid" = $2'
  await db.query(query, [nickname, uid])

  return res.status(statusCode.ok).json(await helper.accountCookie(req, res, { uid, gid, username, nickname }))
})

export default router
