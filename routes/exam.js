import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import loginChk from './midwares/login-check.js'
import db from '../utils/database.js'

router.use(loginChk)

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const offset = (page - 1) * limit

  const uid = req.jwtAccount?.uid

  const param = []
  let query = `SELECT * FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" WHERE "examUser"."uid" = $${param.push(uid)} ORDER BY "exam"."eid" DESC`

  if (limit > 0) {
    query += ` LIMIT $${param.push(limit)}`
    if (offset >= 0) query += ` OFFSET $${param.push(offset)}`
  }

  const ret = (await db.query(query, param)).rows
  return res.status(statusCode.ok).json(ret)
})

router.get('/:eid(\\d+)', async (req, res) => {
  const eid = req.params.eid

  const query = 'SELECT * FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" WHERE "exam"."eid" = $1 LIMIT 1'

  const ret = (await db.query(query, [eid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.get('/:eid(\\d+)/content', async (req, res) => {
  const eid = req.params.eid

  const uid = req.jwtAccount?.uid

  const query = 'SELECT "problem"."label", "problem"."description", "problem"."type", "problem"."score" FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" INNER JOIN "problem" ON "exam"."eid" = "problem"."eid" WHERE "exam"."eid" = $1 AND "examUser"."uid" = $2 ORDER BY "problem"."label"'

  const ret = (await db.query(query, [eid, uid])).rows
  return res.status(statusCode.ok).json(ret)
})

export default router
