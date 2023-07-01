import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import loginChk from './midwares/login-check.js'
import db from '../utils/database.js'

router.use(loginChk)

router.get('/', (req, res) => {
  try {
    const { uid, gid, username, nickname } = req.jwtAccount
    return res.status(statusCode.ok).json({ uid, gid, username, nickname })
  } catch { }
  return res.sendStatus(statusCode.unauthorized)
})

router.get('/:uid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "user" WHERE "uid" = $1 AND "status" >= 0'
  const ret = (await db.query(query, [req.params.uid])).rows[0]
  if (ret) delete ret.password
  return res.status(statusCode.ok).json(ret)
})

export default router
