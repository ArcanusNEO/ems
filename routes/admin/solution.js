import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'

router.get('/sid/:sid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "sid" = $1'
  const ret = (await db.query(query, [req.params.sid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.get('/pid/:pid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "pid" = $1'
  const ret = (await db.query(query, [req.params.pid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.get('/uid/:uid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "uid" = $1'
  const ret = (await db.query(query, [req.params.uid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.patch('/:sid(\\d+)', async (req, res) => {
  const { score, status } = req.body
  const query = 'UPDATE "solution" SET "score" = $1, "status" = $2'
  await db.query(query, [score, status])
  return res.sendStatus(statusCode.ok)
})

export default router
