import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'

router.get('/:eid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "exam" WHERE "eid" = $1'
  const ret = (await db.query(query, [req.params.eid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.get('/:eid(\\d+)/content', async (req, res) => {
  const query = 'SELECT "problem".* FROM "exam" INNER JOIN "problem" ON "exam"."eid" = "problem"."eid" WHERE "exam"."eid" = $1 ORDER BY "problem"."label"'
  const ret = (await db.query(query, [req.params.eid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.post('/', async (req, res) => {
  const { eid, label, description, teacher, during, status } = req.body
  const paramList = [
    [label, description, teacher, during, status],
    [label, description, teacher, during, status, eid]
  ]
  const query = [
    'INSERT INTO "exam" ("label", "description", "teacher", "during", "status", "editTime") VALUES ($1, $2, $3, $4, $5, NOW()::TIMESTAMPTZ) RETURNING *',
    'UPDATE "exam" SET "label" = $1, "description" = $2, "teacher" = $3, "during" = $4, "status" = $5, "editTime" = NOW()::TIMESTAMPTZ WHERE "eid" = $6 RETURNING *'
  ]
  const index = eid ? 1 : 0
  const ret = (await db.query(query[index], paramList[index])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

export default router
