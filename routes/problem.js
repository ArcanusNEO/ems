import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import loginChk from './midwares/login-check.js'
import db from '../utils/database.js'

router.use(loginChk)

router.get('/:pid(\\d+)', async (req, res) => {
  const pid = req.params.pid

  const uid = req.jwtAccount?.uid

  const query = 'SELECT "problem"."label", "problem"."description", "problem"."type", "problem"."score" FROM "exam" INNER JOIN "examUser" ON "exam"."eid" = "examUser"."eid" INNER JOIN "problem" ON "exam"."eid" = "problem"."eid" WHERE "problem"."pid" = $1 AND "examUser"."uid" = $2 LIMIT 1'

  const ret = (await db.query(query, [pid, uid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

export default router
