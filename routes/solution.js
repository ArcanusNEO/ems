import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import loginChk from './midwares/login-check.js'
import db from '../utils/database.js'

router.use(loginChk)

router.get('/:pid(\\d+)', async (req, res) => {
  const pid = req.params.pid

  const uid = req.jwtAccount?.uid

  const query = 'SELECT * FROM "solution" WHERE "pid" = $1 AND "uid" = $2'

  const ret = (await db.query(query, [pid, uid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.put('/:pid(\\d+)', async (req, res) => {
  const pid = req.params.pid

  const uid = req.jwtAccount?.uid

  const answer = req.body.answer

  const queryLegal = 'SELECT * FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" INNER JOIN "problem" ON "exam"."eid" = "problem"."eid" WHERE "problem"."pid" = $1 AND "examUser"."uid" = $2 AND NOW()::TIMESTAMPTZ <@ "exam"."during"'

  const retLegal = (await db.query(queryLegal, [pid, uid])).rows[0]
  if (!retLegal) return res.sendStatus(statusCode.forbidden)

  const query = 'INSERT INTO "solution" ("pid", "uid", "editTime", "answer") VALUES ($1, $2, NOW()::TIMESTAMPTZ, $3) ON CONFLICT ("pid", "uid") DO UPDATE SET "answer" = $3 RETURNING "sid"'

  const ret = (await db.query(query, [pid, uid, answer])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

export default router
