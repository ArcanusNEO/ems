import express from 'express'
const router = express.Router()
import db from '../../utils/database.js'
import statusCode from '../../config/http-status-code.js'
import reset from './reset.js'

router.get('/:uid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "user" WHERE "uid" = $1'
  const ret = (await db.query(query, [req.params.uid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.use('/:uid(\\d+)/r(eset)?', reset)

export default router
