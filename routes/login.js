import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import tokenUtils from '../utils/token.js'
import db from '../utils/database.js'
import crypto from '../utils/passwd-crypto.js'
import hash from '../utils/hash.js'
import helper from '../utils/helper.js'

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const jwtAccount = await tokenUtils.get(req, 'acc')
  if (jwtAccount?.username === username) {
    const { uid, username, gid, nickname } = jwtAccount
    const account = { uid, username, gid, nickname }
    return res.status(statusCode.ok).json(account)
  }
  tokenUtils.remove(res, 'acc')

  const pwd = crypto.decrypt(password)
  if (!pwd) return res.sendStatus(statusCode.parseErr)

  const queryUser = 'SELECT "uid", "gid", "nickname", "password" FROM "user" WHERE "email" = $1 AND "status" = 0 LIMIT 1'
  const user = (await db.query(queryUser, [username])).rows[0]
  if (!user) return res.sendStatus(statusCode.resNotFound)

  const { uid, gid, nickname } = user
  const hpwd = hash.hashf(pwd + uid)

  if (hpwd !== user.password) return res.sendStatus(statusCode.passwdMismatch)

  return res.status(statusCode.ok).json(await helper.accountCookie(req, res, { uid, gid, username, nickname }))
})

export default router
