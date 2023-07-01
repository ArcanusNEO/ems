import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'

router.get('/:pid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "problem" WHERE "problem"."pid" = $1'
  const ret = (await db.query(query, [req.params.pid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

export default router
