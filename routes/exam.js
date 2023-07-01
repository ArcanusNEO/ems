import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import loginChk from './midwares/login-check.js'
import db from '../utils/database.js'

router.use(loginChk)

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" WHERE "examUser"."uid" = $1 ORDER BY "exam"."eid" DESC'
  const ret = (await db.query(query, [req.jwtAccount?.uid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.get('/:eid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "exam" WHERE "eid" = $1'
  const ret = (await db.query(query, [req.params.eid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.get('/:eid(\\d+)/content', async (req, res) => {
  const eid = req.params.eid

  const uid = req.jwtAccount?.uid

  const query = 'SELECT "problem"."label", "problem"."description", "problem"."type", "problem"."score" FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" INNER JOIN "problem" ON "exam"."eid" = "problem"."eid" WHERE "exam"."eid" = $1 AND "examUser"."uid" = $2 ORDER BY "problem"."label"'

  const ret = (await db.query(query, [eid, uid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.get('/register/:eid(\\d+)', async (req, res) => {
  const eid = req.params.eid

  const uid = req.jwtAccount?.uid

  const query = 'INSERT INTO "examUser" ("eid", "uid") VALUES ($1, $2)'
  await db.query(query, [eid, uid])
  
  return res.sendStatus(statusCode.ok)
})

export default router
