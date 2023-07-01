import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'
import crypto from '../../utils/passwd-crypto.js'
import hash from '../../utils/hash.js'

router.patch('/password', async (req, res) => {
  try {
    const { uid } = req.params
    const { password } = req.body
    const pwd = crypto.decrypt(password)
    if (!pwd) return res.sendStatus(statusCode.parseErr)

    const queryUser = 'SELECT "uid" FROM "user" WHERE "uid" = $1 LIMIT 1'
    const user = (await db.query(queryUser, [uid])).rows[0]
    if (!user) return res.sendStatus(statusCode.resNotFound)

    const hpwd = hash.hashf(pwd + uid)
    const queryPassword = 'UPDATE "user" SET "password" = $1 WHERE "uid" = $2'
    await db.query(queryPassword, [hpwd, uid])

    return res.status(statusCode.ok).json({ password: hpwd })
  } catch { }
  return res.status(statusCode.forbidden)
})

router.patch('/nickname', async (req, res) => {
  try {
    const { uid } = req.params
    const { nickname } = req.body

    const queryUser = 'SELECT "uid" FROM "user" WHERE "uid" = $1 LIMIT 1'
    const user = (await db.query(queryUser, [uid])).rows[0]
    if (!user) return res.sendStatus(statusCode.resNotFound)

    const query = 'UPDATE "user" SET "nickname" = $1 WHERE "uid" = $2'
    await db.query(query, [nickname, uid])

    return res.status(statusCode.ok).json({ nickname })
  } catch { }
  return res.status(statusCode.forbidden)
})

export default router
