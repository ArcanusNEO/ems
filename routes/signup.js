import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import db from '../utils/database.js'
import hash from '../utils/hash.js'
import helper from '../utils/helper.js'

router.post('/', async (req, res) => {
  if (!(await helper.verifyEmailCaptcha(req, res, req.body.emailCaptcha)))
    return res.sendStatus(statusCode.captchaErr)

  const { username, nickname, password } = req.body
  const pwd = crypto.decrypt(password)
  if (!pwd) return res.sendStatus(statusCode.parseErr)

  const queryUser = 'SELECT "uid" FROM "user" WHERE "email" = $1 LIMIT 1'
  const user = (await db.query(queryUser, [username])).rows[0]
  if (user) return res.sendStatus(statusCode.resOccupied)

  const insQuery = 'INSERT INTO "user" ("gid", "nickname", "email", "signupTime") VALUES (1000, $1, $2, NOW()::TIMESTAMPTZ) RETURNING "uid"'
  const ret = (await db.query(insQuery, [nickname, username])).rows[0]
  const { uid } = ret

  const hpwd = hash.hashf(pwd + uid)
  const queryPassword = 'UPDATE "user" SET "password" = $1 WHERE "uid" = $2'
  await db.query(queryPassword, [hpwd, uid])

  return res.status(statusCode.ok).json(await helper.accountCookie(req, res, { uid, gid, username, nickname }))
})

export default router
