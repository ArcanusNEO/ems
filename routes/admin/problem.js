import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'

router.get('/:pid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "problem" WHERE "pid" = $1'
  const ret = (await db.query(query, [req.params.pid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.post('/', async (req, res) => {
  const { pid, label, description, answer, type, eid, score } = req.body
  const paramList = [
    [label, description, answer, type, eid, score],
    [label, description, answer, type, eid, score, pid]
  ]
  const query = [
    'INSERT INTO "problem" ("label", "description", "answer", "editTime", "type", "eid", "score") VALUES ($1, $2, $3, NOW()::TIMESTAMPTZ, $4, $5, $6) RETURNING *',
    'UPDATE "problem" SET "label" = $1, "description" = $2, "answer" = $3, "editTime" = NOW()::TIMESTAMPTZ, "type" = $4, "eid" = $5, "score" = $6 WHERE "pid" = $7 RETURNING *'
  ]
  const index = pid ? 1 : 0
  const ret = (await db.query(query[index], paramList[index])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

export default router
